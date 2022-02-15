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
            <!-- 第一層，選擇分類，原料組名稱，客戶端看的 -->
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="8">
                <div class="grid-content">
                  <el-form-item prop="choiceLevelTwoValue" label="選擇分類：">
                    <el-cascader
                      class="cascader"
                      @change="onOptionsChange"
                      v-model="choiceLevelTwoValue"
                      :props="{ expandTrigger: 'hover' }"
                      size="mini"
                      placeholder="請選擇第二層分類"
                      :options="levelOneTowOption"
                      filterable
                    ></el-cascader>
                  </el-form-item>
                </div>
              </el-col>
              <!-- 原料組名稱 -->
              <el-col :span="10">
                <div class="grid-content">
                  <el-form-item label="原料組名稱：" size="mini" label-width="120px" prop="name">
                    <el-input
                      placeholder="12吋圓包專用拉鍊 or 御守專用井字結"
                      type="name"
                      v-model="levelThreeFormData.name"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <!-- 客戶端看的 -->
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item label="客戶端看的：" size="mini" label-width="120px" prop="web_side_name">
                    <el-input
                      placeholder="給客戶看的，簡短名稱"
                      type="web_side_name"
                      v-model="levelThreeFormData.web_side_name"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-header>
          <!-- 第二層，加工費用，備註 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6">
              <div class="grid-content">
                <el-form-item label="加工費-暫時沒用：" size="mini" label-width="120px" prop="processing_fee">
                  <my-currency-input
                    :width="132"
                    :height="24"
                    :isReadyOnly="false"
                    type="processing_fee"
                    v-model="processingFee"
                  ></my-currency-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="grid-content">
                <el-form-item label="備註：" size="mini" label-width="120px" prop="describe">
                  <el-input :isReadyOnly="false" type="describe" v-model="levelThreeFormData.describe"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!-- 第三層，編號(type)，修改時間，修改人員 -->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="6">
              <div class="grid-content">
                <el-form-item label="組合編號：" size="mini" label-width="120px" prop="type">
                  <el-input type="type" placeholder="4碼，例如：0001" v-model="levelThreeFormData.type"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-form-item label="修改時間：" size="mini" label-width="120px" prop="">
                  <el-input :readonly="true" type="" v-model="getDate"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-form-item label="修改人員：" size="mini" label-width="120px" prop="">
                  <el-input :readonly="true" type="" v-model="getUserNameById"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!-- 第四列 原物料組分類-->
          <el-row :gutter="20" type="flex" class="row-bg">
            <el-col :span="24">
              <el-form-item prop="kind" label="原料組分類：">
                <el-radio-group v-model="levelThreeFormData.kind">
                  <el-radio :label="1">表布專用</el-radio>
                  <el-radio :label="2">裡布專用</el-radio>
                  <el-radio :label="3">一般原料、配件專用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第四列結束 -->
          <!-- 第五列 客戶選擇配件說明  -->
          <el-row :gutter="20" type="flex" class="row-bg" style="height:20%; ">
            <el-col :span="24">
              <div class="grid-content">
                <el-form-item label="配件選擇說明：" prop="" label-width="120px">
                  <el-input
                    type="textarea"
                    placeholder="請輸入配件選擇說明"
                    v-model="levelThreeFormData.select_description"
                    :rows="3"
                    maxlength="120"
                    show-word-limit
                    style="margin-top:8px"
                  >
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <!-- 第六行開始，圖片上傳 -->
          <!-- 圖片上傳的教學 https://segmentfault.com/a/1190000013796215 -->
          <!-- 上傳一張照片的時候隱藏 後面的 + 框框  https://www.twblogs.net/a/5b81a49e2b71772165ad9752 -->
          <!-- 另外一種做法：https://blog.csdn.net/zaocha321/article/details/103345423 -->
          <el-main>
            <!-- <div class="image-warp"> -->
            <el-form-item
              label="圖片上傳："
              size="mini"
              label-width="120px"
              prop="imgs"
              style="margin-top:10px;margin-bottom:00px"
            >
              <div class="upload-wrap">
                <el-upload
                  :data="uploadData"
                  action="uploadActionUrl"
                  list-type="picture-card"
                  :auto-upload="false"
                  accept="image/jpeg,image/gif,image/png"
                  multiple
                  :limit="2"
                  :file-list="files"
                  :on-change="onFileChange"
                >
                  <el-dialog :visible.sync="dialogVisible" append-to-body width="520px">
                    <img width="480px" height="480px" fit="contain" :src="dialogImageUrl" alt="" />
                  </el-dialog>
                  <i slot="default" class="el-icon-plus"></i>
                  <div class="image-content" slot="file" slot-scope="{ file }">
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span v-if="!disabled" class="el-upload-list__item-download" @click="handleDownload(file)">
                        <i class="el-icon-download"></i>
                      </span>
                      <!-- v-if="!disabled" -->
                      <span class="el-upload-list__item-delete" @click="handleRemove(file, files)">
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
                <el-form-item class="text_right" label-width="110px" style="margin-top:10px">
                  <el-button type="warning" @click="dialog.show = false">取消</el-button>
                  <el-button type="primary" @click="onSubmit('levelThreeForm')">提交</el-button>
                  <el-button @click="resetForm('levelThreeForm')">重置</el-button>
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
  name: 'group-level-three-dialog',
  //子组件通过 props方法获取父组件传递过来的值
  props: {
    dialog: Object,
    groupLevelOneData: Array,
    groupLevelTwoData: Array,
    allUserNameId: Array,
    editFormData: Object,
    // add 的時候，傳遞進來的會是空的資料，edit 的時候，會是點選 row 時候所帶進來的數值
    emptyLevelThreeFormData: Object
  },
  data() {
    return {
      // 加工費用
      processingFee: 0,
      // 暫存第三層的資料，如果是 add 就是清空，如果是 edit 就把 row 讀到的資料傳送過來
      // 這邊決定了，把 schema 的資料原型從父元件那邊傳遞過來，畢竟有很多欄位，不見得會填寫完整
      // 當需要判斷 ims.length 的時候，也才不會跳錯
      levelThreeFormData: {},
      uploadData: {
        dataType: '0',
        oldFilePath: ''
      },
      // 圖片上傳
      files: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: Boolean,
      updateLevelTwoData: [],
      form_rules: {
        kind: [{ required: true, message: '必選，必須正確', trigger: 'blur' }],
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        choiceLevelTwoValue: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        web_side_name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        describe: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      },
      // cascader
      choiceLevelTwoValue: [], // 存放第一層與第二層的值，改變的時候要塞到 levelThreeDormData.choiceLevelTwoValue 裡面
      levelOneTowOption: [] // 存放第一層與第二層的分類
    }
  },
  mounted() {
    this.levelThreeFormData = Object.assign({}, this.emptyLevelThreeFormData)
  },
  //通过watch来监听message是否改变
  watch: {
    // 當加工費用有變化的時候，把數直存入到 levelThreeFormData.processing_fee 中
    processingFee(newValue) {
      this.levelThreeFormData.processing_fee = String(newValue)
    },
    // 如果 當 dialog 有變化的時候，去檢查第一層跟第二層有沒有資料，並且組合成 cscader 的 options
    dialog() {
      if (this.groupLevelOneData.length && this.groupLevelTwoData.length) {
        this.levelOneTowOption = []
        this.groupLevelOneData.forEach((item) => {
          // console.log(index, item.name, item._id)
          let obj = {
            value: '',
            label: '',
            children: []
          }
          obj.value = item._id
          obj.label = item.type + ' ' + item.name
          this.levelOneTowOption.push(obj)
        })

        for (let i = 0; i < this.levelOneTowOption.length; i++) {
          const level_one_id = this.levelOneTowOption[i].value
          this.groupLevelTwoData.forEach((item) => {
            if (item.level_one_id === level_one_id) {
              let obj2 = {
                value: '',
                label: ''
              }
              obj2.value = item._id
              obj2.label = item.type + ' ' + item.name
              this.levelOneTowOption[i].children.push(obj2)
            }
          })
        }
      }
      if (this.dialog.option === 'add') {
        this.files = []
        this.processingFee = 0
        this.choiceLevelTwoValue = []
        this.emptyLevelThreeFormData.imgs = []
        console.log(this.emptyLevelThreeFormData)
        this.levelThreeFormData = Object.assign({}, this.emptyLevelThreeFormData)
      }
      if (this.dialog.option === 'edit') {
        this.levelThreeFormData = Object.assign({}, this.editFormData)
        this.choiceLevelTwoValue = this.editFormData.choiceLevelTwoValue
        // processingFee 因為是自定義元件 所以沒有辦法使用 from 去包覆這個資料，所以要另外處理
        if (typeof this.editFormData.processing_fee === 'undefined') {
          this.processingFee = 0
        } else {
          this.processingFee = Number(this.editFormData.processing_fee)
        }
        this.getImgs()
      }
    }
  },
  computed: {
    getDate() {
      if (!this.levelThreeFormData.last_modify_date) return '目前沒有修改過'
      return this.$moment(this.levelThreeFormData.last_modify_date).format('YYYY年MM月DD日 - HH：mm')
    },
    getUserNameById() {
      if (!this.levelThreeFormData.last_edit_person) return '您是第一個'
      let name = ''
      this.allUserNameId.forEach((item, index) => {
        if (item._id == this.levelThreeFormData.last_edit_person) name = item.name
      })
      return name
    },
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    // 提交表單 add / edit
    onSubmit(formName) {
      // add 的時候，如果是 edit 要改
      const uploadFormData = {
        kind: this.levelThreeFormData.kind,
        name: this.levelThreeFormData.name,
        describe: this.levelThreeFormData.describe,
        type: this.levelThreeFormData.type,
        level: 3,
        imgs: this.levelThreeFormData.imgs.join('|'),
        last_modify_date: new Date(),
        last_edit_person: this.user.id,
        web_side_name: this.levelThreeFormData.web_side_name,
        processing_fee: String(this.processingFee),
        choiceLevelTwoValue: this.choiceLevelTwoValue,
        level_one_id: this.levelThreeFormData.level_one_id,
        level_two_id: this.levelThreeFormData.level_two_id,
        select_description: this.levelThreeFormData.select_description
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 紀錄最後修改的使用者，最後修改的時間放到了 server 端去紀錄
          uploadFormData.level = 3
          const url = this.dialog.option == 'add' ? 'add' : `edit/${this.levelThreeFormData._id}`
          this.$axios
            .post(`/api/material-group/${url}`, uploadFormData)
            .then((res) => {
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 不管怎麼樣都隱藏 edit dialog 的視窗
              this.dialog.show = false
              //  提交資料到資料庫後，清空前端的圖片 levelThreeFormData.imgs = [] 下面的圖片資料清空
              this.resetForm('levelThreeForm')
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
    // cascader 選擇內容的時候，把內容存起來到 表單裡面
    onOptionsChange() {
      this.levelThreeFormData.choiceLevelTwoValue = this.choiceLevelTwoValue.slice(0, this.choiceLevelTwoValue.length)
      this.levelThreeFormData.level_one_id = this.choiceLevelTwoValue[0]
      this.levelThreeFormData.level_two_id = this.choiceLevelTwoValue[1]
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

    // 新增第三層商品裡面，清空所有欄位的按鍵，當然，包含了圖片
    resetForm(formName) {
      this.$refs[formName].resetFields()
      // 清空圖片，表單內容
      this.files = []
      this.processingFee = 0
      this.choiceLevelTwoValue = []
      this.levelThreeFormData.imgs.splice(0, this.levelThreeFormData.imgs.length)
      this.levelThreeFormData.choiceLevelTwoValue.splice(0, this.levelThreeFormData.choiceLevelTwoValue.length)
    },
    // 這邊開始為圖片的部分 **********************************************************************************************************
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
      const isIMAGE = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
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
    // 這邊為圖片的部分結束 **********************************************************************************************************
  }
}
</script>
<style scoped>
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
.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  padding: 0;
  margin: 0;
  /* line-height: 400px; */
  /* position: relative; */
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
.el-form-item {
  margin-bottom: 0px;
}
.cascader {
  float: left;
  margin: 0 15px 0 0;
  padding: 0;
  width: 300px;
}
/* 直接調整 el-cascader 沒有用，因為外面套了一個 div 該 class 為 .el-cascader--mini */
.el-cascader--mini {
  width: 100% !important;
}
</style>
