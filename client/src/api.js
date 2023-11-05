const API = {
  // material storage 的資料庫 增刪查找
  materialStorage: {
    // 新增一筆 第一層 資料
    addLevelOneClass: {
      url: '/api/material-class/add-storage-level-one-class',
      method: 'post'
    },
    // 取得所有的第一層資料
    getAllLevelOneClass: {
      url: '/api/material-class/get-storage-level-one-class',
      method: 'get'
    },
    // 修改第一層的資料
    putLevelOneClass: {
      url: '/api/material-class/put-storage-level-one-class',
      method: 'put'
    },
    // 新增一筆 第二層 資料
    addLevelTwoClass: {
      url: '/api/material-class/add-storage-level-two-class',
      method: 'post'
    },
    // 取得所有第二層的資料
    getAllLevelTwoClass: {
      url: '/api/material-class/get-storage-level-two-class',
      method: 'get'
    },
    // 修改第二層的資料
    putLevelTwoClass: {
      url: '/api/material-class/put-storage-level-two-class',
      method: 'put'
    },
    // 新增 material storage
    addMaterialStorage: {
      url: '/api/material/add-material-storage',
      method: 'post'
    },
    // 修改 material storage
    putMaterialStorage: {
      url: '/api/material/put-material-storage',
      method: 'put'
    },
    // 刪除 material storage
    deleteAllMaterialStorage: {
      url: '/api/material/delete-material-storage',
      method: 'delete'
    },
    // 取得所有 material storage
    getAllMaterialStorage: {
      url: '/api/material/get-all-material-storage',
      method: 'get'
    },
    // 根據 _id 取得 material storage [_id1, _id2, _id3, _id4 ...]
    getMaterialStorageByManyId: {
      url: '/api/material/get-material-storage-by-many-id',
      method: 'post'
    },
    // 根據 class two _id 取得 material storage
    getMaterialStorageByLevelTwo: {
      url: '/api/material/get-material-storage-by-level-two-no-imgs',
      method: 'get'
    },
    // 透過 _id 取得 material storage 的 img (只回傳 imgs 喔)
    getMaterialStorageImgById: {
      url: '/api/material/get-material-storage-img-by-id',
      method: 'get'
    },

    // ----------- unit conversation rate
    // 透過 _id 取得 material storage 的 img (只回傳 imgs 喔)
    addUnitConversationRate: {
      url: '/api/material/add-unit-conversation-rate',
      method: 'post'
    },
    // 透過 _id 取得 material storage 的 img (只回傳 imgs 喔)
    putUnitConversationRate: {
      url: '/api/material/put-unit-conversation-rate',
      method: 'put'
    },
    // 透過 _id 取得 material storage 的 img (只回傳 imgs 喔)
    getUnitConversationRate: {
      url: '/api/material/get-unit-conversation-rate',
      method: 'get'
    }
  },

  // supplier ----------------------------------------
  supplier: {
    // 取得所有供應商資料
    getAllSupplier: {
      url: '/api/supplier',
      method: 'get'
    },
    // 取得所有供應商的分類
    getSupplierClass: {
      url: '/api/supplier-class',
      method: 'get'
    }
  }
}

module.exports = API //這邊用 node 的寫法，mock 才能呼叫
