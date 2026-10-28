import { useState, useRef, useEffect } from "react";
import { Upload, X, RefreshCw, AlertCircle, Sparkles, Check, Image as ImageIcon, StopCircle } from "lucide-react";
import { useLanguage } from "../i18n";

interface ScreenshotModeProps {
  onAnalyzeText: (text: string) => void;
  loading: boolean;
  isDark: boolean;
}

/**
 * Downscales an image so that its longest side does not exceed maxDim (1600px).
 * Prevents memory overload and significantly speeds up client-side OCR.
 */
function downscaleImage(file: File, maxDim = 1600): Promise<{ blob: Blob; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        resolve({ blob: file, dataUrl: objectUrl });
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve({ blob: file, dataUrl: canvas.toDataURL("image/jpeg", 0.9) });
          } else {
            resolve({ blob, dataUrl: canvas.toDataURL("image/jpeg", 0.9) });
          }
        },
        "image/jpeg",
        0.9
      );
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      reject(err);
    };

    img.src = objectUrl;
  });
}

export default function ScreenshotMode({ onAnalyzeText, loading, isDark }: ScreenshotModeProps) {
  const { t } = useLanguage();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");

  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Active tesseract worker reference for cancellation
  const activeWorkerRef = useRef<{ terminate: () => Promise<unknown> } | null>(null);
  const isCancelledRef = useRef<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clipboard Paste (Ctrl+V) listener
  useEffect(() => {
    function handlePaste(e: ClipboardEvent) {
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    }

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function processFile(file: File) {
    setErrorMessage(null);

    // Validate type: PNG/JPG/WEBP only
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMessage(t.errFileType);
      return;
    }

    // Validate size: max 5 MB
    const maxBytes = 5 * 1024 * 1024;
    if (file.size > maxBytes) {
      setErrorMessage(t.errFileSize);
      return;
    }

    try {
      setFileName(file.name || "Pasted-Screenshot.png");
      setFileSize(`${(file.size / 1024).toFixed(1)} KB`);

      // Downscale large image before OCR for performance
      const { blob, dataUrl } = await downscaleImage(file, 1600);
      setImageBlob(blob);
      setImagePreview(dataUrl);
      setExtractedText("");
    } catch (err: unknown) {
      console.error("Image processing error:", err);
      setErrorMessage(t.errOcrGeneric);
    }
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleClear() {
    if (activeWorkerRef.current) {
      isCancelledRef.current = true;
      activeWorkerRef.current.terminate().catch(() => {});
      activeWorkerRef.current = null;
    }
    setImagePreview(null);
    setImageBlob(null);
    setFileName("");
    setFileSize("");
    setExtractedText("");
    setOcrLoading(false);
    setOcrProgress(0);
    setProgressStatus("");
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleCancelOcr() {
    isCancelledRef.current = true;
    if (activeWorkerRef.current) {
      activeWorkerRef.current.terminate().catch(() => {});
      activeWorkerRef.current = null;
    }
    setOcrLoading(false);
    setProgressStatus(t.scanCancelled);
  }

  /**
   * Runs on-device OCR using lazy-loaded tesseract.js.
   * Languages: eng + hin.
   */
  async function runOcr() {
    if (!imageBlob && !imagePreview) return;

    setOcrLoading(true);
    setOcrProgress(5);
    setErrorMessage(null);
    setProgressStatus(t.ocrLoadingEngine);
    isCancelledRef.current = false;

    try {
      // Lazy-load tesseract.js dynamically so the initial JS bundle does not grow!
      const { createWorker } = await import("tesseract.js");

      if (isCancelledRef.current) return;

      setProgressStatus(t.ocrInitEngine);
      setOcrProgress(20);

      const worker = await createWorker("eng+hin", undefined, {
        logger: (m) => {
          if (isCancelledRef.current) return;
          if (m.status === "recognizing text") {
            const pct = Math.round((m.progress || 0) * 80) + 20;
            setOcrProgress(pct);
            setProgressStatus(t.ocrExtractingProgress.replace("{pct}", String(pct)));
          }
        },
      });

      activeWorkerRef.current = worker;

      if (isCancelledRef.current) {
        await worker.terminate();
        return;
      }

      const inputSource = imageBlob || imagePreview;
      const ret = await worker.recognize(inputSource!);

      await worker.terminate();
      activeWorkerRef.current = null;

      if (isCancelledRef.current) return;

      const resultText = ret.data.text.trim();

      if (!resultText) {
        setErrorMessage(t.errNoText);
      } else {
        setExtractedText(resultText);
        setOcrProgress(100);
        setProgressStatus(t.ocrComplete);
      }
    } catch (err: unknown) {
      console.error("OCR recognition failure:", err);
      if (!isCancelledRef.current) {
        setErrorMessage(t.errOcrGeneric);
      }
    } finally {
      setOcrLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Privacy Banner */}
      <div
        className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
          isDark
            ? "bg-[#0B1230] border-slate-700 text-slate-300"
            : "bg-[#FAF8F5] border-amber-900/10 text-slate-700"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
          <strong className="text-slate-900 dark:text-white">{t.screenshotPrivacy}</strong>
        </div>
        <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium hidden sm:inline">
          {t.screenshotPrivacySub}
        </span>
      </div>

      {/* Upload Drop Zone / Paste Area */}
      {!imagePreview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-[#2563EB] bg-[#2563EB]/10 scale-[1.01]"
              : isDark
              ? "border-slate-700 hover:border-[#2563EB] bg-[#0B1230]/60"
              : "border-slate-300 hover:border-[#2563EB] bg-[#FFFDF9]"
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          aria-label={t.screenshotDropTitle}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/*"
            onChange={handleFileInputChange}
            className="hidden"
            aria-label={t.screenshotFileInputAria}
          />

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shadow-sm">
              <Upload className="w-7 h-7" />
            </div>

            <div>
              <p className="font-heading font-bold text-base text-slate-900 dark:text-white">
                {t.screenshotDropTitle}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-sans">
                {t.screenshotPasteHint}
              </p>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400 pt-2 font-sans font-medium">
              <span>{t.screenshotMeta}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Preview Card */
        <div
          className={`rounded-3xl border p-5 space-y-4 ${
            isDark ? "bg-[#0B1230] border-slate-700" : "bg-[#FFFDF9] border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <ImageIcon className="w-4 h-4 text-[#2563EB]" />
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[220px]">
                {fileName}
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 font-mono font-medium">({fileSize})</span>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400 transition-colors text-xs flex items-center gap-1 cursor-pointer"
              title={t.screenshotRemove}
            >
              <X className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold">{t.screenshotRemove}</span>
            </button>
          </div>

          {/* Thumbnail preview */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center max-h-56 border border-slate-800">
            <img
              src={imagePreview}
              alt={t.screenshotPreviewAlt}
              className="max-h-56 object-contain"
            />
          </div>

          {/* OCR Trigger or Status */}
          {!extractedText && !ocrLoading && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
                {t.screenshotReady}
              </p>
              <button
                type="button"
                onClick={runOcr}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-heading font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.btnExtractText}</span>
              </button>
            </div>
          )}

          {/* Progress Bar & Cancel Button */}
          {ocrLoading && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2563EB]" />
                  {progressStatus}
                </span>
                <span className="font-mono font-bold text-[#2563EB]">{ocrProgress}%</span>
              </div>

              {/* Visual Progress Track */}
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2563EB] to-[#14B8A6] rounded-full transition-all duration-200"
                  style={{ width: `${ocrProgress}%` }}
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleCancelOcr}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-300 text-rose-600 dark:border-rose-900 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                >
                  <StopCircle className="w-3.5 h-3.5" />
                  <span>{t.btnCancelScan}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Extracted Text Editable Area */}
      {extractedText && (
        <div
          className={`rounded-3xl border p-5 space-y-3 ${
            isDark ? "bg-[#0B1230] border-slate-700" : "bg-[#FFFDF9] border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <label
              htmlFor="ocr-extracted-textarea"
              className="font-heading font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-white"
            >
              {t.extractedLabel}
            </label>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              {t.ocrComplete}
            </span>
          </div>

          <textarea
            id="ocr-extracted-textarea"
            rows={5}
            className={`w-full p-4 rounded-2xl text-sm leading-relaxed border transition-all resize-y font-sans focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
              isDark
                ? "bg-[#141B3D] border-slate-700 text-white placeholder:text-slate-500"
                : "bg-white border-slate-300 text-slate-900"
            }`}
            value={extractedText}
            onChange={(e) => setExtractedText(e.target.value)}
            disabled={loading}
          />

          {/* Warning Note */}
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{t.ocrWarning}</span>
          </div>

          {/* Check this text button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => onAnalyzeText(extractedText)}
              disabled={!extractedText.trim() || loading}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-heading font-bold text-sm shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t.evaluatingText}</span>
                </>
              ) : (
                <span>{t.btnCheckThisText}</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
