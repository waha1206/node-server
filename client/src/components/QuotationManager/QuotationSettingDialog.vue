<template>
  <div class="my-dialog">
    <el-dialog
      class="inquire-dialog"
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="480px"
      ><el-form
        ref="form"
        :model="settingFormData"
        :rules="form_rules"
        label-width="100px"
      >
        <el-container class="inquire-dialog">
          <el-header class="inquire-dialog" style="height:80px;"
            ><el-row :gutter="20" type="flex" class="row-bg">
              <el-col :span="24"
                ><el-form-item
                  label="檔案儲存目錄："
                  prop="quotation_file_path"
                  label-width="140px"
                >
                  <div style="float:left;margin-right:10px">
                    <el-input
                      v-model="settingFormData.quotation_file_path"
                      placeholder="請輸入本地端的Dropbox路徑"
                      size="mini"
                    ></el-input>
                  </div>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="
                      handleSaveFilePath(settingFormData.quotation_file_path)
                    "
                    >儲存</el-button
                  >
                </el-form-item></el-col
              ></el-row
            >
          </el-header>
        </el-container></el-form
      >
      <el-container>
        <el-main> </el-main>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: 'quotation-setting-dialog',
  props: {
    dialog: Object
  },
  data() {
    return {
      settingFormData: {
        quotation_file_path: '' // 檔案路徑，本地端電腦的
      },
      emptySettingFormData: {
        quotation_file_path: '' // 檔案路徑，本地端電腦的
      },
      // form 規則
      form_rules: {
        quotation_file_path: [
          { required: true, message: '必選，必須正確', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.settingFormData = Object.assign({}, this.emptySettingFormData)
    this.initSetting()
  },
  watch: {
    dialog() {
      // 初始化 setting
      this.initSetting()
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    // 初始化
    initSetting() {
      if (localStorage.quotation_file_path)
        this.settingFormData.quotation_file_path =
          localStorage.quotation_file_path
    },
    // 設定檔案目錄
    handleSaveFilePath(filePath) {
      localStorage.quotation_file_path = filePath
      if (filePath)
        this.$message({
          message: '設定報價單檔案存放目錄成功！',
          type: 'success'
        })
      else
        this.$message({
          message: '你沒有輸入路徑，設定失敗',
          type: 'error'
        })
    }
    // **********************************************  axios 讀取資料開始 **********************************************
  }
  // **********************************************  axios 讀取資料結束 **********************************************
}
</script>

<style scoped>
.inquire-dialog .el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 0;
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
.pagination {
  display: block;
  float: left;
  text-align: left;
  margin-left: 0px;
  margin-top: 10px;
}
.table-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
