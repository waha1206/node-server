<template>
  <div class="materials-manager">
    <el-container>
      <el-header>
        <el-button type="primary" size="small" @click="addMaterial"
          >新增原物料分類</el-button
        >
        <el-button type="primary" size="small" @click="addMaterial"
          >新增原物料</el-button
        >
        <el-button type="primary" size="small">取得商品類別資訊</el-button>
      </el-header>
      <el-container>
        <!-- <el-aside width="100%"> -->
        <el-table
          :stripe="true"
          :data="
            allMaterialData.filter(
              (data) =>
                !search ||
                data.product_name.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
        >
          <!-- 序號 -->
          <el-table-column
            type="index"
            label="序號"
            align="center"
            width="70"
          ></el-table-column>
          <!-- 原物料名稱 -->
          <el-table-column
            label="原物料名稱"
            prop="product_name"
            align="left"
            width="350"
          >
            <!-- 原物料分類 -->
          </el-table-column>
          <el-table-column
            label="分類"
            prop="material_class"
            align="center"
            width="70"
          >
          </el-table-column>
            <!-- 售價 -->
          </el-table-column>
          <el-table-column
            label="售價"
            prop="unit_price"
            align="center"
            width="70"
          >
          </el-table-column>
            <!-- 目前庫存 -->
          </el-table-column>
          <el-table-column
            label="目前庫存"
            prop="storage"
            align="center"
            width="80"
          >
          </el-table-column>
            <!-- 最低庫存 -->
          </el-table-column>
          <el-table-column
            label="最低庫存"
            prop="stock_alert"
            align="center"
            width="80"
          >
          </el-table-column>
            <!-- 商品材質 -->
          </el-table-column>
          <el-table-column
            label="商品材質"
            prop="raw_material"
            align="center"
            width="150"
          >
          </el-table-column>


          <!-- 搜尋欄位 -->
          <el-table-column align="center" width="150">
            <!-- header 代表放到列的說明文字那邊 -->
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="輸入關鍵字搜尋"
              />
            </template>
            <!-- slot 崁入兩個按鈕 -->
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >編輯</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >刪除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- </el-aside> -->

        <!-- <el-main>Main</el-main> -->
      </el-container>
    </el-container>
    <MaterialsDialog
      :dialog="dialog"
      :formData="formData"
      :materialsData="materialsData"
      @update="getMaterials"
    ></MaterialsDialog>
  </div>
</template>

<script>
import MaterialsDialog from '../../components/MaterialsManager/MaterialsDialog'
import { MessageBox } from 'element-ui'

export default {
  name: 'materials-manager',
  data() {
    return {
      allMaterialData: [],
      search: '',
      innerDialog: false,
      materialsData: [], // 開始就先讀取資料庫的數據
      formData: {
        type: '',
        name: '',
        describe: '',
        last_modify_user: '',
        id: ''
      },
      dialog: {
        show: false,
        title: '展示一下',
        option: 'edit'
      }
    }
  },
  components: {
    MaterialsDialog
  },
  created() {
    this.getMaterials()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    addMaterial() {
      console.log('新增原物料')
    },
    getMaterials() {
      this.$axios
        .get('/api/material')
        .then((res) => {
          // console.log('views/FundList.vue', res)
          this.allMaterialData = res.data
          console.log('allMaterialData的內容', this.allMaterialData)

          // 設置分頁數據
          // this.setPaginations()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 800px;
  border: 1px solid red;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
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
</style>
