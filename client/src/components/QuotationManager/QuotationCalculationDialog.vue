<template>
  <div class="my-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="1580px"
    >
      <el-container>
        <el-aside width="50%"
          ><el-row>
            <el-col
              :span="24"
              v-for="(item, index) in quotationForm.save_calculation_data"
              :key="index"
            >
              <!-- 如果 kind === 2 下面是揭示 表布的各種計算欄位 -->
              <!-- 這邊的 kind 是 原物料當中的 kind 2 = 轉印布料 3 = 非轉印布料 -->
              <div
                v-if="
                  item.materialKind === 2 ||
                    item.materialKind === 3 ||
                    item.materialKind === 4
                "
                class="cloth-warp"
              >
                <!-- 這邊的 groupKind = 原物料組 裡面的 kind -->
                <!-- 1 = 表布專用  2= 裡布專用(枕類代表背面) -->
                <span class="cloth-content">
                  <el-tag size="mini" type="danger">{{
                    item.name
                  }}</el-tag></span
                >

                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '布料幅寬：' + item.clothWidth + ' 公分'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '版型寬：' + item.layoutWidth + ' 公分'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '版型高：' + item.layoutHeight + ' 公分'
                  }}</el-tag></span
                >
                <span class="cloth-content" v-if="item.typesetting">
                  <el-tag size="mini">智慧排版：是</el-tag></span
                >
                <span class="cloth-content" v-else>
                  <el-tag size="mini">智慧排版：否</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '排版耗損率：' + item.lossPercentage + ' %'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '印布耗損率：' + item.clothLoss + ' %'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '橫排：' + item.rowNumber + ' 個'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '使用布長：' + item.clothHeight + ' 公分'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '布料才積：' + item.clothArea + ' 才'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '布料小計：' + item.clothFee + ' 元'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '轉印紙總計：' + item.paperFee + ' 元'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '墨水總計：' + item.inkFee + ' 元'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '訂購數量：' + item.orderValue + ' 個'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '平車費用：' + item.tailorFee + ' 元'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '裁切布料費用：' + item.cropFee + ' 元'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '轉印增加長度：' + item.additionalHeight + ' 公分'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '轉印紙增加費用：' + item.additionalPaperFee + ' 元'
                  }}</el-tag></span
                >
                <span class="cloth-content">
                  <el-tag size="mini">{{
                    '布料增加費用：' + item.additionalClothFee + ' 元'
                  }}</el-tag></span
                >
                <span class="cloth-content" v-if="item.materialKind === 2">
                  <el-tag size="mini">{{
                    '總計 (墨水+紙+布) * 印布耗損率 + 額外紙跟布：' +
                      item.realFee +
                      ' 元 (不含平車與裁切布料費用)'
                  }}</el-tag></span
                >
                <span class="cloth-content" v-if="item.materialKind === 4">
                  <el-tag size="mini">{{
                    '總計 (墨水+紙+布) * 印布耗損率 + 額外紙跟布：' +
                      item.realFee +
                      ' 元 (含平車與裁切布料費用*訂購數量)'
                  }}</el-tag></span
                >
                <!-- <span class="cloth-content">
                  <el-tag size="mini">{{
                    '目前 quotationForm.save_calculation_data 有 ' +
                      quotationForm.save_calculation_data.length +
                      ' 筆 資料'
                  }}</el-tag></span
                > -->
              </div>
              <div v-else-if="item.materialKind === 1" class="material-warp">
                <span class="material-content">
                  <el-tag size="mini" type="danger">{{
                    item.name
                  }}</el-tag></span
                >
                <span class="material-content">
                  <el-tag size="mini">{{
                    '原料成本：' + item.unitPrice + ' 元'
                  }}</el-tag></span
                >
                <span class="material-content">
                  <el-tag size="mini" v-if="item.processingFeeFlag">{{
                    '有無加工費：有'
                  }}</el-tag>
                  <el-tag size="mini" v-else>{{
                    '有無加工費：無'
                  }}</el-tag></span
                >
                <span class="material-content">
                  <el-tag size="mini">{{
                    '加工費用：' + item.processingFee + ' 元'
                  }}</el-tag></span
                >
              </div>
              <!-- 這邊的 kind 是 原物料當中的 kind 2 = 轉印布料 3 = 非轉印布料 -->
            </el-col>
          </el-row></el-aside
        >
        <el-main
          ><el-row>
            <el-col :span="24">
              <div class="quotation-warp">
                <p class="quotation-content">
                  商品名稱：{{ quotationForm.category_name }}
                </p>
                <p class="quotation-content">
                  訂購數量：{{ quotationForm.order_value }} 個
                </p>
                <p class="quotation-content">
                  毛利：{{ quotationForm.profit }} %
                </p>
                <p class="quotation-content">
                  打樣數量：{{ quotationForm.proofing_value }} 款
                </p>
                <p class="quotation-content">
                  打樣費用：{{ quotationForm.proofing_price }} (元/單款)
                  小計：{{
                    quotationForm.proofing_price * quotationForm.proofing_value
                  }}
                  元
                </p>
                <p class="quotation-content">
                  平車費用：{{ quotationForm.tailor_fee }} (元/個) 小計：{{
                    quotationForm.tailor_fee * quotationForm.order_value
                  }}
                  元
                </p>
                <p class="quotation-content">
                  裁切費用：{{ quotationForm.crop_fee }} (元/個) 小計：{{
                    quotationForm.crop_fee * quotationForm.order_value
                  }}
                  元
                </p>
                <p class="quotation-content">
                  商品單價：{{ quotationForm.unit_price }} 元
                </p>
                <p class="quotation-content">
                  裝箱數：{{ quotationForm.carton }} 箱
                </p>
                <p class="quotation-content">
                  箱子成本：{{ quotationForm.carton_fee }} 元
                </p>
                <p class="quotation-content">
                  每箱運費：{{ quotationForm.delivery_fee }} 元
                </p>
                <p class="quotation-content">
                  未稅總運費：{{ quotationForm.total_delivery_fee }} 元 →
                  幾箱*(單箱運費+箱子成本) 會再加上利潤
                </p>
                <p class="quotation-content">
                  未稅總金額：{{ quotationForm.total_amount }} 元
                </p>
                <p class="quotation-content">
                  營業稅：{{ quotationForm.tax }} 元
                </p>
                <p class="quotation-content">
                  含稅總金額：{{ quotationForm.total_amount_tax }} 元
                </p>
              </div>
            </el-col>
            <el-col :span="24">
              <div
                class="quotation-warp"
                v-for="(item, index) in quotationForm.save_calculation_data"
                :key="index"
              >
                <p class="quotation-content">
                  {{ item.name }}：{{ item.realFee }} 元 <br />
                </p></div
            ></el-col> </el-row
        ></el-main>
      </el-container>
      <el-container>
        <el-footer>
          <el-button type="primary" @click="onSubmit">儲存報價單</el-button>
        </el-footer>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import { isEmpty, appendZero, appendThreeZero } from '../../utils/tools'

