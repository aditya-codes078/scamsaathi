import { useState } from "react";

const options = [
  {
    id: "clicked",
    label: "Maine link par click kiya",
    steps: [
      "Us page par koi jaankari ya OTP na daalein",
      "Browser band karein aur phone mein security scan chalayein",
      "Bank aur email ke password badal lein",
    ],
  },
  {
    id: "installed",
    label: "Maine koi app install ki",
    steps: [
      "App turant uninstall karein",
      "Jab tak app hata na dein, phone ko airplane mode par rakhein",
      "Bank aur UPI app ke PIN aur password badal lein",
    ],
  },
  {
    id: "shared",
    label: "Maine OTP ya personal jaankari share ki",
    steps: [
      "Turant apne bank ko call karein aur card ya account block karwayein",
      "Sabhi PIN aur password badal lein",
      "Cyber fraud helpline 1930 par call karein",
    ],
  },
  {
    id: "paid",
    label: "Maine paisa bheja",
    steps: [
      "Turant 1930 par call karein, jitni jaldi hogi utna behtar",
      "Apne bank ko transaction ki jaankari dein",
      "cybercrime.gov.in par complaint darj karein (screenshots aur transaction ID ke saath)",
    ],
  },
  {
    id: "none",
    label: "Maine kuch nahi kiya",
    steps: [
      "Bahut achha! Message ko save kar lein, agar report karna ho",
      "Sender ko block karein",
      "Aage koi link ya call aaye toh na uthayein aur na click karein",
    ],
  },
];

export default function WhatHappened() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const steps = Array.from(
    new Set(options.filter((o) => selected.includes(o.id)).flatMap((o) => o.steps))
  );

  return (
    <div className="mt-6 p-4 rounded bg-slate-900 border border-slate-700">
      <h2 className="text-xl font-semibold mb-3">Kya hua? Aapne kya kiya?</h2>

      <div className="space-y-2">
        {options.map((o) => (
          <label key={o.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(o.id)}
              onChange={() => toggle(o.id)}
              className="h-4 w-4"
            />
            {o.label}
          </label>
        ))}
      </div>

      {steps.length > 0 && (
        <div className="mt-4 p-3 rounded bg-slate-800">
          <h3 className="font-semibold mb-2">Aapke liye agle kadam</h3>
          <ol className="list-decimal pl-5 space-y-1">
            {steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      )}

      <p className="mt-3 text-sm text-slate-400">
        Cyber fraud helpline: 1930 · cybercrime.gov.in
      </p>
    </div>
  );
}