<template>
  <div>
    <div class="customer-manager">
      <p>我是客戶資料管理器</p>
      <el-button type="primary">點我一下</el-button>
    </div>
    <!-- <MyDialog
      :dialog="dialog"
      :formData="formData"
      @update="getProfile"
    ></MyDialog> -->
  </div>
</template>

<script>
import MyDialog from '../../components/FundList/MyDialog'

export default {
  name: 'customer-manager',
  data() {
    return {
      formData: {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      },
      dialog: {
        show: true,
        title: '展示一下',
        option: 'edit'
      }
    }
  },
  components: {
    MyDialog
  }
}
</script>

<style scoped>
.customer-manager {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
</style>
