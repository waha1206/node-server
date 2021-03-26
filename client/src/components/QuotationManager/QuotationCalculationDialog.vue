<template>
  <div class="my-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <el-container>
        <el-aside width="50%"
          ><el-row>
            <el-col
              :span="24"
              v-for="(item, index) in quotationForm.saveCalaulationData"
              :key="index"
            >
              <!-- 如果 kind === 2 下面是揭示 表布的各種計算欄位 -->
              <div v-if="item.kind === 2" class="outside-cloth-warp">
                <span class="outside-print-cloth-content">
                  <el-tag size="mini" type="danger">表布計算</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '布料幅寬：' + item.clothWidth + ' 公分'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '版型寬：' + item.layoutWidth + ' 公分'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '版型高：' + item.layoutHeight + ' 公分'
                  }}</el-tag></span
                >
                <span
                  class="outside-print-cloth-content"
                  v-if="item.typesetting"
                >
                  <el-tag size="mini">智慧排版：是</el-tag></span
                >
                <span class="outside-print-cloth-content" v-else>
                  <el-tag size="mini">智慧排版：否</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '排版耗損率：' + item.lossPercentage + ' %'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '印布耗損率：' + item.clothLoss + ' %'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '橫排：' + item.rowNumber + ' 個'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '使用布長：' + item.clothHeight + ' 公分'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '布料才積：' + item.clothArea + ' 才'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '布料小計：' + item.clothFee + ' 元'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '轉印紙總計：' + item.paperFee + ' 元'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '墨水總計：' + item.inkFee + ' 元'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '訂購數量：' + item.orderValue + ' 個'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '平車費用：' + item.tailorFee + ' 元'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '裁切布料費用：' + item.cropFee + ' 元'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '轉印增加長度：' + item.additionalHeight + ' 公分'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '轉印紙增加費用：' + item.additionalPaperFee + ' 元'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '布料增加費用：' + item.additionalClothFee + ' 元'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '總計 (墨水+紙+布) * 印布耗損率 + 額外紙跟布：' +
                      item.realFee +
                      ' 元'
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '目前 quotationForm.saveCalaulationData 有 ' +
                      quotationForm.saveCalaulationData.length +
                      ' 筆 資料'
                  }}</el-tag></span
                >
              </div>
              <!-- 這裡開始會是展示裡布的部分 -->
              <div v-if="item.kind === 3" class="outside-normal-cloth-warp">
                <span class="outside-normal-cloth-content">
                  <el-tag size="mini" type="danger">其他計算</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '我的名字是：' + item.name
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '我的名字是：' + item.name
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '我的名字是：' + item.name
                  }}</el-tag></span
                >
                <span class="outside-print-cloth-content">
                  <el-tag size="mini">{{
                    '我的名字是：' + item.name
                  }}</el-tag></span
                >
              </div>
              <!-- dialog.calculationData -->
            </el-col>
          </el-row></el-aside
        >
        <el-main>Main</el-main>
      </el-container>
      <el-container>
        <el-footer></el-footer>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import { isEmpty } from '../../utils/tools'

