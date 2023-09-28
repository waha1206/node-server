const API = {
  // material storage 的資料庫 增刪查找
  materialStorage: {
    // 新增一筆 material storage 資料
    addNewData: {
      url: '/api/material-storage/add-data',
      method: 'post'
    }
  }
}

module.exports = API //這邊用 node 的寫法，mock 才能呼叫
