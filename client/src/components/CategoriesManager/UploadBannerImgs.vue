<template>
  <div>
    <div class="upload-wrap">
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        accept="image/jpeg,image/gif,image/png"
        multiple
        :limit="6"
        :file-list="bannerImgs"
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
            <span class="el-upload-list__item-delete" @click="handleRemove(file, bannerImgs)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  props: ['bannerFiles', 'imgSize'],
  data() {
    return {
      // files: [],
      dialogImageUrl: '',
      dialogVisible: false,
      bannerImgs: [],
      disabled: Boolean
    }
  },
  watch: {
    // 每當有新的 banner img 進來時觸發
    bannerFiles(newVal) {
      this.bannerImgs = []
      if (newVal.length > 0) {
        newVal.forEach((img) => {
          // params[0] 裡面是檔案格式
          // params[1] 裡面是 base64
          const params = img.split(',')
          let obj = {
            name: '商品照片',
            url: 'data:image/jpeg;base64,' + params[1]
          }
          this.bannerImgs.push(obj)
        })
      }
    }
  },
  methods: {
    onFileChange(file, fileList) {
      const isIMAGE = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
      // 小於 1M 的檔案是 1024 / 1024  這裡設定小於50k ==> 1024 / 50
      // const isLt1M = file.size / 1024 / 1024 < 1
      const size = parseInt(this.imgSize) || 100
      const isLt500K = file.size / 1024 / size < 1
      if (!isIMAGE) {
        this.$message.error('只能上傳jpg/png圖片!')
        return false
      }
      if (!isLt500K) {
        this.$message.error(`上傳文件大小不能超過 ${size / 10}KB!`)
        for (let index = 0; index < fileList.length; index++) {
          if (fileList[index].uid == file.uid) {
            this.bannerImgs.splice(index, 1) //移除数组中要删除的图片
          }
        }
        return false
      }

      let reader = new FileReader()
      const _this = this

      reader.onload = function(e) {
        // 圖片的 base64 存到 levelThreeFormData.imgs 裡面
        // _this.bannerImgs.push(e.target.result)
        // 通知父祖件，增加一個新的檔案
        _this.$emit('updateAddBannerImgs', e.target.result)
      }
      reader.readAsDataURL(file.raw)
      // 重點，把 file 存到 files 這樣 upload 才有辦法操控元件的移除、下載 等等動作  預覽不用
      this.bannerImgs.push(file)

      // console.log('file', file)
      // console.log('this.files', this.files)
    },
    // 圖片移除的 function
    handleRemove(file, fileList) {
      // 先移除元件裡面的 bannerImgs
      let _index = 0
      for (let index = 0; index < fileList.length; index++) {
        if (fileList[index].uid == file.uid) {
          this.bannerImgs.splice(index, 1) //移除数组中要删除的图片
          _index = index
        }
      }
      // 通知父組件，移除圖片，通知父元件的 bannerFiles 並且移除他
      this.$emit('updateRemoveBannerImgs', _index)
    },
    // 跳出預覽圖片預覽視窗
    // https://www.codeleading.com/article/29861991468/
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    }
  }
}
</script>
<style scoped>
.upload-wrap {
  margin-top: 0px;
  margin-bottom: 0px;
  height: 148px;
  overflow: hidden;
}
</style>
