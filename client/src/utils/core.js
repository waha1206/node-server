import store from '../store'

/** Array<string> < 陣列裡面的數值都是字串的意思
 * 計算墨水的使用成本
 * @param {<string>,<string>,<string>} getInkCost - 要判斷的權限列表
 */
function getInkCost(patternWidth, clothHeight, inkCost) {
  let cost = 0
  return cost
}

function getClothCost(clothWidth, clothHeight) {}

// @/utils/permission
/**
 * 創建重定向函數
 * @param {Object} redirect - 重定向對象
 * @param {string} redirect.name - 重定向的組件名稱
 * @param {Array<any>} children - 子列表
 */
function createRedirectFn(redirect = {}, children = []) {
  // 避免緩存太大，只保留 children 的 name 和 permissions
  const permissionChildren = children.map(
    ({ name = '', meta: { permissions = [] } = {} }) => ({ name, permissions })
  )
  return function(to) {
    // 這裏一定不能在 return 的函數外面篩選，因為權限是異步獲取的
    const hasPermissionChildren = permissionChildren.filter((item) =>
      includePermission(item.permissions)
    )
    // 默認填寫的重定向的 name
    const defaultName = redirect.name || ''
    // 如果默認重定向沒有權限，則從 children 中選擇第一個有權限的路由做重定向
    const firstPermissionName = (hasPermissionChildren[0] || { name: '' }).name
    // 判斷是否需要修改默認的重定向
    const saveDefaultName = !!hasPermissionChildren.find(
      (item) => item.name === defaultName && defaultName
    )
    if (saveDefaultName) return { name: defaultName }
    else return firstPermissionName ? { name: firstPermissionName } : redirect
  }
}

export { includePermission, createRedirectFn }