export default {
  name: 'quotation-calculation-dialog',
  props: {
    dialog: Object
  },
  data() {
    return {
      // calOutsideCloth 這邊會記錄 外層布料的 所有訊息狀態
      calOutsideCloth: {},
      emptyCalOutsideCloth: {
        kind: 0, // 1.記錄了是哪一種的原料類型，每種資料 kind 有不同的紀錄欄位 1.一般原料 2.轉印布料 3.現成布料 4.配件專用
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
        additionalClothFee: 0 // 24.額外增加的布料費用
      },
      // 報價單欄位開始，這邊的資料會存放到報價單的資料庫裏面，最原始的資料
      quotationForm: {},
      emptyQuotationForm: {
        category_id: '', // 紀錄商品的 _id
        order_value: '', // 訂購數量
        proofing_value: '', // 打樣數量
        sales_value: '', // 業務的 _id
        customer_value: '', // 客戶的 _id
        material_group: [], // 選擇商品規格的 _id 原料組
        select_material: [], // 這筆訂單選擇哪些的 原料
        // 紀錄每一個進來的 表布，裡布，配件 的相關資訊
        // 有幾種設定就 push 幾種進來這裡
        saveCalaulationData: []
      },

      // 報價單欄位結束
      tableData: [],
      formLabelWidth: '',
      formData: {
        type: '',
        name: ''
      },
      userTitleForm: {
        type: '',
        name: '',
        _id: '',
        level: 1,
        option: ''
      },

      // 這個是驗證 editCategoriesEditForm的表單欄位
      userTitleFormRules: {
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      },
      editDialog: false,
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
  created() {},
  watch: {
    dialog(dialog) {
      this.calOutsideCloth = Object.assign({}, this.emptyCalOutsideCloth)
      this.quotationForm = Object.assign({}, this.emptyQuotationForm)
      this.quotationForm.saveCalaulationData.length = 0
      this.handleSaveQuotationData(dialog.calculationData)
      this.handleCalculationData(dialog.calculationData)
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    // **********************************************  axios 開始 **********************************************
    handleDelete(row) {
      MessageBox.confirm(
        '注意！資料刪除會不可挽回！請確認此資料無其他應用！',
        '嚴重警告！！！'
      )
        .then(() => {
          this.$axios
            .delete(`/api/customer/title/delete/${row._id}`)
            .then((res) => {
              this.$message('刪除成功！')
              this.$emit('update', this.dialog.dataType)
            })
        })
        .catch(() => {
          this.$message('您取消刪除了～鬆一口氣')
        })
    },
    // 新增商品類別代號
    onSubmit(form) {
      const uploadFormData =
        this.userTitleForm.option == 'add' ? this.formData : this.userTitleForm
      return
      this.$refs[form].validate((valid) => {
        if (valid && !uploadFormData.type == '') {
          const url =
            this.userTitleForm.option == 'add'
              ? 'add'
              : `edit/${this.userTitleForm._id}`
          uploadFormData.level = this.userTitleForm.level

          this.$axios
            .post(`/api/customer/title/${url}`, uploadFormData)
            .then((res) => {
              console.log('(儲存/修改) 原料組合第一層分類成功！')
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 不管怎麼樣都隱藏 edit dialog 的視窗
              this.editDialog = false

              // 刷新網頁，傳遞給父組件做更新
              this.$emit('update', this.dialog.dataType)
            })
            .catch((err) => {
              console.log('axios添加數據失敗==>MyDialog.vue==>', err)
            })
        }
      })
    },
    // **********************************************  axios 結束 **********************************************
    // **********************************************  計算報價相關 開始 **********************************************
    // 儲存 報價單的資料
    // forEach map ... 等各種的用法如下，forEach 不會 return 值，如果要 return 用 map
    // https://wcc723.github.io/javascript/2017/06/29/es6-native-array/
    handleSaveQuotationData(dialogData) {
      this.quotationForm.category_id = dialogData.categoryData[0]._id // 記錄這張報價單的來源 _id
      this.quotationForm.sales_value = dialogData.salesValue
      this.quotationForm.customer_value = dialogData.customerValue
      this.quotationForm.order_value = dialogData.orderValue
      this.quotationForm.proofing_value = dialogData.proofingValue
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
    },
    // 如何使用異步讀取 server 資料，完美的解答
    // https://stackoverflow.com/questions/54955426/how-to-use-async-await-in-vue-js
    handleCalculationData(calculationData) {
      for (let i = 0; i < calculationData.materialGroup.length; i++) {
        // 第一次過濾使用原物料組 materialGroup 的 kind 去判斷
        switch (calculationData.materialGroup[i].kind) {
          case 1: // kind = 1 計算表布
            this.fnCalOutsideCloth(
              calculationData.selectMaterial[i],
              calculationData.selectMaterial[i].kind,
              calculationData.selectMaterial[i].additional_height,
              calculationData.categoryData[0].typesetting,
              calculationData.categoryData[0].outside_layout_width,
              calculationData.categoryData[0].outside_layout_height,
              calculationData.categoryData[0].outside_cloth_loss,
              calculationData.categoryData[0].ink_id,
              calculationData.categoryData[0].paper_id,
              calculationData.categoryData[0].tailor_fee,
              calculationData.categoryData[0].crop_fee,
              calculationData.orderValue
            )
            break
          case 2: // kind = 2 裡布計算
            this.fnCalInsideCloth(calculationData.materialGroup[i])
            break
          case 3: // kind = 3 原物料與配件的計算
            this.fnCalMAterialOrAccessory(calculationData.materialGroup[i])
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
    // 處理表布的計算，kind 2 = 表布   kind 3 = 裡布  ----------------
    async fnCalOutsideCloth(
      material, // 選擇哪種布料 我會需要裡面的幅寬來計算版型可以排幾個
      kind, // 2 = 表布  3 = 裡布
      additionalHeight, // 額外增加的長度，加工過程會增加紙跟布的使用量
      typesetting, // 是否啟用智慧排版 true = 啟用  false = 禁用
      layoutWidth, // 版型的寬度
      layoutHeight, // 版型的高度
      clothLoss, // 布料耗損 20 單位因為是 % 所以要把成本 乘上 (100 + 20) / 100
      ink_id, // 這裡的墨水是讀取 建構商品裡的
      paper_id, // 這邊的紙是讀取 建構商品裡的
      tailorFee, // 平車費用
      cropFee, // 裁切布料費用
      orderValue // 訂購數量
    ) {
      // console.log(
      //   material,
      //   kind,
      //   clothWidth,
      //   clothHeight,節省
      //   ClothLoss,
      //   ink_id,
      //   paper_id
      // )

      if (kind === 2) {
        // typesetting 判斷需不需要使用智慧排版 true  = 要  false = 不要
        if (typesetting) {
          let paper = await this.getMaterialData(paper_id) // 取得轉印紙的資料 paper.data.nit_price
          let ink = await this.getMaterialData(ink_id) // 取得墨水的資料 ink.data.unit_price

          // return obj = { cloth_length , cloth_area ,  row_number, loss_percentage}
          // 計算布料使用量 fnBestLayout 智慧排版需要輸入兩次計算
          let a_obj = this.fnBestLayout(
            layoutWidth,
            layoutHeight,
            material.cloth_width,
            orderValue
          )
          // 交換寬跟高的位置
          let b_obj = this.fnBestLayout(
            layoutHeight,
            layoutWidth,
            material.cloth_width,
            orderValue
          )

          // 智慧排版，布料需要旋轉90度去找最加的排版輸出方式
          const obj = a_obj.cloth_area > b_obj.cloth_area ? b_obj : a_obj // 商品使用的布料才數
          // 布料每才的價錢 - 最後存起來的時候要在做小數點後兩位的無條件進入
          const cloth_30x30_price =
            material.unit_price / ((material.cloth_width * 90) / 900)
          const cloth_fee = cloth_30x30_price * obj.cloth_area // 最終布料的費用在這邊
          // console.log('墨水每CC成本：', ink.data.unit_price) // 墨水成本
          const ink_30x30_price = ink.data.unit_price * 0.6 // 墨水噴一才的費用
          const ink_fee = obj.cloth_area * ink_30x30_price // 商品使用的墨水費用
          const paper_1cm_price = paper.data.unit_price / 100 // 長度1公分的紙多少錢
          const paper_fee = paper_1cm_price * obj.cloth_length // 布料長度 * 紙1cm 的成本

          // 把 訊息記錄下來
          this.calOutsideCloth.kind = kind // 1
          this.calOutsideCloth.typesetting = typesetting // 2
          this.calOutsideCloth.clothHeight =
            Math.ceil(obj.cloth_length * 100) / 100 // 3
          this.calOutsideCloth.clothArea = Math.ceil(obj.cloth_area * 100) / 100 // 4
          this.calOutsideCloth.rowNumber = obj.row_number // 5
          this.calOutsideCloth.clothWidth =
            Math.ceil(material.cloth_width * 100) / 100 // 6
          this.calOutsideCloth.lossPercentage =
            Math.ceil(obj.loss_percentage * 100) / 100 // 7
          this.calOutsideCloth.cloth30x30Price =
            Math.ceil(cloth_30x30_price * 100) / 100 // 8
          this.calOutsideCloth.clothFee = Math.ceil(cloth_fee * 100) / 100 // 9
          this.calOutsideCloth.inkCcPrice =
            Math.ceil(ink.data.unit_price * 100) / 100 // 10
          this.calOutsideCloth.ink30x30Price =
            Math.ceil(ink_30x30_price * 100) / 100 // 11
          this.calOutsideCloth.inkFee = Math.ceil(ink_fee * 100) / 100 // 12
          this.calOutsideCloth.paper1CmPrice =
            Math.ceil(paper_1cm_price * 100) / 100 // 13
          this.calOutsideCloth.paperFee = Math.ceil(paper_fee * 100) / 100 // 14
          this.calOutsideCloth.layoutWidth =
            Math.ceil(obj.layout_width * 100) / 100 // 15
          this.calOutsideCloth.layoutHeight =
            Math.ceil(obj.layout_Height * 100) / 100 // 16
          this.calOutsideCloth.clothLoss = Math.ceil(clothLoss * 100) / 100 // 17

          this.calOutsideCloth.orderValue = orderValue // 19
          this.calOutsideCloth.tailorFee = tailorFee // 20
          this.calOutsideCloth.cropFee = cropFee // 21
          this.calOutsideCloth.additionalHeight = !isEmpty(additionalHeight)
            ? Math.ceil(additionalHeight * 100) / 100
            : 0 // 22
          this.calOutsideCloth.additionalPaperFee = Math.ceil(
            paper_1cm_price * this.calOutsideCloth.additionalHeight
          ) // 23.追加多少紙錢 (無轉印)
          this.calOutsideCloth.additionalClothFee = Math.ceil(
            ((this.calOutsideCloth.additionalHeight * material.cloth_width) /
              900) *
              cloth_30x30_price
          ) // 24.追加多少布錢 (無轉印)

          this.calOutsideCloth.realFee = Math.ceil(
            (this.calOutsideCloth.inkFee +
              this.calOutsideCloth.paperFee +
              this.calOutsideCloth.clothFee) *
              (1 + this.calOutsideCloth.clothLoss / 100) +
              this.calOutsideCloth.additionalPaperFee +
              this.calOutsideCloth.additionalClothFee
          ) // 18
          this.quotationForm.saveCalaulationData.push(this.calOutsideCloth)
        } else {
          console.log('禁用智慧排版')
        }
      } else {
        console.log('這邊會是內裡布料的計算')
      }
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
      // console.log(
      //   '布料幅寬：',
      //   clothWidth,
      //   '版型寬：',
      //   layoutWidth,
      //   '橫向可以排幾個：',
      //   obj.row_number + ' 個 ',
      //   '耗損率：',
      //   obj.loss_percentage + '%'
      // )
      return obj
    },
    // 處理裡布的計算 ----------------  第一層篩選之二
    fnCalInsideCloth(groupData) {
      console.log('我是內裡布料～喔嗨喲！')
      let obj = {}
      obj.kind = 3
      obj.name = '測試一下'
      this.quotationForm.saveCalaulationData.push(obj)
      console.log(this.quotationForm.saveCalaulationData)
    },
    // 處理原物料 material 與配件 accessory 的計算 ----------------  第一層篩選之三
    fnCalMAterialOrAccessory(groupData) {},
    // 取得墨水的原料資訊
    getMaterialData(ink_id) {
      return this.$axios
        .get(`/api/material/get-material-by-id/${ink_id}`)
        .catch((err) => {
          console.log(err)
        })
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

.outside-cloth-warp {
  background-color: red;
  float: left;
}
.outside-print-cloth-content {
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
</style>
