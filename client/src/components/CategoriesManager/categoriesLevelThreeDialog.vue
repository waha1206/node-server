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
          ><el-header style="height: 80px;">
            <el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="8"
                ><div class="grid-content">
                  <el-form-item
                    label="先選擇大分類："
                    size="mini"
                    prop="levelOneId"
                    label-width="120px"
                  >
                    <!-- v-model 通常會指定到 formData (要提交的表單) 裡面的某個屬性 這邊是再 data return 裡面的 levelThreeData.levelOneId -->
                    <el-select
                      v-model="levelThreeFormData.levelOneId"
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
              <el-col :span="8"
                ><div class="grid-content">
                  <el-form-item
                    label="選擇中分類："
                    size="mini"
                    prop="levelTwoId"
                    label-width="120px"
                  >
                    <!-- 可複選的 select 要加入這三個屬性 allow-create default-first-option multiple -->
                    <el-select
                      v-model="levelThreeFormData.levelTwoId"
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
                      type="name"
                      v-model="levelThreeFormData.describe"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-header>
          <!-- 第三行開始，圖片上傳 -->
          <!-- 圖片上傳的教學 https://segmentfault.com/a/1190000013796215 -->
          <!-- 上傳一張照片的時候隱藏 後面的 + 框框  https://www.twblogs.net/a/5b81a49e2b71772165ad9752 -->
          <div>
            <p>要提交的表單內容：{{ levelThreeFormData }}</p>
            <p>-----------------</p>
            <p v-for="item in updateLevelTwoData">
              {{ item.type }}{{ item.name }}--{{ item._id }}
            </p>
            <p>-----------------</p>
            <P>預覽 (dialogImageUrl)：{{ dialogImageUrl }}</P>
            <p>-----------------</p>
            <p>{{ levelThreeFormData.uploadData }}</p>
            <p>-----------------</p>
            <p>files:{{ files }}</p>
          </div>
          <el-main>
            <div class="image-warp">
              <el-form-item
                class="image-content"
                label="圖片上傳："
                size="mini"
                label-width="120px"
                prop="describe"
              >
                <!-- :class="{ disabled: uploadDisabled }" -->
                <el-upload
                  :data="levelThreeFormData.uploadData"
                  action="uploadActionUrl"
                  list-type="picture-card"
                  :auto-upload="false"
                  accept="image/jpeg,image/gif,image/png"
                  multiple
                  :limit="5"
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
            </div>
          </el-main>
          <!-- 取消與提交 -->
          <el-row :gutter="20" type="flex" class="row-bg">
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

        <!-- 要提交的formData 裡面的資料 -->

        <!-- <p v-for="item in categoriesLevelTwoData">{{ item.name }}</p> -->
        <!-- <p>{{ dialog }}</p>
      <p>{{ formData }}</p>
      <p>{{ categoriesLevelOneData }}</p>
      -->
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'categories-level-three-dialog',
  props: {
    dialog: Object,
    formData: Object,
    categoriesLevelOneData: Array,
    categoriesLevelTwoData: Array
  },
  data() {
    return {
      // 圖片上傳
      files: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: Boolean,
      updateLevelTwoData: [],
      // upload 第三層的商品 formData
      levelThreeFormData: {
        levelOneId: '',
        levelTwoId: '',
        name: '',
        describe: '',
        uploadData: {
          dataType: '0',
          oldFilePath: ''
        }
      },
      form_rules: {
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    uploadDisabled: function() {
      console.log(this.files.length)
      // return this.files.length > 0
    }
  },
  watch: {
    updateLevelTwoData() {
      console.log('恩，有變動')
    }
  },
  methods: {
    levelOneChang(id) {
      this.levelThreeFormData.levelTwoId = ''
      this.updateLevelTwoData = this.categoriesLevelTwoData.filter((item) => {
        return item.level_one_id === id
      })
      console.log(this.updateLevelTwoData)
    },
    levelTwoChang() {},
    onSubmit(formName) {
      console.log(this.$refs[formName])
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 紀錄最後修改的使用者，最後修改的時間放到了 server 端去紀錄
          console.log('喵喵')
          return
          this.formData.last_edit_person = this.user.id
          this.formData.last_modify_date = new Date()
          const url =
            this.dialog.option == 'add' ? 'add' : `edit/${this.formData._id}`
          this.$axios
            .post(`/api/supplier/${url}`, this.formData)
            .then((res) => {
              console.log('資料庫加載成功嚕！')
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
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 圖片上傳的 function
    handleRemove(file, fileList) {
      console.log(file, fileList)
      for (let index = 0; index < fileList.length; index++) {
        if (fileList[index].uid == file.uid) {
          this.files.splice(index, 1) //移除数组中要删除的图片
        }
      }
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
    onFileChange(file, fileList) {
      console.log('onFileChange', file)
      console.log('onFileChange', fileList)
      const isIMAGE =
        file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isIMAGE) {
        this.$message.error('只能上传jpg/png图片!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
        return false
      }
      var reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function(e) {
        // console.log(this.result) //图片的base64数据
      }
      this.files.push(file)
    },
    onFilePreview(file) {
      console.log(file)
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
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
  margin: 0;
  line-height: 400px;
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
  height: 40px;
}
.image-warp {
  margin-top: 15px;
}

.image-content {
  float: left;
  margin-bottom: 5px;
}
/* div.disabled .el-upload--picture-card {
  display: none;
} */
</style>
