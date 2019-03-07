chrome.storage.local.get(undefined, res => {
  const items = document.getElementsByClassName('name-link');
  const selectedCloth = {
    name: res.itemData[0],
    color: res.itemData[2]
  }
  
  for (let i = 0; i < items.length - 1; i += 2) {
    if (items[i].text.includes(selectedCloth.name) && items[i + 1].text.includes(selectedCloth.color)) {
      items[i].click();
    }
  }
});

