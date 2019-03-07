chrome.runtime.connect();
// Open a new tab with settings
const settingsButton = document.getElementById('settingsButton');

settingsButton.onclick = () => {
  chrome.tabs.create({url: './../settings.html'});
};

// Start the bot
const startButton = document.getElementById('startButton');

startButton.onclick = () => {
  if (startButton.innerText === 'Запустить бота'.toUpperCase()) {
    startButton.innerText = 'Остановить'.toUpperCase();

    chrome.runtime.sendMessage({
      isStarted: true
    });

    chrome.tabs.reload();
    chrome.tabs.onUpdated.addListener(onUpdatedListener = (undefined, changeInfo) => {
      if (changeInfo.status === 'complete' && !changeInfo.url) {
        chrome.tabs.reload();
      } else if (changeInfo.url) {
        chrome.tabs.onUpdated.removeListener(onUpdatedListener);
      }
    })
  } else {
    startButton.innerText = 'Запустить бота'.toUpperCase();

    chrome.runtime.sendMessage({
      isStarted: false
    });

    chrome.tabs.onUpdated.removeListener(onUpdatedListener);
  }
};