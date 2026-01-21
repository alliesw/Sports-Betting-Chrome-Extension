// The Content Script 

// This script lives on the webpage and listens for the messages sent from the background script above.
// content.js

// Create a small floating UI element
const trackerUI = document.createElement('div');
trackerUI.id = 'betting-tracker-overlay';
trackerUI.style.cssText = 'position:fixed; top:10px; right:10px; z-index:9999; background:black; color:white; padding:10px; border-radius:8px; font-family: sans-serif;';
trackerUI.innerHTML = '<strong>Live Stats:</strong> <span id="live-val">Loading...</span>';
document.body.appendChild(trackerUI);

// 1. Consolidate into a single listener for better performance and reliability
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  // Handle STAT_UPDATE
  if (message.type === "STAT_UPDATE") {
    const liveVal = document.getElementById('live-val');
    if (liveVal && message.payload?.yes_price) {
      liveVal.innerText = `Kalshi Yes: ${message.payload.yes_price}¢`;
    }
  }

  // Handle KALSHI_UPDATE
  if (message.type === "KALSHI_UPDATE") {
    const kalshiMarket = message.payload.title;
    
    // Ensure the selector matches the actual FanDuel DOM structure
    const teamElements = document.querySelectorAll('.team-name-class');
    const fanDuelTeams = Array.from(teamElements).map(el => el.innerText.trim());

    fanDuelTeams.forEach(team => {
      // Ensure these helper functions are defined in this file or imported
      const normalizedTeam = resolveTeamName(team);
      const score = getSimilarity(normalizedTeam, kalshiMarket);

      if (score > 0.7) {
        console.log(`Matched ${team} to Kalshi market!`);
        updateOverlay(message.payload.price);
      }
    });
  }

  // Return true if you plan to use sendResponse asynchronously, 
  // otherwise, it's good practice to close the channel.
  return true; 
});

/** * HELPER FUNCTIONS 
 * These must be defined within the content script to be accessible.
 */
function resolveTeamName(name) {
  return name.toLowerCase().trim();
}

function getSimilarity(s1, s2) {
  // Basic Jaro-Winkler or Levenshtein implementation recommended here
  // For now, a simple inclusion check as a placeholder:
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  if (longer.length === 0) return 1.0;
  return (longer.indexOf(shorter) > -1) ? 0.8 : 0;
}

function updateOverlay(price) {
  const overlay = document.getElementById('kalshi-overlay');
  if (overlay) overlay.innerText = `Price: ${price}`;
}
