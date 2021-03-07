<template>
  <div class="my-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="1200px"
      ><el-container>
        <!-- :mmodel 綁定的會是 data return 裡面的某個物件 這邊綁定的是 levelOneData -->
        <el-form
          ref="levelThreeForm"
          :model="levelThreeFormData"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto"
          ><el-header height="auto">
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="8"
                ><div class="grid-content">
                  <el-form-item
                    label="先選擇大分類："
                    size="mini"
                    prop="level_one_id"
                    label-width="120px"
                  >
                    <!-- v-model 通常會指定到 formData (要提交的表單) 裡面的某個屬性 這邊是再 data return 裡面的 levelThreeData.level_one_id -->
                    <el-select
                      v-model="levelThreeFormData.level_one_id"
                      placeholder="請選擇"
                      filterable
                      @change="levelOneChang"
                      size="mini"
                    >
                      <!-- value 這邊綁定的是此 陣列裡面，要傳給 select v-mode 的值 -->
                      <!-- label 就單純的顯示再 input 上面可以看到的文字 -->
                      <el-option
                        v-for="(item, index) in categoriesLevelOneData"
                        :key="index"
                        :label="item.name"
                        :value="item._id"
                      >
                        <span style="float: left">{{ item.type }}</span>
                        <span
                          style="float: right; color: #8492a6; font-size: 13px"
                          >{{ item.name }}</span
                        >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div></el-col
              >
              <!-- 第二層的下拉選單 -->
              <!-- ********************* 兩種做法，1.第二個選擇欄位獨立出去  *********************-->
              <!-- ********************* 兩種做法，2.v-if 去判斷資料要不要顯示出來  *********************-->
              <el-col :span="8"
                ><div class="grid-content">
                  <el-form-item
                    label="選擇中分類："
                    size="mini"
                    prop="level_two_id"
                    label-width="120px"
                  >
                    <!-- 可複選的 select 要加入這三個屬性 allow-create default-first-option multiple -->
                    <!-- v-model="levelThreeFormData.level_two_id" -->
                    <el-select
                      v-model="levelThreeFormData.level_two_id"
                      placeholder="請選擇"
                      filterable
                      @change="levelTwoChang"
                      size="mini"
                    >
                      <el-option
                        v-for="(citem, cindex) in updateLevelTwoData"
                        :key="citem._id"
                        :label="citem.name"
                        :value="citem._id"
                      >
                        <span style="float: left">{{ citem.type }}</span>
                        <span
                          style="float: right; color: #8492a6; font-size: 13px"
                          >{{ citem.name }}</span
                        >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div></el-col
              >
              <!-- 輸入商品名稱 -->
              <el-col :span="8">
                <div class="grid-content">
                  <el-form-item
                    label="商品名稱："
                    size="mini"
                    label-width="120px"
                    prop="name"
                  >
                    <el-input
                      placeholder="造型圓形側背包"
                      type="name"
                      v-model="levelThreeFormData.name"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <!-- 第二行開始，備註說明 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="24">
                <div class="grid-content">
                  <el-form-item
                    label="商品說明："
                    size="mini"
                    label-width="120px"
                    prop="describe"
                  >
                    <el-input
                      placeholder="(無耳朵)直徑約25x厚7公分(外口袋+8吋拉鍊內口袋)-仿帆布10安造型圓形側背包(轉印仿帆布10安內裡)(轉印可調背帶2.5X150公分)(10吋)50個"
                      type="name"
                      v-model="levelThreeFormData.describe"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <!-- 第三行開始，商品編號，商品狀態 啟用/VIP ，最後修改時間，最後修改人員-->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="商品編號："
                    size="mini"
                    label-width="120px"
                    prop="type"
                  >
                    <el-input
                      type="type"
                      placeholder="0001 (四碼)"
                      v-model="levelThreeFormData.type"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="商品狀態："
                    size="mini"
                    label-width="120px"
                    prop="status.activated"
                  >
                    <el-checkbox v-model="levelThreeFormData.status.activated"
                      >啟用</el-checkbox
                    >
                    <el-checkbox v-model="levelThreeFormData.status.vip"
                      >VIP</el-checkbox
                    >
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="最後修改時間："
                    size="mini"
                    label-width="120px"
                    prop=""
                  >
                    <el-input
                      type=""
                      v-model="getDate"
                      :readonly="true"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="最後修改人員："
                    size="mini"
                    label-width="120px"
                    prop=""
                  >
                    <el-input
                      type=""
                      v-model="getUserNameById"
                      :readonly="true"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <!-- 第四行開始，商品介紹影片，校色影片-->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="影片名稱："
                    size="mini"
                    label-width="120px"
                    prop="introduction_video.label"
                  >
                    <el-input
                      type="type"
                      placeholder="零錢包的製作影片"
                      v-model="levelThreeFormData.introduction_video.label"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="影片連結："
                    size="mini"
                    label-width="120px"
                    prop="introduction_video.link"
                  >
                    <el-input
                      type="type"
                      placeholder="https://youtu.be/Olm_oOCY_2Y"
                      v-model="levelThreeFormData.introduction_video.link"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="布料校色："
                    size="mini"
                    label-width="120px"
                    prop="salting_on_color_video.label"
                  >
                    <el-input
                      type="type"
                      placeholder="布料校色"
                      v-model="levelThreeFormData.salting_on_color_video.label"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="校色連結："
                    size="mini"
                    label-width="120px"
                    prop="salting_on_color_video.link"
                  >
                    <el-input
                      type="type"
                      placeholder="https://youtu.be/Olm_oOCY_2Y"
                      v-model="levelThreeFormData.salting_on_color_video.link"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <!-- 第五行開始，其他影片(一)，其他影片(二)-->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="其它(一)："
                    size="mini"
                    label-width="120px"
                    prop="note_one_video.label"
                  >
                    <el-input
                      type="type"
                      placeholder="影片(一)"
                      v-model="levelThreeFormData.note_one_video.label"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="連結(一)："
                    size="mini"
                    label-width="120px"
                    prop="note_one_video.link"
                  >
                    <el-input
                      type="type"
                      placeholder="https://youtu.be/Olm_oOCY_2Y"
                      v-model="levelThreeFormData.note_one_video.link"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="其它(二)："
                    size="mini"
                    label-width="120px"
                    prop="note_two_video.label"
                  >
                    <el-input
                      type="type"
                      placeholder="影片(二)"
                      v-model="levelThreeFormData.note_two_video.label"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="連結(二)："
                    size="mini"
                    label-width="120px"
                    prop="note_two_video.link"
                  >
                    <el-input
                      type="type"
                      placeholder="https://youtu.be/Olm_oOCY_2Y"
                      v-model="levelThreeFormData.note_two_video.link"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <!-- 第六行開始，版型編號-->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item
                    label="版型編號："
                    size="mini"
                    label-width="120px"
                    prop="pattern_no"
                  >
                    <el-input
                      type="type"
                      placeholder="版型編號範例尚未制定"
                      v-model="levelThreeFormData.pattern_no"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item
                    label="版型下載："
                    size="mini"
                    label-width="120px"
                    prop="pattern_download"
                  >
                    <el-input
                      type="type"
                      placeholder="雲端的下載連結網址，通常是一個google雲端目錄"
                      v-model="levelThreeFormData.pattern_download"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-header>
            <!-- 第七行開始，平車費用，裁切費用-->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="平車費用"
                    size="mini"
                    label-width="120px"
                    prop="tailor_fee"
                  >
                    <my-currency-input
										:height="24"
                    :width="130"
                    :isReadyOnly="false"
                    type="tailor_fee"
                    v-model="tailorFee"
                  ></my-currency-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="裁切費用："
                    size="mini"
                    label-width="120px"
                    prop="crop_fee"
                  >
                    <my-currency-input
										:height="24"
                    :width="130"
                    :isReadyOnly="false"
                    type="crop_fee"
                    v-model="cropFee"
                  ></my-currency-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="拆圖數量："
                    size="mini"
                    label-width="120px"
                    prop="split_quantity"
                  >
                    <el-input
                      type="type"
                      placeholder="可拆圖的最低數量"
                      v-model="levelThreeFormData.split_quantity"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    label="最低訂量："
                    size="mini"
                    label-width="120px"
                    prop="mini_order"
                  >
                   <el-input
                      type="type"
                      placeholder="商品的最低訂購量"
                      v-model="levelThreeFormData.mini_order"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
						<!-- 第八行開始，外表布寬，高，內裡布寬，高 -->
						<el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="4">
                <el-form-item prop="outside_layout_width" label="外表布寬：">
                  <el-input
                    placeholder="寬度"
                    size="mini"
                    type="type"
                    v-model="levelThreeFormData.outside_layout_width"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item prop="outside_layout_height" label="外表布高：">
                  <el-input
                    placeholder="高度"
                    size="mini"
                    type="type"
                    v-model="levelThreeFormData.outside_layout_height"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item prop="inside_layout_width" label="內裡布寬：">
                  <el-input
                    placeholder="寬度"
                    size="mini"
                    type="type"
                    v-model="levelThreeFormData.inside_layout_width"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item prop="inside_layout_height" label="內裡布高：">
                  <el-input
                    placeholder="高度"
                    size="mini"
                    type="type"
                    v-model="levelThreeFormData.inside_layout_height"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-header>
          <!-- 第九行開始，圖片上傳 -->
          <!-- 圖片上傳的教學 https://segmentfault.com/a/1190000013796215 -->
          <!-- 上傳一張照片的時候隱藏 後面的 + 框框  https://www.twblogs.net/a/5b81a49e2b71772165ad9752 -->
          <!-- 另外一種做法：https://blog.csdn.net/zaocha321/article/details/103345423 -->
          <el-main>
            <!-- <div class="image-warp"> -->
            <el-form-item
              label="圖片上傳："
              size="mini"
              label-width="120px"
              prop="describe"
            >
              <div class="upload-wrap">
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
              </div>
            </el-form-item>
            <!-- </div> -->
          </el-main>

          <!-- 取消、提交、重置 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <!-- 這裡有個問題點，沒有清除浮動 -->
            <el-col :span="24">
              <div class="grid-content">
                <el-form-item
                  class="text_right"
                  label-width="110px"
                  style="margin-top:10px"
                >
                  <el-button type="warning" @click="dialog.show = false"
                    >取消</el-button
                  >
                  <el-button type="primary" @click="onSubmit('levelThreeForm')"
                    >提交</el-button
                  >
                  <el-button @click="resetForm('levelThreeForm')"
                    >重置</el-button
                  >
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <!-- 表單結束 -->
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'categories-level-three-dialog',
  props: {
    dialog: Object,
    // 父元件傳到子元件的屬性，不能編輯他，如果要編輯，要使用 $emit
    formData: Object,
    allUserNameId: Array,
    categoriesLevelOneData: Array,
    categoriesLevelTwoData: Array
  },
  data() {
    return {
      levelThreeFormData: {},
      dontRemove: '5fd54071cbcb7757640a7ee7',
      // 圖片上傳
      uploadData: {
        dataType: '0',
        oldFilePath: ''
      },
			files: [],
			tailorFee:0,
			cropFee:0,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: Boolean,
      updateLevelTwoData: [],
      form_rules: {
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.levelThreeFormData = Object.assign({}, this.formData)
    this.getImgs()
  },
  mounted() {
    // 這一行很重要，當子元件一啟動，就會先執行一次，然後接下來要去 watch 觀察 dialog 的變化，
    // 要是有資料流進來，就會重新把 updateLevelTwoData
    // 嘿嘿
    this.levelOneChang(this.levelThreeFormData.level_one_id)
    // 如果是要新增商品，就把 el-upload 裡面的圖片資料清空，這邊做第一次近來的初始化，接下來透過 watch this.dialog 去做監控與更新
		if (this.dialog.option === 'add') this.files = []
		// 舊資料裡面的 tailor_fee 跟 crop_frr 有可能是 undefined 所以在父元件的時候就處理掉 handleEditCategory 裡面去處理
		this.setFee(this.formData.tailor_fee, this.formData.crop_fee)
  },
  computed: {
    getDate() {
      if (!this.levelThreeFormData) return '目前沒有修改過'
      return this.$moment(this.levelThreeFormData.last_modify_date).format(
        'YYYY年MM月DD日-HH:mm'
      )
    },
    getUserNameById() {
      if (!this.levelThreeFormData.last_edit_person) return '目前沒有修改過'
      let name = ''
      this.allUserNameId.forEach((item, index) => {
        if (item._id == this.levelThreeFormData.last_edit_person)
          name = item.name
      })
      return name
    },
    user() {
      return this.$store.getters.user
    }
  },
  watch: {
		// 觀察 tailor_fee 跟 crop_fee 當變化的時候就更新到表單裡面 this.levelThreeFormData
		tailorFee(newValue){
			this.levelThreeFormData.tailor_fee = String(newValue)
		},
		cropFee(newValue){
			this.levelThreeFormData.crop_fee = String(newValue)
		},
    // 當 props dialog 有新的 資料進來 (這邊是點擊【編輯】 的時候會觸發) 然後更新 Imgs 但是第一次還是要掛載於 created() 裡面喔
    dialog() {
      // 如果是要新增商品，就把 el-upload 裡面的圖片資料清空，mounted 執行過後，每次監控，透過 watch this.dialog 去做判斷要不要清空 files[]
      if (this.dialog.option === 'add') {
        this.files = []
        this.formData.imgs = []
			}
			// 父元素 就處理好了 formData 如果是 add 就是乾淨的資料，如果是 edit 就是要編輯的資料
			this.levelThreeFormData = Object.assign({}, this.formData)
			// 記得要把要編輯的資料裡面的 tailor_fee 跟 crop_fee 存到 tailorFee 跟 cropFee 裡面
			// 因為這兩個欄位是另外的子元件會需要使用到的欄位，而且有被 watch
			// 第一次我們要靠 mounted 去觸發 setFee 第二次開始就會從這邊去做設定 setFee
			this.setFee(this.levelThreeFormData.tailor_fee, this.levelThreeFormData.crop_fee)
      // 第一次更新 updateLevelTwoData 在 mounted(){} 裡面，這邊是後續每次異動 dialog 都會去更新 updateLevelTwoData
      this.levelOneChang(this.levelThreeFormData.level_one_id)
      this.getImgs()
    },

    updateLevelTwoData() {
      console.log('恩，有變動')
    }
  },
  methods: {
		// 當這個元件被觸發的時候，要更新一些束值
		setFee(tailorFee, cropFee){
			// isNaN 判斷這個數值是否可以被轉換成數字
			if(isNaN(tailorFee)) {this.tailorFee=0} else{this.tailorFee = Number(tailorFee)}
			if(isNaN(cropFee)) {this.tailorFee=0} else{this.cropFee = Number(cropFee)}
		},
    // 把從資料庫讀進來的 Imgs (base64) 拼接成 el-upload 的 files 可以接受的格式，這樣就會顯示出來了
    getImgs() {
      this.files = []
      // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
      // base64toBlob 超強範例！
      // 編輯商品的時候，要拚接 base64 格式與檔頭，然後 push 到 this.files 裡面會有一個內定的 下面是出處
      // https://blog.csdn.net/hequhecong10857/article/details/108276022
      // 秀出圖片
      // this.dialogImageUrl = obj.url
      // this.dialogVisible = true
      if (this.levelThreeFormData.imgs.length > 0) {
        this.levelThreeFormData.imgs.forEach((img) => {
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
    // 第一層被選中後，就會去更新第二層的資料
    levelOneChang(id) {
      if (id) {
        console.log('levelOneChang', id)
        this.updateLevelTwoData = this.categoriesLevelTwoData.filter((item) => {
          return item.level_one_id === id
        })
      } else {
        this.updateLevelTwoData = []
      }
    },
    levelTwoChang() {
      console.log('categoriesThreeDialog第二層選項備呼叫惹')
    },
		// 提交表單 add / edit
    onSubmit(formName) {
			// add 的時候，如果是 edit 要改
			// dialog 發生變化的時候 (使用 watch 觀察) 就會把 levelThreeFormData 的內容清空或是設定好
			// 關於 tailor_fee 跟 crop_fee 的數字，也是使用 watch 去觀察跟設定到 levelThreeFoemData 裡面
      const uploadFormData = {
				outside_layout_width:this.levelThreeFormData.outside_layout_width,
				outside_layout_height:this.levelThreeFormData.outside_layout_height,
				inside_layout_width:this.levelThreeFormData.inside_layout_width,
				inside_layout_height:this.levelThreeFormData.inside_layout_height,
        name: this.levelThreeFormData.name,
        level_one_id: this.levelThreeFormData.level_one_id,
        level_two_id: this.levelThreeFormData.level_two_id,
        describe: this.levelThreeFormData.describe,
        type: this.levelThreeFormData.type,
        level: this.levelThreeFormData.level,
        imgs: this.levelThreeFormData.imgs.join('|'),
        last_modify_date: new Date(),
        last_edit_person: this.user.id,
        status: Object.assign({}, this.levelThreeFormData.status),
        pattern_no: this.levelThreeFormData.pattern_no,
        pattern_download: this.levelThreeFormData.pattern_download,
        tailor_fee: this.levelThreeFormData.tailor_fee,
        crop_fee: this.levelThreeFormData.crop_fee,
				split_quantity:this.levelThreeFormData.split_quantity,
				mini_order:this.levelThreeFormData.mini_order,
        introduction_video: Object.assign(
          {},
          this.levelThreeFormData.introduction_video
        ),
        salting_on_color_video: Object.assign(
          {},
          this.levelThreeFormData.salting_on_color_video
        ),
        note_one_video: Object.assign(
          {},
          this.levelThreeFormData.note_one_video
        ),
        note_two_video: Object.assign(
          {},
          this.levelThreeFormData.note_two_video
        )
			}
console.log(uploadFormData)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 紀錄最後修改的使用者，最後修改的時間放到了 server 端去紀錄
          uploadFormData.level = 3
          if (uploadFormData.level_one_id === this.dontRemove) {
            this.$message('請重新選擇第一層分類，您不能選擇全部分類')
            return
          }
          const url =
            this.dialog.option == 'add'
              ? 'add'
              : `edit/${this.levelThreeFormData._id}`
          this.$axios
            .post(`/api/categories/${url}`, uploadFormData)
            .then((res) => {
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 不管怎麼樣都隱藏 edit dialog 的視窗
              this.dialog.show = false
              //  提交資料到資料庫後，清空前端的圖片 levelThreeFormData.imgs = [] 下面的圖片資料清空
              this.levelThreeFormData.imgs = []
              this.files = []
              // 刷新網頁，傳遞給父組件做更新
              this.$emit('update')
            })
            .catch((err) => {
              console.log('axios添加數據失敗==>MyDialog.vue==>', err)
            })
        }
      })
    },
    // 新增第三層商品裡面，清空所有欄位的按鍵，當然，包含了圖片
    resetForm(formName) {
      this.$refs[formName].resetFields()
      // 清空圖片
      this.files = []
      this.levelThreeFormData.imgs = []
      this.levelThreeFormData.status.vip = false
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
      // 如果是 edit 狀態的話，要把 this.levelThreeFormData 中的 imgs 也移除掉
      // if (this.dialog.option !== 'edit') return

      this.levelThreeFormData.imgs.splice(_index, 1)
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
        // 圖片的 base64 存到 levelThreeFormData.imgs 裡面
        _this.levelThreeFormData.imgs.push(e.target.result)
      }
      reader.readAsDataURL(file.raw)
      // 重點，把 file 存到 files 這樣 upload 才有辦法操控元件的移除、下載 等等動作  預覽不用
      this.files.push(file)
      // console.log('file', file)
      // console.log('this.files', this.files)
    }
  }
}
</script>

<style scoped>
/* eslint-disable */
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  background-color: #fff;
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

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
  width: 100%;
}
.row-bg {
  padding: 0;
  margin: 0;
  height: 40px;
  background-color: #f9fafc;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  padding: 0;
  margin: 0;
  width: 1140px;
  line-height: 40px;
  /* height: 40px; */
  height: 100%;
}
.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  padding: 0;
  margin: 0;
  /* line-height: 400px; */
  /* position: relative; */
}

.upload-wrap {
  margin-top: 0px;
  margin-bottom: 0px;
  height: 148px;
  overflow: hidden;
}
.el-form-item {
  margin-bottom: 0px;
}

/* .hide .el-upload.el-upload--picture-card {
  display: none;
} */

/* https://blog.csdn.net/weixin_47711284/article/details/106403718 */
</style>
