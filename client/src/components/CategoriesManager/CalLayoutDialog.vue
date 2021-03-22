<template>
  <div class="my-dialog">
    <el-dialog
      width="720px"
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <el-container class="card-container">
        <span slot="title" class="dialog-title">{{ dialog.title }}</span>
        <el-container class=".cal-container">
          <el-main class="quotation-main">
            <el-row>
              <el-form
                label-position="right"
                label-width="80px"
                :model="calForm"
              >
                <el-col :span="6">
                  <el-form-item
                    label="版型寬度："
                    size="mini"
                    label-width="100px"
                    prop="name"
                  >
                    <el-input
                      placeholder="請輸入寬度"
                      type="layoutWidth"
                      v-model="calForm.layoutWidth"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="版型高度："
                    size="mini"
                    label-width="100px"
                    prop="name"
                  >
                    <el-input
                      placeholder="請輸入高度"
                      type="layoutHeight"
                      v-model="calForm.layoutHeight"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="布料幅寬："
                    size="mini"
                    label-width="100px"
                    prop="name"
                  >
                    <el-input
                      placeholder="請輸入幅寬"
                      type="clothWidth"
                      v-model="calForm.clothWidth"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="訂購數量："
                    size="mini"
                    label-width="100px"
                    prop="name"
                  >
                    <el-input
                      placeholder="請輸入數量"
                      type="orderValue"
                      v-model="calForm.orderValue"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
            <el-row>
              <p>{{ typesetting.one }}</p>
              <p>{{ typesetting.two }}</p>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import { fnBestLayout, fnfnBestLayout } from '../../utils/calculation'

export default {
  name: 'cal-layout-dialog',
  props: {
    dialog: Object
  },
  data() {
    return {
      calForm: {
        layoutWidth: 0,
        layoutHeight: 0,
        clothWidth: 0,
        orderValue: 0
      },
      // 要顯示的資訊
      typesetting: {
        one: '',
        two: ''
      }
    }
  },

  mounted() {},
  computed: {},
  watch: {
    dialog() {
      console.log(this.dialog)
    },

    calForm: {
      handler: function(newValue, oldValue) {
        if (
          newValue.clothWidth &&
          newValue.layoutWidth &&
          newValue.layoutHeight &&
          newValue.orderValue
        ) {
          // fnBestLayout(layoutWidth, layoutHeight, clothWidth, orderValue)
          this.typesetting.one = fnBestLayout(
            newValue.layoutWidth,
            newValue.layoutHeight,
            newValue.clothWidth,
            newValue.orderValue,
            'string'
          )
          this.typesetting.two = fnBestLayout(
            newValue.layoutHeight,
            newValue.layoutWidth,
            newValue.clothWidth,
            newValue.orderValue,
            'string'
          )
        }
      },
      deep: true
    }
  },
  methods: {
    // **********************************************  讀取資料開始 **********************************************
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

.cal-container {
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
