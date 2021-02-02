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
      <el-container>
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

          <!-- 搜尋欄位、編輯與刪除的按扭 -->
          <!-- 搜尋欄位 -->
          <el-table-column align="center" width="150">
            <!-- header 代表放到列的說明文字那邊 -->
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="輸入關鍵字搜尋"
              />
            </template>
            <!-- slot 崁入兩個按鈕 -->
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEditGroupMember(scope.$index, scope.row)"
                >編輯</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteGroupMember(scope.$index, scope.row)"
                >刪除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- </el-aside> -->

        <!-- <el-main>Main</el-main> -->
      </el-container>
    </el-container>
    <!-- v-if="false" -->
    <GroupLevelOneDialog
      v-if="groupLevelOneData[0]"
      :dialog="addLevelOneDialog"
      :formData="levelOneData"
      :groupLevelOneData="groupLevelOneData"
      @update="getGroupLevelOneData"
    ></GroupLevelOneDialog>
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
import GroupLevelOneDialog from '../../components/MaterialGroupManager/GroupLevelOneDialog'

export default {
  name: 'material-group-manager',
  data() {
    return {
      search: '',
      tableData: [],
      groupLevelOneData: [], // 這個是讀取伺服器傳回來的陣列

      // 這個是 form 表單，內建了schema
      levelOneData: {
        type: '',
        name: ''
      },
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
        title: '新增加第一層的商品分類組合',
        option: 'edit',
        level: 1
      },
      addLevelTwoDialog: {
        show: false,
        title: '建立原料組合',
        option: 'edit',
        level: 2
      },
      addLevelThreeDialog: {
        show: false,
        title: '建立原料組合',
        option: 'edit',
        level: 3
      }
    }
  },
  created() {
    this.getGroupLevelOneData()
  },
  components: {
    GroupLevelOneDialog
    // GroupLevelTwoDialog,
    // GroupLevelThreeDialog
  },
  methods: {
    getGroupLevelOneData() {
      this.$axios
        .get('/api/material-group/one/')
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.groupLevelOneData = res.data
          console.log(res.data)
          // 設置分頁數據
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 新增第一層
    addGroupLevelOne() {
      this.addLevelOneDialog = {
        show: true,
        title: '新增加第一層的商品分類組合',
        option: 'add',
        level: 1
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
    // 編輯與刪除 第三層 group member
    handleEditGroupMember() {},
    handleDeleteGroupMember() {},
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
