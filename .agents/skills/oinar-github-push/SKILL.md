---
name: oinar-github-push
description: Step-by-step GitHub push sequence for the Oinar project. Activates when the user says "push to GitHub" or similar.
---

# Oinar GitHub Push Sequence

Whenever the user says **"push to GitHub"**, **"push to git"**, or similar, follow this exact sequence. Do not skip any step.

---

## Step 1 - Bump the Service Worker Cache Version

The service worker at `d:\Antigravity\Oinar\service-worker.js` must be updated on **every push** so that PWA clients pick up the latest assets.

1. Read line 6 of `service-worker.js` to get the current `CACHE_NAME` (e.g. `oinar-v46`).
2. Increment the version number by 1 (e.g. `oinar-v47`).
3. Write the updated line back.

```js
// Line 6 of service-worker.js
const CACHE_NAME = 'oinar-v47'; // always bump this
```

---

## Step 2 - Check Git Status

```powershell
git status
```

Confirm `service-worker.js` is among the modified files before proceeding.

---

## Step 3 - Stage All Changes

```powershell
git add -A
```

---

## Step 4 - Commit with a Descriptive Message

Write a clear, concise commit message summarising what changed in this session.

```powershell
git commit -m "<short description of changes>"
```

Good message examples:
- "Add uketsuke-show item, update A4 pricing and shipping logic"
- "Fix platform picker centering on mobile"
- "Update prices: mermaid 190, gayo 160, sekifuda shipping 350"

---

## Step 5 - Push to Origin

```powershell
git push origin main
```

---

## Step 6 - Confirm Success

Report back to the user:
- The commit hash
- Which files changed
- The new cache version number (e.g. `oinar-v47`)

---

## Important Notes

- **Never use && as a command separator in PowerShell** - run each command as a separate step.
- The cache version **must always be bumped** even if `service-worker.js` had no other changes.
- Skipping the cache bump means PWA users on mobile will keep running stale cached code.
- The current cache version is always on **line 6** of `service-worker.js`.
