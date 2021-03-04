<template>
  <div class="material-edit-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="1200px"
    >
      <!-- style="margin:10px;width:auto" -->
      <el-form
        ref="form"
        :model="materialDataForm"
        :rules="form_rules"
        label-width="100px"
      >
        <el-container>
          <el-header>
            <!-- 布局測試 -->
            <!-- bg-purple  原料分類 8 商品名稱 12 -->
            <!-- :gutter 欄位間距 -->
            <!-- el-row 使用 type="flex" 可以啟動自定義的欄位佈局 並可以通過 justify 屬性來指定 start center space-between space-around 其中的值來定義子元素的排版方式 -->
            <!-- 第一列，原料分類、商品名稱 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <!-- 下拉選單，這裡是原物料分類 -->
                <el-form-item label="分類(一)：" prop="material_class">
                  <el-select
                    @change="selectOneChang"
                    v-model="materialDataForm.material_class"
                    placeholder="原料分類"
                    filterable
                    size="mini"
                  >
                    <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
                    <el-option
                      v-for="(materialClass, index) in materialClassData"
                      :key="index"
                      :value="materialClass._id"
                      :label="materialClass.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <!-- 下拉選單，這裡是原物料分類 -->
                <el-form-item label="分類(二)：" prop="level_two_id">
                  <el-select
                    @change="selectTwoChang"
                    v-model="materialDataForm.level_two_id"
                    placeholder="原料分類"
                    filterable
                    size="mini"
                  >
                    <!-- :lable 這個是顯示出來的  :value 這個要指定到 _id 因為我要存到資料庫，我需要唯一的一個 key (_id)-->
                    <el-option
                      v-for="(materialClass, index) in getLevelTwoData"
                      :key="index"
                      :value="materialClass._id"
                      :label="materialClass.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="product_name" label="商品名稱：">
                  <el-input
                    class="inline-input"
                    size="mini"
                    type="product_name"
                    v-model="materialDataForm.product_name"
                  ></el-input> </el-form-item
              ></el-col>
            </el-row>
            <!-- 第二列，商品成本、商品售價、商品利潤 ，單位售價-->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <el-form-item prop="the_cost" label="商品成本：">
                  <my-currency-input
                    :isReadyOnly="false"
                    :height="24"
                    :width="156"
                    type="the_cost"
                    v-model="theCost"
                  ></my-currency-input>

                  <!-- <el-input
                    size="mini"
                    type="the_cost"
                    v-model="materialDataForm.the_cost"
                  ></el-input> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="retail_price" label="商品售價：">
                  <my-currency-input
                    :isReadyOnly="true"
                    :height="24"
                    :width="156"
                    type="retail_price"
                    v-model="retailPrice"
                  ></my-currency-input>
                  <!-- <el-input
                    size="mini"
                    type="retail_price"
                    v-model="materialDataForm.retail_price"
                  ></el-input> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="product_profit" label="商品利潤：">
                  <my-percentage-input
                    :isReadyOnly="false"
                    :width="156"
                    :height="24"
                    type="product_profit"
                    v-model="productProfit"
                  ></my-percentage-input>

                  <!-- <el-input
                    size="mini"
                    type="product_profit"
                    placeholder="20代表20%請輸入整數數字"
                    v-model="materialDataForm.product_profit"
                  ></el-input> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="unit_price" label="單位售價：">
                  <my-currency-input
                    :height="24"
                    :width="156"
                    :isReadyOnly="false"
                    type="unit_price"
                    v-model="unitPrice"
                  ></my-currency-input>
                  <!-- <el-input
                    size="mini"
                    type="unit_price"
                    v-model="materialDataForm.unit_price"
                  ></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第三列，現有庫存，最低庫存 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <el-form-item prop="storage" label="現有庫存：">
                  <el-input
                    size="mini"
                    type="storage"
                    v-model="materialDataForm.storage"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="stock_alert" label="最低庫存：">
                  <el-input
                    size="mini"
                    type="stock_alert"
                    v-model="materialDataForm.stock_alert"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="lead_time" label="採購天數：">
                  <el-input
                    size="mini"
                    type="lead_time"
                    v-model="materialDataForm.lead_time"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="unit" label="商品單位：">
                  <el-input
                    size="mini"
                    type="unit"
                    v-model="materialDataForm.unit"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 第四列，材質，規格，長度，最低訂購 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <el-form-item prop="raw_material" label="商品材質：">
                  <el-input
                    size="mini"
                    type="raw_material"
                    v-model="materialDataForm.raw_material"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item prop="product_color" label="商品顏色：">
                  <el-input
                    size="mini"
                    type="product_color"
                    v-model="materialDataForm.product_color"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="length" label="商品長度：">
                  <el-input
                    size="mini"
                    type="length"
                    v-model="materialDataForm.length"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="minimum_order_quantity" label="最低訂購：">
                  <el-input
                    size="mini"
                    type="minimum_order_quantity"
                    v-model="materialDataForm.minimum_order_quantity"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 第五列，商品舊編號，額外運費，修改時間，修改人員 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <el-form-item prop="old_serial_numbers" label="舊的編號：">
                  <el-input
                    size="mini"
                    type="old_serial_numbers"
                    v-model="materialDataForm.old_serial_numbers"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="extra_freight" label="額外運費：">
                  <el-input
                    size="mini"
                    type="extra_freight"
                    v-model="materialDataForm.extra_freight"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="" label="修改時間：">
                  <el-input
                    :disabled="true"
                    size="mini"
                    type=""
                    v-model="getDate"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <!-- type 跟 prop不用綁定到表單裡面，因為此 修改人員ID 會在送出儲存的時候，把操作者的ID寫到 formData.last_edit_person -->
                <el-form-item prop="" label="修改人員：">
                  <el-input
                    :disabled="true"
                    size="mini"
                    type=""
                    v-model="getUserNameById"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第五列結束 -->
            <!-- 第六列，供應商ID，備註 remark -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <el-form-item prop="" label="供應商：">
                  <el-input
                    :readonly="true"
                    size="mini"
                    type=""
                    v-model="getSupplierNameById"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item prop="remark" label="備註：">
                  <el-input
                    size="mini"
                    type="remark"
                    v-model="materialDataForm.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第六列結束 -->
            <!-- 第七列，加工費用，加工備註 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <el-form-item prop="processing_fee_flag" label="加工費用：">
                  <el-checkbox v-model="materialDataForm.processing_fee_flag"
                    >有加工費用</el-checkbox
                  >
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item prop="processing_remark" label="加工備註：">
                  <el-input
                    placeholder="這邊的註解是寫給加工媽媽看的"
                    size="mini"
                    type="processing_remark"
                    v-model="materialDataForm.processing_remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第七列結束 -->
            <!-- 第八列，編號 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <el-form-item prop="type" label="商品編號：">
                  <el-input
                    placeholder="四碼編號：0001：0001"
                    size="mini"
                    type="type"
                    v-model="materialDataForm.type"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="kind" label="商品種類：">
                  <el-radio-group v-model="materialDataForm.kind">
                    <el-radio :label="1">一般原料</el-radio>
                    <el-radio :label="2">轉印布料</el-radio>
                    <el-radio :label="3">內裡布料</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 第七列結束 -->
          </el-header>

          <!-- 第七行開始，圖片上傳 -->
          <!-- 圖片上傳的教學 https://segmentfault.com/a/1190000013796215 -->
          <!-- 上傳一張照片的時候隱藏 後面的 + 框框  https://www.twblogs.net/a/5b81a49e2b71772165ad9752 -->
          <!-- 另外一種做法：https://blog.csdn.net/zaocha321/article/details/103345423 -->

          <el-main>
            <!-- <div class="image-warp"> -->
            <el-form-item label="圖片上傳：" size="mini" prop="describe">
              <el-upload
                :data="uploadData"
                action="uploadActionUrl"
                list-type="picture-card"
                :auto-upload="false"
                accept="image/jpeg,image/gif,image/png"
                multiple
                :limit="6"
                :file-list="files"
                :on-change="onFileChange"
              >
                <el-dialog
                  :visible.sync="dialogVisible"
                  append-to-body
                  width="520px"
                >
                  <img
                    width="480px"
                    height="480px"
                    fit="contain"
                    :src="dialogImageUrl"
                    alt=""
                  />
                </el-dialog>
                <i slot="default" class="el-icon-plus"></i>
                <div class="image-content" slot="file" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-download"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <!-- v-if="!disabled" -->
                    <span
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file, files)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
            </el-form-item>
            <!-- </div> -->
          </el-main>

          <el-footer>
            <el-form-item class="text_right">
              <el-button type="warning" @click="dialog.show = false"
                >取消</el-button
              >
              <el-button type="primary" @click="onSubmit('form')"
                >提交</el-button
              >
            </el-form-item>
          </el-footer>
        </el-container>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'material-edit-dialog',
  props: {
    materialClassData: Array,
    allSupplierlData: Array,
    allUserNameId: Array,
    materialLevelTwoClassData: Array,
    dialog: Object,
    formData: Object
  },
  data() {
    return {
      // 圖片上傳
      uploadData: {
        dataType: '0',
        oldFilePath: ''
      },
      files: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: Boolean,
      updateLevelTwoData: [],
      test: '',
      theCost: 0, // 商品進貨成本
      unitPrice: 0, // 單位成本
      productProfit: 0, // 商品利潤
      retailPrice: 0, // 商品售價
      materialDataForm: {},
      // materialDataForm_rules: {
      form_rules: {
        kind: [{ required: true, message: '必選，必須正確', trigger: 'blur' }],
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        product_name: [
          { required: true, message: '此欄位不能為空', trigger: 'blur' }
        ],
        material_class: [
          { required: true, message: '請選擇分類', trigger: 'blur' }
        ],
        level_two_id: [
          { required: true, message: '請選擇分類', trigger: 'blur' }
        ]

        // retail_price: [
        //   { required: true, message: '此欄位不能為空', trigger: 'blur' }
        // ]
      }
    }
  },
  created() {
    this.getImgs()
  },
  computed: {
    // 第二層的資料，根據讀取第一層的資料
    getLevelTwoData() {
      let levelTwoData = []
      this.materialLevelTwoClassData.forEach((item) => {
        if (item.level_one_id === this.materialDataForm.material_class) {
          levelTwoData.push(item)
        }
      })
      return levelTwoData
    },
    // 監聽兩個屬性變化
    ...mapGetters(['user']),
    // 時間轉換
    getDate() {
      if (!this.materialDataForm.last_modify_date) return '目前沒有修改過'
      return this.$moment(this.materialDataForm.last_modify_date).format(
        'YYYY年MM月DD日 - HH：mm'
      )
    },
    // 取得修改人的_id 轉換成 name
    getUserNameById() {
      if (!this.materialDataForm.last_edit_person) return '目前沒有修改過'
      let name = ''
      this.allUserNameId.forEach((item, index) => {
        if (item._id == this.materialDataForm.last_edit_person) name = item.name
      })
      return name
    },
    // 這邊的獨自打造的，傳入id取得供應商名稱
    getSupplierNameById() {
      let name = ''
      this.allSupplierlData.forEach((e) => {
        if (e._id === this.materialDataForm.supplier_id) {
          name = e.company
        }
      })
      if (!name) return '尚未建立供應商'
      return name
    }
  },
  watch: {
    // 常用的正則表達式 https://kknews.cc/zh-tw/code/o5e4n55.html
    // 'materialDataForm.unit_price': function(newValue) {
    unitPrice: function(newValue) {
      if (!newValue) return
      // 帶有兩位小數的正實數，傳進來的是 單位售價
      var numReg = /[0-9]+(.[0-9]{2})?/
      if (!numReg.test(newValue)) {
        this.$message('請輸入正整數與小數點後兩位數')
        this.retailPrice = 0
      } else {
        this.retailPrice = newValue * ((100 + Number(this.productProfit)) / 100)
        // 取小數點後兩位，無條件進位
        this.setCeil(this.retailPrice)
        // 存起來，準備存到資料庫
        this.materialDataForm.unit_price = String(this.unitPrice)
        this.materialDataForm.retail_price = String(this.retailPrice)
      }
    },
    // 檢查商品利潤是不是正整數 只能包含 0-9 這邊只有單純的計算數字有使用到，正則運算暫時沒用到
    // https://juejin.cn/post/6844904067580297229  按下 enter 會觸發 tab 鍵的文章出處
    // 'materialDataForm.product_profit': function(newValue) {
    productProfit: function(newValue) {
      var numReg = /^[0-9]*$/
      if (!numReg.test(newValue)) {
        this.$message('請輸入正整數')
        this.retailPrice = 0
      } else {
        this.retailPrice = this.unitPrice * ((100 + Number(newValue)) / 100)
        // 取小數點後兩位，無條件進位
        this.setCeil(this.retailPrice)
        // 存起來，準備存到資料庫
        this.materialDataForm.product_profit = String(this.productProfit)
        this.materialDataForm.retail_price = String(this.retailPrice)
      }
    },
    // 當父元件 dialog 傳遞 到  子元件的 props dialog 的時候，就去更新一下  此子元件要提交的表單內容 this.updateMaterialFormData()
    // 此函式會更新 this.MaterialFormData
    dialog: function(newValue, oldValue) {
      this.materialDataForm = Object.assign({}, this.formData)
      if (newValue.option === 'add') {
        this.unitPrice = 0
        this.productProfit = 0
        this.retailPrice = 0
        this.theCost = 0
      } else {
        if (isNaN(this.materialDataForm.the_cost)) {
          this.theCost = 0
        } else {
          this.theCost = Number(this.materialDataForm.the_cost)
        }
        if (isNaN(this.materialDataForm.unit_price)) {
          this.unitPrice = 0
        } else {
          this.unitPrice = Number(this.materialDataForm.unit_price)
        }
        if (isNaN(this.materialDataForm.product_profit)) {
          this.productProfit = 0
        } else {
          this.productProfit = Number(this.materialDataForm.product_profit)
        }
        if (isNaN(this.materialDataForm.retail_price)) {
          this.retailPrice = 0
        } else {
          this.retailPrice = Number(this.materialDataForm.retail_price)
        }
      }
      // 如果傳遞過來的 prop -> materialDataForm 裡面的 imgs 有資料的話，就把資料抓到 this.files[]
      this.getImgs()
    },
    theCost(newValue) {
      this.materialDataForm.the_cost = String(newValue)
    }
  },
  created() {
    this.materialDataForm = Object.assign({}, this.formData)
  },
  methods: {
    // ************************************ 圖片開始 ************************************
    getImgs() {
      this.files = []
      // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
      // base64toBlob 超強範例！
      // 編輯商品的時候，要拚接 base64 格式與檔頭，然後 push 到 this.files 裡面會有一個內定的 下面是出處
      // https://blog.csdn.net/hequhecong10857/article/details/108276022
      // 秀出圖片
      // this.dialogImageUrl = obj.url
      // this.dialogVisible = true

      if (this.materialDataForm.imgs.length > 0) {
        this.materialDataForm.imgs.forEach((img) => {
          // params[0] 裡面是檔案格式
          // params[1] 裡面是 base64
          const params = img.split(',')
          let obj = {
            name: '商品照片',
            url: 'data:image/jpeg;base64,' + params[1]
          }
          this.files.push(obj)
        })
      }
    },

    // 圖片移除的 function
    handleRemove(file, fileList) {
      let _index = 0
      for (let index = 0; index < fileList.length; index++) {
        if (fileList[index].uid == file.uid) {
          this.files.splice(index, 1) //移除数组中要删除的图片
          _index = index
        }
      }
      // 如果是 edit 狀態的話，要把 this.materialDataForm 中的 imgs 也移除掉
      // if (this.dialog.option !== 'edit') return

      this.materialDataForm.imgs.splice(_index, 1)
    },
    // 跳出預覽圖片預覽視窗
    // https://www.codeleading.com/article/29861991468/
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    // 過濾跟移除掉超過檔案限制的檔案
    // https://www.jianshu.com/p/840601098d88
    onFileChange(file, fileList) {
      const isIMAGE =
        file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
      // 小於 1M 的檔案是 1024 / 1024  這裡設定小於50k ==> 1024 / 50
      // const isLt1M = file.size / 1024 / 1024 < 1
      const isLt50K = file.size / 1024 / 50 < 1
      if (!isIMAGE) {
        this.$message.error('只能上傳jpg/png圖片!')
        return false
      }
      if (!isLt50K) {
        this.$message.error('上傳文件大小不能超過 50KB!')
        for (let index = 0; index < fileList.length; index++) {
          if (fileList[index].uid == file.uid) {
            this.files.splice(index, 1) //移除数组中要删除的图片
          }
        }
        return false
      }

      let reader = new FileReader()
      const _this = this
      reader.onload = function(e) {
        // 圖片的 base64 存到 materialDataForm.imgs 裡面
        _this.materialDataForm.imgs.push(e.target.result)
      }
      reader.readAsDataURL(file.raw)
      // 重點，把 file 存到 files 這樣 upload 才有辦法操控元件的移除、下載 等等動作  預覽不用
      this.files.push(file)
      // console.log('file', file)
      // console.log('this.files', this.files)
    },
    // ************************************ 圖片結束 ************************************
    // 無條件進位，小數點第三位數會無條件進位
    setCeil(float) {
      this.retailPrice = Math.ceil(float * 100) / 100
    },
    selectTwoChang(id) {
      this.materialDataForm.level_two_id = id
    },
    selectOneChang(id) {
      this.materialDataForm.material_class = id
      this.materialDataForm.level_two_id = ''
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.materialDataForm.last_edit_person = this.user.id
          this.materialDataForm.last_modify_date = new Date()
          this.materialDataForm.imgs = this.materialDataForm.imgs.join('|')
          console.log(this.materialDataForm)
          const url =
            this.dialog.option == 'add'
              ? 'add'
              : `edit/${this.materialDataForm._id}`
          this.$axios
            .post(`/api/material/${url}`, this.materialDataForm)
            .then((res) => {
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 隱藏 MyDialog
              this.dialog.show = false
              // 刷新網頁，傳遞給父組件做更新
              this.$emit('update')
            })
            .catch((err) => {
              console.log('axios添加數據失敗==>MyDialog.vue==>', err)
            })
        } else {
          this.$message({
            message: '有星號的欄位都必須要填寫喔！',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
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

.row-bg {
  padding: 0;
  margin: 0;
  height: 40px;
  /* background-color: #f9fafc; */
}
/* 這邊開始是 布局容器 */
body > .el-container {
  margin-bottom: 40px;
}

.el-main {
  margin: 10px 0 0 0;
  padding: 0;
  /* background-color: #e9eef3; */
  /* color: #333; */
  text-align: left;
  /* line-height: 100% !important; */
  height: 100% !important;
}
.el-header,
.el-footer {
  margin: 0;
  padding: 0;
  /* background-color: #b3c0d1; */
  /* color: #333; */
  text-align: left;
  /* line-height: 100%; */
  height: 100% !important;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 100% !important;
}

.el-container:nth-child(7) .el-aside {
  line-height: 100% !important;
}
/* 布局容器 結束 */
</style>
