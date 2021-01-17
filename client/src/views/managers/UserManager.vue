<template>
  <div class="materials-manager">
    <el-container>
      <el-header>
        <el-button type="primary" size="small" @click="handleAddUser"
          >新增使用者</el-button
        >
        <el-button type="primary" size="small">我只是按鈕</el-button>
      </el-header>
    </el-container>
    <!-- 表單 -->
    <el-container>
      <!-- <el-aside width="100%"> -->
      <el-table
        size="mini"
        :stripe="true"
        :data="
          tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
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
        <!-- 使用者名稱 -->
        <el-table-column label="使用者名稱" prop="name" align="left" width="80">
        </el-table-column>
        <!-- e-mail -->
        <el-table-column label="e-mail" prop="email" align="center" width="180">
        </el-table-column>

        <!-- 權限 -->
        <el-table-column
          label="權限"
          prop="identity"
          align="center"
          width="100"
        >
        </el-table-column>
        <!-- 帳號啟用 -->
        <el-table-column label="啟用" align="center" width="60">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.activated" type="" size="mini"
              >已啟用</el-tag
            >
            <el-tag v-else type="warning" size="mini">未啟用</el-tag>
          </template>
        </el-table-column>

        <!-- 供應商權限 -->
        <el-table-column label="供應商權限" align="center" width="90">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.permission.supplier_authority.inquire"
              type=""
              size="mini"
              >O讀</el-tag
            >
            <el-tag v-else type="warning" size="mini">X讀</el-tag>
            &nbsp
            <el-tag
              v-if="scope.row.permission.supplier_authority.edit"
              type=""
              size="mini"
              >O寫</el-tag
            >
            <el-tag v-else type="warning" size="mini">X寫</el-tag>
          </template>
        </el-table-column>
        <!-- 原物料權限 -->
        <el-table-column label="原物料權限" align="center" width="90">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.permission.material_authority.inquire"
              type=""
              size="mini"
              >O讀</el-tag
            >
            <el-tag v-else type="warning" size="mini">X讀</el-tag>
            &nbsp
            <el-tag
              v-if="scope.row.permission.material_authority.edit"
              type=""
              size="mini"
              >O寫</el-tag
            >
            <el-tag v-else type="warning" size="mini">X寫</el-tag>
          </template>
        </el-table-column>
        <!-- 使用者管理 -->
        <el-table-column label="使用者權限" align="center" width="90">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.permission.user_authority.inquire"
              type=""
              size="mini"
              >O讀</el-tag
            >
            <el-tag v-else type="warning" size="mini">X讀</el-tag>
            &nbsp
            <el-tag
              v-if="scope.row.permission.user_authority.edit"
              type=""
              size="mini"
              >O寫</el-tag
            >
            <el-tag v-else type="warning" size="mini">X寫</el-tag>
          </template>
        </el-table-column>
        <!-- 客戶管理 -->
        <el-table-column label="客戶管理" align="center" width="90">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.permission.customer_authority.inquire"
              type=""
              size="mini"
              >O讀</el-tag
            >
            <el-tag v-else type="warning" size="mini">X讀</el-tag>
            &nbsp
            <el-tag
              v-if="scope.row.permission.customer_authority.edit"
              type=""
              size="mini"
              >O寫</el-tag
            >
            <el-tag v-else type="warning" size="mini">X寫</el-tag>
          </template>
        </el-table-column>
        <!-- 報價單管理 -->
        <el-table-column label="報價單管理" align="center" width="90">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.permission.quotation_authority.inquire"
              type=""
              size="mini"
              >O讀</el-tag
            >
            <el-tag v-else type="warning" size="mini">X讀</el-tag>
            &nbsp
            <el-tag
              v-if="scope.row.permission.quotation_authority.edit"
              type=""
              size="mini"
              >O寫</el-tag
            >
            <el-tag v-else type="warning" size="mini">X寫</el-tag>
          </template>
        </el-table-column>
        <!-- 大圖輸出 -->
        <el-table-column label="大圖輸出" align="center" width="90">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.permission.print_authority.inquire"
              type=""
              size="mini"
              >O讀</el-tag
            >
            <el-tag v-else type="warning" size="mini">X讀</el-tag>
            &nbsp
            <el-tag
              v-if="scope.row.permission.print_authority.edit"
              type=""
              size="mini"
              >O寫</el-tag
            >
            <el-tag v-else type="warning" size="mini">X寫</el-tag>
          </template>
        </el-table-column>
        <!-- 布料轉印 -->
        <el-table-column label="布料轉印" align="center" width="90">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.permission.sublimation_authority.inquire"
              type=""
              size="mini"
              >O讀</el-tag
            >
            <el-tag v-else type="warning" size="mini">X讀</el-tag>
            &nbsp
            <el-tag
              v-if="scope.row.permission.sublimation_authority.edit"
              type=""
              size="mini"
              >O寫</el-tag
            >
            <el-tag v-else type="warning" size="mini">X寫</el-tag>
          </template>
        </el-table-column>
        <!-- 配送管理 -->
        <el-table-column label="配送管理" align="center" width="90">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.permission.delivery_authority.inquire"
              type=""
              size="mini"
              >O讀</el-tag
            >
            <el-tag v-else type="warning" size="mini">X讀</el-tag>
            &nbsp
            <el-tag
              v-if="scope.row.permission.delivery_authority.edit"
              type=""
              size="mini"
              >O寫</el-tag
            >
            <el-tag v-else type="warning" size="mini">X寫</el-tag>
          </template>
        </el-table-column>
        <!-- 會計系統 -->
        <el-table-column label="會計系統" align="center" width="90">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.permission.accounting_authority.inquire"
              type=""
              size="mini"
              >O讀</el-tag
            >
            <el-tag v-else type="warning" size="mini">X讀</el-tag>
            &nbsp
            <el-tag
              v-if="scope.row.permission.accounting_authority.edit"
              type=""
              size="mini"
              >O寫</el-tag
            >
            <el-tag v-else type="warning" size="mini">X寫</el-tag>
          </template>
        </el-table-column>
        <!-- 商品建構 -->
        <el-table-column label="商品建構" align="center" width="90">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.permission.product_authority.inquire"
              type=""
              size="mini"
              >O讀</el-tag
            >
            <el-tag v-else type="warning" size="mini">X讀</el-tag>
            &nbsp
            <el-tag
              v-if="scope.row.permission.product_authority.edit"
              type=""
              size="mini"
              >O寫</el-tag
            >
            <el-tag v-else type="warning" size="mini">X寫</el-tag>
          </template>
        </el-table-column>
        <!-- 加工系統 -->
        <el-table-column label="加工系統" align="center" width="90">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.permission.process_authority.inquire"
              type=""
              size="mini"
              >O讀</el-tag
            >
            <el-tag v-else type="warning" size="mini">X讀</el-tag>
            &nbsp
            <el-tag
              v-if="scope.row.permission.process_authority.edit"
              type=""
              size="mini"
              >O寫</el-tag
            >
            <el-tag v-else type="warning" size="mini">X寫</el-tag>
          </template>
        </el-table-column>
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
              @click="handleEditUser(scope.$index, scope.row)"
              >編輯</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteUser(scope.$index, scope.row)"
              >刪除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <!-- 表單結束 -->
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

    <!-- UserEditDialog 插件開始 -->
    <!-- v-if="userEditFormData !== undefined && userEditFormData.length > 0" -->
    <UserEditDialog
      v-if="userEditFormData[0] !== 'undefined'"
      :dialog="userDialog"
      :formData="userEditFormData"
      :allUserNameId="allUserNameId"
      @update="getAllUserData"
    ></UserEditDialog>
    <!-- UserEditDialog 插件結束 -->
  </div>
