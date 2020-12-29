<template>
  <div class="fillcontainer">
    <div>
      <!-- 要綁定時間的值，不然會獲取不到 :model="search_data" -->
      <el-form :inline="true" ref="add_data" :model="search_data">
        <el-form-item class="btnRight" icon="view">
          <el-button
            type="primary"
            size="small"
            @click="handleAdd"
            v-if="user.identity == 'manager'"
            >原物料新增</el-button
          >
        </el-form-item>
        <!-- 時間篩選 -->
        <el-form-item label="按時間篩選">
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="選擇開始時間"
          >
          </el-date-picker>
          --
          <el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            placeholder="選擇結束時間"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="search"
            @click="handleSearch"
            >篩選</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        :stripe="true"
        v-if="tableData.length > 0"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="index" label="序號" align="center" width="70">
        </el-table-column>
        <el-table-column
          prop="date"
          label="建檔時間"
          align="center"
          width="250"
          sortable
        >
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
            <span style="margin-left: 10px">{{ getDate(scope.row.date) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="原料類別"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="describe"
          label="原料名稱"
          align="center"
          width="300"
        >
        </el-table-column>
        <el-table-column prop="income" label="進價" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="售價" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#f56767">- {{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="毛利" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="備註" align="center" width="220">
        </el-table-column>
        <!-- <el-table-column
          prop="operation"
          align="center"
          label="操作"
          fixed="right"
          width="180"
        >
        </el-table-column> -->
        <el-table-column
          prop="operation"
          label="操作"
          width="220"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="edit"
              size="small"
              v-if="user.identity == 'manager'"
              @click="handleEdit(scope.row)"
              >編輯</el-button
            >
            <el-button
              type="danger"
              icon="delete"
              size="small"
              v-if="user.identity == 'manager'"
              @click="handleDelete(scope.row)"
              >刪除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
    </div>
    <MyDialog
      :dialog="dialog"
      :formData="formData"
      @update="getProfile"
    ></MyDialog>
  </div>
</template>
<script>
import MyDialog from '../components/FundList/MyDialog'
import { MessageBox } from 'element-ui'

export default {
  name: 'fundlist',
  data() {
    return {
      search_data: {
        startTime: '',
        endTime: ''
      },
      filterTableData: [],
      my_paginations: {
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 10, // 每一頁顯示幾條數據
        page_sizes: [5, 10] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      },
      tableData: [],
      allTableData: [],
      formData: {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      },
      dialog: {
        show: false,
        title: '',
        option: 'edit'
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    // 時間轉換
    getDate(dt) {
      return this.$moment(dt).format('YYYY年MM月DD日 - HH：mm')
    },
    // 頁碼
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據

      localStorage.page_size = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.allTableData.filter((item, index) => {
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
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i])
        }
        this.tableData = tables
      }
    },
    // 獲取我們的表格數據
    getProfile() {
      this.$axios
        .get('/api/profiles')
        .then((res) => {
          // console.log('views/FundList.vue', res)
          this.allTableData = res.data
          this.filterTableData = res.data
          // 設置分頁數據
          this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    setPaginations() {
      // 分頁屬性設置
      this.my_paginations.total = this.allTableData.length
      this.my_paginations.page_index = 1
      if (localStorage.page_size) {
        this.my_paginations.page_size = Number(localStorage.page_size)
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    handleEdit(row) {
      // 從 編輯的按鈕點進去，因為要達成共用，所以這邊修改 dialog 的內容
      this.dialog = {
        show: true,
        title: '原物料編輯',
        option: 'edit'
      }

      this.formData = {
        type: row.type,
        income: row.income,
        cash: row.cash,
        describe: row.describe,
        expend: row.expend,
        remark: row.remark,
        id: row._id
      }
    },
    handleDelete(row) {
      MessageBox.confirm(
        '注意！資料刪除會不可挽回！請確認此資料無其他應用！',
        '嚴重警告！！！'
      )
        .then(() => {
          this.$axios.delete(`/api/profiles/delete/${row._id}`).then((res) => {
            this.$message('刪除成功！')
            this.getProfile()
          })
        })
        .catch(() => {
          this.$message('您取消刪除了～鬆一口氣')
        })
    },
    handleAdd(index, row) {
      this.dialog = {
        show: true,
        title: '原物料新增',
        option: 'add'
      }

      this.formData = {
        type: '',
        income: '',
        cash: '',
        describe: '',
        expend: '',
        remark: '',
        id: ''
      }
      // this.dialog.show = true
    },
    handleSearch() {
      // 篩選
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: 'warning',
          message: '請選擇時間區間'
        })
        this.getProfile()
      }
      const sTime = this.search_data.startTime.getTime()
      const eTime = this.search_data.endTime.getTime()

      this.allTableData = this.filterTableData.filter((item) => {
        let date = new Date(item.date)
        let time = date.getTime()
        return time >= sTime && time <= eTime
      })

      // 分頁數據
      this.setPaginations()
    }
  },
  components: {
    MyDialog
  }
}
</script>
<style scoped>
.fillcontainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: left;
}
.pagination {
  text-align: left;
  margin-top: 10px;
}
</style>
