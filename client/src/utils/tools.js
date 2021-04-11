function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

function appendZero(obj) {
  if (obj < 10) return '0' + '' + obj
  else return obj
}

function appendTwoZero(obj) {
  if (obj < 10) return '00' + '' + obj
  else if (obj < 100) return '0' + '' + obj
  else return obj
}

// 把正整數的千位數字加上 逗號  另外自定義 前面的前綴符號 例如 $ 可任意取代
function appendComma(symbol, int) {
  return (
    `${symbol} ` +
    parseFloat(int)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
  )
}

// 複製傳入的 value 等同於 ctrl + c 的功能
function copyValueToWindow(value) {
  var oInput = document.createElement('input') //建立一個隱藏input（重要！）
  oInput.value = value //賦值
  document.body.appendChild(oInput)
  oInput.select() // 選擇物件
  document.execCommand('Copy') // 執行瀏覽器複製命令
  oInput.className = 'oInput'
  oInput.style.display = 'none'
}

export { copyValueToWindow, appendComma, isEmpty, appendZero, appendTwoZero }
