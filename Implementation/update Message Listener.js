//Updated Message Listener

//Finally, here is how you use it inside your chrome.runtime.onMessage listener to handle the matching:

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "KALSHI_UPDATE") {
    const kalshiMarket = message.payload.title;
    const teamElements = document.querySelectorAll('.team-name-class'); // Adjust selector for FanDuel
    
    Array.from(teamElements).forEach(el => {
      const teamName = el.innerText;
      const score = getSimilarity(teamName, kalshiMarket);

      // Log for debugging visibility
      console.log(`Comparing [${teamName}] to [${kalshiMarket}] | Score: ${score.toFixed(2)}`);

      if (score > 0.7) {
        updateOverlay(message.payload.price);
      }
    });
  }
  return true;
});
