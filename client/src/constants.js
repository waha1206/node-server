// export default {
//   SERVER_ADD_MATERIAL_STORAGE_DATA: 'SERVER_ADD_MATERIAL_STORAGE_DATA'
// }

const constants = {
  SERVER_ADD_LEVEL_ONE_STORAGE_DATA: 'SERVER_ADD_LEVEL_ONE_STORAGE_DATA', // 新增一個倉庫原料管理第一層分類
  SERVER_GET_STORAGE_LEVEL_ONE_DATA: 'SERVER_GET_STORAGE_LEVEL_ONE_DATA', // 取得第一層的所有分類
  SERVER_PUT_STORAGE_LEVEL_ONE_DATA: 'SERVER_PUT_STORAGE_LEVEL_ONE_DATA', // 更新分類資料
  SERVER_ADD_LEVEL_TWO_STORAGE_DATA: 'SERVER_ADD_LEVEL_TWO_STORAGE_DATA', // 新增一個倉庫原料管理第二層分類
  SERVER_GET_STORAGE_LEVEL_TWO_DATA: 'SERVER_GET_STORAGE_LEVEL_TWO_DATA', // 取得第二層的所有分類
  SERVER_PUT_STORAGE_LEVEL_TWO_DATA: 'SERVER_PUT_STORAGE_LEVEL_TWO_DATA', // 更新第二層分類資料
  //
  SERVER_ADD_MATERIAL_STORAGE: 'SERVER_ADD_MATERIAL_STORAGE', // 新增 material storage
  SERVER_PUT_MATERIAL_STORAGE: 'SERVER_PUT_MATERIAL_STORAGE', // 更新 material storage
  SERVER_DELETE_MATERIAL_STORAGE: 'SERVER_DELETE_MATERIAL_STORAGE', // 刪除  material storage
  SERVER_GET_ALL_MATERIAL_STORAGE: 'SERVER_GET_ALL_MATERIAL_STORAGE', // 取得所有 material storage
  SERVER_GET_MATERIAL_STORAGE_BY_MANY_ID: 'SERVER_GET_MATERIAL_STORAGE_BY_MANY_ID', // 根據 id 取得
  SERVER_GET_MATERIAL_STORAGE_BY_LEVEL_TWO_NO_IMG:
    'SERVER_GET_MATERIAL_STORAGE_BY_LEVEL_TWO_NO_IMG', // 根據第二層 id 取得
  SERVER_GET_MATERIAL_STORAGE_IMG_BY_ID: 'SERVER_GET_MATERIAL_STORAGE_IMG_BY_ID', // 一次取得很多的 imgs

  // ----------------------------------- supplier -----------------------------------
  SERVER_GET_ALL_SUPPLIER: 'SERVER_GET_ALL_SUPPLIER', // 取得所有供應商資料
  SERVER_GET_SUPPLIER_CLASS: 'SERVER_GET_SUPPLIER_CLASS', // 取得所有供應商的分類資料

  // ----------------------------------- unit conversation rate -----------------------------------
  SERVER_PUT_UNIT_CONVERSATION_RATE: 'SERVER_PUT_UNIT_CONVERSATION_RATE',
  SERVER_GET_UNIT_CONVERSATION_RATE: 'SERVER_GET_UNIT_CONVERSATION_RATE',
  SERVER_ADD_UNIT_CONVERSATION_RATE: 'SERVER_ADD_UNIT_CONVERSATION_RATE'
}

module.exports = constants