</template>

<script>
import UserEditDialog from '../../components/UsersManager/UserEditDialog'

export default {
  name: 'user-manager',
  data() {
    return {
      // 只有使用者的 name and id
      allUserNameId: [],
      temp: 12345,
      // 該分頁顯示的 table 資料
      tableData: [],
      // 所有的使用者資料
      allUserData: [],
      // tableData 裡面的搜尋欄位
      search: '',
      // 管理分頁的物件
      my_paginations: {
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 10, // 每一頁顯示幾條數據
        page_sizes: [5, 10, 15, 17] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      },
      // 選種的使用者資料，傳遞到 UserEditDialog 的子元件中使用
      userEditFormData: {},
      originalUserEditFormData: {
        type: '',
        name: '',
        email: '',
        describe: '',
        last_edit_person: '',
        last_modify_date: '',
        activated: false,
        permission: {
          permission_list: [],
          // 供應商權限 inquire 只能讀取，edit 可以編輯寫入
          supplier_authority: {
            inquire: false,
            edit: false
          },
          material_authority: {
            inquire: false,
            edit: false
          },
          user_authority: {
            inquire: false,
            edit: false
          },
          customer_authority: {
            inquire: false,
            edit: false
          },
          quotation_authority: {
            inquire: false,
            edit: false
          },
          print_authority: {
            inquire: false,
            edit: false
          },
          sublimation_authority: {
            inquire: false,
            edit: false
          },
          delivery_authority: {
            inquire: false,
            edit: false
          },
          accounting_authority: {
            inquire: false,
            edit: false
          },
          product_authority: {
            inquire: false,
            edit: false
          },
          process_authority: {
            inquire: false,
            edit: false
          }
        }
      },
      // 新增 / 編輯 使用者資訊的控制物件，預設值 edit
      userDialog: {
        show: false,
        title: '編輯使用者權限',
        option: 'edit'
      }
    }
  },
  created() {
    this.getAllUserData()
    this.getUserInfo()
    this.initUserEditFormData()
  },
  components: {
    UserEditDialog
  },
  methods: {
    handleAddUser() {},
    handleEditUser(index, row) {
      this.userDialog = {
        title: '使用者編輯',
        show: true,
        option: 'edit'
      }
      // deep copy https://larry850806.github.io/2016/09/20/shallow-vs-deep-copy/
      // 把 userEditFormData 資料清空
      this.initUserEditFormData()
      // 再把點擊到的 row 的資料複製過去
      for (let prop in row) {
        this.userEditFormData[prop] = row[prop]
      }
    },
    handleDeleteUser() {},
    setPaginations() {
      // 分頁屬性設置
      this.my_paginations.total = this.allUserData.length
      this.my_paginations.page_index = 1
      if (localStorage.user_page_size) {
        this.my_paginations.page_size = Number(localStorage.user_page_size)
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.allUserData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage.user_page_size = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.allUserData.filter((item, index) => {
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
        if (this.allUserData[i]) {
          tables.push(this.allUserData[i])
        }
        this.tableData = tables
      }
    },
    getAllUserData() {
      this.$axios
        .get('/api/user/user-permission-list')
        .then((res) => {
          this.allUserData = res.data
          // 當讀取完畢資料後，就更新 tableData 裡面的資料
          this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUserInfo() {
      this.$axios
        .get('/api/user/user-info')
        .then((res) => {
          this.allUserNameId = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    initUserEditFormData() {
      this.userEditFormData = JSON.parse(
        JSON.stringify(this.originalUserEditFormData)
      )
    }
  }
  // 元件內局部註冊的自定義指令
  // https://medium.com/itsems-frontend/vue-custom-directives-c991ce456748
  // directives: {
  //   price: function(el, binding) {
  //     el.innerHTML = binding.value
  //       .toString()
  //       .replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function(
  //         all,
  //         pre,
  //         groupOf3Digital
  //       ) {
  //         return pre + groupOf3Digital.replace(/\d{3}/g, ',$&')
  //       })
  //   }
  // }
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
</style>
