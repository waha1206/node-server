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
export { includePermission }
