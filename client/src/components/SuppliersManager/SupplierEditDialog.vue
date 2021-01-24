<template>
  <div class="material-edit-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="1200px"
    >
      <div class="form">
        <!-- style="margin:10px;width:auto" -->
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="100px"
        >
          <!-- 布局測試 -->
          <!-- bg-purple  原料分類 8 商品名稱 12 -->
          <!-- :gutter 欄位間距 -->
          <!-- el-row 使用 type="flex" 可以啟動自定義的欄位佈局 並可以通過 justify 屬性來指定 start center space-between space-around 其中的值來定義子元素的排版方式 -->
          <!-- 第一列，供應商分類，供應商名稱，統編 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6"
              ><div class="grid-content ">
                <!-- 下拉選單，這裡是原物料分類 -->
                <el-form-item label="供應商分類：" label-width="110px">
                  <el-select
                    @change="selectChang"
                    v-model="dialog.supplierClass"
                    placeholder="供應商分類"
                    filterable
                    size="mini"
                  >
                    <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
                    <el-option
                      v-for="(supplierClass, index) in supplierClassData"
                      :key="index"
                      :value="supplierClass._id"
                      :label="supplierClass.name"
                    ></el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content ">
                <el-form-item
                  prop="company"
                  label="供應商名稱："
                  label-width="110px"
                >
                  <el-input
                    placeholder="請輸入供應商名稱，此欄位不得為空"
                    class="inline-input"
                    size="mini"
                    type="company"
                    v-model="formData.company"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content ">
                <el-form-item
                  prop="tax_id_number"
                  label="統編："
                  label-width="110px"
                >
                  <el-input
                    placeholder="請輸入供應商統編"
                    class="inline-input"
                    size="mini"
                    type="tax_id_number"
                    v-model="formData.tax_id_number"
                  ></el-input>
                </el-form-item></div
            ></el-col>
          </el-row>
          <!-- 第二列，資本額，匯款帳號，官網，交易方式 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6"
              ><div class="grid-content ">
                <el-form-item
                  prop="registered_capital"
                  label-width="110px"
                  label="供應商資本額："
                >
                  <my-currency-input
                    type="registered_capital"
                    v-model="formData.registered_capital"
                  ></my-currency-input>
                  <!-- <el-input
                    size="mini"
                    placeholder="請輸入純數字"
                    type="registered_capital"
                    v-model="formData.registered_capital"
                  ></el-input> -->
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content ">
                <el-form-item prop="website" label="官網：" label-width="110px">
                  <el-input
                    size="mini"
                    type="website"
                    placeholder="請輸入網址"
                    v-model="formData.website"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop="bank_account"
                  label="銀行帳號："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="bank_account"
                    v-model="formData.bank_account"
                    placeholder="賄款給供應商的帳號"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!-- 第三列，業務姓名，業務手機，業務傳真，業務MAIL -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6">
              <div class="grid-content">
                <el-form-item
                  prop="sales_name"
                  label="業務姓名："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="sales_name"
                    v-model="formData.sales_name"
                    placeholder="中文 / 英文皆可"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop="sales_cell_phone"
                  label="業務手機："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="sales_cell_phone"
                    v-model="formData.sales_cell_phone"
                    placeholder="0918-700586"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop="sales_telephone"
                  label="業務市話："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="sales_telephone"
                    v-model="formData.sales_telephone"
                    placeholder="02-89116396#80"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop="sales_email"
                  label="業務MAIL："
                  label-width="110px"
                >
                  <el-input
                    placeholder="waha1206@gmail.com"
                    size="mini"
                    type="sales_email"
                    v-model="formData.sales_email"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <!-- 第四列，會計姓名，會計手機，會計市電，會計MAIL -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop="accounting_name"
                  label="會計姓名："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="accounting_name"
                    v-model="formData.accounting_name"
                    placeholder="中文 / 英文皆可"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop="accounting_cell_phone"
                  label="會計手機："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="accounting_cell_phone"
                    v-model="formData.accounting_cell_phone"
                    placeholder="0918-700586"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop="accounting_telephone"
                  label="會計市話："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="accounting_telephone"
                    v-model="formData.accounting_telephone"
                    placeholder="02-89116396#80"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop="accounting_mail"
                  label="會計MAIL："
                  label-width="110px"
                >
                  <el-input
                    placeholder="waha1206@gmail.com"
                    size="mini"
                    type="accounting_mail"
                    v-model="formData.accounting_mail"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <!-- 第五列，供應商電話，供應商傳真，供應商地址 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop="company_telephone"
                  label="供應商電話："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="company_telephone"
                    v-model="formData.company_telephone"
                    placeholder="02-89116396#81"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop="company_fax"
                  label="供應商傳真："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="company_fax"
                    v-model="formData.company_fax"
                    placeholder="02-89116397"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content ">
                <el-form-item
                  prop="company_address"
                  label="供應商地址："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="company_address"
                    v-model="formData.company_address"
                    placeholder="23145 新北市新店區寶興路45巷9弄3號3樓"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!-- 第五列結束 -->

          <!-- 第六列，店面電話，店面傳真，店面地址 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop="storefront_telephone"
                  label="店面電話："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="storefront_telephone"
                    v-model="formData.storefront_telephone"
                    placeholder="02-89116396#81"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop="storefront_fax"
                  label="店面傳真："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="storefront_fax"
                    v-model="formData.storefront_fax"
                    placeholder="02-89116397"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content ">
                <el-form-item
                  prop="storefront_address"
                  label="店面地址："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="storefront_address"
                    v-model="formData.storefront_address"
                    placeholder="23145 新北市新店區寶興路45巷9弄3號3樓"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!-- 第六列結束 -->

          <!-- 第七列，交易方式，商品交期，修改時間，修改人員-->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop="payment_terms"
                  label="付款條件："
                  label-width="110px"
                >
                  <el-input
                    placeholder="出貨前現金轉帳"
                    size="mini"
                    type="payment_terms"
                    v-model="formData.payment_terms"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop="delivery"
                  label="商品交期："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    placeholder="下單後30天含六日"
                    type="delivery"
                    v-model="formData.delivery"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item
                  prop=""
                  label="最後修改時間："
                  label-width="110px"
                >
                  <el-input
                    :disabled="true"
                    size="mini"
                    type=""
                    v-model="getDate"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <!-- type 跟 prop不用綁定到表單裡面，因為此 修改人員ID 會在送出儲存的時候，把操作者的ID寫到 formData.last_edit_person -->
                <el-form-item
                  prop=""
                  label="最後修改人員："
                  label-width="110px"
                >
                  <el-input
                    :disabled="true"
                    size="mini"
                    type=""
                    v-model="getUserNameById"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!-- 第七列結束 -->

          <!-- 第八列開始，廠長備註，會計備註 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="12">
              <div class="grid-content ">
                <el-form-item
                  prop="remarks"
                  label="廠長備註："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="remarks"
                    v-model="formData.remarks"
                    placeholder="廠長專用備註欄位"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content ">
                <el-form-item
                  prop="accounting_remarks"
                  label="會計備註："
                  label-width="110px"
                >
                  <el-input
                    size="mini"
                    type="accounting_remarks"
                    v-model="formData.accounting_remarks"
                    placeholder="會計專用備註欄位"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <!-- 第八列結束 -->

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
        <!-- 表單結束 -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'supplier-edit-dialog',
  props: {
    supplierClassData: Array,
    allUserNameId: Array,
    dialog: Object,
    formData: Object
  },
  data() {
    return {
      form_rules: {
        company: [
          { required: true, message: '此欄位不能為空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    selectChang(id) {
      this.formData.supplier_class = id
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid && !this.formData.supplier_class == '') {
          // 紀錄最後修改的使用者，最後修改的時間放到了 server 端去紀錄
          this.formData.last_edit_person = this.user.id
          this.formData.last_modify_date = new Date()
          const url =
            this.dialog.option == 'add' ? 'add' : `edit/${this.formData._id}`
          this.$axios
            .post(`/api/supplier/${url}`, this.formData)
            .then((res) => {
              console.log('資料庫加載成功嚕！')
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
