<template>
  <div class="quotatuin-level-four">
    <el-row v-if="categoryData">
      <el-col :span="8">
        <!-- 如果要支援輪播視頻的話 https://blog.csdn.net/zongmaomx/article/details/108749682 -->
        <!-- indicator-position="outside" -->
        <el-carousel
          class="category-carousel"
          height="480px"
          :autoplay="true"
          v-if="categoryData[0]"
        >
          <el-carousel-item
            v-for="(item, index) in categoryData[0].imgs"
            :key="index"
          >
            <img :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="8">
        <div class="material-group-wrap" v-for="(item, index) in materialGroup">
          <div class="material-wrap-left">
            <!-- style="width: 80px; height: 80px" -->
            <el-image
              class="material-wrap-left-image"
              v-if="item.imgs[0]"
              :key="index"
              :src="item.imgs[0]"
              :preview-src-list="item.imgs"
            >
            </el-image>

            <el-image
              v-else
              :key="index"
              :src="lostImg"
              :preview-src-list="item.imgs"
            >
            </el-image>
          </div>

          <div class="material-wrap-right" @click="selectMaterial(item, index)">
            <p>點我選擇</p>
            <p style="font-weight:bold; color:blue">{{ item.web_side_name }}</p>
            <p>此選項共有：{{ item.choice_level_three_material.length }} 項</p>
          </div>

          <!-- <el-image
            class="img-pointer"
            style="width: 320px; height: 80px"
            :src="src"
            @click="selectMaterial(item, index)"
          >
          </el-image> -->
        </div>
      </el-col>
    </el-row>

    <!-- 子元件 -->
    <!-- 子元件結束 -->
    <!-- 這邊為跳出選擇 material 的 dialog -->
    <QuotationMaterialDialog
      v-if="quotationMaterialDialog"
      :dialog="quotationMaterialDialog"
      @update="updataMaterial"
      @reportError="reportError"
    >
    </QuotationMaterialDialog>
  </div>
</template>

<script>
import QuotationMaterialDialog from '../../components/QuotationManager/QuotationMaterialDialog.vue'

export default {
  name: 'quotation-level-four',
  data() {
    return {
      // 控制 quotatuin material dialog 的物件
      quotationMaterialDialog: {
        show: false,
        title: '請選擇商品規格',
        index: 0,
        materialGroup: {}
      },
      // 這個是 最後被選中的資料，從 level three 那邊傳過來的
      categoryItem: this.$route.params.item,
      categoryData: [],
      materialGroup: [],
      lostImg: '../../../images/缺圖.jpg',
      src: '../../../images/點擊選擇規格.jpg'

      // currentDate: new Date(),
    }
  },
  components: {
    QuotationMaterialDialog
    // GroupLevelOneDialog,
    // GroupLevelTwoDialog,
    // GroupLevelThreeDialog
  },
  created() {
    // this.getCategoriesLevelOneData()
    // this.getCategoriesLevelThreeData()
  },
  beforeRouteEnter(to, from, next) {
    // console.log('元件內的 beforeRouterEnter，不能使用this,因為此時尚未創建成功')
    console.log('Quotation 第四層 beforeRouteEnter')
    next()
  },
  mounted() {
    window.scrollTo(0, 0)
    console.log(this.$route.params)
    this.getCategoryData(this.$route.params.id)
    // 這邊要開始抓 這個 item 裡面需要的所有 原物料組 跟 原物料組裡面的原料
  },
  computed: {
    // getLevelThreeData() {
    //   let levelThreeData = []
    //   this.categoriesLevelThreeData.forEach((item) => {
    //     if (item.level_two_id == this.item._id) levelThreeData.push(item)
    //   })
    //   return levelThreeData
    // }
  },
  methods: {
    // **********************************************  讀取資料開始 **********************************************
    getCategoryData(id) {
      this.$axios
        .get(`/api/categories/get-category-by-id/${id}`)
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoryData = [...res.data]
          console.log(this.categoryData)
          this.getMaterialGroupData(this.categoryData[0].material_group)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMaterialGroupData(groupId) {
      console.log(groupId)
      this.$axios
        .post('/api/material-group/many', groupId)
        .then((res) => {
          // 獲取成功
          this.$message({
            message: '讀取 material group 資料完成',
            type: 'success'
          })
          this.materialGroup = res.data
          console.log('this.materialGroup', this.materialGroup)
        })
        .catch((err) => {
          console.log('axios添加數據失敗==>MyDialog.vue==>', err)
        })
    },
    // **********************************************  讀取資料結束 **********************************************
    selectMaterial(item, index) {
      this.quotationMaterialDialog = {
        show: true,
        title: item.name,
        index: index,
        materialGroup: item.choice_level_three_material
      }
    },
    updataMaterial() {
      // 當子元件更新後，來這邊把選擇的原料放進來，參數應該會有 index 第幾個原料組，跟選擇的原料 _id
    },
    reportError() {
      this.quotationMaterialDialog.show = false
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
  width: 100%;
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

.img-pointer {
  cursor: pointer;
}

/* .image {
  width: 280px;
  height: 280px;
  display: block;
  cursor: pointer;
  border: 0px;
  overflow: hidden;
} */

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
/* .category-carousel {
  height: 480px;
} */
.material-group-wrap {
  float: left;
  height: 80px;
  margin-bottom: 2px;
  text-align: left;
}

.material-wrap-left {
  height: 80px;
  width: 80px;
  float: left;
}
.material-wrap-left-image {
  height: 100%;
  width: 100%;
  float: left;
}

.material-wrap-right {
  width: 320px;
  height: 80px;
  line-height: 80px;
  background-color: rgb(248, 240, 240);
  float: right;
  margin-left: 5px;
  overflow: hidden;
  cursor: pointer;
}
.material-wrap-right p {
  height: 26px;
  line-height: 26px;
  width: auto;
  vertical-align: text-top;
  text-align: center;
}
</style>
