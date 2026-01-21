# Sports-Betting-Chrome-Extension

(1) Tool that integrates directly with major books like Kalshi, FanDuel, and Draftkings. It allows you to analyze player props and execute bets in two clicks while showing you where the best odds are currently live. 

(2) Accesses real-time data from US, UK, and EU bookmakers. It is often used to sync live odds directly into Google Sheets for bettors who build their own models. 

(3) Odds to Probability Text Changer: A utility tool that scans any webpage and converts American odds (e.g., +140) into implied probability percentages (41.7%), helping you quickly spot if a book is overpricing an outcome. 

(4) Bet Tracking & Bankroll Management: An extension that links to your sports book account and shows you how much your winning and losing (ROI)

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

