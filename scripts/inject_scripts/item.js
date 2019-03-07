chrome.storage.local.get(undefined, res => {
  const buttons = document.getElementById('add-remove-buttons');
  const sizeSelect = document.getElementById('size');

  if (sizeSelect.type !== 'hidden') {
    for (option of sizeSelect) {
      if (option.innerHTML === res.itemData[1]) {
        sizeSelect.value = option.value
      }
    }
  }
  
  if (buttons.children[0].value === 'add to basket') {
    buttons.children[0].click();
  }
  
  setTimeout(() => {
    const checkoutBtn = document.getElementsByClassName('checkout')[0];
    checkoutBtn.click();
  }, 500)
})