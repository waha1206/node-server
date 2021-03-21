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
            <el-col :span="6" style="overflow:hidden">
              <!-- dialog.calculationData -->
              <p
                style="height:24px;line-height:24px;text-align:center;display:block;float:left"
              >
                Hello
              </p>
              <span
                style="height:24px;line-height:24px;text-align:center;display:block;float:left"
                >Hello</span
              >
              <span
                style="height:24px;line-height:24px;text-align:center;display:block;float:left"
                >Hello</span
              >
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
export default {
  name: 'quotation-calculation-dialog',
  props: {
    dialog: Object
  },
  data() {
    return {
      // 報價單欄位開始
      quotationForm: {
        category_id: '',
        order_value: '',
        proofing_value: '',
        sales_value: '',
        customer_value: '',
        material_group: [],
        select_material: []
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
      console.log('我是要被 COPY 的對象', dialogData)
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
      console.log(this.quotationForm)
    },
    // 如何使用異步讀取 server 資料，完美的解答
    // https://stackoverflow.com/questions/54955426/how-to-use-async-await-in-vue-js
    handleCalculationData(calculationData) {
      for (let i = 0; i < calculationData.materialGroup.length; i++) {
        // 第一次過濾使用原物料組 materialGroup 的 kind 去判斷
        switch (calculationData.materialGroup[i].kind) {
          case 1: // kind = 1  表布計算
            this.fnCalOutsideCloth(
              calculationData.selectMaterial[i],
              calculationData.selectMaterial[i].kind,
              calculationData.categoryData[0].outside_layout_width,
              calculationData.categoryData[0].outside_layout_height,
              calculationData.categoryData[0].outside_cloth_loss,
              calculationData.categoryData[0].ink_id,
              calculationData.categoryData[0].paper_id,
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
    // 處理表布的計算，kind 2 = 表布   kind 3 = 裡布  ----------------  第一層篩選之一
    async fnCalOutsideCloth(
      material, // 選擇哪種布料 我會需要裡面的幅寬來計算版型可以排幾個
      kind, // 2 = 表布  3 = 裡布
      layoutWidth, // 版型的寬度
      layoutHeight, // 版型的高度
      clothLoss, // 布料耗損 20 單位因為是 % 所以要把成本 乘上 (100 + 20) / 100
      ink_id, // 這裡的墨水是讀取 建構商品裡的
      paper_id, // 這邊的紙是讀取 建構商品裡的
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
        let paper = await this.getMaterialData(paper_id) // 取得轉印紙的資料 paper.data.nit_price
        let ink = await this.getMaterialData(ink_id) // 取得墨水的資料 ink.data.unit_price
        // 計算布料使用量 fnBestLayout
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
        console.log('a_area 才積：', a_obj.cloth_area)
        console.log('b_area 才積：', b_obj.cloth_area)
        const obj = a_obj.cloth_area > b_obj.cloth_area ? b_obj : a_obj // 商品使用的布料才數
        // 再來要算三個數字 1.布料金額 2.轉印紙的金額 3.墨水的金額
        const cloth_30x30_price =
          material.unit_price / ((material.cloth_width * 90) / 900)
        console.log('實際使用的布料才數為', Math.ceil(obj.cloth_area))
        console.log('布料每才的單價：', cloth_30x30_price)
        const cloth_fee = cloth_30x30_price * obj.cloth_area // 最終布料的成本在這邊
        console.log('布料使用的成本為：', cloth_fee)
        // 墨水成本
        console.log('墨水每CC成本：', ink.data.unit_price)
        const ink_30x30_price = ink.data.unit_price * 0.6 // 噴一才的費用
        console.log('墨水噴一才的費用：', ink_30x30_price)
        const ink_fee = obj.cloth_area * ink_30x30_price // 商品使用的墨水費用
        console.log('此商品使用的墨水費用為：', ink_fee)
        const paper_1cm_price = paper.data.unit_price / 100
        console.log('1公分的紙成本', paper_1cm_price)
        const paper_fee = paper_1cm_price * obj.cloth_length
        console.log('此商品使用的轉印紙費用為：', paper_fee)
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
      // obj = { cloth_length , cloth_area ,  row_number, loss_percentage}
      const obj = {}
      obj.cloth_length = // 這個是布料的長度
        Math.ceil(orderValue / Math.floor(clothWidth / layoutWidth)) *
        layoutHeight
      console.log('使用布料長度：', obj.cloth_length, ' 公分')
      obj.cloth_area = // 這個是布料的才積
        (Math.ceil(orderValue / Math.floor(clothWidth / layoutWidth)) *
          layoutHeight *
          150) /
        900
      // 橫向可以排幾個？
      obj.row_number = Math.floor(clothWidth / layoutWidth)
      obj.loss_percentage = (
        ((clothWidth - Math.floor(clothWidth / layoutWidth) * layoutWidth) /
          clothWidth) *
        100
      ).toFixed(2)
      console.log(
        '布料幅寬：',
        clothWidth,
        '版型寬：',
        layoutWidth,
        '橫向可以排幾個：',
        obj.row_number + ' 個 ',
        '耗損率：',
        obj.loss_percentage + '%'
      )
      return obj
    },
    // 處理裡布的計算 ----------------  第一層篩選之二
    fnCalInsideCloth(groupData) {},
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
</style>
