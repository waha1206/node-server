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
                    v-model="formData.product_name"
                  ></el-input>
                </el-form-item></div
            ></el-col>
          </el-row>
          <!-- 第二列，商品成本、商品售價、商品利潤 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6"
              ><div class="grid-content ">
                <el-form-item prop="the_cost" label="商品成本：">
                  <el-input
                    size="mini"
                    type="the_cost"
                    v-model="formData.the_cost"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="retail_price" label="商品售價：">
                  <el-input
                    size="mini"
                    type="retail_price"
                    v-model="formData.retail_price"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="product_profit" label="商品利潤：">
                  <el-input
                    size="mini"
                    type="product_profit"
                    v-model="formData.product_profit"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="unit_price" label="單位售價：">
                  <el-input
                    size="mini"
                    type="unit_price"
                    v-model="formData.unit_price"
                  ></el-input>
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
                    v-model="formData.storage"
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
                    v-model="formData.stock_alert"
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
                    v-model="formData.lead_time"
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
                    v-model="formData.minimum_order_quantity"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <!-- 第四列，單位，材質，規格，長度 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="raw_material" label="商品材質：">
                  <el-input
                    size="mini"
                    type="raw_material"
                    v-model="formData.raw_material"
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
                    v-model="formData.unit"
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
                    v-model="formData.product_color"
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
                    v-model="formData.length"
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
                    v-model="formData.old_serial_numbers"
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
                    v-model="formData.extra_freight"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-form-item prop="last_archive_person" label="修改時間：">
                  <el-input
                    size="mini"
                    type="last_archive_person"
                    v-model="formData.last_archive_person"
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
    allUserNameId: Array,
    dialog: Object,
    formData: Object
  },
  data() {
    return {
      form_rules: {
        product_name: [
          { required: true, message: '此欄位不能為空', trigger: 'blur' }
        ],
        retail_price: [
          { required: true, message: '此欄位不能為空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    selectChang(id) {
      this.formData.material_class = id
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid && !this.formData.material_class == '') {
          this.formData.last_edit_person = this.user.id
          const url =
            this.dialog.option == 'add' ? 'add' : `edit/${this.formData._id}`
          this.$axios
            .post(`/api/material/${url}`, this.formData)
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
