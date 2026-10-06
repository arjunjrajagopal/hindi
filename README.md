# Akshar – trace the Hindi script

Letters only, for now: 13 vowels, 33 consonants and 7 nukta letters (53 in total).
Same engine as the Tamil app: grey letter, trace it, press **Check**.
Letters hang from a dashed headline, the way Hindi is written.

Two ways to run it. Both work with no internet once loaded.

| | What | Best for |
|---|---|---|
| **A. `akshar-standalone.html`** | One file. Fonts are inside it. | Trying it right now. Double-click on the Mac, or open on the phone. |
| **B. `akshar-pwa/` folder** | An installable app (icon on the home screen, full screen, offline). | Daily use. Saves progress reliably. |

---

## A. The single file

- **Mac / PC:** double-click it. It opens in your browser.
- **Android:** copy it to the phone (USB cable, Google Drive, email to yourself), open it from the Files app and choose **Chrome**.
  Chrome sometimes opens files in a way that cannot save progress. If so, the app says
  "Progress can't be saved in this mode". That is your cue to use option B.

---

## B. The installable app

### Step 1: try it on the Mac

1. Unzip `akshar-pwa.zip`.
2. Open Terminal, go into the folder, and start a tiny local server:

   ```
   cd ~/Downloads/akshar-pwa
   python3 -m http.server 8000
   ```
   (If `python3` is missing, macOS offers to install the developer tools. Or use: `ruby -run -e httpd . -p 8000`)
3. In Chrome, open **http://localhost:8000**
4. Phone look: press **Cmd+Opt+I** (DevTools), then **Cmd+Shift+M** (device toolbar), and pick a phone.
5. Offline check: in DevTools, **Network** tab, tick **Offline**, reload. The app should still load.
   The home screen says "Ready for offline use" once everything is saved.

### Step 2: test on the Pixel 3a (USB, no web hosting)

1. **Phone:** Settings, About phone, tap **Build number** 7 times. Then Settings, System, **Developer options**, turn on **USB debugging**.
2. Plug the phone into the Mac and accept the "Allow USB debugging?" prompt.
3. **Mac Chrome:** open `chrome://inspect/#devices`. Tick **Discover USB devices**.
   Click **Port forwarding…**, add port `8000` with address `localhost:8000`, tick **Enable port forwarding**, Done.
4. **Phone Chrome:** open **http://localhost:8000** (keep the server from Step 1 running).
   Wait for "Ready for offline use".
5. Install: tap the **Install app** button in the app, or Chrome's menu (⋮) then **Install app** / **Add to Home screen**.
6. **Offline proof:** turn on airplane mode, unplug the USB cable, press Ctrl-C in Terminal to stop the server,
   then open the app from its home-screen icon. It should open and work normally.
7. **Debugging:** on the `chrome://inspect` page, click **inspect** under the phone's page to see its console and layout live.

### Step 3: the Redmi

Repeat Step 2, but use **Chrome** (not Xiaomi's own browser). Then check, over a few days, that progress is still there.
Xiaomi phones can be aggressive with battery saving. If progress disappears, set Chrome's battery option to
"No restrictions" in the phone's app settings. The in-app **Back up or restore progress** button
(bottom of the home screen) lets you keep a copy of your progress as text.

### Putting it online for real (optional)

Any static host works: GitHub Pages, Netlify Drop, Cloudflare Pages. Upload the folder's contents as they are.
Open the address in Chrome on the phone and choose **Install app**. It needs `https://` (or `localhost`) to install.

---

## Good to know

- **Progress is stored per browser and per address.** The `localhost:8000` copy and a hosted copy keep separate progress.
  Use **Back up or restore progress** to move it between them.
- **Updating the app:** edit the files, then change `akshar-v2` to `akshar-v3` in `sw.js`
  (this tells phones to fetch the new files). Open the app twice to pick up the change.
- **Finger or stylus:** finger drawing is on by default. If a stylus is detected, finger drawing switches off
  (palm rejection) and a **Finger** button appears so you can turn it back on.
- **How Check works:** it measures how much of the letter your ink covers and how much ink strays from it.
  It does not check stroke order yet. The dashed headline is a guide for your eye; the letter's own headline is part of
  the shape that gets checked.
- **Not included yet:** vowel signs (का, कि, कु…), conjuncts (क्ष, त्र, ज्ञ, श्र), stroke-order animation.

## Fonts and licences

- **Poppins** (Indian Type Foundry), SIL Open Font License 1.1, https://scripts.sil.org/OFL. Subset to Latin and Devanagari.
- **DejaVu Sans**, free licence (Bitstream Vera / public domain changes), subset to a few pronunciation marks (ṭ, ṇ, ṃ…).
