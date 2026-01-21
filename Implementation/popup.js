//Managing Links (popup.js)
//You’ll use chrome.storage.local to save these manual links so they persist even if the user refreshes the page.
// popup.js

async function loadMarkets() {
  const list = document.getElementById('market-list');
  // Fetch active markets stored in the background script
  const { kalshiMarkets } = await chrome.storage.local.get('kalshiMarkets');

  kalshiMarkets.forEach(market => {
    const div = document.createElement('div');
    div.className = 'market-item';
    div.innerHTML = `
      <span>${market.ticker}</span>
      <button class="link-btn" data-ticker="${market.ticker}">Link to Page</button>
    `;
    list.appendChild(div);
  });
}

document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('link-btn')) {
    const ticker = e.target.dataset.ticker;
    
    // Get the current active tab's URL/ID to create a mapping
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Save the manual link: Tab URL -> Kalshi Ticker
    const linkKey = `link_${new URL(tab.url).pathname}`;
    await chrome.storage.local.set({ [linkKey]: ticker });
    
    e.target.innerText = "Linked!";
    e.target.style.background = "#28a745";
  }
});

loadMarkets();
