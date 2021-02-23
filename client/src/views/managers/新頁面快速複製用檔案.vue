<template>
  <div class="materials-manager">
    <el-container>
      <el-header>
        <el-button type="primary" size="small" @click="addGroupLevelOne"
          >新增第一層分類</el-button
        >
        <el-button type="primary" size="small" @click="addGroupLevelTwo"
          >新增第二層分類</el-button
        >
        <el-button type="primary" size="small" @click="addGroupLevelThree"
          >新增原物料容器</el-button
        >
      </el-header>
      <el-main>
        <!-- <el-aside width="100%"> -->
        <el-table
          size="mini"
          :stripe="true"
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.product_name.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
        >
          <!-- 序號 -->
          <el-table-column
            type="index"
            label="序號"
            align="center"
            width="70"
          ></el-table-column>
        </el-table>

        <!-- </el-aside> -->

        <!-- <el-main>Main</el-main> -->
      </el-main>
    </el-container>
    <!-- 分頁 -->
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="my_paginations.page_index"
        :page-size="my_paginations.page_size"
        :page-sizes="my_paginations.page_sizes"
        :total="my_paginations.total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
    <!-- 分頁結束 -->
    <!-- 子元件 -->
    <!-- 子元件結束 -->
  </div>
</template>

<script>
export default {
  name: 'material-group-manager',
  data() {
    return {
      tableData: [],
      levelThreeTableData: [],
      // 控制分頁
      my_paginations: {
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 10, // 每一頁顯示幾條數據
        page_sizes: [5, 10, 15] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      },
      addLevelOneDialog: {
        show: false,
        title: '建立原料組合',
        option: 'edit'
      },
      addLevelTwoDialog: {
        show: false,
        title: '建立原料組合',
        option: 'edit'
      },
      addLevelThreeDialog: {
        show: false,
        title: '建立原料組合',
        option: 'edit'
      }
    }
  },
  components: {
    // GroupLevelOneDialog,
    // GroupLevelTwoDialog,
    // GroupLevelThreeDialog
  },
  methods: {
    // 新增第一層
    addGroupLevelOne() {
      this.addLevelOneDialog = {
        show: true,
        title: '新增加第一層的商品分類組合',
        option: 'add'
      }
    },
    // 新增第二層
    addGroupLevelTwo() {
      this.addLevelTwoDialog = {
        show: true,
        title: '新增加第二層的商品分類組合',
        option: 'add'
      }
    },
    // 新增原物料組合 (這邊是空殼)
    addGroupLevelThree() {
      this.addLevelThreeDialog = {
        show: true,
        title: '新增加第三層的商品組合',
        option: 'add'
      }
    },
    // 分頁設定
    setPaginations() {
      this.my_paginations.total = this.levelThreeTableData.length
      this.my_paginations.page_index = 1
      if (localStorage.material_group_page_size) {
        this.my_paginations.page_size = Number(
          localStorage.material_group_page_size
        )
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.levelThreeTableData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage.material_group_page_size = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.levelThreeTableData.filter((item, index) => {
        return index < page_size
      })
    },
    handleCurrentChange(page) {
      // 獲取當前頁面
      let index = this.my_paginations.page_size * (page - 1)
      // 數據的總數
      let nums = this.my_paginations.page_size * page
      // 容器
      let tables = []
      for (let i = index; i < nums; i++) {
        if (this.levelThreeTableData[i]) {
          tables.push(this.levelThreeTableData[i])
        }
        this.tableData = tables
      }
    }
    // 分頁設定結束
  }
}
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 800px;
  border: 1px solid red;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.pagination {
  text-align: left;
  margin-top: 10px;
}
</style>
