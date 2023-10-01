const API = {
  // material storage 的資料庫 增刪查找
  materialStorage: {
    // 新增一筆 material storage 資料
    addLevelOneData: {
      url: '/api/material-class/add-storage-level-one-class',
      method: 'post'
    },
    // 新增一筆 material storage 資料
    getAllLevelOneData: {
      url: '/api/material-class/get-storage-level-one-class',
      method: 'get'
    }
  }
}

module.exports = API //這邊用 node 的寫法，mock 才能呼叫
