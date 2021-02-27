<template>
  <div class="quotatuin-level-two">
    <el-row>
      <el-col :span="4" v-for="(item, index) in getLevelTwoData" :key="index">
        <el-card :body-style="{ padding: '0px', margin: '0px' }">
          <img :src="item.imgs[0]" class="image" @click="updatePath(item)" />
          <div class="info-wrap">
            <span>{{ item.name }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button" @click="updatePath(item)"
                >點我看分類</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 子元件 -->
    <!-- 子元件結束 -->
  </div>
</template>

<script>
export default {
  name: 'quotation-level-two',
  data() {
    return {
      id: this.$route.params.id,
      // currentDate: new Date(),
      currentDate: '2021-2-23',
      // categoriesLevelOneData: [], // 開始就先讀取資料庫的數據
      categoriesLevelTwoData: [] // 開始就先讀取資料庫的數據
      // categoriesLevelThreeData: [] // 開始就先讀取資料庫的數據
    }
  },
  components: {},
  created() {},
  beforeRouteEnter(to, from, next) {
    // console.log('元件內的 beforeRouterEnter，不能使用this,因為此時尚未創建成功')
    console.log('Quotation 第二層 beforeRouteEnter')
    next()
  },
  mounted() {
    this.getCategoriesLevelTwoData(this.id)
  },
  computed: {
    getLevelTwoData() {
      let levelTwoData = []
      this.categoriesLevelTwoData.forEach((item) => {
        if (item.level_one_id == this.id) levelTwoData.push(item)
      })
      return levelTwoData
    }
  },

  methods: {
    // 跳到第三層，並且把參數帶過去，這邊的參數是第二層選到的 item
    updatePath(item) {
      this.$router.push({
        name: 'quotation-level-three',
        params: { id: item._id, name: item.name }
      })
    },
    // **********************************************  讀取資料開始 **********************************************
    getCategoriesLevelTwoData(id) {
      this.$axios
        .get(`/api/categories/two/${id}`)
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoriesLevelTwoData = res.data
          // 設置分頁數據
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // **********************************************  讀取資料結束 **********************************************
  }
}
</script>

<style scoped>
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
  width: 1700px;
  height: 1200px;
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
  height: 280px;
  display: block;
  cursor: pointer;
  border: 0px;
  overflow: hidden;
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
</style>
