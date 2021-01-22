<template>
  <div class="my-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="1030px"
    >
      <el-row>
        <el-col :span="24"
          ><div class="my-select">
            <el-select
              @change="filterTableDataChange"
              v-model="filterTableData.levelOneId"
              placeholder="欲顯示的大分類"
              filterable
              size="mini"
            >
              <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
              <el-option
                v-for="(levelOneData, index) in categoriesLevelOneData"
                :key="index"
                :value="levelOneData._id"
                :label="levelOneData.name"
              ></el-option>
            </el-select></div
        ></el-col>
      </el-row>

      <div class="form">
        <el-container>
          <!-- dialog 左側 -->
          <el-aside width="70%" class="grid-content bg-purple">
            <div class="table-container">
              <el-table :data="tableData" style="width: 100%" size="mini">
                <el-table-column
                  prop="type"
                  label="第二層編號"
                  width="120px"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="第二層中文"
                  width="120px"
                  align="center"
                >
                </el-table-column>
                <el-table-column label="大分類" align="center" width="180">
                  <template slot-scope="scope">
                    {{ getLevelOneNameById(scope.row) }}
                  </template>
                </el-table-column>

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
            </div>
          </el-aside>

          <!-- dialog 右側 -->
          <el-aside width="30%" class="grid-content bg-purple-light">
            <el-form
              ref="form"
              :model="formData"
              :rules="form_rules"
              label-width="120px"
              style="margin:10px;width:auto"
            >
              <!-- 下拉選單，第一層的資料類型，新增第二層資料的時候使用，這邊是新增 ADD 使用的是 formData -->
              <!-- 這裡的formData 剛進來的時候，應該是青空的，因為要建立新的資料  跟  editForm 不一樣，修改的 form 裡面會有資料-->
              <el-form-item label="第一層分類：">
                <el-select
                  @change="formDataSelectChang"
                  v-model="formData.level_one_id"
                  placeholder="選擇大分類"
                  filterable
                  size="mini"
                >
                  <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
                  <el-option
                    v-for="(levelOneData, index) in categoriesLevelOneData"
                    :key="index"
                    :value="levelOneData._id"
                    :label="levelOneData.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 這邊開始新增 -->
              <el-form-item prop="type" label="第二層編號：" size="mini">
                <el-input type="type" v-model="formData.type"></el-input>
              </el-form-item>
              <el-form-item prop="name" label="第二層中文：" size="mini">
                <el-input type="name" v-model="formData.name"></el-input>
              </el-form-item>
              <!--提交與取消鍵 -->
              <el-form-item class="text_right">
                <el-button type="warning" @click="dialog.show = false"
                  >取消</el-button
                >
                <el-button type="primary" @click="handleAdd('form')"
                  >提交</el-button
                >
              </el-form-item>
            </el-form>
          </el-aside>

          <!-- <el-main>Main</el-main> -->
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
      </div>
    </el-dialog>
    <el-dialog
      title="編輯中分類"
      :visible.sync="categoriesEditDialog"
      width="25%"
    >
      <el-form
        ref="editForm"
        :model="categoriesEditForm"
        :rules="categoriesEditFormRules"
        label-width="120px"
        style="margin:10px;width:auto"
      >
        <!-- 下拉選單，轉換成文字，這邊是 editForm 的 會取出舊資料，修改後上傳到資料庫裏面-->
        <!-- v-model 裡面放的是會顯示出來的值 這邊我從 creagoriesEditForm 裡面抓原本他自己的 level_one_name 顯示出來 -->
        <!-- option 是提供這個元件其他的選項 value = 顯示在 option 裡面的大分類中文名稱，value 為該大分類的 id 他默認會塞到 editForm 裡面去 -->
        <!-- editFormSelectChang(id) {
      			 this.categoriesEditForm.level_one_id = id
    				 },
						 這一段程式碼，會在 selectChange 事件發生的時候，把 level_one_id 放到 editForm 裡面去
             其他的值會在傳送資料時 ( onSubmit ) 的函式裡面 把 editForm 的數值陸續搬遷到 uploadFormData 封裝成物件後再丟到服務端去更新資料
						 -->
        <el-form-item label="大分類：">
          <el-select
            @change="editFormSelectChang"
            v-model="categoriesEditForm.level_one_name"
            placeholder="選擇大分類"
            filterable
            size="mini"
          >
            <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
            <!-- v-for 裡面會顯示出 option 裡面的所有資料，這邊是指定到 categoriesLevelOneData -->
            <el-option
              v-for="(levelOneData, index) in categoriesLevelOneData"
              :key="index"
              :value="levelOneData._id"
              :label="levelOneData.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="type"
          size="mini"
          label="第二層編號"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="categoriesEditForm.type"
            autocomplete="off"
            placeholder="英文或數字"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          size="mini"
          label="第二層中文"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="categoriesEditForm.name"
            autocomplete="off"
            placeholder="請輸入大寫英文"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="categoriesEditDialog = false">取消</el-button>
        <el-button type="primary" @click="onSubmit('editForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: 'categories-level-two-dialog',
  props: {
    dialog: Object,
    formData: Object,
    categoriesLevelTwoData: Array,
    categoriesLevelOneData: Array
  },
  data() {
    return {
      filterTableData: {
        tableData: [],
        levelOneId: ''
      },
      tableData: [],
      formLabelWidth: '',
      categoriesEditForm: {
        type: '',
        name: '',
        level_one_id: '',
        _id: '',
        level_one_name: ''
      },
      // 管理分頁
      my_paginations: {
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 10, // 每一頁顯示幾條數據
        page_sizes: [5, 10, 12] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      },
      // 這個是驗證 editCategoriesEditForm的表單欄位
      categoriesEditFormRules: {
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      },
      // 新噌第二層分類裡面，如果按了表格右邊的編輯按鈕，會跳出來的修改視窗
      categoriesEditDialog: false,
      // 驗證表單，form_rules 這個是驗證 addForm 的欄位
      form_rules: {
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        describe: [
          { required: true, message: '此欄位不能為空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initFilterData()
    this.setPaginations()
  },
  watch: {
    categoriesLevelTwoData() {
      this.filterTableDataChange(this.filterTableData.levelOneId)
      // this.setPaginations()
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    getLevelOneNameById(row) {
      let levelOneName = ''
      this.categoriesLevelOneData.forEach((e) => {
        if (e._id === row.level_one_id) {
          levelOneName = e.name
        }
      })
      return levelOneName
    },
    initFilterData() {
      if (localStorage.level_one_id) {
        this.filterTableData.levelOneId = localStorage.level_one_id
      } else {
        this.filterTableData.levelOneId = '5fd54071cbcb7757640a7ee7'
        localStorage.level_one_id = '5fd54071cbcb7757640a7ee7'
      }
      this.filterTableDataChange(this.filterTableData.levelOneId)
    },
    // 控制 table 要揭示出來的資料
    filterTableDataChange(id) {
      this.filterTableData.levelOneId = id
      localStorage.level_one_id = id
      if (this.filterTableData.levelOneId == '5fd54071cbcb7757640a7ee7') {
        this.filterTableData.tableData = this.categoriesLevelTwoData
      } else {
        this.filterTableData.tableData = this.categoriesLevelTwoData.filter(
          (item) => {
            return item.level_one_id == this.filterTableData.levelOneId
          }
        )
      }
      this.setPaginations()
    },
    formDataSelectChang(id) {
      this.formData.level_one_id = id
    },
    editFormSelectChang(id) {
      this.categoriesEditForm.level_one_id = id
    },
    setPaginations() {
      // 分頁屬性設置
      this.my_paginations.total = this.filterTableData.tableData.length
      this.my_paginations.page_index = 1
      if (localStorage.categories_level_two_class_page_size) {
        this.my_paginations.page_size = Number(
          localStorage.categories_level_two_class_page_size
        )
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.filterTableData.tableData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage.categories_level_two_class_page_size = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.filterTableData.tableData.filter((item, index) => {
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
        if (this.filterTableData.tableData[i]) {
          tables.push(this.filterTableData.tableData[i])
        }
        this.tableData = tables
      }
    },
    handleAdd(form) {
      this.dialog.option = 'add'
      this.onSubmit(form)
    },
    handleEdit(row) {
      this.categoriesEditDialog = true
      this.categoriesEditForm.type = row.type
      this.categoriesEditForm.name = row.name
      this.categoriesEditForm._id = row._id
      this.categoriesEditForm.level_one_name = this.getLevelOneNameById(row)
      this.dialog.option = 'edit'
    },
    handleDelete(row) {
      return
      MessageBox.confirm(
        '注意！資料刪除會不可挽回！請確認此資料無其他應用！',
        '嚴重警告！！！'
      )
        .then(() => {
          this.$axios
            .delete(`/api/categories/delete/${row._id}`)
            .then((res) => {
              this.$message('刪除成功！')
              this.$emit('update')
            })
        })
        .catch(() => {
          this.$message('您取消刪除了～鬆一口氣')
        })
    },
    // 新增商品類別代號
    onSubmit(form) {
      const uploadFormData =
        this.dialog.option == 'add' ? this.formData : this.categoriesEditForm

      this.$refs[form].validate((valid) => {
        if (valid && !uploadFormData.type == '') {
          const url =
            this.dialog.option == 'add'
              ? 'add'
              : `edit/${this.categoriesEditForm._id}`
          uploadFormData.level = 2
          this.$axios
            .post(`/api/categories/${url}`, uploadFormData)
            .then((res) => {
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 不管怎麼樣都隱藏 edit dialog 的視窗
              this.categoriesEditDialog = false
              // this.dialog.show = false
              // 刷新網頁，傳遞給父組件做更新
              this.$emit('update')
            })
            .catch((err) => {
              console.log('axios添加數據失敗==>MyDialog.vue==>', err)
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.my-select {
  margin-left: 10px;
  margin-bottom: 10px;
}
.lefe-side {
  border-right: 1px solid gray;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.table-container {
  width: 100%;
  height: 100%;
  overflow: hidden;

  box-sizing: border-box;
}
.pagination {
  text-align: left;
  margin-top: 10px;
}
</style>
