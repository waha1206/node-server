<template>
  <div class="my-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-container>
          <el-aside width="50%" class="grid-content bg-purple">
            <div class="table-container">
              <!-- ***********************  manager 裡面的表單   ***********************-->
              <el-table :data="tableData" style="width: 100%" size="mini">
                <el-table-column prop="type" label="第一層編號" width="120px" align="center"> </el-table-column>
                <el-table-column prop="name" label="第一層中文" width="180" align="center"> </el-table-column>

                <el-table-column prop="operation" label="操作" width="150" align="center">
                  <!-- 編輯、刪除 第一層的分類 -->
                  <template slot-scope="scope">
                    <el-button type="warning" icon="edit" size="small" @click="handleEdit(scope.row)">編輯</el-button>
                    <el-button type="danger" icon="delete" size="small" @click="handleDelete(scope.row)"
                      >刪除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <!-- ***********************  manager 裡面的表單 結束   ***********************-->
            </div>
          </el-aside>

          <!-- 右半邊的新增第一層分類 -->
          <el-aside width="50%" class="grid-content bg-purple-light">
            <el-form
              ref="form"
              :model="formData"
              :rules="form_rules"
              label-width="120px"
              style="margin:10px;width:auto"
            >
              <!-- 這邊開始新增 -->
              <el-form-item prop="type" label="第一層編號：" size="mini">
                <el-input type="type" v-model="formData.type"></el-input>
              </el-form-item>
              <el-form-item prop="name" label="第一層中文：" size="mini">
                <el-input type="name" v-model="formData.name"></el-input>
              </el-form-item>

              <!--提交與取消鍵 -->
              <el-form-item class="text_right">
                <el-button type="warning" @click="dialog.show = false">取消</el-button>
                <el-button type="primary" @click="handleAdd('form')">提交</el-button>
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
    <el-dialog title="編輯商品代號" :visible.sync="levelOneEditDialog" width="25%">
      <el-form
        ref="editForm"
        :model="levelOneEditForm"
        :rules="levelOneEditFormRules"
        label-width="120px"
        style="margin:10px;width:auto"
      >
        <el-form-item prop="type" label="商品代號 (英文)" :label-width="formLabelWidth">
          <el-input
            v-model="levelOneEditForm.type"
            autocomplete="off"
            size="mini"
            placeholder="請輸入大寫英文"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" label="商品名稱 (中文)" :label-width="formLabelWidth">
          <el-input
            v-model="levelOneEditForm.name"
            autocomplete="off"
            size="mini"
            placeholder="請輸入大寫英文"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="levelOneEditDialog = false">取消</el-button>
        <el-button type="primary" @click="onSubmit('editForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: 'categories-level-one-dialog',
  props: {
    dialog: Object,
    groupLevelOneData: Array
  },
  data() {
    return {
      tableData: [],
      formLabelWidth: '',
      formData: {
        type: '',
        name: ''
      },
      levelOneEditForm: {
        type: '',
        name: '',
        _id: '',
        level: 1,
        option: ''
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
      levelOneEditFormRules: {
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      },
      levelOneEditDialog: false,
      // 下拉選單的 opation
      format_type_list: ['拉鍊', '五金', '棉花', '側標', '香精', '井字結'],
      // 驗證表單，form_rules 這個是驗證 addForm 的欄位
      form_rules: {
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        describe: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.setPaginations()
  },
  watch: {
    groupLevelOneData() {
      // 資料有更新喔
      this.setPaginations()
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    // 分頁開始
    setPaginations() {
      this.my_paginations.total = this.groupLevelOneData.length
      this.my_paginations.page_index = 1
      if (localStorage.group_level_one_page_size) {
        this.my_paginations.page_size = Number(localStorage.group_level_one_page_size)
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.groupLevelOneData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage.group_level_one_page_size = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.groupLevelOneData.filter((item, index) => {
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
        if (this.groupLevelOneData[i]) {
          tables.push(this.groupLevelOneData[i])
        }
        this.tableData = tables
      }
    }, // 分頁結束

    // 新增、編輯、刪除 第一層的分類
    handleAdd(form) {
      this.levelOneEditForm.option = 'add'
      this.onSubmit(form)
    },
    handleEdit(row) {
      // 第一層的資料
      this.levelOneEditDialog = true
      this.levelOneEditForm.type = row.type
      this.levelOneEditForm.name = row.name
      this.levelOneEditForm._id = row._id
      this.levelOneEditForm.level = 1
      this.levelOneEditForm.option = 'edit'
    },
    handleDelete(row) {
      // 讓全部分類無法刪除
      MessageBox.confirm('注意！資料刪除會不可挽回！請確認此資料無其他應用！', '嚴重警告！！！')
        .then(() => {
          // 防止誤刪除，所以先關閉
          return
          this.$axios.delete(`/api/material-group/delete-level-one/${row._id}`).then((res) => {
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
      const uploadFormData = this.levelOneEditForm.option == 'add' ? this.formData : this.levelOneEditForm

      this.$refs[form].validate((valid) => {
        if (valid && !uploadFormData.type == '') {
          const url = this.levelOneEditForm.option == 'add' ? 'add' : `edit/${this.levelOneEditForm._id}`
          uploadFormData.level = this.levelOneEditForm.level
          this.$axios
            .post(`/api/material-group/${url}`, uploadFormData)
            .then((res) => {
              console.log('(儲存/修改) 原料組合第一層分類成功！')
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 不管怎麼樣都隱藏 edit dialog 的視窗
              this.levelOneEditDialog = false

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
