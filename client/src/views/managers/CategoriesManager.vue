<template>
  <div>
    <div class="customer-manager"></div>
    <el-container>
      <el-header>
        <el-button type="primary" size="small">新增商品代號</el-button>
      </el-header>
      <el-container>
        <el-aside width="400px">商品代號</el-aside>
        <el-aside width="400px">Aside</el-aside>
        <!-- <el-main>Main</el-main> -->
      </el-container>
    </el-container>
    <!-- <MyDialog
      :dialog="dialog"
      :formData="formData"
      @update="getProfile"
    ></MyDialog> -->
  </div>
</template>

<script>
import MyDialog from '../../components/MyDialog'

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
  /* padding: 16px; */
  box-sizing: border-box;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 800px;
  border: 1px solid red;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
