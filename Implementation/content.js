// The Content Script 

// This script lives on the webpage and listens for the messages sent from the background script above.
// content.js

// Create a small floating UI element
const trackerUI = document.createElement('div');
trackerUI.id = 'betting-tracker-overlay';
trackerUI.style.cssText = 'position:fixed; top:10px; right:10px; z-index:9999; background:black; color:white; padding:10px; border-radius:8px; font-family: sans-serif;';
trackerUI.innerHTML = '<strong>Live Stats:</strong> <span id="live-val">Loading...</span>';
document.body.appendChild(trackerUI);

// Listen for updates from background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "STAT_UPDATE") {
    const liveVal = document.getElementById('live-val');
    // Display the "Yes" price from Kalshi
    if (message.payload.yes_price) {
      liveVal.innerText = `Kalshi Yes: ${message.payload.yes_price}¢`;
    }
  }
});
