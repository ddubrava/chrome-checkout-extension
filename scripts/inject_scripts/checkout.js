chrome.storage.local.get(undefined, res => {
  const nodeListOrder = document.querySelectorAll('[name^="order"]');
  const arrayOrder = Array.prototype.slice.call(nodeListOrder);
  arrayOrder.splice(4, 2);
  arrayOrder.splice(7, 1);

  arrayOrder.forEach((item, i) => {
    if (i !== 7) item.value = res.paymentData[i];
  });

  const reCaptcha = document.querySelectorAll('.g-recaptcha')[0];
  reCaptcha.remove();

  const nodeListCard = document.querySelectorAll('[name^="credit"]');
  const arrayCard = Array.prototype.slice.call(nodeListCard);
  
  let paymentIndex = 7;
  arrayCard.forEach(item => {
    item.value = res.paymentData[paymentIndex++];
  });
  
  document.querySelectorAll('.iCheck-helper')[1].click();

  setInterval(() => {
    const checkoutButton = document.querySelectorAll('.checkout')[0];
    checkoutButton.click();
  }, 200);
});

