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
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
