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
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto"
        >
          <!-- 下拉選單的使用範例 -->
          <el-form-item label="收支類型：">
            <el-select v-model="formData.type" placeholder="收支類型">
              <el-option
                v-for="(formtype, index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="describe" label="收支描述：">
            <el-input type="describe" v-model="formData.describe"></el-input>
          </el-form-item>
          <el-form-item prop="income" label="收支：">
            <el-input type="income" v-model="formData.income"></el-input>
          </el-form-item>
          <el-form-item prop="expend" label="花費：">
            <el-input type="expend" v-model="formData.expend"></el-input>
          </el-form-item>
          <el-form-item prop="cash" label="現金帳戶：">
            <el-input type="cash" v-model="formData.cash"></el-input>
          </el-form-item>
          <el-form-item prop="remark" label="備註：">
            <el-input type="remark" v-model="formData.remark"></el-input>
          </el-form-item>

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
export default {
  name: 'my-dialog',
  props: {
    dialog: Object,
    formData: Object
  },
  data() {
    return {
      format_type_list: ['拉鍊', '五金', '棉花', '側標', '香精', '井字結'],
      form_rules: {
        describe: [
          { required: true, message: '此欄位不能為空', trigger: 'blur' }
        ],
        income: [
          { required: true, message: '此欄位不能為空', trigger: 'blur' }
        ],
        expend: [
          { required: true, message: '此欄位不能為空', trigger: 'blur' }
        ],
        cash: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid && !this.formData.type == '') {
          const url =
            this.dialog.option == 'add' ? 'add' : `edit/${this.formData.id}`
          this.$axios
            .post(`/api/profiles/${url}`, this.formData)
            .then((res) => {
              console.log('成功嚕')
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
  }
}
</script>

<style scoped></style>
