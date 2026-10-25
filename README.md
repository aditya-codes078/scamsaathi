# ScamSaathi: From Suspicion to Safe Recovery

An explainable Hindi/English cyber-safety helper built for the **HackIndia x KIT AI & CyberTech Hackathon 2026** by **Team Build Beyond**.

Most scam tools stop at a warning. ScamSaathi goes one step further: it explains *why* a message, link or screenshot looks risky, shows the evidence, and guides the user through safe next steps (stop, verify, report to 1930 / cybercrime.gov.in).

**Live demo:** https://scamsaathi.netlify.app
*(The free backend sleeps when idle, so the very first check can take up to a minute.)*

## What it does
- **Message, Link and Screenshot modes:** paste a message, a link, or upload a screenshot (text is read in the browser with OCR; the image is not uploaded).
- **Risk level with reasons:** Low, Caution, High or Critical, with the red flags highlighted in the text.
- **"What happened?" step:** the user says whether they clicked, installed, shared details or paid, and gets matching next steps.
- **Safety by design:** the app never asks for OTP, PIN, CVV or passwords, and does not store messages.
- It explains the evidence so the user can decide. It is not a final verdict and not 100% accurate.

## How it works
1. **Rule engine** checks the text for scam patterns (urgency, OTP requests, fake KYC, fees, authority threats, and more).
2. **Link checks** look for disguised or look-alike domains and show where short links lead (page content is never downloaded).
3. **Gemini (optional)** adds a Hinglish explanation and can only *raise* the risk level, never lower it. If it is unavailable, the rules still work.

## Tech stack
- Frontend: React, Vite, TypeScript, Tailwind CSS (hosted on Netlify)
- Backend: Python, Django (hosted on Render)
- AI: Gemini API (optional), in-browser OCR with tesseract.js

## Run it locally
Backend (PowerShell, one line at a time):
```
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py runserver 8000
```
Frontend (in a second terminal):
```
cd frontend
npm install
npm run dev
```
Optional: set `GEMINI_API_KEY` before starting the backend. Never commit keys; on Render they live in Environment Variables.

## Team Build Beyond
| Name | Role | GitHub |
|---|---|---|
| Aditya Kumar | Frontend, deployment, integration | [aditya-codes078](https://github.com/aditya-codes078) |
| Anshi Verma | AI workflow, pitch, deck | [Anshi-Verma](https://github.com/Anshi-Verma) |
| Shourya Srivastava | Backend rules, tests, security review | [imShourya18](https://github.com/imShourya18) |
| Devanshi Singh | Research, test messages, QA | [Devanshi-Singh17](https://github.com/Devanshi-Singh17) |

## How we built it
We used AI tools (Claude and Antigravity) to help write and structure code. The team designed the idea, tested and debugged it, deployed it, and worked on the rules, research and pitch. Roles above describe what each member actually worked on.
