<template>
  <!--  https://cloud.tencent.com/developer/article/1677358 文章出處-->
  <div>
    <el-upload
      :action="action"
      ref="upload"
      list-type="picture-card"
      accept="image/*"
      :class="{ hide: WhetherUpload || isShowUpload }"
      :limit="imgLimit"
      :file-list="fileList"
      :multiple="isMultiple"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-exceed="handleExceed"
      :on-error="imgUploadError"
    >
      <i class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="removeIco"
            class="el-upload-list__item-delete"
            @click="handleRemove(file, fileList)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'upload',
  //子组件通过 props方法获取父组件传递过来的值
  props: {
    action: { type: String }, //action请求地址
    imgLimit: { type: Number, default: 1 }, //设置上传数量
    fileSize: { type: Number, default: 2 }, //设置图片大小
    fileListStr: '', //查看已上传图片
    removeIco: { type: Boolean, default: true }, //是否显示删除按钮
    operationType: { type: Boolean, default: true }, //刷新页面
    isShowUpload: { type: Boolean, default: false } //是否显示上传操作
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      isMultiple: true,
      imgList: [],
      WhetherUpload: false, //是否显示上传操作
      fileList: []
    }
  },
  //通过watch来监听message是否改变
  watch: {
    operationType: function() {
      // console.log(this.operationType)
      this.WhetherUpload = this.fileList.length >= this.imgLimit
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    this.fileList = this.imageConversion(this.imgLimit, this.fileListStr)
    this.WhetherUpload = this.fileList.length >= this.imgLimit
  },
  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    //移除图片
    handleRemove(file, fileList) {
      console.log(fileList)
      for (let index = 0; index < fileList.length; index++) {
        if (fileList[index].uid == file.uid) {
          this.fileList.splice(index, 1) //移除数组中要删除的图片
        }
      }
      this.WhetherUpload = this.fileList.length >= this.imgLimit
      this.$emit('getImgList', this.fileList)
    },
    //预览图片时调用
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    //文件上传之前调用做一些拦截限制
    beforeAvatarUpload(file) {
      const isJPG = true
      const isLt2M = file.size / 1024 / 1024 < this.fileSize
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 ' + this.fileSize + 'MB!')
      }
      return isJPG && isLt2M
    },
    //图片上传成功
    handleAvatarSuccess(res, file, fileList) {
      console.log('图片上传')
      console.log(fileList)
      console.log(file)
      this.imgList = fileList
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit('getImgList', fileList)

      this.WhetherUpload = fileList.length >= this.imgLimit
      // console.log(this.imgList)
      // console.log(this.WhetherUpload)
    },
    //图片上传超过数量限制
    handleExceed(files, fileList) {
      this.$message.error('上传图片不能超过' + this.imgLimit + '张!')
      // console.log(files, fileList);
      this.imgList = fileList
      this.$emit('getImgList', this.imgList)
    },
    //图片上传失败调用
    imgUploadError(err, file, fileList) {
      console.log(file)
      console.log(fileList)
      console.log(err)
      this.$message.error('上传图片失败!')
      this.$emit('getImgList', fileList)
      this.WhetherUpload = fileList.length >= this.imgLimit
    },
    /**
     * 处理获取服务地址转成本地查看
     * type:图片数量
     * parameter:图片参数
     */
    imageConversion: function(type, parameter) {
      console.log(parameter)
      let imgList = []
      if (type > 1) {
        if (parameter) {
          for (let i = 0; i < parameter.length; i++) {
            let img = {
              url: parameter[i],
              response: ''
            }
            imgList.push(img)
          }
        }
        return imgList
      } else {
        if (parameter) {
          let img = {
            url: parameter,
            response: ''
          }
          imgList.push(img)
        }
        return imgList
      }
    }
  }
}
</script>
<style>
.hide .el-upload--picture-card {
  display: none;
}
</style>
