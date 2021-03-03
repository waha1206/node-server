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
        <span slot="title" class="dialog-title">{{ dialog.title }}</span>

        <el-main class="quotation-main">
          <el-row v-if="materialGroupData.length">
            <el-col
              :span="4"
              v-for="(item, index) in materialGroupData"
              :key="index"
            >
              <el-card>
                <img
                  v-if="item.imgs[0]"
                  :src="item.imgs[0]"
                  class="quotation-image"
                  @click="updateMaterial(item)"
                />
                <img
                  v-else
                  :src="lostImg"
                  class="quotation-image"
                  @click="updateMaterial(item)"
                />

                <div class="info-wrap">
                  <span>{{ item.product_name }}</span>
                  <div class="bottom clearfix">
                    <!-- <time class="time">{{ currentDate }}</time> -->
                    <el-button
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
      materialGroupData: []
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
        })
        .catch((err) => {
          console.log('axios添加數據失敗==>MyDialog.vue==>', err)
        })
    },
    // **********************************************  讀取資料結束 **********************************************
    reportError() {
      this.$message({
        message: '感謝您協助回報錯誤！',
        type: 'success'
      })
      this.$emit('reportError')
    },
    updateMaterial(material) {
      // 選擇完物件後 $emit 到父元件
      console.log(material, this.dialog)
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
    }
  }
}
</script>

<style>
.quotation-main {
  padding: 0;
}

.el-dialog__body {
  padding: 24px;
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
</style>
