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
              <div class="cascader-wrap">
                <el-cascader
                  @change="onOptionsChange"
                  v-model="choiceLevelTwoValue"
                  :props="{ expandTrigger: 'hover' }"
                  size="mini"
                  placeholder="請選擇第二層分類"
                  :options="levelOneTowOption"
                  filterable
                ></el-cascader>
              </div>
            </el-row>
          </el-header>
          <!-- 第七行開始，圖片上傳 -->
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
  name: 'group-level-three-dialog',
  //子组件通过 props方法获取父组件传递过来的值
  props: {
    dialog: Object,
    groupLevelOneData: Array,
    groupLevelTwoData: Array,
    // add 的時候，傳遞進來的會是空的資料，edit 的時候，會是點選 row 時候所帶進來的數值
    parentLevelThreeFormData: Object
  },
  data() {
    return {
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
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        describe: [
          { required: true, message: '此欄位不能為空', trigger: 'blur' }
        ]
      },
      // cascader
      choiceLevelTwoValue: '',
      levelOneTowOption: [] // 存放第一層與第二層的分類
    }
  },
  //通过watch来监听message是否改变
  watch: {
    // 如果 當 dialog 有變化的時候，去檢查第一層跟第二層有沒有資料，並且組合成 cscader 的 options
    dialog() {
      console.log('我是 watch - dialog', this.dialog)
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
    }
  },
  // 创建完毕状态(里面是操作)
  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // cascader 選擇內容的時候
    onOptionsChange() {},
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
    },
    // 新增第三層商品裡面，清空所有欄位的按鍵，當然，包含了圖片
    resetForm(formName) {
      this.$refs[formName].resetFields()
      // 清空圖片
      this.files = []
      this.levelThreeFormData.imgs = []
    }
  }
}
</script>
<style>
.hide .el-upload--picture-card {
  display: none;
}
.cascader-wrap {
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
