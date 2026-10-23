import { useState, useRef } from "react";
import { Camera, Upload, RefreshCw, AlertCircle, Check, X, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface ScreenshotOcrUploadProps {
  onTextExtracted: (text: string) => void;
}

export default function ScreenshotOcrUpload({ onTextExtracted }: ScreenshotOcrUploadProps) {
  const { isDark } = useTheme();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [progressStatus, setProgressStatus] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (PNG, JPG, or WebP).");
      return;
    }

    setErrorMsg(null);
    setSuccess(false);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  }

  function handleClear() {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setProgressStatus("");
    setErrorMsg(null);
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleRunOcr() {
    if (!imagePreview) return;
    setOcrLoading(true);
    setErrorMsg(null);
    setProgressStatus("Initializing on-device OCR engine...");

    try {
      // Lazy load tesseract.js only on user request to keep main bundle super lightweight!
      const { createWorker } = await import("tesseract.js");
      
      setProgressStatus("Loading language models (English + Hindi)...");
      const worker = await createWorker("eng+hin", undefined, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            const pct = Math.round((m.progress || 0) * 100);
            setProgressStatus(`Extracting text from image (${pct}%)...`);
          }
        },
      });

      const ret = await worker.recognize(imagePreview);
      await worker.terminate();

      const extracted = ret.data.text.trim();
      if (!extracted) {
        setErrorMsg("Koi readable text nahi mila. Please a clearer screenshot upload karein.");
      } else {
        onTextExtracted(extracted);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err: unknown) {
      console.error("OCR execution failed:", err);
      setErrorMsg("Screenshot scan karne mein dikkat aayi. Please message text manually paste karein.");
    } finally {
      setOcrLoading(false);
      setProgressStatus("");
    }
  }

  return (
    <div
      className={`mt-4 rounded-2xl border p-4 sm:p-5 transition-all ${
        isDark
          ? "bg-[#0B1230] border-slate-700/80 text-slate-200"
          : "bg-white border-amber-900/10 text-slate-800 shadow-sm"
      }`}
    >
      {/* Header with Experimental Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#7C3AED]" />
          <span className="font-heading font-bold text-sm text-slate-900 dark:text-white">
            Upload Suspicious Screenshot
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-violet-100 text-[#7C3AED] dark:bg-violet-950 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
            Experimental
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          100% on-device · Image never leaves your phone
        </span>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-sans">
        Have an SMS or WhatsApp screenshot? Upload it to auto-extract text using on-device optical character recognition.
      </p>

      {/* Upload Drop Zone / Input */}
      {!imagePreview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all hover:scale-[1.005] ${
            isDark
              ? "border-slate-700 hover:border-[#7C3AED] bg-[#141B3D]/50"
              : "border-slate-200 hover:border-[#7C3AED] bg-[#FAF8F5]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            aria-label="Upload screenshot"
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2.5 rounded-full bg-violet-50 text-[#7C3AED] dark:bg-violet-950/60 dark:text-violet-300">
              <Upload className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Click to select screenshot (SMS / WhatsApp)
            </div>
            <div className="text-[11px] text-slate-400">
              Supports PNG, JPG, or WebP up to 10MB
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Image Preview Card */}
          <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-48 bg-slate-950 flex items-center justify-center">
            <img
              src={imagePreview}
              alt="Uploaded screenshot preview"
              className="max-h-48 object-contain"
            />
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors cursor-pointer"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleRunOcr}
              disabled={ocrLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {ocrLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{progressStatus || "Scanning image..."}</span>
                </>
              ) : success ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Text Inserted Into Checker!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Extract Text into Checker</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={ocrLoading}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer"
            >
              Choose different image
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="mt-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Honest Note about OCR accuracy */}
      <div className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 italic leading-relaxed">
        * Note: Automated OCR runs strictly in your browser. It may occasionally misread stylized Hindi or compressed fonts. Always review the extracted text in the box above before checking.
      </div>
    </div>
  );
}
