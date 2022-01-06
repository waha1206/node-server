<template>
  <div class="my-dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-container>
          <el-aside width="50%" class="grid-content bg-purple">
            <div class="table-container">
              <!-- ***********************  manager 裡面的表單   ***********************-->
              <el-table :data="tableData" style="width: 100%" size="mini">
                <el-table-column
                  prop="type"
                  label="權限代碼"
                  width="100px"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="權限名稱"
                  width="120"
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
                  width="150"
                  align="center"
                >
                  <!-- 編輯、刪除 第一層的分類 -->
                  <template slot-scope="scope">
                    <el-button
                      type="warning"
                      icon="edit"
                      size="small"
                      @click="handleEdit(scope.row)"
                      >編輯</el-button
                    >
                    <el-button
                      type="danger"
                      icon="delete"
                      size="small"
                      @click="handleDelete(scope.row)"
                      >刪除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <!-- ***********************  manager 裡面的表單 結束   ***********************-->
            </div>
          </el-aside>

          <!-- 右半邊的新增第一層分類 -->
          <el-aside width="50%" class="grid-content bg-purple-light">
            <el-form
              ref="form"
              :model="formData"
              :rules="form_rules"
              label-width="120px"
              style="margin:10px;width:auto"
            >
              <!-- 這邊開始新增 -->
              <el-form-item prop="type" label="權限代碼：" size="mini">
                <el-input type="type" v-model="formData.type"></el-input>
              </el-form-item>
              <el-form-item prop="name" label="權限名稱：" size="mini">
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
      title="編輯權限內容"
      :visible.sync="employeeAuthorityDialog"
      width="25%"
    >
      <el-form
        ref="editForm"
        :model="employeeAuthorityForm"
        :rules="employeeAuthorityFormRules"
        label-width="120px"
        style="margin:10px;width:auto"
      >
        <el-form-item
          prop="type"
          label="權限代碼"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="employeeAuthorityForm.type"
            autocomplete="off"
            size="mini"
            placeholder="A0001"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          label="權限名稱"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="employeeAuthorityForm.name"
            autocomplete="off"
            size="mini"
            placeholder="請輸入中文名稱"
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
        <el-button @click="employeeAuthorityDialog = false">取消</el-button>
        <el-button type="primary" @click="onSubmit('editForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: 'employee-authority',
  props: {
    dialog: Object,
    employeeAuthorityData: Array
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
      limitCountImg: 1, // 圖片隱藏需要
      showBtnImg: true, // 圖片隱藏需要
      noneBtnImg: false, // 圖片隱藏需要
      // 圖片上傳結束
      tableData: [],
      formLabelWidth: '',
      formData: {
        type: '',
        name: ''
      },
      employeeAuthorityForm: {
        type: '',
        name: '',
        _id: '',
        imgs: [],
        option: ''
      },
      // 管理分頁
      my_paginations: {
        localStorage_page_size: 'employee_authority_page_size',
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 10, // 每一頁顯示幾條數據
        page_sizes: [5, 10, 15] // 選擇一頁要顯示多少條
      },
      // 驗證表單，employeeAuthorityFormRules 這個是驗證 editForm 的欄位
      employeeAuthorityFormRules: {
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      },

      // 這個是驗證右邊的 addForm  ref = form
      form_rules: {
        type: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }],
        name: [{ required: true, message: '此欄位不能為空', trigger: 'blur' }]
      },
      employeeAuthorityDialog: false
    }
  },
  created() {
    this.setPaginations()
  },
  watch: {
    employeeAuthorityData() {
      // if (this._.isEmpty(this.employeeAuthorityData.imgs)) {
      //   this.getImgs()
      // }
      // 資料有更新喔
      this.setPaginations()
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
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
      // 如果是 edit 狀態的話，要把 this.employeeAuthorityForm 中的 imgs 也移除掉
      // if (this.dialog.option !== 'edit') return
      this.noneBtnImg = fileList.length >= this.limitCountImg
      this.employeeAuthorityForm.imgs.splice(_index, 1)
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
        // 圖片的 base64 存到 employeeAuthorityForm.imgs 裡面
        _this.employeeAuthorityForm.imgs.push(e.target.result)
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
      console.log(this.employeeAuthorityForm)
      if (this.employeeAuthorityForm.imgs.length > 0) {
        this.employeeAuthorityForm.imgs.forEach((img) => {
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
    // ************************************* 圖片上傳結束 **********************************
    // 分頁開始
    setPaginations() {
      this.my_paginations.total = this.employeeAuthorityData.length
      this.my_paginations.page_index = 1
      if (localStorage[this.my_paginations.localStorage_page_size]) {
        this.my_paginations.page_size = Number(
          localStorage[this.my_paginations.localStorage_page_size]
        )
      } else {
        this.my_paginations.page_size = 5
      }
      // 設置分頁數據
      this.tableData = this.employeeAuthorityData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage[this.my_paginations.localStorage_page_size] = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.employeeAuthorityData.filter((item, index) => {
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
        if (this.employeeAuthorityData[i]) {
          tables.push(this.employeeAuthorityData[i])
        }
        this.tableData = tables
      }
    }, // 分頁結束

    // 新增、編輯、刪除 第一層的分類
    handleAdd(form) {
      this.employeeAuthorityForm.option = 'add'
      this.onSubmit(form)
    },
    handleEdit(row) {
      // 第一層的資料
      if (row.imgs) {
        this.employeeAuthorityForm.imgs = row.imgs
        this.getImgs()
      }
      this.getImgs()
      this.employeeAuthorityForm.type = row.type
      this.employeeAuthorityForm.name = row.name
      this.employeeAuthorityForm._id = row._id
      this.employeeAuthorityForm.option = 'edit'
      this.employeeAuthorityDialog = true
    },
    handleDelete(row) {
      // 讓全部分類無法刪除
      MessageBox.confirm(
        '注意！資料刪除會不可挽回！請確認此資料無其他應用！',
        '嚴重警告！！！'
      )
        .then(() => {
          this.$axios
            .delete(`/api/employee/authority/delete/${row._id}`)
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
        this.employeeAuthorityForm.option == 'add'
          ? this.formData
          : this.employeeAuthorityForm
      console.log('uploadFormData :', uploadFormData)

      this.$refs[form].validate((valid) => {
        if (valid && !uploadFormData.type == '') {
          const url =
            this.employeeAuthorityForm.option == 'add'
              ? 'add'
              : `edit/${this.employeeAuthorityForm._id}`
          this.$axios
            .post(`/api/employee/authority/${url}`, {
              employeeAuthority: uploadFormData
            })
            .then((res) => {
              // 添加成功
              this.$message({
                message: '數據添加成功',
                type: 'success'
              })
              // 不管怎麼樣都隱藏 edit dialog 的視窗
              this.employeeAuthorityDialog = false

              // 刷新網頁，傳遞給父組件做更新
              this.$emit('update')
            })
            .catch((err) => {
              console.log('axios添加數據失敗==>MyDialog.vue==>', err)
            })
        }
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
</style>
