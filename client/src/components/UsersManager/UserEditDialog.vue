<template>
  <div>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="1200px"
    >
      <div class="form">
        <el-form ref="form" :model="formData" :rules="form_rules">
          <!-- 第一列，使用者名稱，EMAIL，帳號狀態 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6"
              ><div class="grid-content ">
                <el-form-item
                  prop="name"
                  label="使用者名稱："
                  label-width="110px"
                >
                  <el-input
                    placeholder="此欄位不得為空"
                    class="inline-input"
                    size="mini"
                    type="name"
                    v-model="formData.name"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content ">
                <el-form-item prop="email" label="e-mail：" label-width="110px">
                  <el-input
                    placeholder="此欄位不得為空"
                    class="inline-input"
                    size="mini"
                    type="email"
                    v-model="formData.email"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content ">
                <el-form-item
                  prop="activated"
                  label="帳號狀態："
                  label-width="110px"
                >
                  <el-switch
                    v-model="formData.activated"
                    active-text="啟用"
                    inactive-text="禁用"
                  >
                  </el-switch>
                </el-form-item></div
            ></el-col>
          </el-row>
          <!-- 第一列結束 -->
          <!-- 第二列開始，供應商權限，原物料權限，使用者權限，客戶管理權限 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6"
              ><div class="grid-content ">
                <el-form-item
                  prop="supplier_authority"
                  label="供應商權限："
                  label-width="110px"
                >
                  <el-checkbox
                    v-model="formData.permission.supplier_authority.inquire"
                    >可讀取</el-checkbox
                  >
                  <el-checkbox
                    v-model="formData.permission.supplier_authority.edit"
                    >可編輯</el-checkbox
                  >
                </el-form-item>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                <el-form-item
                  prop="material_authority"
                  label="原物料權限"
                  label-width="110px"
                >
                  <el-checkbox
                    v-model="formData.permission.material_authority.inquire"
                    >可讀取</el-checkbox
                  >
                  <el-checkbox
                    v-model="formData.permission.material_authority.edit"
                    >可編輯</el-checkbox
                  >
                </el-form-item>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content ">
                <el-form-item
                  prop="user_authority"
                  label="使用者權限"
                  label-width="110px"
                >
                  <el-checkbox
                    v-model="formData.permission.user_authority.inquire"
                    >可讀取</el-checkbox
                  >
                  <el-checkbox v-model="formData.permission.user_authority.edit"
                    >可編輯</el-checkbox
                  >
                </el-form-item>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                <el-form-item
                  prop="customer_authority"
                  label="客戶管理權限"
                  label-width="110px"
                >
                  <el-checkbox
                    v-model="formData.permission.customer_authority.inquire"
                    >可讀取</el-checkbox
                  >
                  <el-checkbox
                    v-model="formData.permission.customer_authority.edit"
                    >可編輯</el-checkbox
                  >
                </el-form-item>
              </div></el-col
            >
          </el-row>
          <!-- 第二列結束 -->

          <!-- 第三列開始 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                <el-form-item
                  prop="quotation_authority"
                  label="報價單管理"
                  label-width="110px"
                >
                  <el-checkbox
                    v-model="formData.permission.quotation_authority.inquire"
                    >可讀取</el-checkbox
                  >
                  <el-checkbox
                    v-model="formData.permission.quotation_authority.edit"
                    >可編輯</el-checkbox
                  >
                </el-form-item>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content ">
                <el-form-item
                  prop="print_authority"
                  label="輸出管理"
                  label-width="110px"
                >
                  <el-checkbox
                    v-model="formData.permission.print_authority.inquire"
                    >可讀取</el-checkbox
                  >
                  <el-checkbox
                    v-model="formData.permission.print_authority.edit"
                    >可編輯</el-checkbox
                  >
                </el-form-item>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                <el-form-item
                  prop="sublimation_authority"
                  label="布料轉印"
                  label-width="110px"
                >
                  <el-checkbox
                    v-model="formData.permission.sublimation_authority.inquire"
                    >可讀取</el-checkbox
                  >
                  <el-checkbox
                    v-model="formData.permission.sublimation_authority.edit"
                    >可編輯</el-checkbox
                  >
                </el-form-item>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content ">
                <el-form-item
                  prop="delivery_authority"
                  label="配送管理"
                  label-width="110px"
                >
                  <el-checkbox
                    v-model="formData.permission.delivery_authority.inquire"
                    >可讀取</el-checkbox
                  >
                  <el-checkbox
                    v-model="formData.permission.delivery_authority.edit"
                    >可編輯</el-checkbox
                  >
                </el-form-item>
              </div></el-col
            >
          </el-row>
          <!-- 第三列結束 -->

          <!-- 第四列開始，會計系統，商品建構，加工系統 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6"
              ><div class="grid-content">
                <el-form-item
                  prop="accounting_authority"
                  label="會計系統"
                  label-width="110px"
                >
                  <el-checkbox
                    v-model="formData.permission.accounting_authority.inquire"
                    >可讀取</el-checkbox
                  >
                  <el-checkbox
                    v-model="formData.permission.accounting_authority.edit"
                    >可編輯</el-checkbox
                  >
                </el-form-item>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                <el-form-item
                  prop="product_authority"
                  label="商品建構"
                  label-width="110px"
                >
                  <el-checkbox
                    v-model="formData.permission.product_authority.inquire"
                    >可讀取</el-checkbox
                  >
                  <el-checkbox
                    v-model="formData.permission.product_authority.edit"
                    >可編輯</el-checkbox
                  >
                </el-form-item>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content">
                <el-form-item
                  prop="process_authority"
                  label="加工系統"
                  label-width="110px"
                >
                  <el-checkbox
                    v-model="formData.permission.process_authority.inquire"
                    >可讀取</el-checkbox
                  >
                  <el-checkbox
                    v-model="formData.permission.process_authority.edit"
                    >可編輯</el-checkbox
                  >
                </el-form-item>
              </div></el-col
            >
          </el-row>
          <!-- 第三列結束 -->

          <!-- 第四層，最後修改時間，最後修改人 -->

          <!-- 第四層結束 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6"
              ><div class="grid-content ">
                <el-form-item prop="" label="修改時間：" label-width="110px">
                  <el-input
                    disabled
                    class="inline-input"
                    size="mini"
                    type=""
                    v-model="getDate"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content ">
                <el-form-item prop="" label="修改人員：" label-width="110px">
                  <el-input
                    disabled
                    class="inline-input"
                    size="mini"
                    type=""
                    v-model="getUserNameById"
                  ></el-input>
                </el-form-item></div
            ></el-col>
          </el-row>
          <!-- 取消與提交 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="12">
              <div class="grid-content ">
                <el-form-item
                  class="text_right"
                  label-width="110px"
                  style="margin-top:10px"
                >
                  <el-button type="warning" @click="dialog.show = false"
                    >取消</el-button
                  >
                  <el-button type="primary" @click="onSubmit('form')"
                    >提交</el-button
                  >
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!-- 取消與提交結束 -->
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'user-edit-dialog',
  props: {
    dialog: Object,
    formData: Object,
    allUserNameId: Array
  },
  data() {
    return {
      form_rules: {
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      },
      convertField: [
        'supplier_authority',
        'material_authority',
        'user_authority',
        'customer_authority',
        'quotation_authority',
        'print_authority',
        'sublimation_authority',
        'delivery_authority',
        'accounting_authority',
        'product_authority',
        'process_authority'
      ]
    }
  },
  watch: {
    'formData.activated'() {
      // console.log(typeof this.formData.activated)
    }
  },
  methods: {
    // 括弧裡面的 form 裡面是字串，form 設定 ref='form' 的這個字串 'form'
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid && !this.formData.email == '') {
          this.formData.last_edit_person = this.user.id
          this.formData.last_modify_date = new Date()
          // 這邊要把權限轉換成字串
          this.setPermissionList()

          const url =
            this.dialog.option == 'add' ? 'add' : `edit/${this.formData._id}`
          this.$axios
            .post(`/api/user/${url}`, this.formData)
            .then((res) => {
              console.log('使用者 新增/編輯 成功嚕！')
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 隱藏 MyDialog
              this.dialog.show = false
              // 刷新網頁，傳遞給父組件做更新
              this.$emit('update')
            })
            .catch((err) => {
              console.log('axios添加數據失敗==>MyDialog.vue==>', err)
            })
        }
      })
    },
    // 把權限轉換成字串然後存到 user.permission.permission_list 的陣列裡面去
    setPermissionList() {
      if (
        this.convertField.length !== undefined &&
        this.convertField.length > 0
      ) {
        this.formData.permission.permission_list = []
        for (let i = 0; i < this.convertField.length; i++) {
          if (this.formData.permission[this.convertField[i]].inquire) {
            this.formData.permission.permission_list.push(
              this.convertField[i] + '_r'
            )
          }
          if (this.formData.permission[this.convertField[i]].edit) {
            this.formData.permission.permission_list.push(
              this.convertField[i] + '_w'
            )
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
    getDate() {
      if (!this.formData.last_modify_date) return '目前沒有修改過'
      return this.$moment(this.formData.last_modify_date).format(
        'YYYY年MM月DD日-HH：mm'
      )
    },
    getUserNameById() {
      if (!this.formData.last_edit_person) return '目前沒有修改過'
      let name = ''
      this.allUserNameId.forEach((item, index) => {
        if (item._id == this.formData.last_edit_person) name = item.name
      })
      return name
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
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
.row-bg {
  padding: 0;
  margin: 0;
  height: 40px;
  background-color: #f9fafc;
}
</style>
