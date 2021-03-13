<template>
  <div class="customer-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="1200px"
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
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6"
                ><el-form-item label="客戶分類：" prop="test">
                  <el-select
                    @change="customerClassChange"
                    v-model="formData.test"
                    placeholder="原料分類"
                    filterable
                    size="mini"
                  >
                    <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
                    <el-option
                      v-for="(materialClass, index) in customerClassData"
                      :key="index"
                      :value="materialClass._id"
                      :label="materialClass.name"
                    ></el-option>
                  </el-select>
                </el-form-item> </el-col
            ></el-row>
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
    formData: Object
  },
  components: {},
  data() {
    return {
      temp: '',
      // 控制 material cloth dialog 的物件
      customerFormData: {},

      // materialDataForm_rules: {
      form_rules: {
        kind: [{ required: true, message: '必選，必須正確', trigger: 'blur' }]
      }
    }
  },
  created() {},
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
    }
  },
  created() {
    this.customerFormData = Object.assign({}, this.formData)
  },
  methods: {
    // 客戶的類別異動
    customerClassChange() {},
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.customerFormData.last_edit_person = this.user.id
          this.customerFormData.last_modify_date = new Date()
          const url =
            this.dialog.option == 'add'
              ? 'add'
              : `edit/${this.customerFormData._id}`
          console.log(this.formData)
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
