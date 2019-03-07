let injectListener;

chrome.runtime.onMessage.addListener(request => {
  if (request.isStarted === true) {
    chrome.tabs.onUpdated.addListener(injectListener = (undefined, changeInfo) => {
      if (!changeInfo.url) {
        chrome.tabs.executeScript({
          file: './scripts/inject_scripts/all.js'
        });
      }

      if (changeInfo.title && changeInfo.title.includes('Supreme: ')) {
        chrome.tabs.executeScript({
          file: './scripts/inject_scripts/item.js'
        });
      } else if (changeInfo.title && changeInfo.title === ('Supreme')) {
        chrome.tabs.executeScript({
          file: './scripts/inject_scripts/checkout.js'
        });
      }
    });
  } else {
    chrome.tabs.onUpdated.removeListener(injectListener);
  }
});

chrome.runtime.onConnect.addListener(port => {
  port.onDisconnect.addListener(() => {
    chrome.tabs.onUpdated.removeListener(injectListener);
  })
})