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
    }
  }
}

module.exports = API //這邊用 node 的寫法，mock 才能呼叫
