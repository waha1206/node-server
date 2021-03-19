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
              <el-form-item prop="type" label="職務編號：" size="mini">
                <el-input type="type" v-model="formData.type"></el-input>
              </el-form-item>
              <el-form-item prop="name" label="職務中文：" size="mini">
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
      title="編輯使用者職務內容"
      :visible.sync="editDialog"
      width="25%"
    >
      <el-form
        ref="editForm"
        :model="userTitleForm"
        :rules="userTitleFormRules"
        label-width="120px"
        style="margin:10px;width:auto"
      >
        <el-form-item
          prop="type"
          label="職務編號"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="userTitleForm.type"
            autocomplete="off"
            size="mini"
            placeholder="請輸入大寫英文"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          label="職務名稱 (中文)"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="userTitleForm.name"
            autocomplete="off"
            size="mini"
            placeholder="請輸入中文"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取消</el-button>
        <el-button type="primary" @click="onSubmit('editForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: 'quotation-calculation-dialog',
  props: {
    dialog: Object
  },
  data() {
    return {
      tableData: [],
      formLabelWidth: '',
      formData: {
        type: '',
        name: ''
      },
      userTitleForm: {
        type: '',
        name: '',
        _id: '',
        level: 1,
        option: ''
      },

      // 這個是驗證 editCategoriesEditForm的表單欄位
      userTitleFormRules: {
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      },
      editDialog: false,
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
  created() {},
  watch: {
    dialog(value) {
      console.log(value)
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    // 新增、編輯、刪除 第一層的分類
    handleAdd(form) {
      this.userTitleForm.option = 'add'
      this.onSubmit(form)
    },
    handleEdit(row) {
      // 第一層的資料
      this.editDialog = true
      this.userTitleForm.type = row.type
      this.userTitleForm.name = row.name
      this.userTitleForm._id = row._id
      this.userTitleForm.level = 1
      this.userTitleForm.option = 'edit'
    },
    handleDelete(row) {
      MessageBox.confirm(
        '注意！資料刪除會不可挽回！請確認此資料無其他應用！',
        '嚴重警告！！！'
      )
        .then(() => {
          this.$axios
            .delete(`/api/customer/title/delete/${row._id}`)
            .then((res) => {
              this.$message('刪除成功！')
              this.$emit('update', this.dialog.dataType)
            })
        })
        .catch(() => {
          this.$message('您取消刪除了～鬆一口氣')
        })
    },
    // 新增商品類別代號
    onSubmit(form) {
      const uploadFormData =
        this.userTitleForm.option == 'add' ? this.formData : this.userTitleForm
      return
      this.$refs[form].validate((valid) => {
        if (valid && !uploadFormData.type == '') {
          const url =
            this.userTitleForm.option == 'add'
              ? 'add'
              : `edit/${this.userTitleForm._id}`
          uploadFormData.level = this.userTitleForm.level

          this.$axios
            .post(`/api/customer/title/${url}`, uploadFormData)
            .then((res) => {
              console.log('(儲存/修改) 原料組合第一層分類成功！')
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 不管怎麼樣都隱藏 edit dialog 的視窗
              this.editDialog = false

              // 刷新網頁，傳遞給父組件做更新
              this.$emit('update', this.dialog.dataType)
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
