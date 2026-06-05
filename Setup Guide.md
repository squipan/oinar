# OINAR – PWA & Desktop Setup Guide

## What's in this folder

| File | Purpose |
|---|---|
| `index.html` | Your updated HTML with PWA support added |
| `manifest.json` | Tells browsers this is an installable app |
| `service-worker.js` | Enables offline use & home screen install |

Your `css/style.css`, `js/data.js`, `js/app.js`, and `assets/` files are **unchanged** — just keep them in the same folder structure.

---

## Final folder structure

```
oinar/
├── index.html          ← replace with the new one
├── manifest.json       ← NEW
├── service-worker.js   ← NEW
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   └── app.js
└── assets/
    └── logo.png
```

---

## Step 1 – Host the app (required for PWA)

PWAs must be served over **HTTPS** — they won't install from a local file.

**Free & easy options:**

### Option A: Netlify (recommended, free)
1. Go to https://netlify.com and sign up free
2. Drag your entire `oinar/` folder onto the Netlify dashboard
3. You'll get a URL like `https://oinar-studio.netlify.app`
4. Done ✅

### Option B: GitHub Pages (free)
1. Push your folder to a GitHub repository
2. Go to Settings → Pages → set source to `main` branch
3. You'll get `https://yourusername.github.io/oinar`

---

## Step 2 – Install on Mobile (iOS / Android)

Once hosted on HTTPS:

**iPhone/iPad:**
1. Open the URL in **Safari** (must be Safari, not Chrome)
2. Tap the Share button (box with arrow)
3. Tap **"Add to Home Screen"**
4. Tap **Add** → app icon appears on home screen ✅

**Android:**
1. Open the URL in **Chrome**
2. Tap the 3-dot menu → **"Add to Home Screen"** or **"Install App"**
3. Tap **Install** ✅

---

## Step 3 – Install on Chromebook

1. Open the URL in Chrome
2. Look for the **install icon** (⊕) in the address bar
3. Click it → **Install**
4. App appears in your launcher ✅

---

## Step 4 – Windows Desktop App (.exe)

Use **Tauri** (lightweight ~5MB) or **Electron** (simpler setup).

### Option A: Electron (easiest)

Prerequisites: [Node.js](https://nodejs.org) installed

```bash
# 1. Create a new folder alongside your oinar/ folder
mkdir oinar-desktop && cd oinar-desktop

# 2. Init and install Electron
npm init -y
npm install --save-dev electron

# 3. Create main.js
```

**main.js:**
```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({ width: 1280, height: 800 });
  win.loadFile(path.join(__dirname, '../oinar/index.html'));
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
```

**package.json** – add this:
```json
"main": "main.js",
"scripts": {
  "start": "electron .",
  "build": "electron-builder"
}
```

```bash
# 4. Run it
npm start

# 5. Package as .exe
npm install --save-dev electron-builder
npm run build
# → find your installer in dist/
```

### Option B: Tauri (smaller, faster — recommended)

See: https://tauri.app/v1/guides/getting-started/prerequisites
Tauri wraps your existing HTML/CSS/JS with near-zero changes needed.

---

## Data & Privacy

Your app uses **localStorage** — all data stays on the device. No server, no account needed.
This means:
- ✅ Works fully offline after first load (PWA)
- ✅ Data is private and local
- ⚠️ Data does NOT sync between devices (phone ≠ desktop)

If you want sync across devices in the future, that would require adding a backend (Firebase, Supabase, etc.) — just let me know!