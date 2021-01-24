<template>
  <div class="my-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="1200px"
    >
      <!-- :mmodel 綁定的會是 data return 裡面的某個物件 這邊綁定的是 levelOneData -->
      <el-form
        ref="levelThreeForm"
        :model="levelThreeFormData"
        :rules="form_rules"
        label-width="120px"
        style="margin:10px;width:auto"
      >
        <el-row :gutter="20" type="flex" class="row-bg">
          <el-col :span="8"
            ><div class="grid-content">
              <el-form-item
                label="先選擇大分類："
                size="mini"
                prop="levelOneId"
                label-width="120px"
              >
                <!-- v-model 通常會指定到 formData (要提交的表單) 裡面的某個屬性 這邊是再 data return 裡面的 levelThreeData.levelOneId -->
                <el-select
                  v-model="levelThreeFormData.levelOneId"
                  placeholder="請選擇"
                  filterable
                  @change="levelOneChang"
                  size="mini"
                >
                  <!-- value 這邊綁定的是此 陣列裡面，要傳給 select v-mode 的值 -->
                  <!-- label 就單純的顯示再 input 上面可以看到的文字 -->
                  <el-option
                    v-for="(item, index) in categoriesLevelOneData"
                    :key="index"
                    :label="item.name"
                    :value="item._id"
                  >
                    <span style="float: left">{{ item.type }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.name }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </div></el-col
          >
          <!-- 第二層的下拉選單 -->
          <el-col :span="8"
            ><div class="grid-content">
              <el-form-item
                label="選擇中分類："
                size="mini"
                prop="levelTwoId"
                label-width="120px"
              >
                <el-select
                  v-model="levelThreeFormData.levelTwoId"
                  placeholder="請選擇"
                  filterable
                  @change="levelTwoChang"
                  size="mini"
                >
                  <el-option
                    v-for="(citem, cindex) in updateLevelTwoData"
                    :key="cindex"
                    :label="citem.name"
                    :value="citem._id"
                  >
                    <span style="float: left">{{ citem.type }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ citem.name }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </div></el-col
          >
          <!-- 輸入商品名稱 -->
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item
                label="商品名稱："
                size="mini"
                label-width="120px"
                prop="name"
              >
                <el-input
                  type="name"
                  v-model="levelThreeFormData.name"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
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
                <el-button type="primary" @click="onSubmit('levelThreeForm')"
                  >提交</el-button
                >
                <el-button @click="resetForm('levelThreeForm')">重置</el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表單結束 -->

      <!-- 要提交的formData 裡面的資料 -->
      <p>要提交的表單內容：{{ levelThreeFormData }}</p>
      <p>-----------------</p>
      <p v-for="item in updateLevelTwoData">
        {{ item.type }}{{ item.name }}--{{ item._id }}
      </p>
      <p>-----------------</p>
      <!-- <p v-for="item in categoriesLevelTwoData">{{ item.name }}</p> -->
      <!-- <p>{{ dialog }}</p>
      <p>{{ formData }}</p>
      <p>{{ categoriesLevelOneData }}</p>
      -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'categories-level-three-dialog',
  props: {
    dialog: Object,
    formData: Object,
    categoriesLevelOneData: Array,
    categoriesLevelTwoData: Array
  },
  data() {
    return {
      updateLevelTwoData: [],
      levelThreeFormData: {
        levelOneId: '',
        levelTwoId: '',
        name: ''
      },
      form_rules: {
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    updateLevelTwoData() {
      console.log('恩，有變動')
    }
  },
  methods: {
    levelOneChang(id) {
      this.levelThreeFormData.levelTwoId = ''
      this.updateLevelTwoData = this.categoriesLevelTwoData.filter((item) => {
        return item.level_one_id === id
      })
      console.log(this.updateLevelTwoData)
    },
    levelTwoChang() {},
    onSubmit(formName) {
      console.log(this.$refs[formName])
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 紀錄最後修改的使用者，最後修改的時間放到了 server 端去紀錄
          console.log('喵喵')
          return
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
