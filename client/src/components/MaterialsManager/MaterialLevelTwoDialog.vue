<template>
  <div class="my-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="980px"
    >
      <el-row>
        <el-col :span="24"
          ><div class="el-select-wrap">
            <el-select
              @change="filterTableDataChange"
              v-model="filterTableData.levelOneId"
              placeholder="欲顯示的大分類"
              filterable
              size="mini"
            >
              <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
              <!-- value 這邊綁定的是此 陣列裡面，要傳給 select v-mode 的值 -->
              <!-- label 就單純的顯示再 input 上面可以看到的文字 -->
              <el-option
                <el-option
                v-for="(levelOneData, index) in materialLevelOneClassData"
                :key="index"
                :value="levelOneData._id"
                :label="levelOneData.name"
              >
                <span style="float: left">{{ levelOneData.type }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  levelOneData.name
                }}</span></el-option
              >
            </el-select>
          </div></el-col
        >
      </el-row>
      <div class="form">
        <el-container>
          <el-aside width="65%" class="grid-content bg-purple">
            <div class="table-container">
              <!-- *************************** 左邊區塊 *************************** -->
              <!-- *************************** table 區塊 裡面編輯跟刪除 *************************** -->
              <el-table :data="tableData" style="width: 100%" size="mini">
                <el-table-column
                  prop="type"
                  label="編號"
                  width="80px"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="分類名"
                  width="180px"
                  align="center"
                >
                </el-table-column>
                <el-table-column label="大分類" align="center" width="180px">
                  <template slot-scope="scope">
                    {{ getLevelOneNameById(scope.row.level_one_id) }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="operation"
                  label="操作"
                  width="150"
                  align="center"
                >
                  <!-- 編輯、刪除 第一層的分類 -->
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
              <!-- *************************** table 結束 裡面編輯跟刪除 *************************** -->
            </div>
          </el-aside>

          <!-- 右半邊的新增第一層分類 -->
          <el-aside width="35%" class="grid-content bg-purple-light">
            <el-form
              ref="form"
              :model="formData"
              :rules="formDataRules"
              label-width="120px"
              style="margin:10px;width:auto"
            >
              <!-- 下拉選單，第一層的資料類型，新增第二層資料的時候使用，這邊是新增 ADD 使用的是 formData -->
              <!-- 這裡的formData 剛進來的時候，應該是青空的，因為要建立新的資料  跟  editForm 不一樣，修改的 form 裡面會有資料-->
              <el-form-item label="第一層分類：">
                <el-select
                  @change="formDataSelectChang"
                  v-model="formData.level_one_id"
                  placeholder="選擇第一層的分類"
                  filterable
                  size="mini"
                >
                  <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
                  <el-option
                    v-for="(levelOneData, index) in materialLevelOneClassData"
                    :key="index"
                    :value="levelOneData._id"
                    :label="levelOneData.name"
                  >
                    <!-- 下拉的選單，左邊放 type 右邊放 name -->
                    <span style="float: left">{{ levelOneData.type }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ levelOneData.name }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 這邊開始新增 -->
              <el-form-item prop="type" label="二層編號：" size="mini">
                <el-input
                  type="type"
                  v-model="formData.type"
                  placeholder="請輸入4碼數字 例如：0001"
                ></el-input>
              </el-form-item>
              <el-form-item prop="name" label="二層分類名：" size="mini">
                <el-input
                  type="name"
                  v-model="formData.name"
                  placeholder="請輸入中文敘述"
                ></el-input>
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

    <!-- ****************************** 這個 dialog 是 點擊左邊的 編輯 / 刪除 的區塊 ****************************** -->
    <!-- ****************************** 只有這邊會使用到 editForm levelTwoEditForm ****************************** -->
    <el-dialog
      title="編輯商品代號"
      :visible.sync="levelTwoEditDialog"
      width="25%"
    >
      <el-form
        ref="editForm"
        :model="levelTwoEditForm"
        :rules="levelTwoEditFormRules"
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
          <!-- v-model="levelTwoEditForm.level_one_name" 因為最後要提交的表單是 levelTwoEditForm 所以理所當然的 v-model 就跟她綁訂了-->
          <el-select
            @change="editFormSelectChang"
            v-model="levelTwoEditForm.level_one_name"
            placeholder="選擇大分類"
            filterable
            size="mini"
          >
            <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
            <!-- v-for 裡面會顯示出 option 裡面的所有資料，這邊是指定到 categoriesLevelOneData -->
            <el-option
              v-for="(levelOneData2, index) in materialLevelOneClassData"
              :key="index"
              :value="levelOneData2._id"
              :label="levelOneData2.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="type"
          label="商品代號 (數字)"
          :label-width="formLabelWidth"
        >
          <el-input
            size="mini"
            v-model="levelTwoEditForm.type"
            autocomplete="off"
            placeholder="請輸入大寫英文"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          label="商品名稱 (中文)"
          :label-width="formLabelWidth"
        >
          <el-input
            size="mini"
            v-model="levelTwoEditForm.name"
            autocomplete="off"
            placeholder="請輸入大寫英文"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="levelTwoEditDialog = false">取消</el-button>
        <el-button type="primary" @click="onSubmit('editForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: 'material-level-two-dialog',
  props: {
    dialog: Object,
    materialLevelOneClassData: Array,
    materialLevelTwoClassData: Array
  },
  data() {
    return {
      dontRemove: '5fec461dd3bbbc0ca84cb458',
      // onSubmit 的時候會根據這個狀態去取得資料
      dialogOption: '',
      tableData: [],
      levelTwoEditDialog: false,
      formLabelWidth: '',
      filterTableData: {
        tableData: [],
        levelOneId: ''
      },
      levelTwoEditForm: {
        type: '',
        name: '',
        _id: '',
        level: 2,
        option: '',
        level_one_id: '',
        level_one_name: ''
      },
      formData: {
        type: '',
        name: '',
        _id: '',
        level: 2,
        option: '',
        level_one_id: '',
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
      levelTwoEditFormRules: {
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      },
      // 驗證表單，form_rules 這個是驗證 addForm 的欄位
      formDataRules: {
        level_one_id: [
          { required: true, message: '此欄位不能為空', trigger: 'blur' }
        ],
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
    dialog() {
      this.dialogOption = this.dialog.option
    },
    materialLevelTwoClassData() {
      // 資料有更新喔
      this.filterTableDataChange(this.filterTableData.levelOneId)
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    // 開場先初始化 讀取 localStorage
    initFilterData() {
      if (localStorage.material_level_one_id) {
        this.filterTableData.levelOneId = localStorage.material_level_one_id
      } else {
        this.filterTableData.levelOneId = this.dontRemove
        localStorage.material_level_one_id = this.dontRemove
      }
      this.filterTableDataChange(this.filterTableData.levelOneId)
    },
    // 當左邊的表單上面的選擇改變時，修改 this.filterTableData.tableData 的資料
    filterTableDataChange(id) {
      this.filterTableData.levelOneId = id
      localStorage.material_level_one_id = id
      if (this.filterTableData.levelOneId == this.dontRemove) {
        this.filterTableData.tableData = this.materialLevelTwoClassData
      } else {
        this.filterTableData.tableData = this.materialLevelTwoClassData.filter(
          (item) => {
            return item.level_one_id == this.filterTableData.levelOneId
          }
        )
      }
      this.setPaginations()
    },

    // 左側，編輯分類的時候，如果修改了分類，這邊會被呼叫
    editFormSelectChang(id) {
      this.levelTwoEditForm.level_one_id = id
      this.levelTwoEditForm.level_one_name = this.getLevelOneNameById(id)
      console.log(this.levelTwoEditForm.level_one_name)
    },
    // 右邊的第一層分類被選擇的時候，把 id 存到 第二層資料的 level_one_id
    formDataSelectChang(id) {
      this.formData.level_one_id = id
    },

    // 返回選取到的 level one name by id
    getLevelOneNameById(id) {
      let levelOneName = ''
      this.materialLevelOneClassData.forEach((e) => {
        if (e._id === id) {
          levelOneName = e.name
        }
      })
      return levelOneName
    },
    // 分頁開始 ****************************************************** 分頁開始
    setPaginations() {
      // 分頁屬性設置
      this.my_paginations.total = this.filterTableData.tableData.length
      this.my_paginations.page_index = 1
      if (localStorage.material_level_two_class_page_size) {
        this.my_paginations.page_size = Number(
          localStorage.material_level_two_class_page_size
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
      localStorage.material_level_two_class_page_size = page_size
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
    // 分頁結束 ****************************************************** 分頁結束

    // 新增、編輯、刪除 第一層的分類
    handleAdd(form) {
      this.dialogOption = 'add'
      this.onSubmit(form)
    },
    handleEdit(row) {
      // 當左邊區塊按下了編輯鍵
      this.levelTwoEditForm.type = row.type
      this.levelTwoEditForm.name = row.name
      this.levelTwoEditForm._id = row._id
      this.levelTwoEditForm.level = 2
      this.levelTwoEditForm.option = 'edit'
      this.levelTwoEditForm.level_one_id = row.level_one_id
      this.levelTwoEditDialog = true
      // 按了 table 裡面的編輯按鈕後 這邊會把 row 裡面的 level_one_id 轉換成為 name 賦值給 this.levelTwoEditForm.level_one_name
      this.levelTwoEditForm.level_one_name = this.getLevelOneNameById(
        row.level_one_id
      )
      this.dialogOption = 'edit'
    },
    handleDelete(row) {
      // 暫時不開放
      return
      // 讓全部分類無法刪除
      MessageBox.confirm(
        '注意！資料刪除會不可挽回！請確認此資料無其他應用！',
        '嚴重警告！！！'
      )
        .then(() => {
          this.$axios
            .delete(`/api/material-group/delete-level-two/${row._id}`)
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
      // this.dialogOption 判斷， add or edit
      const uploadFormData =
        this.dialogOption === 'add' ? this.formData : this.levelTwoEditForm
      uploadFormData.level_one_name = this.getLevelOneNameById(
        uploadFormData.level_one_id
      )
      if (uploadFormData.level_one_id === this.dontRemove) {
        this.$message('您不能選擇這個分類')
        return
      }
      uploadFormData.option = this.dialogOption
      this.$refs[form].validate((valid) => {
        if (valid) {
          const url =
            uploadFormData.option === 'add'
              ? 'add'
              : `edit/${this.levelTwoEditForm._id}`
          this.$axios
            .post(`/api/material-class/${url}`, uploadFormData)
            .then((res) => {
              console.log('(儲存/修改) 原料組合第二層分類成功！')
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 不管怎麼樣都隱藏 edit dialog 的視窗
              this.levelTwoEditDialog = false

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

.el-select-wrap {
  float: left;
  margin: 0 15px 0 0;
  padding: 0;
  width: 300px;
}
</style>
