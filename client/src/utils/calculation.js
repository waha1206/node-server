import store from '../store'

/** Array<string> < 陣列裡面的數值都是字串的意思
 * 計算墨水的使用成本
 * @param {<int>,<int>,<int>,<int>} fnBestLayout - 要判斷的權限列表
 */

// 選擇最好的排版方式 回傳值 使用了幾才的布料
function fnBestLayout(
  layoutWidth,
  layoutHeight,
  clothWidth,
  orderValue,
  returnType
) {
  // 邏輯
  // 布料幅寬 / 版型 寬 或 高 = 布寬可以放幾個版型 需要取 floor - 接近的最小整數
  // 訂購數量 / 布寬可以放幾個的版型  =  排版會有幾列 需要取 ceil - 接近的最大整數
  // 排版會有幾列再乘上另一邊的尺寸 = 這個容器的長度
  // 容器的長度乘上幅寬 = 總面積 除以 900 = 才積
  // obj = { cloth_length , cloth_area ,  row_number, loss_percentage}
  const obj = {}
  obj.cloth_length = // 這個是布料的長度
    Math.ceil(orderValue / Math.floor(clothWidth / layoutWidth)) * layoutHeight
  console.log('使用布料長度：', obj.cloth_length, ' 公分')
  obj.cloth_area = // 這個是布料的才積
    (Math.ceil(orderValue / Math.floor(clothWidth / layoutWidth)) *
      layoutHeight *
      150) /
    900
  // 橫向可以排幾個？
  obj.row_number = Math.floor(clothWidth / layoutWidth)
  obj.loss_percentage = (
    ((clothWidth - Math.floor(clothWidth / layoutWidth) * layoutWidth) /
      clothWidth) *
    100
  ).toFixed(2)

  let result =
    '布料使用了：' +
    obj.cloth_length +
    ' 公分，' +
    '版型寬：' +
    layoutWidth +
    '，可以排' +
    obj.row_number +
    ' 個，' +
    '耗損率：' +
    obj.loss_percentage +
    '%'

  return returnType === 'string' ? result : obj
}
/** Array<string> < 陣列裡面的數值都是字串的意思
 * 計算墨水的使用成本
 * @param {<string>,<string>,<string>} getInkCost - 要判斷的權限列表
 */
function getInkCost(patternWidth, clothHeight, inkCost) {
  let cost = 0
  return cost
}

function getClothCost(clothWidth, clothHeight) {}

export { fnBestLayout }
