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
          :model="materialDataForm"
          :rules="form_rules"
          label-width="100px"
        >
          <!-- 布局測試 -->
          <!-- bg-purple  原料分類 8 商品名稱 12 -->
          <!-- :gutter 欄位間距 -->
          <!-- el-row 使用 type="flex" 可以啟動自定義的欄位佈局 並可以通過 justify 屬性來指定 start center space-between space-around 其中的值來定義子元素的排版方式 -->
          <!-- 第一列，原料分類、商品名稱 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6"
              ><div class="grid-content ">
                <!-- 下拉選單，這裡是原物料分類 -->
                <el-form-item label="原料分類：">
                  <el-select
                    @change="selectChang"
                    v-model="dialog.materialClass"
                    placeholder="原料分類"
                    filterable
                    size="mini"
                  >
                    <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
                    <el-option
                      v-for="(materialClass, index) in materialClassData"
                      :key="index"
                      :value="materialClass._id"
                      :label="materialClass.name"
                    ></el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content ">
                <el-form-item prop="product_name" label="商品名稱：">
                  <el-input
                    class="inline-input"
                    size="mini"
                    type="product_name"
                    v-model="materialDataForm.product_name"
                  ></el-input>
                </el-form-item></div
            ></el-col>
          </el-row>
          <!-- 第二列，商品成本、商品售價、商品利潤 ，單位售價-->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6"
              ><div class="grid-content ">
                <el-form-item prop="the_cost" label="商品成本：">
                  <my-currency-input
                    :isReadyOnly="false"
                    type="the_cost"
                    v-model="materialDataForm.the_cost"
                  ></my-currency-input>

                  <!-- <el-input
                    size="mini"
                    type="the_cost"
                    v-model="materialDataForm.the_cost"
                  ></el-input> -->
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="retail_price" label="商品售價：">
                  <my-currency-input
                    :isReadyOnly="true"
                    type="retail_price"
                    v-model="retailPrice"
                  ></my-currency-input>
                  <!-- <el-input
                    size="mini"
                    type="retail_price"
                    v-model="materialDataForm.retail_price"
                  ></el-input> -->
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="product_profit" label="商品利潤：">
                  <my-percentage-input
                    :isReadyOnly="false"
                    type="product_profit"
                    v-model="materialDataForm.product_profit"
                  ></my-percentage-input>

                  <!-- <el-input
                    size="mini"
                    type="product_profit"
                    placeholder="20代表20%請輸入整數數字"
                    v-model="materialDataForm.product_profit"
                  ></el-input> -->
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="unit_price" label="單位售價：">
                  <my-currency-input
                    :isReadyOnly="false"
                    type="unit_price"
                    v-model="materialDataForm.unit_price"
                  ></my-currency-input>
                  <!-- <el-input
                    size="mini"
                    type="unit_price"
                    v-model="materialDataForm.unit_price"
                  ></el-input> -->
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!-- 第三列，現有庫存，最低庫存 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="storage" label="現有庫存：">
                  <el-input
                    size="mini"
                    type="storage"
                    v-model="materialDataForm.storage"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="stock_alert" label="最低庫存：">
                  <el-input
                    size="mini"
                    type="stock_alert"
                    v-model="materialDataForm.stock_alert"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="lead_time" label="採購天數：">
                  <el-input
                    size="mini"
                    type="lead_time"
                    v-model="materialDataForm.lead_time"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="unit" label="商品單位：">
                  <el-input
                    size="mini"
                    type="unit"
                    v-model="materialDataForm.unit"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <!-- 第四列，材質，規格，長度，最低訂購 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="raw_material" label="商品材質：">
                  <el-input
                    size="mini"
                    type="raw_material"
                    v-model="materialDataForm.raw_material"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="product_color" label="商品顏色：">
                  <el-input
                    size="mini"
                    type="product_color"
                    v-model="materialDataForm.product_color"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="length" label="商品長度：">
                  <el-input
                    size="mini"
                    type="length"
                    v-model="materialDataForm.length"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="minimum_order_quantity" label="最低訂購：">
                  <el-input
                    size="mini"
                    type="minimum_order_quantity"
                    v-model="materialDataForm.minimum_order_quantity"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <!-- 第五列，商品舊編號，額外運費，修改時間，修改人員 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="old_serial_numbers" label="舊的編號：">
                  <el-input
                    size="mini"
                    type="old_serial_numbers"
                    v-model="materialDataForm.old_serial_numbers"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="extra_freight" label="額外運費：">
                  <el-input
                    size="mini"
                    type="extra_freight"
                    v-model="materialDataForm.extra_freight"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="" label="修改時間：">
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
                <el-form-item prop="" label="修改人員：">
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
          <!-- 第五列結束 -->
          <!-- 第六列，供應商ID，備註 remark -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="" label="供應商：">
                  <el-input
                    :readonly="true"
                    size="mini"
                    type=""
                    v-model="getSupplierNameById"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="grid-content ">
                <el-form-item prop="remark" label="備註：">
                  <el-input
                    size="mini"
                    type="remark"
                    v-model="materialDataForm.remark"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!-- 第六列結束 -->
          <!-- 第七列，測試用 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="processing_fee_flag" label="加工費用：">
                  <el-checkbox v-model="materialDataForm.processing_fee_flag"
                    >有加工費用</el-checkbox
                  >
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="grid-content ">
                <el-form-item prop="processing_remark" label="加工備註：">
                  <el-input
                    placeholder="這邊的註解是寫給加工媽媽看的"
                    size="mini"
                    type="processing_remark"
                    v-model="materialDataForm.processing_remark"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!-- 第七列結束 -->

          <el-form-item class="text_right">
            <el-button type="warning" @click="dialog.show = false"
              >取消</el-button
            >
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'material-edit-dialog',
  props: {
    materialClassData: Array,
    allSupplierlData: Array,
    allUserNameId: Array,
    dialog: Object,
    formData: Object
  },
  data() {
    return {
      test: '',
      retailPrice: 0,
      materialDataForm: {},
      // materialDataForm_rules: {
      form_rules: {
        product_name: [
          { required: true, message: '此欄位不能為空', trigger: 'blur' }
        ],
        retail_price: [
          { required: true, message: '此欄位不能為空', trigger: 'blur' }
        ]
        // retail_price: [
        //   { required: true, message: '此欄位不能為空', trigger: 'blur' }
        // ]
      }
    }
  },
  computed: {
    // 監聽兩個屬性變化
    ...mapGetters(['user']),
    // 時間轉換
    getDate() {
      if (!this.materialDataForm.last_modify_date) return '目前沒有修改過'
      return this.$moment(this.materialDataForm.last_modify_date).format(
        'YYYY年MM月DD日 - HH：mm'
      )
    },
    // 取得修改人的_id 轉換成 name
    getUserNameById() {
      if (!this.materialDataForm.last_edit_person) return '目前沒有修改過'
      let name = ''
      this.allUserNameId.forEach((item, index) => {
        if (item._id == this.materialDataForm.last_edit_person) name = item.name
      })
      return name
    },
    // 這邊的獨自打造的，傳入id取得供應商名稱
    getSupplierNameById() {
      let name = ''
      this.allSupplierlData.forEach((e) => {
        if (e._id === this.materialDataForm.supplier_id) {
          name = e.company
        }
      })
      if (!name) return '尚未建立供應商'
      return name
    }
  },
  watch: {
    // 常用的正則表達式 https://kknews.cc/zh-tw/code/o5e4n55.html
    'materialDataForm.unit_price': function(newValue) {
      // 帶有兩位小數的正實數，傳進來的是 單位售價
      var numReg = /[0-9]+(.[0-9]{2})?/
      if (!numReg.test(newValue)) {
        this.$message('請輸入正整數與小數點後兩位數')
        this.retailPrice = 0
      } else {
        this.retailPrice = this.materialDataForm.retail_price =
          newValue *
          ((100 + Number(this.materialDataForm.product_profit)) / 100)
        this.setCeil(this.retailPrice)
      }
    },
    // 檢查商品利潤是不是正整數 只能包含 0-9 這邊只有單純的計算數字有使用到，正則運算暫時沒用到
    // https://juejin.cn/post/6844904067580297229  按下 enter 會觸發 tab 鍵的文章出處
    'materialDataForm.product_profit': function(newValue) {
      var numReg = /^[0-9]*$/
      if (!numReg.test(newValue)) {
        this.$message('請輸入正整數')
        this.retailPrice = 0
      } else {
        this.retailPrice = this.materialDataForm.retail_price =
          this.materialDataForm.unit_price * ((100 + Number(newValue)) / 100)
        this.setCeil(this.retailPrice)
      }
    },
    // 當父元件 dialog 傳遞 到  子元件的 props dialog 的時候，就去更新一下  此子元件要提交的表單內容 this.updateMaterialFormData()
    // 此函式會更新 this.MaterialFormData
    dialog: function(newValue, oldValue) {
      this.updateMaterialFormData()
    }
  },
  created() {
    this.materialDataForm = Object.assign({}, this.formData)
  },
  methods: {
    // 無條件進位，小數點第三位數會無條件進位
    setCeil(float) {
      this.retailPrice = this.materialDataForm.retail_price =
        Math.ceil(float * 100) / 100
    },
    // 當 dialog 傳遞近來 add 或是 edit 的時候，會被 watch 的 dialog() 觀察到，然後會呼叫這隻程式更新 editDialog 程式裡的 materialDataForm 表單
    updateMaterialFormData() {
      this.materialDataForm = Object.assign({}, this.formData)
    },
    selectChang(id) {
      this.materialDataForm.material_class = id
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid && !this.materialDataForm.material_class == '') {
          this.materialDataForm.last_edit_person = this.user.id
          this.materialDataForm.last_modify_date = new Date()
          const url =
            this.dialog.option == 'add'
              ? 'add'
              : `edit/${this.materialDataForm._id}`
          this.$axios
            .post(`/api/material/${url}`, this.materialDataForm)
            .then((res) => {
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
        } else {
          this.$message({
            message: '請選擇商品分類',
            type: 'error'
          })
        }
      })
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
