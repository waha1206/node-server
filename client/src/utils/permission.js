import store from '../store'

/**
 * 判斷是否擁有權限
 * @param {Array<string>} permissions - 要判斷的權限列表
 */
function includePermission(permissions = []) {
  // 這裏要判斷的權限沒有設置的話，就等於不需要權限，直接返回 true
  if (!permissions.length) return true
  const permissionList = store.state.permissionList
  return !!permissions.find((permission) => permissionList.includes(permission))
}

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
