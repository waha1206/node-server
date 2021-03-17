<template>
  <div class="quotatuin-manager">
    <el-container>
      <el-header>
        <el-button type="primary" size="small" @click="">報價單查詢</el-button>
        <el-button type="primary" size="small" @click=""
          >查詢單一客戶</el-button
        >
        <el-button type="primary" size="small" @click=""
          >新增原物料容器</el-button
        >
      </el-header>
      <el-main>
        <el-breadcrumb class="breadcrumb" separator=">">
          <el-breadcrumb-item :to="{ path: '/quotation-manager' }"
            >回到首頁</el-breadcrumb-item
          >
          <el-breadcrumb-item
            v-for="(item, index) in breadList"
            :key="index"
            :to="{ path: item.path }"
          >
            {{ item.title }}

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
    // 路由傳遞一個或多個參數
    // https://blog.csdn.net/weixin_40297452/article/details/90704936
    $route(val) {
      // console.log(' --------------- manager watch $route --------------- ', val)
      const { id, name } = this.$route.params
      // console.log(val.path)
      // console.log(id, name)
      this.getBreadList(val)

      // this.getBreadcrumb()
    }
  },
  created() {
    // this.getBreadcrumb()
  },
  beforeRouteEnter(to, from, next) {
    // console.log('元件內的 beforeRouterEnter，不能使用this,因為此時尚未創建成功')
    console.log('Quotation 管理員 beforeRouteEnter')
    next()
  },
  methods: {
    getBreadList(val) {
      // 注意 要理解到 matched 是一個物件
      if (val.matched) {
        let matched = val.matched.filter((item) => item.meta && item.meta.title)
        // 如果是選到 第一層分類 (這邊顯示為 回到首頁) 就把 breadList 清空
        if (matched[0].meta.title == '第一層分類') {
          this.breadList = []
        } else {
          // 如果 麵包屑 已經有了該 path 就不要在記錄起來
          let findPath = this.breadList.find((item) => {
            return item.path == val.path
          })
          // 如果點選到的 第 n 層 沒有在 this.breadList 裡面，就加入
          if (!findPath)
            // 從這邊去修改看看方向對不對！
            // 這邊要加判斷，要是 title 不等於 permission: ['quotation_authority_r'] 的話，就不能塞進去 this.breadList 而且要清空 this.breadList
            this.breadList.push({
              title: matched[0].meta.title + '【' + val.params.name + '】',
              path: val.path
            })
          else {
            // 刪除掉 點選到的 第 n 層 後面的物件
            this.breadList.length = this.breadList.indexOf(findPath) + 1
          }
        }
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
  width: 1750px;
  height: 100%;
  padding: 5px;
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
