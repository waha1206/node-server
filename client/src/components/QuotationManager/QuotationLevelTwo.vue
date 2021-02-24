<template>
  <div class="quotatuin-level-two">
    <el-row>
      <el-col :span="4" v-for="(item, index) in getLevelTwoData" :key="index">
        <el-card :body-style="{ padding: '0px', margin: '0px' }">
          <img :src="item.imgs[0]" class="image" />
          <div class="info-wrap">
            <span>{{ item.name }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">點我看分類</el-button>
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
      item: this.$route.params.item,
      // currentDate: new Date(),
      currentDate: '2021-2-23',
      // categoriesLevelOneData: [], // 開始就先讀取資料庫的數據
      categoriesLevelTwoData: [] // 開始就先讀取資料庫的數據
      // categoriesLevelThreeData: [] // 開始就先讀取資料庫的數據
    }
  },
  components: {
    // GroupLevelOneDialog,
    // GroupLevelTwoDialog,
    // GroupLevelThreeDialog
  },
  created() {
    // this.getCategoriesLevelOneData()
    this.getCategoriesLevelTwoData()
    // this.getCategoriesLevelThreeData()
  },
  mounted() {
    console.log('這個是從 Quotation 傳遞過來的 item 內容', this.item)
  },
  computed: {
    getLevelTwoData() {
      let levelTwoData = []
      this.categoriesLevelTwoData.forEach((item) => {
        if (item.level_one_id == this.item._id) levelTwoData.push(item)
      })

      console.log('this.item._id', this.item._id)
      console.log('levelTwoData', levelTwoData)
      return levelTwoData
    }
  },
  methods: {
    // **********************************************  讀取資料開始 **********************************************
    // 一開始就取得 商品分類代號資訊
    getCategoriesLevelOneData() {
      this.$axios
        .get('/api/categories')
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoriesLevelOneData = res.data
          // 設置分頁數據
          // this.setPaginations()
          this.getLevelTwoData()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCategoriesLevelTwoData() {
      this.$axios
        .get('/api/categories/two')
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoriesLevelTwoData = res.data
          // 設置分頁數據
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 取得第三層的商品資訊，使用選擇到的第二層分類 id ，回傳值忽略掉 imgs 欄位，有需要再另外取得
    getCategoriesLevelThreeData() {
      // if (!this.choiceLevelTwoValue[1]) return
      // this.$axios
      //   .get(`/api/categories/three/${this.choiceLevelTwoValue[1]}`)
      //   .then((res) => {
      //     // 把資料庫的數據都先讀出來
      //     this.categoriesLevelThreeData = [...res.data]
      //     // 設置分頁數據
      //     // this.setPaginations()
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
    },
    // **********************************************  讀取資料結束 **********************************************
    // 新增第一層
    addGroupLevelOne() {
      this.addLevelOneDialog = {
        show: true,
        title: '新增加第一層的商品分類組合',
        option: 'add'
      }
    },
    // 新增第二層
    addGroupLevelTwo() {
      this.addLevelTwoDialog = {
        show: true,
        title: '新增加第二層的商品分類組合',
        option: 'add'
      }
    },
    // 新增原物料組合 (這邊是空殼)
    addGroupLevelThree() {
      this.addLevelThreeDialog = {
        show: true,
        title: '新增加第三層的商品組合',
        option: 'add'
      }
    }
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
