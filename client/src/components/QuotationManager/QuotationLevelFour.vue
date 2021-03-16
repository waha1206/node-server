<template>
  <div class="quotatuin-level-four">
    <!-- <el-row v-if="categoryData" style="background-color:black"> -->
    <el-row v-if="categoryData" :gutter="5">
      <el-col :span="6">
        <!-- 如果要支援輪播視頻的話 https://blog.csdn.net/zongmaomx/article/details/108749682 -->
        <!-- indicator-position="outside" -->
        <el-carousel
          class="category-carousel"
          height="360px"
          width="360px"
          :autoplay="true"
          v-if="categoryData[0]"
        >
          <el-carousel-item
            v-for="(item, index) in categoryData[0].imgs"
            :key="index"
          >
            <img style="width:360px; height:360px" :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="6">
        <!-- 父容器，只決定高度 -->
        <!-- ************************************** 最右側的 ICON **************************************-->
        <div class="other-wrap">
          <!-- 左邊的 icon -->
          <div class="other-wrap-left">
            <el-image
              class="other-wrap-left-image"
              :src="numberImage"
              @click="showImage($event, '請選擇訂購數量', numberImage)"
            >
            </el-image>
          </div>
          <!-- 右邊的容器，最低數量 -->
          <div
            class="other-wrap-right"
            v-if="orderOptions"
            style="position:relative;border-radius:8px"
          >
            <!-- style="position:relative;border-radius:8px" -->
            <!-- 右上角的 help 子絕父相 -->
            <el-tooltip class="item" effect="dark" placement="top">
              <el-badge
                value="最低訂購量"
                class="item"
                style="margin-top: 0px;margin-right: 0px;position:absolute;top:-32px;right:0px"
              >
              </el-badge>
              <div slot="content">
                <span
                  >此商品最低訂購數量為：{{
                    categoryData[0].mini_order + ' ' + '個'
                  }}</span
                ><br />
                <span>如果沒有您要的規格請與業務聯繫</span><br />
                <span>LINE：leopharmanex</span><br />
                <span>手機：0918-700586 找 Leo</span><br />
              </div>
            </el-tooltip>

            <div style="float:left;width:100%;">
              <i
                v-if="orderValue"
                class="el-icon-circle-check"
                style="float:left;width:60px;height:80px;line-height:80px;font-size:26px"
              ></i>
              <i
                v-else
                class="el-icon-loading"
                style="float:left;width:60px;height:80px;line-height:80px;font-size:26px"
              ></i>
              <el-select
                style="float:left;height:80px;line-height:80px;overflow:hidden"
                v-model="orderValue"
                clearable
                placeholder="請選擇訂購數量"
                size="large"
                @change="handleCheckField('orderQuantity')"
              >
                <el-option
                  v-for="(item, index) in orderOptions"
                  :key="index + 1"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 第二行 請選擇打樣幾款-->
        <div class="other-wrap">
          <div class="other-wrap-left">
            <!-- 左側的 icon -->
            <el-image
              class="other-wrap-left-image"
              :src="proofingImage"
              @click="showImage($event, '請選擇打樣幾款', proofingImage)"
            >
            </el-image>
          </div>
          <!-- 右邊的容器，最低數量，選擇打樣款式 -->
          <div
            class="other-wrap-right"
            v-if="proofingOptions"
            style="position:relative;border-radius:8px"
          >
            <!-- 右上角的 help 子絕父相 -->
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <span
                  >此商品最低可拆圖數為：{{
                    categoryData[0].split_quantity + ' ' + '個'
                  }}</span
                ><br />
                <span
                  >{{ '訂購' + ' ' + categoryData[0].mini_order + ' ' + '個，'
                  }}{{
                    '可拆圖數為 ' +
                      categoryData[0].mini_order /
                        categoryData[0].split_quantity +
                      ' ' +
                      '圖，以此類推'
                  }}</span
                >
              </div>
              <el-badge
                value="最多可拆圖數"
                class="item"
                style="margin-top: 0px;margin-right: 0px;position:absolute;top:-32px;right:0px"
              >
              </el-badge>
            </el-tooltip>
            <div style="float:left;width:100%">
              <i
                v-if="proofingValue"
                class="el-icon-circle-check"
                style="float:left;width:60px;height:80px;line-height:80px;font-size:26px"
              ></i>
              <i
                v-else
                class="el-icon-loading"
                style="float:left;width:60px;height:80px;line-height:80px;font-size:26px"
              ></i>
              <el-select
                style="float:left;height:80px;line-height:80px;overflow:hidden"
                v-model="proofingValue"
                clearable
                placeholder="請先選擇訂購數量"
                size="large"
                @change="handleCheckField('proofingQuantity')"
              >
                <el-option
                  v-for="(item, index) in proofingOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 請輸入客戶名稱 -->
        <div class="other-wrap">
          <div class="other-wrap-left">
            <!-- 左側的 icon -->
            <el-image
              class="other-wrap-left-image"
              :src="customerImage"
              @click="showImage($event, '請選擇客戶', customerImage)"
            >
            </el-image>
          </div>
          <!-- 右邊的容器，最低數量，選擇打樣款式 -->
          <div
            class="other-wrap-right"
            v-if="proofingOptions"
            style="position:relative;border-radius:8px"
          >
            <div style="float:left;width:100%">
              <i
                v-if="customerValue"
                class="el-icon-circle-check"
                style="float:left;width:60px;height:80px;line-height:80px;font-size:26px"
              ></i>
              <i
                v-else
                class="el-icon-loading"
                style="float:left;width:60px;height:80px;line-height:80px;font-size:26px"
              ></i>
              <el-select
                style="float:left;height:80px;line-height:80px;overflow:hidden"
                v-model="customerValue"
                clearable
                filterable
                placeholder="請輸入客戶名稱"
                size="large"
                @change="handleCheckField('customerCompany')"
              >
                <el-option
                  v-for="(item, index) in customerOptions"
                  :key="item.value + index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="other-wrap">
          <div class="other-wrap-left">
            <!-- 進行報價單檢查 -->
            <!-- 左側的 icon -->
            <el-image
              class="other-wrap-left-image"
              :src="checkImage"
              @click="showImage($event, '檢查報價單是否有錯誤', checkImage)"
            >
            </el-image>
          </div>
          <!-- 右邊的容器，進行報價單檢查的按鈕 -->
          <div
            class="other-wrap-right"
            v-if="proofingOptions"
            style="position:relative;border-radius:8px"
          >
            <div style="float:left;width:100%">
              <i
                v-if="!checkFlag"
                class="el-icon-circle-check"
                style="float:left;width:60px;height:80px;line-height:80px;font-size:26px"
              ></i>
              <i
                v-else
                class="el-icon-loading"
                style="float:left;width:60px;height:80px;line-height:80px;font-size:26px"
              ></i>
              <el-button
                type="primary"
                class="check-btn"
                :disabled="checkFlag"
                @click="handleCheckQuotation"
                >進行報價單檢查</el-button
              >
            </div>
          </div>
        </div>
      </el-col>
      <!-- 原物料的選擇 -->
      <el-col :span="12">
        <div class="material-group-wrap" v-for="(item, index) in materialGroup">
          <!-- ************************************** 最左側的 ICON **************************************-->
          <div class="material-wrap-left">
            <!-- style="width: 80px; height: 80px" -->
            <!-- 這邊把左邊的圖片放上去，這裡是提醒客戶要選擇的商品圖片提示 -->
            <div v-if="item.imgs[0]" style="border-radius:8px;overflow:hidden">
              <el-image
                class="material-wrap-left-image"
                :key="index"
                :src="item.imgs[0]"
                @click="showImage($event, item.web_side_name, item.imgs[0])"
              >
                <!-- :preview-src-list="item.imgs" -->
              </el-image>
            </div>
            <div v-else style="border-radius:8px;overflow:hidden">
              <el-image
                class="material-wrap-left-image"
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
            style="position:relative;border-radius:8px"
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
    </el-row>

    <!-- ************************************** 這邊是共用的圖片 ************************************** -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      append-to-body
      width="530px"
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
      // 該選擇的是否都選擇完畢，選完後就可以開始進行檢查了
      checkFlag: true,
      // 取得 customer name and id
      customerNameAndId: [],
      // 選擇客戶的 company 然後把 _id 放到 customerValue 裡面
      customerOptions: [],
      customerValue: '',
      // 訂購的數量 orderOptions 跟選擇多少數量的 orderValue (放結果)
      orderOptions: [],
      orderValue: '',
      // 打樣的 orderOptions 跟 打樣幾款的 value (放結果)
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
      proofingImage: '../../../images/proofing.jpg',
      checkImage: '../../../images/check.png',
      customerImage: '../../../images/customer.png'

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
    this.getCustomerNameAndId()
    this.initData()
  },
  beforeRouteEnter(to, from, next) {
    // console.log('元件內的 beforeRouterEnter，不能使用this,因為此時尚未創建成功')
    // console.log('Quotation 第四層 beforeRouteEnter')
    next()
  },
  mounted() {
    window.scrollTo(0, 0)
    // console.log(this.$route.params)
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
      // console.log(this.selectMaterial)
      return this.num
    }
  },
  methods: {
    // **********************************************  讀取資料開始 **********************************************
    // 先取得 商品的資料
    getCategoryData(id) {
      this.$axios
        .get(`/api/categories/get-category-by-id/${id}`)
        .then((res) => {
          // 把資料庫的數據都先讀出來
          this.categoryData = [...res.data]
          // 把訂購數量塞到 orderOptions 裡面 value 跟 table 的數值會是一樣的
          this.categoryData[0].quantity_profit.forEach((item) => {
            let obj = { value: item.quantity, label: item.quantity + '個' }
            this.orderOptions.push(obj)
          })
          this.getMaterialGroupData(this.categoryData[0].material_group)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 再根據取得的商品資料裡的 material group id 去找到 group ， 這些 group 裡面會帶有完整的 跟組合完整的 material _id
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
    getCustomerNameAndId() {
      // 輸入客戶名稱的時候用的
      this.$axios
        .get('/api/customer/name-and-id')
        .then((res) => {
          //獲取成功
          this.$message({
            message: '成功取得客戶 name and id',
            type: 'sucess'
          })
          this.customerNameAndId = [...res.data]
          this.customerNameAndId.forEach((item) => {
            let obj = { value: item._id, label: item.company }
            this.customerOptions.push(obj)
          })
        })
        .catch((err) => {
          console.log('get customer name and id fail', err)
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
      // console.log('emit and index', material, index)
      this.selectMaterial[index] = material
      // 很重要的一行，讓元件重新渲染
      this.num += 1
      // 檢查是不是所有欄位都有填寫資料了
      this.handleCheckField()
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
    // 根據要訂購的數量去計算可以打樣的款式有幾款
    getProofingOptions(orderValue) {
      this.proofingOptions.length = 0
      this.proofingValue = ''
      let proofingQuantity = orderValue / this.categoryData[0].split_quantity
      for (let i = 0; i <= proofingQuantity; i++) {
        let obj = { value: i, label: i + '款' }
        if (i == 0) {
          obj.label = '不需要打樣直接生產'
          obj.value = -1
        }
        this.proofingOptions.push(obj)
      }
    },
    // 先賦值給 element 裡 v-if 等判斷式會用到的值，不然會抱錯
    initData() {
      let obj = {}
      obj.mini_order = '0'
      obj.split_quantity = '0'
      this.categoryData.push(obj)
    },
    // 表單是否都有填寫資料了呢？
    handleCheckField(option) {
      // customerValue proofingOptions checkFlag: true,  orderValue
      // this.selectMaterial 選到的配件放這邊    this.materialGroup  要選擇的資料有這幾個
      if (option === 'orderQuantity') this.getProofingOptions(this.orderValue)
      this.customerValue &&
      this.proofingValue != 0 &&
      this.orderValue > 0 &&
      this.selectMaterial.length === this.materialGroup.length
        ? (this.checkFlag = false)
        : (this.checkFlag = true)
    },
    handleCheckQuotation() {
      // 檢查報價單，重頭戲來了
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
  height: 1300px;
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
  margin-left: 10px;
  margin-right: 10px;
}
.other-wrap {
  float: left;
  height: 80px;
  margin-bottom: 2px;
  text-align: left;
}

.check-btn {
  font-size: 18px;
  position: absolute;
  top: 16px;
  left: 60px;
  width: 216px;
}

.material-wrap-left {
  height: 80px;
  width: 80px;
  float: left;
}
.material-wrap-left-image {
  height: 80px;
  width: 80px;
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
  /* cursor: pointer; */
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
