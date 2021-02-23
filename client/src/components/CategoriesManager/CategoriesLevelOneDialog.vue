<template>
  <div class="my-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="1150px"
    >
      <div class="form">
        <el-container>
          <el-aside width="50%" class="grid-content bg-purple">
            <div class="table-container">
              <el-table :data="tableData" style="width: 100%" size="mini">
                <el-table-column
                  prop="type"
                  label="第一層編號"
                  width="120px"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="第一層中文"
                  width="120px"
                  align="center"
                >
                </el-table-column>

                <el-table-column label="單圖" width="70" align="center">
                  <template slot-scope="scope">
                    <!-- v-for="(item, index) in scope.row.imgs" -->
                    <img
                      v-if="scope.row.imgs[0]"
                      width="50px"
                      height="50px"
                      :src="scope.row.imgs[0]"
                      alt=""
                    />
                  </template>
                </el-table-column>

                <el-table-column
                  prop="operation"
                  label="操作"
                  width="220"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="warning"
                      icon="edit"
                      size="small"
                      v-if="user.identity == 'manager'"
                      @click="handleEdit(scope.row)"
                      >編輯</el-button
                    >
                    <el-button
                      type="danger"
                      icon="delete"
                      size="small"
                      v-if="user.identity == 'manager'"
                      @click="handleDelete(scope.row)"
                      >刪除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-aside>

          <el-aside width="50%" class="grid-content bg-purple-light">
            <el-form
              ref="form"
              :model="formData"
              :rules="form_rules"
              label-width="120px"
              style="margin:10px;width:auto"
            >
              <!-- 這邊開始新增 -->
              <el-form-item prop="type" label="第一層編號：" size="mini">
                <el-input type="type" v-model="formData.type"></el-input>
              </el-form-item>
              <el-form-item prop="name" label="第一層中文：" size="mini">
                <el-input type="name" v-model="formData.name"></el-input>
              </el-form-item>
              <!--提交與取消鍵 -->
              <el-form-item class="text_right">
                <el-button type="warning" @click="dialog.show = false"
                  >取消</el-button
                >
                <el-button type="primary" @click="handleAdd('form')"
                  >提交</el-button
                >
              </el-form-item>
            </el-form>
          </el-aside>

          <!-- <el-main>Main</el-main> -->
        </el-container>
        <!-- 分頁 -->
        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="my_paginations.page_index"
            :page-size="my_paginations.page_size"
            :page-sizes="my_paginations.page_sizes"
            :total="my_paginations.total"
            layout="total, sizes, prev, pager, next, jumper"
          >
          </el-pagination>
        </div>
        <!-- 分頁結束 -->
      </div>
    </el-dialog>
    <el-dialog
      title="編輯商品代號"
      :visible.sync="categoriesEditDialog"
      width="25%"
    >
      <el-form
        ref="editForm"
        :model="categoriesEditForm"
        :rules="categoriesEditFormRules"
        label-width="120px"
        style="margin:10px;width:auto"
      >
        <el-form-item
          prop="type"
          label="商品代號 (英文)"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="categoriesEditForm.type"
            autocomplete="off"
            placeholder="請輸入大寫英文"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          label="商品名稱 (中文)"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="categoriesEditForm.name"
            autocomplete="off"
            placeholder="請輸入大寫英文"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-main>
          <!-- <div class="image-warp"> -->
          <el-form-item
            label="圖片上傳："
            size="mini"
            label-width="120px"
            prop="describe"
          >
            <!-- :class="{ uoloadSty: showBtnImg, disUoloadSty: noneBtnImg }" -->
            <div class="upload-wrap">
              <el-upload
                :data="uploadData"
                action="uploadActionUrl"
                list-type="picture-card"
                :auto-upload="false"
                accept="image/jpeg,image/gif,image/png"
                multiple
                :limit="limitCountImg"
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="categoriesEditDialog = false">取消</el-button>
        <el-button type="primary" @click="onSubmit('editForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: 'categories-level-one-dialog',
  props: {
    dialog: Object,
    formData: Object,
    categoriesData: Array
  },
  data() {
    return {
      dontRemove: '5fd54071cbcb7757640a7ee7',
      // 圖片上傳
      uploadData: {
        dataType: '0',
        oldFilePath: ''
      },
      files: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: Boolean,
      limitCountImg: 1, // 圖片隱藏需要
      showBtnImg: true, // 圖片隱藏需要
      noneBtnImg: false, // 圖片隱藏需要
      // 圖片上傳結束
      tableData: [],
      formLabelWidth: '',
      categoriesEditForm: {
        type: '',
        name: '',
        imgs: [],
        _id: ''
      },
      // 管理分頁
      my_paginations: {
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 10, // 每一頁顯示幾條數據
        page_sizes: [5, 7, 10, 12] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      },
      // 這個是驗證 editCategoriesEditForm的表單欄位
      categoriesEditFormRules: {
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      },
      categoriesEditDialog: false,
      // 下拉選單的 opation
      format_type_list: ['拉鍊', '五金', '棉花', '側標', '香精', '井字結'],
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
    this.setPaginations()
    this.getImgs()
  },
  watch: {
    categoriesData() {
      this.setPaginations()
    },
    dialog() {
      this.getImgs()
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    setPaginations() {
      // 分頁屬性設置
      this.my_paginations.total = this.categoriesData.length
      this.my_paginations.page_index = 1
      if (localStorage.categories_class_page_size) {
        this.my_paginations.page_size = Number(
          localStorage.categories_class_page_size
        )
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.categoriesData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
      this.showBtnImg = true
    },
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage.categories_class_page_size = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.categoriesData.filter((item, index) => {
        return index < page_size
      })
    },
    handleCurrentChange(page) {
      // 獲取當前頁面
      let index = this.my_paginations.page_size * (page - 1)
      // 數據的總數
      let nums = this.my_paginations.page_size * page
      // 容器
      let tables = []
      for (let i = index; i < nums; i++) {
        if (this.categoriesData[i]) {
          tables.push(this.categoriesData[i])
        }
        this.tableData = tables
      }
    },
    handleAdd(form) {
      this.dialog.option = 'add'
      this.onSubmit(form)
    },
    handleEdit(row) {
      this.categoriesEditDialog = true
      this.categoriesEditForm.type = row.type
      this.categoriesEditForm.name = row.name
      this.categoriesEditForm._id = row._id
      if (row.imgs) {
        this.categoriesEditForm.imgs = row.imgs
        this.getImgs()
      }
      this.dialog.option = 'edit'
    },
    handleDelete(row) {
      // 讓全部分類無法刪除
      // if (this.dontRemove === row._id) {
      //   this.$message('您不能刪除這個選項')
      //   return
      // }
      MessageBox.confirm(
        '注意！資料刪除會不可挽回！請確認此資料無其他應用！',
        '嚴重警告！！！'
      )
        .then(() => {
          this.$axios
            .delete(`/api/categories/delete/${row._id}`)
            .then((res) => {
              this.$message('刪除成功！')
              this.$emit('update')
            })
        })
        .catch(() => {
          this.$message('您取消刪除了～鬆一口氣')
        })
    },
    // 新增商品類別代號
    onSubmit(form) {
      const uploadFormData =
        this.dialog.option == 'add' ? this.formData : this.categoriesEditForm
      uploadFormData.imgs = this.categoriesEditForm.imgs.join('|')
      this.$refs[form].validate((valid) => {
        if (valid && !uploadFormData.type == '') {
          const url =
            this.dialog.option == 'add'
              ? 'add'
              : `edit/${this.categoriesEditForm._id}`
          uploadFormData.level = 1
          this.$axios
            .post(`/api/categories/${url}`, uploadFormData)
            .then((res) => {
              console.log('(儲存/修改) 商品分類成功！')
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 不管怎麼樣都隱藏 edit dialog 的視窗
              this.categoriesEditDialog = false
              // this.dialog.show = false
              // 刷新網頁，傳遞給父組件做更新
              this.$emit('update')
            })
            .catch((err) => {
              console.log('axios添加數據失敗==>MyDialog.vue==>', err)
            })
        }
      })
    },
    // ************************************* 圖片上傳 **********************************
    // 圖片移除的 function
    handleRemove(file, fileList) {
      let _index = 0
      for (let index = 0; index < fileList.length; index++) {
        if (fileList[index].uid == file.uid) {
          this.files.splice(index, 1) //移除数组中要删除的图片
          _index = index
        }
      }
      // 如果是 edit 狀態的話，要把 this.categoriesEditForm 中的 imgs 也移除掉
      // if (this.dialog.option !== 'edit') return
      this.noneBtnImg = fileList.length >= this.limitCountImg
      this.categoriesEditForm.imgs.splice(_index, 1)
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

      this.noneBtnImg = fileList.length >= this.limitCountImg
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
        // 圖片的 base64 存到 categoriesEditForm.imgs 裡面
        _this.categoriesEditForm.imgs.push(e.target.result)
      }
      reader.readAsDataURL(file.raw)
      // 重點，把 file 存到 files 這樣 upload 才有辦法操控元件的移除、下載 等等動作  預覽不用
      this.files.push(file)
      // console.log('file', file)
      // console.log('this.files', this.files)
    },
    getImgs() {
      this.files = []
      // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
      // base64toBlob 超強範例！
      // 編輯商品的時候，要拚接 base64 格式與檔頭，然後 push 到 this.files 裡面會有一個內定的 下面是出處
      // https://blog.csdn.net/hequhecong10857/article/details/108276022
      // 秀出圖片
      // this.dialogImageUrl = obj.url
      // this.dialogVisible = true
      if (this.categoriesEditForm.imgs.length > 0) {
        this.categoriesEditForm.imgs.forEach((img) => {
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
    }
    // ************************************* 圖片上傳結束 **********************************
  }
}
</script>

<style>
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
.table-container {
  width: 100%;
  height: 100%;
  overflow: hidden;

  box-sizing: border-box;
}
.pagination {
  text-align: left;
  margin-top: 10px;
}
.uoloadSty .el-upload--picture-card {
  width: 146px;
  height: 146px;
  line-height: 146px;
}

/* 上传按钮隐藏 */
/* .disUoloadSty .el-upload--picture-card {
  display: none;
} */
</style>
