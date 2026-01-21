// --- 1. UI Setup ---
const trackerUI = document.createElement('div');
trackerUI.id = 'betting-tracker-overlay';
trackerUI.style.cssText = `
  position: fixed; 
  top: 10px; 
  right: 10px; 
  z-index: 9999; 
  background: rgba(0, 0, 0, 0.85); 
  color: white; 
  padding: 12px; 
  border-radius: 8px; 
  font-family: sans-serif;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  min-width: 150px;
`;
// Note the ID "live-val" is what we will target for all updates
trackerUI.innerHTML = '<strong>Live Stats:</strong> <div id="live-val">Loading...</div>';
document.body.appendChild(trackerUI);

// --- 2. Message Listener ---
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const displayArea = document.getElementById('live-val');
  if (!displayArea) return;

  // Handle STAT_UPDATE (Direct price updates)
  if (message.type === "STAT_UPDATE") {
    if (message.payload?.yes_price) {
      displayArea.innerText = `Kalshi Yes: ${message.payload.yes_price}¢`;
    }
  }

  // Handle KALSHI_UPDATE (Fuzzy matching logic)
  if (message.type === "KALSHI_UPDATE") {
    const kalshiMarket = message.payload.title;
    
    // FanDuel specific selector (Adjust .team-name-class to the actual site class)
    const teamElements = document.querySelectorAll('.team-name-class');
    const fanDuelTeams = Array.from(teamElements).map(el => el.innerText.trim());

    let matchFound = false;
    fanDuelTeams.forEach(team => {
      const normalizedTeam = resolveTeamName(team);
      const score = getSimilarity(normalizedTeam, kalshiMarket.toLowerCase());

      if (score > 0.7) {
        console.log(`Matched ${team} to Kalshi!`);
        updateOverlay(message.payload.price);
        matchFound = true;
      }
    });
    
    if (!matchFound) {
       console.log("No market match found for current teams.");
    }
  }

  return true; // Keep channel open for async
});

// --- 3. Helper Functions ---
function resolveTeamName(name) {
  return name ? name.toLowerCase().trim() : "";
}

function getSimilarity(s1, s2) {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  const longerLength = longer.length;

  if (longerLength === 0) return 1.0;

  // Calculate Levenshtein Distance
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }

  const distance = costs[s2.length];
  // Return percentage of similarity
  return (longerLength - distance) / longerLength;
}

function updateOverlay(price) {
  const displayArea = document.getElementById('live-val');
  if (displayArea) {
    displayArea.innerText = `Matched Price: ${price}¢`;
  }
}

// --- 4. Manual Link Integration ---
async function initializeTracking() {
  const currentPath = window.location.pathname;
  const linkKey = `link_${currentPath}`;
  
  try {
    const data = await chrome.storage.local.get(linkKey);
    if (data[linkKey]) {
      console.log("Manual link found:", data[linkKey]);
      const displayArea = document.getElementById('live-val');
      displayArea.innerText = `Linked: ${data[linkKey]}`;
      // Logic to prioritize this specific ticker would go here
    } else {
      console.log("No manual link. Waiting for fuzzy match...");
    }
  } catch (e) {
    console.error("Storage error:", e);
  }
}

// Start the check
initializeTracking();