export default {
  name: 'quotation-calculation-dialog',
  props: {
    dialog: Object
  },
  data() {
    return {
      // 所有布料的資訊
      clothData: [],
      // 紀錄 一般原料
      calculationMaterial: {},
      emptyCalculationMaterial: {
        materialKind: 0, // 1.記錄了是哪一種的原料類型，每種資料 kind 有不同的紀錄欄位 1.一般原料 2.轉印布料 3.現成布料 4.配件專用
        groupKind: 0, // 1.表布  2.裡布  3.一般原料與配件類
        unitPrice: 0, // 2.原料成本
        processingFeeFlag: false, // 3.是否要帶上加工費用
        processingFee: 0, // 4.加工費用
        realFee: 0, // 總金額 = 原物料成本加上加工費用 * 訂購數量
        name: '', // 顯示在網頁上辨識的名稱
        materialId: '' // 原物料的 _id
      },
      // 紀錄 布料配件
      claculationAccessory: {},
      emptyCalculationAccessory: {
        materialKind: 0 // 1.記錄了是哪一種的原料類型，每種資料 kind 有不同的紀錄欄位 1.一般原料 2.轉印布料 3.現成布料 4.配件專用
      },
      // calculationCloth 這邊會記錄 外層布料的 所有訊息狀態
      calculationCloth: {},
      emptyCalculationCloth: {
        materialKind: 0, // 1.記錄了是哪一種的原料類型，每種資料 kind 有不同的紀錄欄位 1.一般原料 2.轉印布料 3.現成布料 4.配件專用
        typesetting: false, // 2.是否啟用智慧排版
        clothHeight: 0, // 3.使用了多少的布料，總長度單位為公分，取最大的接近整數
        clothArea: 0, // 4.使用的布料他的才積，取最大的接近整數
        rowNumber: 0, // 5.橫向可以排幾個版型
        clothWidth: 0, // 6.布料的幅寬
        lossPercentage: 0, // 7.排版的耗損率 最多不超過 50%
        cloth30x30Price: 0, // 8.布料每才的成本
        clothFee: 0, // 9.布料小計
        inkCcPrice: 0, // 10.墨水每 cc 的成本
        ink30x30Price: 0, // 11.墨水噴每才的成本
        inkFee: 0, // 12.此商品使用墨水的成本總計
        paper1CmPrice: 0, // 13.每公分長度的紙的成本
        paperFee: 0, // 14.此商品使用紙的成本總計
        layoutWidth: 0, // 15.版型寬
        layoutHeight: 0, // 16.版型高
        clothLoss: 0, // 17.印布損耗率
        realFee: 0, // 18.(布料+墨水+紙) * (1+轉印布料的耗損率)
        orderValue: 0, // 19.訂購數量
        tailorFee: 0, // 20.平車費用
        cropFee: 0, // 21.裁切費用
        additionalHeight: 0, // 22.追加紙跟布料的長度
        additionalPaperFee: 0, // 23.額外增加的轉印紙費用
        additionalClothFee: 0, // 24.額外增加的布料費用
        groupKind: 0, // 25.原物料組的 kind 1.表布 2.裡布 3.一般原料跟配件
        name: '', // 26.這是哪種原物料的文字說明
        materialId: '' // 27.原物料的 _id
      },
      // 報價單欄位開始，這邊的資料會存放到報價單的資料庫裏面，最原始的資料
      quotationForm: {},
      emptyQuotationForm: {
        category_id: '', // 紀錄商品的 _id
        category_name: '', // 商品的名稱
        order_value: '', // 訂購數量
        profit: '', // 利潤
        carton: '', // 裝箱數
        net_weight: '', // 商品淨重
        delivery_fee: '', // 單箱運費 (含稅)
        carton_fee: '', // 箱子費用 (含稅)
        total_delivery_fee: '', // 總運費 = (carton_fee + delivery_fee)*carton
        proofing_value: '', // 打樣數量
        sales_value: '', // 業務的 _id
        customer_value: '', // 客戶的 _id
        material_group: [], // 選擇商品規格的 _id 原料組
        select_material: [], // 這筆訂單選擇哪些的 原料
        tailor_fee: 0, // 主體平車費用
        crop_fee: 0, // 主體裁切費用
        unit_price: 0, // 商品單價 - 已經有計算利潤
        proofing_price: 0, // 單款打樣費用 - 已經有計算利潤
        total_amount: 0, // 總金額 - 已經有計算利潤
        total_amount_tax: 0, // 含稅總金額 - 已經有計算利潤
        tax: 0, // 稅，已經做好四捨五入了
        // 紀錄每一個進來的 表布，裡布，配件 的相關資訊
        creation_date: Date, // 訂單最一開始被建立的日期
        modified_date: Date, // 最後被修改的日期
        modifiedUser_id: '', // 最後一個修改人
        index_date: '', // 索引日期 年月日  210331  六碼
        quotation_no: '',
        // 有幾種設定就 push 幾種進來這裡
        save_calculation_data: [],
        level_one_id: '',
        level_two_id: ''
      },

      // 報價單欄位結束
      // 驗證表單，form_rules 這個是驗證 addForm 的欄位
      form_rules: {
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        describe: [
          { required: true, message: '此欄位不能為空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAllCloth()
  },
  watch: {
    dialog(dialog) {
      this.calculationCloth = Object.assign({}, this.emptyCalculationCloth)
      this.quotationForm = Object.assign({}, this.emptyQuotationForm)
      this.quotationForm.save_calculation_data.length = 0
      // 先把重要的資料存起來
      this.handleSaveQuotationData(dialog.calculationData)
      // 然後計算一下報價單內容
      this.handleCalculationData(dialog.calculationData).then(() => {
        // 最後計把小計跟總金額都精算一次
        this.handleCalculationFee(dialog.calculationData.categoryData[0])
      })
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    // **********************************************  axios 開始 **********************************************
    // 取得墨水或是紙的的原料資訊，最主要是要找到裡面的 unit_price
    getMaterialData(id) {
      return this.$axios
        .get(`/api/material/get-material-by-id/${id}`)
        .catch((err) => {
          console.log(err)
        })
    },
    getQuantityOfQuotationAtDay(index_date) {
      return this.$axios
        .get(`/api/quotation/quantity/${index_date}`)
        .catch((err) => {
          console.log(err)
        })
    },
    getAllCloth() {
      this.$axios
        .get('/api/material/cloth/')
        .then((res) => {
          // 添加成功
          this.$message({
            message: '獲取布料資訊成功！',
            type: 'success'
          })
          this.clothData.length = 0
          this.clothData = res.data.map((item) => {
            let obj = {}
            obj.productName = item.product_name
            obj.id = item._id
            obj.unitPrice = item.unit_price
            obj.clothWidth = item.cloth_width
            return obj
          })
        })
        .catch((err) => {
          console.log('axios獲取布料資訊失敗', err)
        })
    },
    // 新增商品類別代號
    onSubmit() {
      const uploadFormData = Object.assign({}, this.quotationForm)
      console.log(uploadFormData)
      this.$message({
        message: '暫時不提供儲存功能！',
        type: 'error'
      })
      return
      if (!uploadFormData.quotation_no) {
        this.$message({
          message: '報價單出錯了！',
          type: 'success'
        })
        return
      }
      this.$axios
        .post('/api/quotation/add', uploadFormData)
        .then((res) => {
          // 添加成功
          this.$message({
            message: '報價單添加成功',
            type: 'success'
          })
          this.$emit('update')
        })
        .catch((err) => {
          console.log('報價單添加失敗==>', err)
        })
      // }
      // })
    },
    // **********************************************  axios 結束 **********************************************
    // **********************************************  計算報價相關 開始 **********************************************
    // 最後，精算一下小計，總計，打樣費等等，然後放到 quotationForm 裡面
    async handleCalculationFee(category) {
      let average_unit_price = 0
      let total_amount = 0
      let average_unit_price_profit = 0
      let total_amount_profit = 0
      let proofing_price

      if (
        category.carton_id == undefined ||
        category.delivery_id == undefined
      ) {
        this.$message({
          message: '請檢查紙箱跟運費設定是否有錯誤！',
          type: 'error'
        })
        return
      }
      // 這邊寫得很爛 carton.data.unit_price ( 不管布料，墨水，還是原物料，都使用 單位售價 unit_price )
      let carton = await this.getMaterialData(category.carton_id)
      // 要取得 delivery.data.unit_price
      let delivery = await this.getMaterialData(category.delivery_id)

      this.quotationForm.carton_fee = carton.data.unit_price
      this.quotationForm.delivery_fee = delivery.data.unit_price
      this.quotationForm.total_delivery_fee =
        (parseInt(carton.data.unit_price) +
          parseInt(delivery.data.unit_price)) *
        parseInt(this.quotationForm.carton)

      // 計算出總金額先把所有的金額都抓出來，這邊是 material 中所有的 real_fee
      this.quotationForm.save_calculation_data.forEach((item) => {
        total_amount += item.realFee
      })

      // 再來把 category 裡的 平車跟裁切費用 乘上 訂購數量 再加上上面的
      total_amount +=
        (Number(this.quotationForm.tailor_fee) +
          Number(this.quotationForm.crop_fee)) *
        this.quotationForm.order_value

      // 把總金額再加上運費
      total_amount += this.quotationForm.total_delivery_fee

      // 這邊把總金額除以 1-profit 取完總金額利潤後再往下算單價
      total_amount_profit = total_amount / (1 - this.quotationForm.profit / 100)

      // 把單價無條件進位整數取得整數
      average_unit_price_profit = Math.ceil(
        total_amount_profit / Number(this.quotationForm.order_value)
      )

      // 再把總金額更新一下，金額會增加一點點，確保是無虧損的狀態
      total_amount_profit =
        average_unit_price_profit * Number(this.quotationForm.order_value)

      // 核算打樣費用，有利潤的成本，邏輯大概是 成本 * 2 + 運費 80元

      proofing_price =
        average_unit_price_profit * 2 + 100 > 500
          ? average_unit_price_profit * 2 + 100
          : 500

      // 最後，訂單金額 = total_amount_profit + 打樣費用
      // console.log(total_amount_profit)
      // console.log(proofing_price * Number(this.quotationForm.proofing_value))
      total_amount_profit =
        total_amount_profit +
        proofing_price * Number(this.quotationForm.proofing_value)
      // console.log('total_amount', total_amount)
      // console.log('total_amount_profit', total_amount_profit)
      // console.log('average_unit_price', average_unit_price)
      // console.log('average_unit_price_profit', average_unit_price_profit)
      // console.log('proofing_price', proofing_price)

      // 紀錄打樣費用 (單款)
      this.quotationForm.proofing_price = proofing_price
      // 紀錄商品單價 (未稅，有利潤的)
      this.quotationForm.unit_price = average_unit_price_profit
      // 記錄總金額 (含打樣費用了)
      this.quotationForm.total_amount = total_amount_profit

      // 記錄含稅總金額，並且四捨五入
      this.quotationForm.tax = Math.round(total_amount_profit * 0.05)
      // 記錄含稅總金額，並且四捨五入
      this.quotationForm.total_amount_tax =
        total_amount_profit + this.quotationForm.tax

      // 日期等等
      this.quotationForm.creation_date = new Date()
      this.quotationForm.modified_date = new Date()
      this.quotationForm.modifiedUser_id = this.user.id

      // 訂單編號的文章參考 https://my.oschina.net/zqouba/blog/718224
      // 資料庫有3筆資料 取 res.data.length
      // appendThreeZero(res.data.length)
      // appendThreeZero 確保輸出是四位數字 1-9999
      // 然後轉換成陣列 split 把 字串拆開後放到 array 裡面
      // 超過 999 的時候 要另外處理 (尚未寫這段程式碼)

      // 日期前六碼 + '-' + 毫秒 5 位數
      const d = new Date()
      this.quotationForm.index_date =
        (d.getFullYear() % 100) +
        '' +
        appendZero(d.getMonth() + 1) +
        appendZero(d.getDate())

      const num = this.getQuantityOfQuotationAtDay(
        this.quotationForm.index_date
      ).then((num) => {
        // 找到資料庫有幾筆資料後加 1 = 今日的訂單流水號
        this.setQuotationNo(num.data.length + 1)
      })
    },
    // 建立報價單編號
    setQuotationNo(num) {
      const d = new Date()
      let get_no = appendThreeZero(num).split('')
      let gt = d.getTime() % 1000000
      gt = gt < 100000 ? gt + 100000 : gt

      var quotation_no = this.quotationForm.index_date + '-' + gt
      // 把字串拆成 array 然後再插入 訂單流水號 get_no
      let arr = quotation_no.split('')
      // 這邊是把 5 位數的毫秒混入 訂單流水號
      for (let i = 0; i < get_no.length; i++) {
        arr.splice(9 + i * 2, 0, get_no[i])
      }

      quotation_no = arr.join('')
      console.log('訂單編號：', quotation_no)
      console.log('訂單內容', this.quotationForm)
      this.quotationForm.quotation_no = quotation_no
    },

    // 儲存 報價單的資料
    // forEach map ... 等各種的用法如下，forEach 不會 return 值，如果要 return 用 map
    // https://wcc723.github.io/javascript/2017/06/29/es6-native-array/
    async handleSaveQuotationData(dialogData) {
      this.quotationForm.category_id = dialogData.categoryData[0]._id // 記錄這張報價單的來源 _id
      this.quotationForm.category_name = dialogData.categoryData[0].name // 商品名稱
      this.quotationForm.tailor_fee = dialogData.categoryData[0].tailor_fee // 平車費用
      this.quotationForm.crop_fee = dialogData.categoryData[0].crop_fee // 裁切費用
      this.quotationForm.sales_value = dialogData.salesValue // 業務 _id
      this.quotationForm.customer_value = dialogData.customerValue // 客戶 _id
      this.quotationForm.order_value = dialogData.orderValue // 訂購數量
      this.quotationForm.level_one_id = dialogData.categoryData[0].level_one_id
      this.quotationForm.level_two_id = dialogData.categoryData[0].level_two_id
      if (dialogData.proofingValue > 0)
        this.quotationForm.proofing_value = dialogData.proofingValue
      // 打樣數量
      else this.quotationForm.proofing_value = 0

      this.quotationForm.material_group = dialogData.materialGroup.map(
        (item) => {
          return item._id
        }
      )
      this.quotationForm.select_material = dialogData.selectMaterial.map(
        (item) => {
          return item._id
        }
      )
      // 從訂購的數量找到他的利潤
      let quantity_profit = dialogData.categoryData[0].quantity_profit.find(
        (item) => {
          return item.quantity === dialogData.orderValue
        }
      )
      this.quotationForm.profit = quantity_profit.profit
      this.quotationForm.net_weight = quantity_profit.net_weight
      this.quotationForm.carton = quantity_profit.carton
    },
    // 如何使用異步讀取 server 資料，完美的解答
    // https://stackoverflow.com/questions/54955426/how-to-use-async-await-in-vue-js
    async handleCalculationData(calculationData) {
      // calculationData 下面有三天王
      // selectMaterial - 客戶選擇的原料 selectMaterial
      // materialGroup - 官方設定的原料組 materialGroupMany
      // categoryData  - 建構商品裡面的 catogory
      let paper = await this.getMaterialData(
        calculationData.categoryData[0].paper_id
      ) // 取得轉印紙的資料 paper.data.unit_price
      let ink = await this.getMaterialData(
        calculationData.categoryData[0].ink_id
      ) // 取得墨水的資料 ink.data.unit_price

      for (let i = 0; i < calculationData.materialGroup.length; i++) {
        // 第一次過濾使用原物料組 materialGroup 的 kind 去判斷
        // kind = 1  代表是表布 kink = 2 代表是裡布

        switch (calculationData.materialGroup[i].kind) {
          case 1: // kind = 1 計算表布  (groupKind)
            this.fnCalculationCloth(
              // 額外修改的有 material._id  material.cloth_width  material.unit_price  material.product_name
              calculationData.selectMaterial[i]._id, // 原料布料的 _id
              calculationData.selectMaterial[i].product_name, // 原料布料的商品名稱
              calculationData.selectMaterial[i].unit_price, // 原料布料的每碼價錢
              calculationData.selectMaterial[i].cloth_width, // 原料布料的幅寬
              calculationData.selectMaterial[i].kind, // 2 = 表布  3 = 裡布 (這裡的 kind 是 原物料的 kind)
              calculationData.selectMaterial[i].additional_height, // 額外增加的長度，加工過程會增加紙跟布的使用量
              calculationData.categoryData[0].typesetting, // 是否啟用智慧排版 true = 啟用  false = 禁用
              calculationData.categoryData[0].outside_layout_width, // 版型的寬度
              calculationData.categoryData[0].outside_layout_height, // 版型的高度
              calculationData.categoryData[0].outside_cloth_loss, // 布料耗損 20 單位因為是 % 所以要把成本 乘上 (100 + 20) / 100
              ink, // 這裡的墨水是讀取 建構商品裡的
              paper, // 這邊的紙是讀取 建構商品裡的
              calculationData.categoryData[0].tailor_fee, // 平車費用
              calculationData.categoryData[0].crop_fee, // 裁切布料費用
              calculationData.orderValue, // 訂購數量
              calculationData.materialGroup[i].kind // 這邊的 kind 是原物料組的
            )
            break

          case 2: // kind = 2 裡布計算  (groupKind)
            this.fnCalculationCloth(
              calculationData.selectMaterial[i]._id,
              calculationData.selectMaterial[i].product_name,
              calculationData.selectMaterial[i].unit_price,
              calculationData.selectMaterial[i].cloth_width,
              calculationData.selectMaterial[i].kind,
              calculationData.selectMaterial[i].additional_height,
              calculationData.categoryData[0].typesetting,
              calculationData.categoryData[0].inside_layout_width,
              calculationData.categoryData[0].inside_layout_height,
              calculationData.categoryData[0].inside_cloth_loss,
              ink,
              paper,
              calculationData.categoryData[0].tailor_fee,
              calculationData.categoryData[0].crop_fee,
              calculationData.orderValue,
              calculationData.materialGroup[i].kind
            )
            break

          case 3: // kind = 3 原物料與配件的計算  (groupKind)
            if (calculationData.selectMaterial[i].kind === 1)
              this.fnCalMaterial(
                calculationData.selectMaterial[i],
                calculationData.selectMaterial[i].kind,
                calculationData.materialGroup[i].kind,
                calculationData.orderValue
              )
            // groupKind === 4 執行這一段，這邊是配件類 accessory 的部分
            else {
              // console.log('calculationData', calculationData)
              // console.log('selectMaterial', calculationData.selectMaterial[i])
              const cloth = this.clothData.find((item) => {
                return (
                  item.id ===
                  calculationData.selectMaterial[i].accessory_cloth_id
                )
              })
              let productName =
                calculationData.selectMaterial[i].product_name +
                '-(' +
                cloth.productName +
                ')'
              this.fnCalculationCloth(
                calculationData.selectMaterial[i]._id, // 布料 _id
                productName, // 布料商品名稱
                cloth.unitPrice, // 每碼布料的價錢
                cloth.clothWidth, // 布料的寬度
                calculationData.selectMaterial[i].kind, // 4 這邊是選擇 accessory
                calculationData.selectMaterial[i].additional_height, // 額外增加的長度，加工過程會增加紙跟布的使用量
                calculationData.selectMaterial[i].typesetting, // 是否啟用智慧排版 true = 啟用  false = 禁用
                calculationData.selectMaterial[i].layout_width, // 版型的寬度
                calculationData.selectMaterial[i].layout_height, // 版型的高度
                calculationData.selectMaterial[i].accessory_cloth_loss, // 布料耗損 20 單位因為是 % 所以要把成本 乘上 (100 + 20) / 100
                ink, // 這裡的墨水是讀取 建構商品裡的
                paper, // 這邊的紙是讀取 建構商品裡的
                calculationData.selectMaterial[i].tailor_fee, // 平車費用
                calculationData.selectMaterial[i].crop_fee, // 裁切布料費用
                calculationData.orderValue, // 訂購數量
                calculationData.materialGroup[i].kind // 這邊的 kind 是原物料組的
              )
            }

            break
          default:
            this.$message({
              message: '第一次篩選資料有發生錯誤！',
              type: 'success'
            })
        }
      }
    },
    // **********************************************  計算報價相關 結束 **********************************************
    // 處理表布的計算，materialKind 2 = 表布   materialKind 3 = 裡布
    fnCalculationCloth(
      clothMaterialId, // 布料 _id
      clothMaterialProductName, // 布料名稱
      clothMaterialUnitPrice, // 布料的單位價錢 (碼)
      clothMaterialWidth, // 布料的幅寬
      materialKind, // 2 = 表布  3 = 裡布 (這裡的 kind 是 原物料的 kind) 4 = accessory
      additionalHeight, // 額外增加的長度，加工過程會增加紙跟布的使用量
      typesetting, // 是否啟用智慧排版 true = 啟用  false = 禁用
      layoutWidth, // 版型的寬度
      layoutHeight, // 版型的高度
      clothLoss, // 布料耗損 20 單位因為是 % 所以要把成本 乘上 (100 + 20) / 100
      ink, // 這裡的墨水是讀取 建構商品裡的
      paper, // 這邊的紙是讀取 建構商品裡的
      tailorFee, // 平車費用
      cropFee, // 裁切布料費用
      orderValue, // 訂購數量
      groupKind // 這邊的 kind 是原物料組的
    ) {
      // 處理 bug clothLoss typesetting 修正因為前端的錯誤導致資料庫沒有建立該欄位，所以這樣補強，很不得已的作法
      if (clothLoss === undefined) clothLoss = 0
      if (typesetting === undefined) typesetting = true

      let a_obj = this.fnBestLayout(
        layoutWidth,
        layoutHeight,
        clothMaterialWidth, // ------ 寬度取代 22222
        orderValue
      )
      // 寬高互換再計算一次，如果智慧排版有開啟的話，此 b_obj 就要拿出來跟 a_obj 比較看誰比較省布料面積
      let b_obj = this.fnBestLayout(
        layoutHeight,
        layoutWidth,
        clothMaterialWidth, // ------ 寬度取代 11111
        orderValue
      )
      let obj = {}
      // 智慧排版如果開啟 值 = true obj = a_obj   如果沒開啟，就比較 a b 取數字低的
      if (!typesetting) {
        obj = a_obj
      } else {
        obj = a_obj.cloth_area > b_obj.cloth_area ? b_obj : a_obj
      }

      if (groupKind === 3 && materialKind === 4) {
        console.log('obj :', obj)
      }

      // 智慧排版，布料需要旋轉90度去找最加的排版輸出方式
      // const obj = a_obj.cloth_area > b_obj.cloth_area ? b_obj : a_obj // 商品使用的布料才數
      // 布料每才的價錢 - 最後存起來的時候要在做小數點後兩位的無條件進入
      const cloth_30x30_price =
        clothMaterialUnitPrice / ((clothMaterialWidth * 90) / 900) // ------ 寬度取代 33333 價錢
      const cloth_fee = cloth_30x30_price * obj.cloth_area // 最終布料的費用在這邊
      // console.log('墨水每CC成本：', ink.data.unit_price) // 墨水成本
      const ink_30x30_price = ink.data.unit_price * 0.6 // 墨水噴一才的費用
      const ink_fee = obj.cloth_area * ink_30x30_price // 商品使用的墨水費用
      const paper_1cm_price = paper.data.unit_price / 100 // 長度1公分的紙多少錢
      const paper_fee = paper_1cm_price * obj.cloth_length // 布料長度 * 紙1cm 的成本

      // 把 訊息記錄下來
      this.calculationCloth.materialKind = materialKind // 1
      this.calculationCloth.typesetting = typesetting // 2
      this.calculationCloth.clothHeight =
        Math.ceil(obj.cloth_length * 100) / 100 // 3
      this.calculationCloth.clothArea = Math.ceil(obj.cloth_area * 100) / 100 // 4
      this.calculationCloth.rowNumber = obj.row_number // 5
      this.calculationCloth.clothWidth =
        Math.ceil(clothMaterialWidth * 100) / 100 // 6  // ------ 寬度取代 44444
      this.calculationCloth.lossPercentage =
        Math.ceil(obj.loss_percentage * 100) / 100 // 7
      this.calculationCloth.cloth30x30Price =
        Math.ceil(cloth_30x30_price * 100) / 100 // 8
      this.calculationCloth.clothFee = Math.ceil(cloth_fee * 100) / 100 // 9
      this.calculationCloth.inkCcPrice =
        Math.ceil(ink.data.unit_price * 100) / 100 // 10
      this.calculationCloth.ink30x30Price =
        Math.ceil(ink_30x30_price * 100) / 100 // 11
      this.calculationCloth.inkFee = Math.ceil(ink_fee * 100) / 100 // 12
      this.calculationCloth.paper1CmPrice =
        Math.ceil(paper_1cm_price * 100) / 100 // 13
      this.calculationCloth.paperFee = Math.ceil(paper_fee * 100) / 100 // 14
      this.calculationCloth.layoutWidth =
        Math.ceil(obj.layout_width * 100) / 100 // 15
      this.calculationCloth.layoutHeight =
        Math.ceil(obj.layout_Height * 100) / 100 // 16
      this.calculationCloth.clothLoss = Math.ceil(clothLoss * 100) / 100 // 17

      // 只有配件類才需要紀錄，平車與裁切的費用，表布，裡布，跟一般原料不需要
      this.calculationCloth.orderValue = orderValue // 19
      this.calculationCloth.tailorFee = 0 // 20
      this.calculationCloth.cropFee = 0 // 21
      this.calculationCloth.additionalHeight = !isEmpty(additionalHeight)
        ? Math.ceil(additionalHeight * 100) / 100
        : 0 // 22
      this.calculationCloth.additionalPaperFee = Math.ceil(
        paper_1cm_price * this.calculationCloth.additionalHeight
      ) // 23.追加多少紙錢 (無轉印)
      this.calculationCloth.additionalClothFee = Math.ceil(
        ((this.calculationCloth.additionalHeight * clothMaterialWidth) / // ------ 寬度取代 55555
          900) *
          cloth_30x30_price
      ) // 24.追加多少布錢 (無轉印)
      // if (materialKind == 2)
      //   console.log('this.calculationCloth (要轉印) :', this.calculationCloth)

      // 18.(布料+墨水+紙) * (1+轉印布料的耗損率)
      this.calculationCloth.groupKind = groupKind
      this.calculationCloth.realFee = Math.ceil(
        (this.calculationCloth.inkFee +
          this.calculationCloth.paperFee +
          this.calculationCloth.clothFee) *
          (1 + this.calculationCloth.clothLoss / 100) +
          this.calculationCloth.additionalPaperFee +
          this.calculationCloth.additionalClothFee
      ) // 18
      // 紀錄原物料的 id
      this.calculationCloth.materialId = clothMaterialId // ------ _id 取代 66666
      this.quotationForm.save_calculation_data.push(this.calculationCloth)

      // 如果是非轉印布料的話 material.kind 判斷，把不需要的欄位填 0 ， 墨水，轉印紙等等都不需要
      // groupKind 1.表布  2.裡布  3.一般原料，布料配件用
      // materialKind 1.一般原料  2.轉印布料   3.現成布料  4.布料配件用  5.紙   6.墨水

      let clothName = ''
      if (groupKind === 1) {
        clothName = '表布類'
      } else {
        clothName = groupKind === 2 ? '裡布類' : '其他類'
      }

      if (materialKind === 3) {
        this.calculationCloth.ink30x30Price = 0
        this.calculationCloth.inkCcPrice = 0
        this.calculationCloth.inkFee = 0
        this.calculationCloth.paper1CmPrice = 0
        this.calculationCloth.paperFee = 0
        this.calculationCloth.realFee = Math.ceil(
          this.calculationCloth.clothFee *
            (1 + this.calculationCloth.clothLoss / 100) +
            this.calculationCloth.additionalPaperFee +
            this.calculationCloth.additionalClothFee
        ) // 18
        this.calculationCloth.name =
          clothName + '：非轉印布料-' + clothMaterialProductName // ------ 商品名稱取代 77777
      } else if (materialKind === 2) {
        this.calculationCloth.name =
          clothName + '：轉印布料-' + clothMaterialProductName // ------ 商品名稱取代 88888
      } else if (materialKind === 1) {
        this.calculationCloth.name =
          clothName + '：一般原物料-' + clothMaterialProductName // ------ 商品名稱取代 88888
      } else {
        // 這邊是配件類的 materialKind = 4 所以要把 平車跟裁切 的金額 乘上 訂購數量再加到 realFee裡面
        this.calculationCloth.name =
          clothName + '：配件類-' + clothMaterialProductName // ------ 商品名稱取代 88888
        // 只有配件類需要記錄起來 平車費用與裁切費用
        this.calculationCloth.tailorFee = tailorFee // 20
        this.calculationCloth.cropFee = cropFee // 21
        this.calculationCloth.realFee =
          this.calculationCloth.realFee +
          tailorFee * orderValue +
          cropFee * orderValue
        // console.log('this.calculationCloth :', this.calculationCloth)
      }
      // 每次計算完之後，都把欄位清空，讓之後的 for 迴圈循環的資料重新使用
      this.calculationCloth = Object.assign({}, this.emptyCalculationCloth)
    },
    // 選擇最好的排版方式 回傳值 使用了幾才的布料
    fnBestLayout(layoutWidth, layoutHeight, clothWidth, orderValue) {
      // 邏輯
      // 布料幅寬 / 版型 寬 或 高 = 布寬可以放幾個版型 需要取 floor - 接近的最小整數
      // 訂購數量 / 布寬可以放幾個的版型  =  排版會有幾列 需要取 ceil - 接近的最大整數
      // 排版會有幾列再乘上另一邊的尺寸 = 這個容器的長度
      // 容器的長度乘上幅寬 = 總面積 除以 900 = 才積
      // return obj = { cloth_length , cloth_area ,  row_number, loss_percentage}
      const obj = {}
      obj.cloth_length = // 這個是布料的長度
        Math.ceil(orderValue / Math.floor(clothWidth / layoutWidth)) *
        layoutHeight
      // console.log('使用布料長度：', obj.cloth_length, ' 公分')
      obj.cloth_area = // 這個是布料的才積
        (Math.ceil(orderValue / Math.floor(clothWidth / layoutWidth)) *
          layoutHeight *
          clothWidth) /
        900
      // 記錄起來 版型的長跟寬
      obj.layout_width = layoutWidth
      obj.layout_Height = layoutHeight

      // 橫向可以排幾個？
      obj.row_number = Math.floor(clothWidth / layoutWidth)
      // 排版後的耗損率
      obj.loss_percentage = (
        ((clothWidth - Math.floor(clothWidth / layoutWidth) * layoutWidth) /
          clothWidth) *
        100
      ).toFixed(2)
      // return obj = { cloth_length , cloth_area ,  row_number, loss_percentage}
      return obj
    },

    // 處理原物料 material 與配件 accessory 的計算，進去後要判斷 materialKind 3 or 4
    fnCalMaterial(material, materialKind, groupKind, orderValue) {
      // 一般配件紙會用到兩個參數 material and materialKind

      // 如果 materialKind = 3 就 原料成本 + 判斷要不要 加工費 然後結案，這邊會牽扯到 加工費，薪資
      this.calculationMaterial.materialKind = materialKind
      this.calculationMaterial.groupKind = groupKind
      this.calculationMaterial.materialId = material._id
      this.calculationMaterial.name = '一般原物料：' + material.product_name
      this.calculationMaterial.unitPrice =
        Math.ceil(material.unit_price * 100) / 100
      this.calculationMaterial.processingFeeFlag = material.processing_fee_flag

      // 如果勾選要加工費用，才會去計算
      if (material.processing_fee_flag && !isEmpty(material.processing_fee)) {
        this.calculationMaterial.processingFee =
          Math.ceil(material.processing_fee * 100) / 100
      } else {
        this.calculationMaterial.processingFee = 0
      }

      // 最後總金額 = 原物料成本 + 加工費用
      this.calculationMaterial.realFee = Math.ceil(
        (this.calculationMaterial.processingFee +
          this.calculationMaterial.unitPrice) *
          orderValue
      )

      this.quotationForm.save_calculation_data.push(this.calculationMaterial)
      this.calculationMaterial = Object.assign(
        {},
        this.emptyCalculationMaterial
      )
    }
  }
}
</script>

<style scoped>
.lefe-side {
  border-right: 1px solid gray;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

/* el-row el-col style */
/* .el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
} */
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
/* el-row el-col style end*/

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  display: inline-block;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 0;
  margin: 0;
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

.cloth-warp {
  background-color: red;
  float: left;
  width: 100%;
}
.cloth-content {
  float: left;
  height: 24px;
  line-height: 24px;
  margin: 2px;
}

.material-warp {
  background-color: green;
  float: left;
  width: 100%;
}
.material-content {
  float: left;
  height: 24px;
  line-height: 24px;
  margin: 2px;
}
.outside-normal-cloth-warp {
  background-color: blue;
  float: left;
}
.outside-normal-cloth-content {
  float: left;
  height: 24px;
  line-height: 24px;
  margin: 2px;
}

.el-tag {
  font-size: 14px;
}

.quotation-warp {
  background-color: rgb(187, 225, 230);
  float: left;
  width: 100%;
}
.quotation-content {
  height: 24px;
  line-height: 24px;
  margin: 2px;
}
</style>
