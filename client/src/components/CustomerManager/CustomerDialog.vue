<template>
  <div class="customer-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="1600px"
      style="margin-top:-40px"
    >
      <!-- style="margin:10px;width:auto" -->
      <el-form
        ref="form"
        :model="customerFormData"
        :rules="form_rules"
        label-width="100px"
      >
        <el-container>
          <el-header>
            <!-- 第一列，客戶分類，客戶名稱，公司統編，公司電話，公司傳真 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="4"
                ><el-form-item
                  label="客戶分類："
                  prop="customer_class"
                  label-width="120px"
                >
                  <el-select
                    @change="customerClassChange"
                    v-model="customerFormData.customer_class"
                    placeholder="客戶分類"
                    filterable
                    size="mini"
                  >
                    <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
                    <el-option
                      v-for="(itemClass, index) in customerClassData"
                      :key="index"
                      :value="itemClass._id"
                      :label="itemClass.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="客戶名稱："
                  prop="company"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.company"
                    placeholder="遠足文化事業股份有限公司(小熊出版社)(禁止交易)"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="公司統編："
                  prop="tax_ID_number"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.tax_ID_number"
                    placeholder="沒有就開二聯發票"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  label="公司電話："
                  prop="company_telephone"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.company_telephone"
                    placeholder="公司電話"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  label="公司傳真："
                  prop="company_fax"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.company_fax"
                    placeholder="公司傳真"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第二列，客戶網站，FB，IG，PINKOI -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <el-form-item
                  label="客戶網站："
                  prop="website"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.website"
                    placeholder="https://myoacg.com/"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="facebook："
                  prop="facebook"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.facebook"
                    placeholder="https://myoacg.com/"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="instagram："
                  prop="instagram"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.instagram"
                    placeholder="https://myoacg.com/"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="pinkoi："
                  prop="pinkoi"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.pinkoi"
                    placeholder="https://myoacg.com/"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第三列，聯絡人姓名，聯絡人手機，聯絡人市電，聯絡人mail，聯絡人職務，備註 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="4">
                <el-form-item
                  label="聯絡人姓名："
                  prop="contact_person_name"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.contact_person_name"
                    placeholder="聯絡人姓名"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4"
                ><el-form-item
                  label="聯絡人職務："
                  prop="contact_person_title"
                  label-width="120px"
                >
                  <el-select
                    @change="customerTitleChange"
                    v-model="customerFormData.contact_person_title"
                    placeholder="聯絡人職務："
                    filterable
                    size="mini"
                  >
                    <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
                    <el-option
                      v-for="(itemTitle, index) in customerTitleData"
                      :key="index"
                      :value="itemTitle._id"
                      :label="itemTitle.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <el-form-item
                  label="客戶網站："
                  prop="website"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.website"
                    placeholder="官方網頁"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <el-form-item
                  label="客戶網站："
                  prop="website"
                  label-width="120px"
                >
                  <el-input
                    v-model="customerFormData.website"
                    placeholder="官方網頁"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-header>

          <el-main> </el-main>

          <el-footer>
            <el-form-item class="text_right">
              <el-button type="warning" @click="dialog.show = false"
                >取消</el-button
              >
              <el-button type="primary" @click="onSubmit('form')"
                >提交</el-button
              >
            </el-form-item>
          </el-footer>
        </el-container>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'customer-dialog',
  props: {
    dialog: Object,
    customerClassData: Array,
    customerTitleData: Array
  },
  components: {},
  data() {
    return {
      // 控制 material cloth dialog 的物件
      customerFormData: {},
      // materialDataForm_rules: {
      form_rules: {
        contact_person_title: [
          { required: true, message: '必選，必須正確', trigger: 'blur' }
        ],
        contact_person_name: [
          { required: true, message: '必選，必須正確', trigger: 'blur' }
        ],
        customer_class: [
          { required: true, message: '必選，必須正確', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '必選，必須正確', trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  watch: {
    customerTitleData(value) {
      console.log(value)
    }
  },
  computed: {
    // 取得使用者資料
    ...mapGetters(['user']),
    // 時間轉換
    getDate() {
      if (!this.customerFormData.last_modify_date) return '目前沒有修改過'
      return this.$moment(this.customerFormData.last_modify_date).format(
        'YYYY年MM月DD日 - HH：mm'
      )
    },
    // 取得修改人的_id 轉換成 name
    getUserNameById() {
      if (!this.customerFormData.last_edit_person) return '目前沒有修改過'
      let name = ''
      this.allUserNameId.forEach((item, index) => {
        if (item._id == this.customerFormData.last_edit_person) name = item.name
      })
      return name
    }
  },
  watch: {
    dialog: function(newValue, oldValue) {
      console.log('dialog', newValue, oldValue)
      // 當 dialog.option == 'add' 的時候就把表格都清空  另外我準備了一個 editData = {} 準備承接 edit 狀態下的 scope.row 資料
      if (newValue.option == 'add')
        this.customerFormData = Object.assign({}, {})
    }
  },
  created() {
    // this.customerFormData = Object.assign({}, this.formData)
  },
  methods: {
    // 客戶的類別異動
    customerClassChange() {},
    customerTitleChange() {},
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.customerFormData.last_edit_person = this.user.id
          this.customerFormData.last_modify_date = new Date()
          const url =
            this.dialog.option == 'add'
              ? 'add'
              : `edit/${this.customerFormData._id}`
          console.log(this.customerFormData)
          return
          this.$axios
            .post(`/api/material/${url}`, this.customerFormData)
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
            message: '有星號的欄位都必須要填寫喔！',
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

.row-bg {
  padding: 0;
  margin: 0;
  height: 40px;
  /* background-color: #f9fafc; */
}
/* 這邊開始是 布局容器 */
body > .el-container {
  margin-bottom: 40px;
}

.el-main {
  margin: 10px 0 0 0;
  padding: 0;
  /* background-color: #e9eef3; */
  /* color: #333; */
  text-align: left;
  /* line-height: 100% !important; */
  height: 100% !important;
}
.el-header,
.el-footer {
  margin: 0;
  padding: 0;
  /* background-color: #b3c0d1; */
  /* color: #333; */
  text-align: left;
  /* line-height: 100%; */
  height: 100% !important;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 100% !important;
}

.el-container:nth-child(7) .el-aside {
  line-height: 100% !important;
}
/* 布局容器 結束 */
</style>
