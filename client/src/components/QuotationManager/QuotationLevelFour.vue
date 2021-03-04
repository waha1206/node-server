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
      <!-- 原物料的選擇 -->
      <el-col :span="6">
        <div class="material-group-wrap" v-for="(item, index) in materialGroup">
          <!-- ************************************** 最左側的 ICON **************************************-->
          <div class="material-wrap-left">
            <!-- style="width: 80px; height: 80px" -->
            <!-- 這邊把左邊的圖片放上去，這裡是提醒客戶要選擇的商品圖片提示 -->
            <div v-if="item.imgs[0]">
              <el-image
                class="material-wrap-left-image"
                :key="index"
                :src="item.imgs[0]"
                @click="showImage($event, item.web_side_name, item.imgs[0])"
              >
                <!-- :preview-src-list="item.imgs" -->
              </el-image>
            </div>
            <div v-else>
              <el-image
                :key="index"
                :src="lostImg"
                :preview-src-list="item.imgs"
              >
              </el-image>
            </div>
          </div>
          <!-- ************************************** 右側的 ICON **************************************-->
          <div
            v-if="!selectMaterial[index]"
            class="material-wrap-right"
            @click="handleSelectMaterial(item, index)"
          >
            <el-image
              :key="index"
              :src="selectIcon"
              style="width:80px;height:80px;float:left"
            >
            </el-image>
            <p>點我選擇配件</p>
            <p style="font-weight:bold; color:blue">{{ item.web_side_name }}</p>
            <p>此選項共有：{{ item.choice_level_three_material.length }} 項</p>
            <span style="display:none">{{ num }}</span>
          </div>
          <div
            v-else
            class="material-wrap-right"
            @click="handleSelectMaterial(item, index)"
          >
            <el-image
              :key="index"
              :src="selectMaterial[index].imgs[0]"
              style="width:80px;height:80px;float:left"
              @click="
                showImage(
                  $event,
                  `您選擇的【${item.web_side_name}】是【${selectMaterial[index].product_name}】`,
                  selectMaterial[index].imgs[0]
                )
              "
            >
            </el-image>

            <p>您選擇了以下的配件</p>
            <p style="font-weight:bold; color:blue">
              {{ selectMaterial[index].product_name }}
            </p>

            <span style="display:none">{{ num }}</span>
          </div>
        </div>
      </el-col>
      <!-- 原物料選擇結束 -->

      <!-- 最右側的選項，包含了 數量等等 -->
      <el-col :span="6">
        <!-- 父容器，只決定高度 -->
        <!-- ************************************** 最右側的 ICON **************************************-->
        <div class="other-wrap">
          <div class="other-wrap-left">
            <el-image
              class="other-wrap-left-image"
              :src="numberImage"
              @click="showImage($event, '請選擇訂購數量', numberImage)"
            >
            </el-image>
          </div>
          <div class="other-wrap-right" v-if="options">
            <el-select
              v-model="value"
              clearable
              placeholder="請選擇訂購數量"
              size="large"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="other-wrap">
          <div class="other-wrap-left">
            <el-image
              class="other-wrap-left-image"
              :src="proofingImage"
              @click="showImage($event, '請選擇打樣幾款', proofingImage)"
            >
            </el-image>
          </div>
          <div class="other-wrap-right" v-if="proofingOptions">
            <el-select
              v-model="proofingValue"
              clearable
              placeholder="請選擇打樣幾款"
              size="large"
            >
              <el-option
                v-for="item in proofingOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- ************************************** 這邊是共用的圖片 ************************************** -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      append-to-body
      width="520px"
      center
    >
      <img
        width="480px"
        height="480px"
        fit="contain"
        :src="dialogImgUrl"
        alt=""
      />
    </el-dialog>

    <!-- 子元件 -->
    <!-- 子元件結束 -->
    <!-- 這邊為跳出選擇 material 的 dialog -->
    <QuotationMaterialDialog
      v-if="quotationMaterialDialog"
      :dialog="quotationMaterialDialog"
      @update="updateMaterial"
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
      // 選擇要訂購的商品數量
      options: [],
      value: '',
      proofingOptions: [],
      proofingValue: '',
      // 用來更新 element 重新渲染
      num: 0,
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
      selectMaterial: [],
      // 顯示 dialog image 共用的
      dialogVisible: false,
      dialogImgUrl: '',
      dialogTitle: '',
      // 使用到的圖片
      selectIcon: '../../../images/select.png',
      lostImg: '../../../images/缺圖.jpg',
      src: '../../../images/點擊選擇規格.jpg',
      numberImage: '../../../images/number.jpg',
      proofingImage: '../../../images/proofing.jpg'

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
    this.getProofingOptions()
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
  watch: {
    num() {
      console.log(this.selectMaterial)
      return this.num
    }
  },
  methods: {
    // **********************************************  讀取資料開始 **********************************************
    getCategoryData(id) {
      this.$axios
        .get(`/api/categories/get-category-by-id/${id}`)
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoryData = [...res.data]
          // 把訂購數量塞到 options 裡面 value 跟 table 的數值會是一樣的
          this.categoryData[0].quantity_profit.forEach((item) => {
            let obj = { value: item.quantity, label: item.quantity + '個' }
            this.options.push(obj)
          })
          this.getMaterialGroupData(this.categoryData[0].material_group)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMaterialGroupData(groupId) {
      this.$axios
        .post('/api/material-group/many', groupId)
        .then((res) => {
          // 獲取成功
          this.$message({
            message: '讀取 material group 資料完成',
            type: 'success'
          })
          this.materialGroup = res.data
        })
        .catch((err) => {
          console.log('axios添加數據失敗==>MyDialog.vue==>', err)
        })
    },
    // **********************************************  讀取資料結束 **********************************************
    handleSelectMaterial(item, index) {
      this.quotationMaterialDialog = {
        show: true,
        title: item.name,
        index: index,
        materialGroup: item.choice_level_three_material
      }
    },
    updateMaterial(material, index) {
      // 當子元件更新後，來這邊把選擇的原料放進來，參數應該會有 index 第幾個原料組，跟選擇的原料 _id
      this.quotationMaterialDialog.show = false
      console.log('emit and index', material, index)
      this.selectMaterial[index] = material
      this.num += 1
    },
    reportError() {
      this.quotationMaterialDialog.show = false
    },
    showImage: function(e, title, img) {
      this.dialogTitle = title
      this.dialogImgUrl = img
      this.dialogVisible = true
      e.stopPropagation()
    },
    getProofingOptions() {
      for (let i = 0; i < 21; i++) {
        let obj = { value: i, label: i + '款' }
        if (i == 0) {
          obj.label = '不需要打樣直接生產'
        }
        this.proofingOptions.push(obj)
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
.other-wrap {
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
  cursor: pointer;
}
.other-wrap-left {
  height: 80px;
  width: 80px;
  float: left;
}
.other-wrap-left-image {
  height: 100%;
  width: 100%;
  float: left;
  cursor: pointer;
}

.other-wrap-right {
  width: 320px;
  height: 80px;
  line-height: 80px;
  background-color: rgb(248, 240, 240);
  float: right;
  margin-left: 5px;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
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
