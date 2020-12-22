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
              <el-table :data="categoriesData" style="width: 100%" size="mini">
                <el-table-column
                  prop="type"
                  label="英文"
                  width="120px"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="中文"
                  width="120px"
                  align="center"
                >
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

          <el-aside width="50%" class="grid-content bg-purple-light">
            <el-form
              ref="form"
              :model="formData"
              :rules="form_rules"
              label-width="120px"
              style="margin:10px;width:auto"
            >
              <!-- 這邊開始新增 -->
              <el-form-item prop="type" label="類型(英文)：">
                <el-input type="type" v-model="formData.type"></el-input>
              </el-form-item>
              <el-form-item prop="name" label="類型(中文)：">
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
      </div>
    </el-dialog>
    <el-dialog
      title="編輯商品代號"
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
        <el-form-item
          prop="type"
          label="商品代號 (英文)"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="categoriesEditForm.type"
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
  name: 'my-dialog',
  props: {
    dialog: Object,
    formData: Object,
    categoriesData: Array
  },
  data() {
    return {
      formLabelWidth: '',
      categoriesEditForm: {
        type: '',
        name: '',
        _id: ''
      },
      // 這個是驗證 editCategoriesEditForm的表單欄位
      categoriesEditFormRules: {
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      },
      categoriesEditDialog: false,
      // 下拉選單的 opation
      format_type_list: ['拉鍊', '五金', '棉花', '側標', '香精', '井字結'],
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
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    handleAdd(form) {
      this.dialog.option = 'add'
      this.onSubmit(form)
    },
    handleEdit(row) {
      this.categoriesEditDialog = true
      this.categoriesEditForm.type = row.type
      this.categoriesEditForm.name = row.name
      this.categoriesEditForm._id = row._id
      this.dialog.option = 'edit'
    },
    handleDelete(row) {
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
      console.log(this.dialog)
      const uploadFormData =
        this.dialog.option == 'add' ? this.formData : this.categoriesEditForm

      console.log(uploadFormData)
      this.$refs[form].validate((valid) => {
        if (valid && !uploadFormData.type == '') {
          const url =
            this.dialog.option == 'add'
              ? 'add'
              : `edit/${this.categoriesEditForm._id}`

          this.$axios
            .post(`/api/categories/${url}`, uploadFormData)
            .then((res) => {
              console.log('(儲存/修改) 商品分類成功！')
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
</style>
