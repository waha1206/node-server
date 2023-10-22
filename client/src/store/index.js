import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// 引入 API 統一 constants.js 裡面定義去跟資料庫要資料的對應方式
import API from '../api'
// 導入全局變量
import _M from '../constants'

Vue.use(Vuex)

const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否通過認證
  SET_USER: 'SET_USER', // 用户信息
  UPDATE_PERMISSIOM_LIST: 'UPDATE_PERMISSION_LIST' // 設定使用者的權限
}

const state = {
  // 需要维护的状态
  isAutnenticated: false, // 是否认证
  user: {}, // 存储用户信息
  permissionList: []
}

const getters = {
  isAutnenticated: (state) => state.isAutnenticated,
  user: (state) => state.user,
  permissionList: (state) => state.permissionList
}

// 注意 store.dispath 這個是可以使用異步函數，而Mutation 則為同步函數

const mutations = {
  [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
    if (isAutnenticated) state.isAutnenticated = isAutnenticated
    else state.isAutnenticated = false
  },
  [types.SET_USER](state, user) {
    if (user) state.user = user
    else state.user = {}
  },
  [types.UPDATE_PERMISSIOM_LIST](state, payload) {
    state.permissionList = payload
  }
}

// 異部的提交要放這邊
// Action 提交的是 mutation，而不是直接改變狀態
// Action 可以包含任何異步動作
// Action 透過 store.dispach 方法觸發
const actions = {
  setIsAutnenticated: ({ commit }, isAutnenticated) => {
    commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_IS_AUTNENTIATED, false)
    commit(types.SET_USER, null)
    // 把權限也清除掉
    commit(types.UPDATE_PERMISSIOM_LIST, null)
  },
  getPermissionList: async ({ state, commit }) => {
    // 先防止重複提取
    if (state.permissionList.length) return
    if (!state.isAutnenticated) return
    // 跟資料庫要資料，返回的值為 res.data.permission.permission_list
    await axios
      .post('/api/user/permission', { _id: state.user.id })
      .then((res) => {
        // 提交到 state.permissionList
        commit(types.UPDATE_PERMISSIOM_LIST, res.data.permission.permission_list)
      })
      .catch((err) => {
        console.log('routerindex.js 獲取 permission 失敗', err)
      })
  },

  // --------------------- storage material ---------------------
  // 新增一筆 storage level one class 資料
  async [_M.SERVER_ADD_LEVEL_ONE_STORAGE_DATA]({}, materialStorageLevelOneData) {
    return await axios({
      // baseURL: 'http://localhost:8080/',
      method: API.materialStorage.addLevelOneClass.method,
      url: API.materialStorage.addLevelOneClass.url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        materialStorageLevelOneData
      }
    })
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log('error :', error)
        console.log('新增資料出現異常！ SERVER_ADD_LEVEL_ONE_STORAGE_DATA')
        return error
      })
  },

  // 取得所有的 storage level one class 資料
  async [_M.SERVER_GET_STORAGE_LEVEL_ONE_DATA]({}) {
    return await axios({
      // baseURL: 'http://127.0.0.1:5000/',
      method: API.materialStorage.getAllLevelOneClass.method,
      url: API.materialStorage.getAllLevelOneClass.url,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log('error :', error)
        console.log('讀取資料出現異常！ SERVER_GET_STORAGE_LEVEL_ONE_DATA')
        return error
      })
  },

  // 取得所有的 storage level one class 資料
  async [_M.SERVER_PUT_STORAGE_LEVEL_ONE_DATA]({}, materialStorageLevelOneData) {
    return await axios({
      // baseURL: 'http://127.0.0.1:5000/',
      method: API.materialStorage.putLevelOneClass.method,
      url: API.materialStorage.putLevelOneClass.url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        materialStorageLevelOneData
      }
    })
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log('error :', error)
        console.log('讀取資料出現異常！ SERVER_PUT_STORAGE_LEVEL_ONE_DATA')
        return error
      })
  },

  // 新增一筆 storage level two class 資料
  async [_M.SERVER_ADD_LEVEL_TWO_STORAGE_DATA]({}, materialStorageLevelTwoData) {
    return await axios({
      // baseURL: 'http://localhost:8080/',
      method: API.materialStorage.addLevelTwoClass.method,
      url: API.materialStorage.addLevelTwoClass.url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        materialStorageLevelTwoData
      }
    })
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log('error :', error)
        console.log('新增資料出現異常！ SERVER_ADD_LEVEL_TWO_STORAGE_DATA')
        return error
      })
  },

  // 取得所有的 storage level two class 資料
  async [_M.SERVER_GET_STORAGE_LEVEL_TWO_DATA]({}) {
    return await axios({
      // baseURL: 'http://127.0.0.1:5000/',
      method: API.materialStorage.getAllLevelTwoClass.method,
      url: API.materialStorage.getAllLevelTwoClass.url,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log('error :', error)
        console.log('讀取資料出現異常！ SERVER_GET_STORAGE_LEVEL_TWO_DATA')
        return error
      })
  },

  // 取得所有的 storage level one class 資料
  async [_M.SERVER_PUT_STORAGE_LEVEL_TWO_DATA]({}, materialStorageLevelTwoData) {
    return await axios({
      // baseURL: 'http://127.0.0.1:5000/',
      method: API.materialStorage.putLevelTwoClass.method,
      url: API.materialStorage.putLevelTwoClass.url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        materialStorageLevelTwoData
      }
    })
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log('error :', error)
        console.log('讀取資料出現異常！ SERVER_PUT_STORAGE_LEVEL_TWO_DATA')
        return error
      })
  },

  // ----------------------------------- material storage -----------------------------------
  // 新增一筆 material storage 資料
  async [_M.SERVER_ADD_MATERIAL_STORAGE]({}, materialStorageData) {
    return await axios({
      baseURL: process.env.server_url,
      method: API.materialStorage.addMaterialStorage.method,
      url: API.materialStorage.addMaterialStorage.url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        materialStorageData
      }
    })
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log('error :', error)
        console.log('新增資料出現異常！ SERVER_ADD_MATERIAL_STORAGE')
        return error
      })
  },

  // 修改 material storage 資料
  async [_M.SERVER_PUT_MATERIAL_STORAGE]({}, materialStorageData) {
    return await axios({
      baseURL: process.env.server_url,
      method: API.materialStorage.putMaterialStorage.method,
      url: API.materialStorage.putMaterialStorage.url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        materialStorageData
      }
    })
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log('error :', error)
        console.log('讀取資料出現異常！ SERVER_PUT_MATERIAL_STORAGE')
        return error
      })
  },

  // 依據 material storage _id 刪除該筆訂單
  async [_M.SERVER_DELETE_MATERIAL_STORAGE]({}, materialStorageId) {
    return await axios({
      baseURL: process.env.server_url,
      method: API.materialStorage.deleteAllMaterialStorage.method,
      url: API.materialStorage.deleteAllMaterialStorage.url + `/${materialStorageId}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((data) => {
        // 這邊傳會刪除掉的資料 200 有可能是刪除成功，也有可能是顯示禁止刪除
        return data
      })
      .catch((error) => {
        console.log(error)
        console.log('刪除倉庫原料資料錯誤！ SERVER_DELETE_MATERIAL_STORAGE')
        return error
      })
  },

  // 取得所有的 material storage 資料
  async [_M.SERVER_GET_ALL_MATERIAL_STORAGE]({}) {
    return await axios({
      baseURL: process.env.server_url,
      method: API.materialStorage.getAllMaterialStorage.method,
      url: API.materialStorage.getAllMaterialStorage.url,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log('error :', error)
        console.log('讀取資料出現異常！ SERVER_GET_ALL_MATERIAL_STORAGE')
        return error
      })
  },

  // 根據 manyId [_id1, _id2, _id3 ...] material storage 資料
  async [_M.SERVER_GET_MATERIAL_STORAGE_BY_MANY_ID]({}, arrayManyId) {
    return await axios({
      baseURL: process.env.server_url,
      method: API.materialStorage.getMaterialStorageByManyId.method,
      url: API.materialStorage.getMaterialStorageByManyId.url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        arrayManyId
      }
    })
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log('error :', error)
        console.log('讀取資料出現異常！ SERVER_GET_MATERIAL_STORAGE_BY_MANY_ID')
        return error
      })
  },

  // 依據 level two class id 取得 material storage 比對的欄位為 level_two_id
  async [_M.SERVER_GET_MATERIAL_STORAGE_BY_LEVEL_TWO_NO_IMG]({}, levelTwoClassId) {
    return await await axios({
      baseURL: process.env.server_url,
      method: API.materialStorage.getMaterialStorageByLevelTwo.method,
      url: API.materialStorage.getMaterialStorageByLevelTwo.url + `/${levelTwoClassId}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((data) => {
        // 這邊傳會刪除掉的資料 200 有可能是刪除成功，也有可能是顯示禁止刪除
        return data
      })
      .catch((error) => {
        console.log(error)
        console.log(
          '讀取第二層資料錯誤！ SERVER_GET_MATERIAL_STORAGE_BY_LEVEL_TWO_NO_IMG'
        )
        return error
      })
  },

  // material storage 透過 material._id 取得 imgs
  async [_M.SERVER_GET_MATERIAL_STORAGE_IMG_BY_ID]({}, id) {
    return await axios({
      method: API.materialStorage.getMaterialStorageImgById.method,
      url: API.materialStorage.getMaterialStorageImgById.url + `/${id}`,
      baseURL: process.env.server_url,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((data) => {
        // commit(_M.SET_MATERIALS_DATA, data.data)
        return data.data
      })
      .catch((error) => {
        console.log(error)
        console.log('SERVER_GET_MATERIAL_STORAGE_IMG_BY_ID')
      })
  },

  // ----------------------------------- material storage end -----------------------------------

  // ----------------------------------- supplier and supplier class -----------------------------------
  // SERVER 開頭的就是不會經過 store 存資料 這邊是取得所有供應商的資料
  async [_M.SERVER_GET_ALL_SUPPLIER]({ commit }) {
    return await axios({
      baseURL: process.env.server_url,
      method: API.supplier.getAllSupplier.method,
      url: API.supplier.getAllSupplier.url,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        console.log('supplier.js - SERVER_GET_ALL_SUPPLIER')
        return error.response
      })
  },

  // SERVER 開頭的就是不會經過 store 存資料 這邊是取得所有供應商分類的資料
  async [_M.SERVER_GET_SUPPLIER_CLASS]({}) {
    return await axios({
      baseURL: process.env.server_url,
      method: API.supplier.getSupplierClass.method,
      url: API.supplier.getSupplierClass.url,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        console.log('supplier.js - SERVER_GET_SUPPLIER_CLASS')
        return error.response
      })
  }
  // ----------------------------------- supplier end -----------------------------------
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
