# Sports-Betting-Chrome-Extension

(1) Tool that integrates directly with major books like Kalshi, FanDuel, and Draftkings. It allows you to analyze player props, while showing you where the best odds are currently live and links your sports books accounts to track your ROI from several sports betting apps - providing insight into how much money and time your spending and means to stop sports betting if it's a problem.  


Requirements: 
Extensions will need to handle both WebSockets (for Kalshi's rapid updates) and REST APIs or DOM Scraping (for FanDuel).
Implementation Checklist

Check Selectors: Verify that .team-name-class is the actual class FanDuel is currently using (these change frequently).

Debouncing: If the page is very active, the observer might fire too often. You can "debounce" the performMatch function to limit it to running once every 500ms.

Permissions: Ensure your manifest.json has host_permissions for both Kalshi and FanDuel.

PROJECT ARCHITECTURE: 
Component         Responsibility
-----------------------------------------------------------------------------------------
Manifest (v3),    Declares permissions (host_permissions) for kalshi.com and fanduel.com.
Service Worker,   Maintains the WebSocket connection to Kalshi and fetches FanDuel data.
Content Script,   Injects the UI (stats overlay) directly onto the betting pages.
Popup UI,         Allows the user to toggle specific leagues or markets on/off.

# Sports Probability Bridge 📈
**FanDuel x Kalshi Real-Time Data Integration**

A Chrome extension built with Manifest v3 that bridges traditional sports betting markets (FanDuel) with prediction market probabilities (Kalshi).

## 🚀 Installation (Developer Mode)
Before publishing to the Chrome Web Store, you can test the extension locally:

1. **Clone the Repo:**
   `git clone https://github.com/your-username/sports-probability-bridge.git`
2. **Open Extensions Page:**
   Open Chrome and navigate to `chrome://extensions/`.
3. **Enable Developer Mode:**
   Toggle the **"Developer mode"** switch in the top-right corner.
4. **Load Unpacked:**
   Click the **"Load unpacked"** button and select the root folder of this project.
5. **Pin it:**
   Click the puzzle piece icon in your toolbar and pin the bridge icon for quick access.

## 🛠 Project Structure
* `manifest.json`: Extension configuration and permissions.
* `background.js`: Handles Kalshi WebSocket connections and Auth.
* `content.js`: Scrapes FanDuel DOM and injects the overlay UI.
* `popup/`: The UI for manual market linking and API key entry.
* `assets/`: Icons and CSS stylesheets.

## 🔒 Security Note
This extension uses `chrome.storage.session` to store Kalshi tokens. This ensures your session data is wiped every time the browser is closed. Never commit your `config.js` or API keys to a public repository.
