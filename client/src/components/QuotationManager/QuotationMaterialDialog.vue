<template>
  <div class="my-dialog">
    <el-dialog
      width="1280px"
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <el-container class="card-container">
        <el-header class="pagination-wrap">
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
        </el-header>

        <span slot="title" class="dialog-title">{{ dialog.title }}</span>

        <el-main class="quotation-main">
          <el-row v-if="materialGroupData.length">
            <el-col :span="4" v-for="(item, index) in tableData" :key="index">
              <el-card>
                <img
                  v-if="item.imgs[0]"
                  :src="item.imgs[0]"
                  class="quotation-image"
                  @click="showImage($event, item.product_name, item.imgs[0])"
                />
                <img
                  v-else
                  :src="lostImg"
                  class="quotation-image"
                  @click="updateMaterial(item)"
                />

                <div class="info-wrap">
                  <span style="line-height:2px">{{ item.product_name }}</span>
                  <div class="bottom clearfix">
                    <!-- <time class="time">{{ currentDate }}</time> -->
                    <span
                      style="color:blue;float:left;line-height:28px"
                      v-if="item.storage > 0"
                    >
                      存量：{{ item.storage }}
                    </span>
                    <span style="color:blue;float:left;line-height:28px" v-else>
                      目前缺料
                    </span>
                    <el-button
                      style="float:right;margin-right:5px"
                      type="primary"
                      size="mini"
                      class="button"
                      @click="updateMaterial(item)"
                      >選擇此規格</el-button
                    >
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row v-else>
            <p>如果讀取超過30秒，請回報給業務改善</p>
            <el-button type="danger" @click="reportError"
              >點擊我回報這個錯誤</el-button
            >
          </el-row>
        </el-main>
      </el-container>
    </el-dialog>
    <!-- ************************************** 這邊是共用的圖片 ************************************** -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      append-to-body
      width="530px"
      center
    >
      <img
        width="480px"
        height="480px"
        fit="contain"
        :src="dialogImgUrl"
        alt=""
      />
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: 'quotatio-material-dialog',
  props: {
    dialog: Object
  },
  data() {
    return {
      lostImg: '../../../images/缺圖.jpg',
      currentDate: '2021-2-23',
      materialGroupData: [],
      tableData: [],
      // 管理分頁
      my_paginations: {
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 12, // 每一頁顯示幾條數據
        page_sizes: [12] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      },
      // 顯示 dialog image 共用的
      dialogVisible: false,
      dialogImgUrl: '',
      dialogTitle: ''
    }
  },

  mounted() {},
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  watch: {
    dialog() {
      this.getMaterialGroupData(this.dialog.materialGroup)
    }
  },
  methods: {
    // **********************************************  讀取資料開始 **********************************************
    getMaterialGroupData(materialsId) {
      this.$axios
        .post('/api/material/many', materialsId)
        .then((res) => {
          // 獲取成功
          this.$message({
            message: '讀取 material 資料完成',
            type: 'success'
          })
          this.materialGroupData = res.data
          // console.log('this.materialGroupDataㄙㄩㄣˉ', this.materialGroupData)
          this.setPaginations()
        })
        .catch((err) => {
          console.log('axios添加數據失敗==>MyDialog.vue==>', err)
        })
    },
    // **********************************************  讀取資料結束 **********************************************
    // **********************************************  分頁開始 **********************************************
    setPaginations() {
      this.my_paginations.total = this.materialGroupData.length
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = 12
      // if (localStorage.group_level_two_page_size) {
      //   this.my_paginations.page_size = Number(
      //     localStorage.group_level_two_page_size
      //   )
      // } else {
      //   this.my_paginations.page_size = 5
      // }
      // 設置分頁數據
      this.tableData = this.materialGroupData.filter((item, index) => {
        return index < this.my_paginations.page_size
      })
    },
    // 分頁的 function
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage.group_level_two_page_size = page_size
      this.my_paginations.page_index = 1
      this.my_paginations.page_size = page_size
      this.tableData = this.materialGroupData.filter((item, index) => {
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
        if (this.materialGroupData[i]) {
          tables.push(this.materialGroupData[i])
        }
        this.tableData = tables
      }
    }, // **********************************************  分頁結束 **********************************************

    reportError() {
      this.$message({
        message: '感謝您協助回報錯誤！',
        type: 'success'
      })
      this.$emit('reportError')
    },
    updateMaterial(material) {
      // 選擇完物件後 $emit 到父元件
      this.$emit('update', material, this.dialog.index)
    },
    // 時間轉換
    getDate(dt) {
      return this.$moment(dt).format('YYYY年MM月DD日-HH：mm')
    },
    getSupplierClassNameById(row) {
      let className = ''
      this.supplierClassData.forEach((e) => {
        if (e._id === row.supplier_class) {
          className = e.name
        }
      })
      return className
    },
    // 秀出圖片用的
    showImage: function(e, title, img) {
      this.dialogTitle = title
      this.dialogImgUrl = img
      this.dialogVisible = true
      e.stopPropagation()
    }
  }
}
</script>

<style>
.quotation-main {
  padding: 0;
}

.el-dialog__body {
  padding: 18px;
}

.el-dialog__header {
  background-color: #67c23a;
  line-height: 30px;
}

.card-container {
  margin: 0;
  padding: 0;
}

.el-card__body {
  padding: 10px;
}
.quotation-image {
  width: 180px;
  height: 180px;
  display: block;
  cursor: pointer;
  border: 0px;
  overflow: hidden;
  float: left;
}

.clearfix:after {
  clear: both;
}

.info-wrap {
  padding: 5px 3px 5px 0px;
  float: left;
  width: 100%;
  line-height: 100%;
}
.pagination-wrap {
  height: 50px !important;
}
.pagination {
  text-align: center;

  width: 100%;
  height: 40px;
  line-height: 100%;
}
</style>
