const API = {
  // material storage 的資料庫 增刪查找
  materialStorage: {
    // 新增一筆 material storage 資料
    addLevelOneClass: {
      url: '/api/material-class/add-storage-level-one-class',
      method: 'post'
    },
    // 新增一筆 material storage 資料
    getAllLevelOneClass: {
      url: '/api/material-class/get-storage-level-one-class',
      method: 'get'
    },
    // 新增一筆 material storage 資料
    putLevelOneClass: {
      url: '/api/material-class/put-storage-level-one-class',
      method: 'put'
    }
  }
}

module.exports = API //這邊用 node 的寫法，mock 才能呼叫
