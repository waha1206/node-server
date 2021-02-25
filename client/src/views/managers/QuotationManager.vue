<template>
  <div class="quotatuin-manager">
    <el-container>
      <el-header>
        <el-button type="primary" size="small" @click=""
          >新增第一層分類</el-button
        >
        <el-button type="primary" size="small" @click=""
          >新增第二層分類</el-button
        >
        <el-button type="primary" size="small" @click=""
          >新增原物料容器</el-button
        >
      </el-header>
      <el-main>
        <el-breadcrumb class="breadcrumb" separator=">">
          <el-breadcrumb-item :to="{ path: 'quotation-manager' }"
            >回到首頁</el-breadcrumb-item
          >
          <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
            {{ item.meta.title }}
            <!-- <router-link v-if="item.url" :to="item.url">{{
              item.name
            }}</router-link> -->
          </el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
      <el-footer></el-footer>
    </el-container>

    <!-- 子元件 -->
    <!-- 子元件結束 -->
  </div>
</template>

<script>
export default {
  name: 'quotation-manager',
  data() {
    return {
      breadList: []
    }
  },
  components: {},
  watch: {
    $route(val) {
      console.log('manager watch $route', val)
      this.getBreadList(val)

      // this.getBreadcrumb()
    }
  },
  created() {
    // this.getBreadcrumb()
  },
  beforeRouteEnter(to, from, next) {
    // console.log('元件內的 beforeRouterEnter，不能使用this,因為此時尚未創建成功')
    console.log('Quotation beforeRouteEnter')

    next()
  },
  methods: {
    getBreadList(val) {
      if (val.matched) {
        let matched = val.matched.filter((item) => item.meta && item.meta.title)
        this.breadList = matched
      }
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}
.el-footer {
  background-color: #fff;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 800px;
  border: 1px solid red;
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  line-height: 160px;
  width: 1700px;
  height: 100%;
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

.pagination {
  text-align: left;
  margin-top: 10px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 280px;
  display: block;
  cursor: pointer;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.info-wrap {
  padding: 14px;
  /* height: 120px; */
  /* height: 10px; */
  line-height: 100%;
}

.breadcrumb {
  margin-bottom: 10px;
  font-size: 18px;
}
</style>
