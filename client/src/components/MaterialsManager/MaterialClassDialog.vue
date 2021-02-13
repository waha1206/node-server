<template>
  <div class="my-dialog">
    <el-dialog
      width="1200px"
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-container>
          <el-aside width="50%" class="grid-content bg-purple">
            <!-- 左側表格的區塊 -->
            <div class="table-container">
              <!-- <el-table :data="materialClassData" style="width: 100%" size="mini"> -->
              <el-table :data="tableData" style="width: 100%" size="mini">
                <el-table-column
                  prop="type"
                  label="編號"
                  width="70px"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="原料分類名稱"
                  width="240px"
                  align="center"
                >
                </el-table-column>

                <!-- 說明跳出來對話框的區塊 -->
                <el-table-column label="說明" width="70" align="center">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="left" width="200">
                      <p v-if="scope.row.describe">
                        {{ scope.row.describe }}
                      </p>
                      <p v-else>沒有說明資料</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="mini">滑鼠過來</el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="operation"
                  label="操作"
                  width="200"
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

          <el-aside width="50%" class="grid-content bg-purple-light">
            <el-form
              ref="form"
              :model="formData"
              :rules="form_rules"
              label-width="120px"
              style="margin:10px;width:auto"
            >
              <!-- 這邊開始新增 -->
              <el-form-item prop="type" label="編號(數字)：">
                <el-input
                  type="type"
                  v-model="formData.type"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item prop="name" label="類型(中文)：">
                <el-input
                  type="name"
                  v-model="formData.name"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item prop="describe" label="分類說明：">
                <el-input
                  size="mini"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  v-model="formData.describe"
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
    <el-dialog
      title="編輯商品代號"
      :visible.sync="materialClassEditDialog"
      width="25%"
    >
      <el-form
        ref="editForm"
        :model="materialClassEditForm"
        :rules="materialClassEditFormRules"
        label-width="120px"
        style="margin:10px;width:auto"
      >
        <el-form-item
          prop="type"
          label="商品代號 (英文)"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="materialClassEditForm.type"
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
            v-model="materialClassEditForm.name"
            autocomplete="off"
            placeholder="請輸入大寫英文"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="describe"
          label="分類說明"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="materialClassEditForm.describe"
            autocomplete="off"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="請輸入分類說明"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="materialClassEditDialog = false">取消</el-button>
        <el-button type="primary" @click="onSubmit('editForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: 'material_class_dialog',
  props: {
    dialog: Object,
    formData: Object,
    materialClassData: Array
  },
  data() {
    return {
      tableData: [],
      formLabelWidth: '',
      my_paginations: {
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 10, // 每一頁顯示幾條數據
        page_sizes: [5, 10, 12] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      },
      materialClassEditForm: {
        type: '',
        name: '',
        describe: '',
        _id: ''
      },
      // 這個是驗證 editmaterialClassEditForm的表單欄位
      materialClassEditFormRules: {
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        describe: [
          { required: false, message: '此欄位可以為空', trigger: 'blur' }
        ]
      },
      materialClassEditDialog: false,
      // 下拉選單的 opation
      format_type_list: ['拉鍊', '五金', '棉花', '側標', '香精', '井字結'],
      // 驗證表單，form_rules 這個是驗證 addForm 的欄位
      form_rules: {
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        describe: [
          { required: false, message: '此欄位可以為空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.setPaginations()
  },
  watch: {
    // 因為子元件的的 MaterialClassDialog 再更新裡面資料後，會丟出一個 this.$emit(update) 讓父元件 MaterialManager.vue 去重新要 materialClass 的資料
    // 此時因為是非同步，所以子元件會比父元件異步取得資料還要早完成掛載，這個時候有兩種方式可以去處理
    // 1. 使用 v-if 判斷要傳遞給 prop 的值不為空，這個 v-if 會放在子元件裡面 <MaterialClassDialog ... v-if:"materilaClassData[0]"
    // 2. 使用 wacth 去觀察 prop 裡所傳遞過來的任何值有沒有變化，有變化的時候就再觸發我們想要做的事情
    // 這邊會觸發 this.setPaginations 是因為此函式裡面會有一個敘述為 this.tableData = this.materialClassData.filter( ...
    // 重新設定 this.tableData 後，子元件就會更新最新的資料，然後看到的就會是正確資料了
    // 3. 將資料存到store，子元件監聽資料變化（watch/computed）
    materialClassData() {
      this.setPaginations()
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    setPaginations() {
      // 分頁屬性設置
      this.my_paginations.total = this.materialClassData.length
      this.my_paginations.page_index = 1
      if (localStorage.material_supplier_class_page_size) {
        this.my_paginations.page_size = Number(
          localStorage.material_supplier_class_page_size
        )
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.materialClassData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    // 分頁操作
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage.material_supplier_class_page_size = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.materialClassData.filter((item, index) => {
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
        if (this.materialClassData[i]) {
          tables.push(this.materialClassData[i])
        }
        console.log('qq')
        this.tableData = tables
      }
    },
    handleAdd(form) {
      this.dialog.option = 'add'
      this.onSubmit(form)
    },
    handleEdit(row) {
      for (let prop in this.materialClassEditForm) {
        this.materialClassEditForm[prop] = ''
      }
      for (let prop in row) {
        this.materialClassEditForm[prop] = row[prop]
      }
      this.dialog.option = 'edit'
      this.materialClassEditDialog = true
    },
    handleDelete(row) {
      if (row._id === '5fec461dd3bbbc0ca84cb458') return
      MessageBox.confirm(
        '注意！資料刪除會不可挽回！請確認此資料無其他應用！',
        '嚴重警告！！！'
      )
        .then(() => {
          this.$axios
            .delete(`/api/material-class/delete/${row._id}`)
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
      // this.dialog.option = edit 代表要上傳的是 material class 的資料更新
      const uploadFormData =
        this.dialog.option == 'add' ? this.formData : this.materialClassEditForm
      uploadFormData.level = 1
      console.log(uploadFormData)
      this.$refs[form].validate((valid) => {
        if (valid && !uploadFormData.type == '') {
          const url =
            this.dialog.option == 'add'
              ? 'add'
              : `edit/${this.materialClassEditForm._id}`

          this.$axios
            .post(`/api/material-class/${url}`, uploadFormData)
            .then((res) => {
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 不管怎麼樣都隱藏 edit dialog 的視窗
              this.materialClassEditDialog = false
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
