chrome.storage.local.get(undefined, res => {
  const paymentFields = document.getElementsByClassName('payment-info');
  const paymentFieldsArray = Array.prototype.slice.call(paymentFields);
  paymentFieldsArray.map((item, i) => {
    if (i < res.paymentData.length) {
      item.value = res.paymentData[i];
    }
  })

  const itemFields = document.getElementsByClassName('item-info');
  const itemFieldsArray = Array.prototype.slice.call(itemFields);
  itemFieldsArray.map((item, i) => {
    if (i < res.itemData.length) {
      item.value = res.itemData[i];
    }
  })
})

const savePaymentInfoButton = document.getElementById('savePaymentInfoButton');
savePaymentInfoButton.onclick = () => {
  const paymentFields = document.getElementsByClassName('payment-info');
  const paymentData = [];

  for (field of paymentFields) {
    paymentData.push(field.value)
  }

  chrome.storage.local.set({paymentData: paymentData});
};

const saveItemInfoButton = document.getElementById('saveItemInfoButton');
saveItemInfoButton.onclick = () => {
  const itemFields = document.getElementsByClassName('item-info');
  const itemData = [];

  for (field of itemFields) {
    itemData.push(field.value)
  }

  chrome.storage.local.set({itemData: itemData});
}

// Format card number
const cardNumber = document.getElementById('cardNumber');
cardNumber.oninput = () => {
  const value = cardNumber.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const matches = value.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];

  for (i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  };

  if (parts.length) cardNumber.value = parts.join(' ');
};
