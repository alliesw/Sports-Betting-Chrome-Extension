// background.js

const KALSHI_WSS_URL = "wss://api.elections.kalshi.com/trade-api/v2/stream";

let socket;

// 1. Initialize Connection
function connectToKalshi() {
  socket = new WebSocket(KALSHI_WSS_URL);

  socket.onopen = () => {
    console.log("Connected to Kalshi WebSocket");
    
    // 2. Subscribe to a specific market (e.g., an event ticker)
    const subMsg = {
      id: 1,
      type: "subscribe",
      channels: ["ticker"],
      market_tickers: ["FED-26JAN20-B"] // Example ticker
    };
    socket.send(JSON.stringify(subMsg));
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if (data.type === "ticker") {
      // 3. Send data to the Content Script (the UI on the page)
      broadcastToTabs(data);
    }
  };

  socket.onclose = () => {
    console.log("Socket closed. Retrying in 5s...");
    setTimeout(connectToKalshi, 5000);
  };
}

// Function to send data to any open FanDuel or Kalshi tabs
function broadcastToTabs(stats) {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.url.includes("fanduel.com") || tab.url.includes("kalshi.com")) {
        chrome.tabs.sendMessage(tab.id, { type: "STAT_UPDATE", payload: stats });
      }
    });
  });
}

connectToKalshi();
