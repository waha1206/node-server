<template>
  <div class="materials-manager">
    <el-container>
      <el-header>
        <el-button type="primary" size="small" @click="addMaterialLevelOneClass"
          >新增第一層分類</el-button
        >
        <el-button type="primary" size="small" @click="addMaterialLevelTwoClass"
          >新增第二層分類</el-button
        >
        <el-button type="primary" size="small" @click="handleAddMaterial"
          >新增原物料</el-button
        >
        <div class="materal-class-container">
          <el-cascader
            @change="onOptionsChange"
            v-model="choiceLevelTwoValue"
            :props="{ expandTrigger: 'hover' }"
            size="mini"
            placeholder="請選擇第二層分類"
            :options="levelOneTowOption"
            filterable
          ></el-cascader>
          <!-- <el-select
            v-model="materialClassName"
            @change="handleMaterialClassChange"
            filterable
            size="mini"
            placeholder="可以透過關鍵字搜尋"
          >
            <el-option
              v-for="(item, index) in materialClassData"
              :key="index"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select> -->
        </div>
        <div class="cascader-wrap"></div>
        <!-- {{ materialClassName }} -->
      </el-header>
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
      <el-container>
        <!-- <el-aside width="100%"> -->
        <el-table
          size="mini"
          :stripe="true"
          :data="
            tableData.filter(
              (data) =>
                !search || data.product_name.toLowerCase().includes(search.toLowerCase())
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
            width="300"
          >
          </el-table-column>
          <!-- 商品說明 -->
          <!-- 說明跳出來對話框的區塊 -->
          <el-table-column label="說明" width="70" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="right">
                <p>分類：{{ getMaterilaClassOneNameById(scope.row) }}</p>
                <p>子類：{{ getMaterilaClassTwoNameById(scope.row) }}</p>
                <p>編號：{{ scope.row.type }}</p>
                <p>品名：{{ scope.row.product_name }}</p>
                <p>成本：{{ scope.row.the_cost }}</p>
                <p>售價：{{ scope.row.retail_price }}</p>
                <p>單價：{{ scope.row.unit_price }}</p>
                <p>利潤：{{ scope.row.company_profit }}</p>
                <p>庫存：{{ scope.row.storage }}</p>
                <p>材質：{{ scope.row.raw_material }}</p>
                <p>單位：{{ scope.row.unit }}</p>
                <p>供應商：{{ scope.row.supplier }}</p>
                <p>版型編號：{{ scope.row.pattern_no }}</p>
                <p>
                  版型連結：<a :href="scope.row.pattern_download" target="_blank">{{
                    scope.row.pattern_download
                  }}</a>
                </p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">完整說明</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- 多圖 -->
          <el-table-column label="多圖" width="70" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left">
                <img
                  v-for="(item, index) in scope.row.imgs"
                  width="200px"
                  height="200px"
                  :key="index"
                  :src="item"
                  alt=""
                />
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">多圖</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- 顏色 -->
          <el-table-column label="顏色" prop="product_color" align="center" width="160">
          </el-table-column>
          <el-table-column label="編號" prop="type" align="center" width="70">
          </el-table-column>
          <!-- 原物料分類，從分類ID回傳分類名稱 -->
          <el-table-column label="分類" align="center" width="80">
            <template slot-scope="scope">
              {{ getMaterilaClassOneNameById(scope.row) }}
            </template>
          </el-table-column>
          <!-- 售價 -->
          <el-table-column label="售價" prop="retail_price" align="center" width="70">
          </el-table-column>
          <!-- 單位售價 -->
          <el-table-column label="單位售價" prop="unit_price" align="center" width="70">
          </el-table-column>

          <!-- 平車費用 -->
          <el-table-column label="平車費用" prop="tailor_fee" align="center" width="70">
          </el-table-column>
          <!-- 裁切費用 -->
          <el-table-column label="裁切費用" prop="crop_fee" align="center" width="70">
          </el-table-column>
          <!-- 加工費用 -->
          <el-table-column
            label="加工費用"
            prop="processing_fee"
            align="center"
            width="70"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.processing_fee">
                <span>$ </span>{{ scope.row.processing_fee }}<span> 元</span>
              </div>
            </template>
          </el-table-column>
          <!-- 多圖 -->
          <el-table-column label="加工費" width="70" align="center">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.processing_fee_flag"
                @change="checkboxChange(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <!-- 商品材質 -->
          <el-table-column
            label="商品材質"
            prop="raw_material"
            align="center"
            width="150"
          >
          </el-table-column>
          <!-- 供應商資料 -->
          <el-table-column label="供應商" width="180" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left">
                <div v-if="scope.row.supplier_id" class="max-w-md">
                  <p>供應商名稱: {{ getSupplierById(scope.row).company }}</p>
                  <p>公司統編：{{ getSupplierById(scope.row).tax_id_number }}</p>
                  <p>資本額：{{ getSupplierById(scope.row).registered_capital }}</p>
                  <p>匯款帳號：{{ getSupplierById(scope.row).bank_account }}</p>
                  <p>業務姓名：{{ getSupplierById(scope.row).sales_name }}</p>
                  <p>業務手機：{{ getSupplierById(scope.row).sales_cell_phone }}</p>
                  <p>業務電話：{{ getSupplierById(scope.row).sales_telephone }}</p>
                  <p>業務MAIL：{{ getSupplierById(scope.row).sales_email }}</p>
                  <p>會計姓名：{{ getSupplierById(scope.row).accounting_name }}</p>
                  <p>會計手機：{{ getSupplierById(scope.row).accounting_cell_phone }}</p>
                  <p>會計電話：{{ getSupplierById(scope.row).accounting_telephone }}</p>
                  <p>會計MAIL：{{ getSupplierById(scope.row).accounting_mail }}</p>
                  <p>公司電話：{{ getSupplierById(scope.row).company_telephone }}</p>
                  <p>公司傳真：{{ getSupplierById(scope.row).company_fax }}</p>
                  <p>公司地址：{{ getSupplierById(scope.row).company_address }}</p>
                  <p>店面電話：{{ getSupplierById(scope.row).storefront_telephone }}</p>
                  <p>店面傳真：{{ getSupplierById(scope.row).storefront_fax }}</p>
                  <p>店面地址：{{ getSupplierById(scope.row).storefront_address }}</p>
                  <p class="text-blue-500">
                    官網：<a :href="getSupplierById(scope.row).website" target="_blank">{{
                      getSupplierById(scope.row).website
                    }}</a>
                  </p>
                  <p>付款條件：{{ getSupplierById(scope.row).payment_terms }}</p>
                  <p>商品交期：{{ getSupplierById(scope.row).delivery }}</p>
                  <p>廠長備註：{{ getSupplierById(scope.row).remarks }}</p>
                  <p>會計備註：{{ getSupplierById(scope.row).accounting_remarks }}</p>
                </div>
                <div v-else>
                  <p>請先建立建立供應商</p>
                </div>

                <div slot="reference" class="name-wrapper">
                  <el-tag
                    size="mini"
                    v-if="scope.row.supplier_id"
                    @click="handleEditSupplier(scope.row)"
                  >
                    <!-- {{ scope.row.supplier_id }} -->
                    {{ getSupplierNameById(scope.row) }}
                  </el-tag>
                  <el-tag
                    size="mini"
                    v-else="scope.row.supplier"
                    @click="handleEditSupplier(scope.row)"
                    style="background:red; color:yellow"
                    >點擊我選擇供應商</el-tag
                  >
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- 搜尋欄位 -->
          <el-table-column align="center" width="150">
            <!-- header 代表放到列的說明文字那邊 -->
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="輸入關鍵字搜尋" />
            </template>
            <!-- slot 崁入兩個按鈕 -->
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEditMaterial(scope.row)"
                >編輯</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteMaterial(scope.$index, scope.row)"
                >刪除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- </el-aside> -->

        <!-- <el-main>Main</el-main> -->
      </el-container>
    </el-container>

    <MaterialClassDialog
      v-if="materialClassData[0]"
      :dialog="dialog"
      :formData="formData"
      :materialClassData="materialClassData"
      @update="getMaterialClass"
    ></MaterialClassDialog>
    <MaterialLevelTwoDialog
      v-if="materialClassData[0] && materialLevelTwoClassData[0]"
      :dialog="levelTwoDialog"
      :materialLevelOneClassData="materialClassData"
      :materialLevelTwoClassData="materialLevelTwoClassData"
      @update="getMaterialLevelTwoClass"
    ></MaterialLevelTwoDialog>
    <MaterialEditDialog
      :dialog="materialEditDialog"
      :formData="levelThreeFormDate"
      :materialClassData="materialClassData"
      :materialLevelTwoClassData="materialLevelTwoClassData"
      :allUserNameId="allUserNameId"
      :allSupplierlData="allSupplierlData"
      @update="getMaterials"
    ></MaterialEditDialog>
    <!-- 非常重要的知識點，遠端讀取資料庫後，要等到接收到遠端資料完畢後，才可以掛載子元件
		判斷式大概如下：v-if="allSupplierlData[0]"
		詳細的說明網頁連結：https://bit.ly/2LCp1CV
		 -->
    <MaterialSupplierDialog
      v-if="allSupplierlData[0]"
      :dialog="materialSupplierDialog"
      :supplier="allSupplierlData"
      :supplierClassData="supplierClassData"
      @update="getMaterials"
    >
    </MaterialSupplierDialog>
  </div>
</template>

<script>
  import MaterialClassDialog from '../../components/MaterialsManager/MaterialClassDialog'
  import MaterialEditDialog from '../../components/MaterialsManager/MaterialEditDialog'
  import MaterialSupplierDialog from '../../components/MaterialsManager/MateriaSupplierDialog'
  import MaterialLevelTwoDialog from '../../components/MaterialsManager/MaterialLevelTwoDialog'
  import { MessageBox } from 'element-ui'
  import { mapGetters } from 'vuex'

  export default {
    name: 'materials-manager',
    data() {
      return {
        choiceLevelTwoValue: [], // 一開始選好後，會顯示 table 的資料，要選擇 one / two
        levelOneTowOption: [], // 所有可選擇的 one / two 層資料
        materialClassName: '',
        tableData: [],
        materialClassData: [],
        materialLevelTwoClassData: [],
        allMaterialData: [],
        allSupplierlData: [],
        allUserNameId: [],
        supplierClassData: [],
        search: '',
        innerDialog: false,
        materialsData: [], // 開始就先讀取資料庫的數據
        levelThreeFormDate: {}, // 給 子元件傳遞的第三層資料
        emptyLevelThreeFormDate: {
          type: '',
          imgs: [],
          old_serial_numbers: '',
          product_name: '',
          unit_price: '',
          company_profit: '',
          unit: '',
          product_category: '',
          the_cost: '',
          retail_price: '',
          product_profit: '',
          product_description: '',
          storage: '',
          product_color: '',
          various_elements: '',
          material_class: '',
          level_two_id: '',
          length: '',
          extra_freight: '',
          lead_time: '',
          raw_material: '',
          minimum_order_quantity: '',
          supplier: '',
          supplier_contact_person: '',
          supplier_phone_number: '',
          supplier_fax_number: '',
          supplier_cell_phone: '',
          supplier_address: '',
          supplier_email: '',
          remark: '',
          supplier_bank_information: '',
          product_website: '',
          supplier_number: '',
          product_picture_website: '',
          create_date: '',
          last_modify_date: '',
          last_edit_person: '',
          stock_alert: '',
          processing_fee_flag: false,
          kind: 1,
          cloth_width: '',
          crop_fee: '',
          tailor_fee: '',
          layout_height: '',
          layout_width: '',
          accessory_cloth_id: '',
          pattern_download: '',
          pattern_no: '',
          processing_fee: '',
          additional_height: '',
          typesetting: false,
          pattern_free: false,
          inside_pattern_no: '',
          inside_pattern_download: ''
        },
        // 編輯原物料的分類跳出視窗
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
        },
        levelTwoDialog: {
          show: false,
          title: '展示一下',
          option: 'edit'
        },
        // 控制 supplier dialog 的物件
        materialSupplierDialog: {
          show: false,
          title: '請選擇供應商',
          option: 'edit',
          material_id: ''
        },
        // 編輯原物料的跳出視窗
        materialEditDialog: {
          show: false,
          title: '展示一下',
          option: 'edit',
          materialClass: ''
        },
        // 控制分頁
        my_paginations: {
          page_index: 1, // 位於當前第幾頁
          total: 0, // 總數
          page_size: 10, // 每一頁顯示幾條數據
          page_sizes: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 100] // 選擇一頁要顯示多少條
          // layouts: 'total, sizes, prev, pager, next, jumper'
        }
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    components: {
      MaterialClassDialog,
      MaterialEditDialog,
      MaterialLevelTwoDialog,
      MaterialSupplierDialog
    },
    beforeRouteEnter(to, from, next) {
      // console.log('元件內的 beforeRouterEnter，不能使用this,因為此時尚未創建成功')
      next()
    },
    beforeRouteLeave(to, from, next) {
      // console.log('beforeRouteLeave 我要離開這個元件了')
      next()
    },
    created() {
      this.getMaterials()
      this.getMaterialClass()
      this.getMaterialLevelTwoClass()
      this.getUserInfo()
      this.getSuppliers()
      this.getSupplierClass()
    },
    mounted() {
      this.setCascaderOptions()
    },
    watch: {
      materialClassData() {
        if (!this.materialClassData.length && !this.materialLevelTwoClassData.length)
          return
        this.setLevelOneTowOption()
      },
      materialLevelTwoClassData() {
        if (!this.materialClassData.length && !this.materialLevelTwoClassData.length)
          return
        this.setLevelOneTowOption()
      }
    },
    methods: {
      setCascaderOptions() {
        // ，就讀回來上次的紀錄
        if (localStorage.MaterialLevelOneValue && localStorage.MaterialLevelTwoValue) {
          this.choiceLevelTwoValue[0] = localStorage.MaterialLevelOneValue
          this.choiceLevelTwoValue[1] = localStorage.MaterialLevelTwoValue
        }
      },
      // 當選擇 one / two 時，有變化就會來到這邊
      onOptionsChange(value) {
        // 當分類選擇異動的時候，再重新的撈第三層的商品資料
        localStorage.MaterialLevelOneValue = value[0]
        localStorage.MaterialLevelTwoValue = value[1]
        // localStorage.material_class = value
        this.getMaterials()
      },
      // 當 group level one / two 的資料都完整後，在來這邊整理資料
      setLevelOneTowOption() {
        this.levelOneTowOption = []
        // this.materialClassData
        this.materialClassData.forEach((item) => {
          // console.log(index, item.name, item._id)
          let obj = {
            value: '',
            label: '',
            children: []
          }
          obj.value = item._id
          obj.label = item.type + ' ' + item.name
          this.levelOneTowOption.push(obj)
        })

        for (let i = 0; i < this.levelOneTowOption.length; i++) {
          const level_one_id = this.levelOneTowOption[i].value
          this.materialLevelTwoClassData.forEach((item) => {
            if (item.level_one_id === level_one_id) {
              let obj2 = {
                value: '',
                label: ''
              }
              obj2.value = item._id
              obj2.label = item.type + ' ' + item.name
              this.levelOneTowOption[i].children.push(obj2)
            }
          })
        }
        this.getMaterials()
      },
      getSupplierById(row) {
        let supplier = {}
        this.allSupplierlData.forEach((e) => {
          if (e._id === row.supplier_id) {
            supplier = e
          }
        })
        return supplier
      },
      getSupplierNameById(row) {
        let supplierName = ''
        this.allSupplierlData.forEach((e) => {
          if (e._id === row.supplier_id) {
            supplierName = e.company
          }
        })
        return supplierName
      },
      getSupplierClass() {
        this.$axios
          .get('/api/supplier-class')
          .then((res) => {
            // console.log('views/FundList.vue', res)
            this.supplierClassData = res.data
            // 設置分頁數據
            // this.setPaginations()
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // handleMaterialClassChange(value) {
      //   localStorage.material_class = value
      //   this.getMaterials()
      // },
      handleSizeChange(page_size) {
        // 切換每頁有幾條數據

        localStorage.material_page_size = page_size
        this.my_paginations.page_index = 1
        this.my_paginations.page_size = page_size
        this.tableData = this.allMaterialData.filter((item, index) => {
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
          if (this.allMaterialData[i]) {
            tables.push(this.allMaterialData[i])
          }
          this.tableData = tables
        }
      },
      handleAddMaterial() {
        this.materialEditDialog = {
          show: true,
          title: '原物料編輯',
          option: 'add',
          materialClass: ''
        }
        // 這邊要處理 add form
        this.levelThreeFormDate = Object.assign({}, this.emptyLevelThreeFormDate)
      },
      handleEditMaterial(row) {
        this.materialEditDialog = {
          show: true,
          title: '原物料編輯',
          option: 'edit',
          materialClass: this.getMaterilaClassOneNameById(row)
        }
        // 這邊要處理 edit form
        this.levelThreeFormDate = Object.assign({}, row)
      },
      handleEditSupplier(row) {
        // 把該原料的 _id 編號傳給子元件，然後在子元件更新資料庫的欄位 supplier_id
        this.materialSupplierDialog = {
          show: true,
          title: '請選擇供應商',
          option: 'edit',
          material: row._id
        }
      },
      // 直接修改 checkbox 加工費用 flag
      checkboxChange(material) {
        let uploadForm = {}
        uploadForm = Object.assign({}, material)
        uploadForm.last_edit_person = this.user.id
        uploadForm.last_modify_date = new Date()
        // 把 array 轉換成字串 +上 | 符號上傳，到了 server 端，再使用 split('|') 還原成 array [0, 1, 2] 再塞到資料庫
        // 因為再使用 axios 傳送資料的時候，只能使用字串，不能使用 [<String 1>, <String 2>, ....]
        if (uploadForm.imgs.length > 0) {
          uploadForm.imgs = uploadForm.imgs.join('|')
        }

        const url = `edit/${material._id}`
        this.$axios
          .post(`/api/material/${url}`, uploadForm)
          .then((res) => {
            // 添加成功
            this.$message({
              message: '修改加工費 flag',
              type: 'success'
            })
          })
          .catch((err) => {
            console.log(
              'axios添加數據失敗==>MaterialManage.vue 修改加工費的 flag 失敗！==>',
              err
            )
          })
      },
      handleDeleteMaterial(index, row) {
        MessageBox.confirm(
          '注意！資料刪除會不可挽回！請確認此資料無其他應用！',
          '嚴重警告！！！'
        )
          .then(() => {
            // 防止誤刪除
            return
            this.$axios.delete(`/api/material/delete/${row._id}`).then((res) => {
              this.$message('刪除成功！')
              this.getMaterials()
            })
          })
          .catch(() => {
            this.$message('您取消刪除了～鬆一口氣')
          })
      },
      getMaterialClass() {
        this.$axios
          .get('/api/material-class/one')
          .then((res) => {
            // console.log('views/FundList.vue', res)
            this.materialClassData = res.data
            // 設置分頁數據
            // this.setPaginations()
          })
          .catch((err) => {
            console.log(err)
          })
      },
      getMaterialLevelTwoClass() {
        this.$axios
          .get('/api/material-class/two')
          .then((res) => {
            // console.log('views/FundList.vue', res)
            this.materialLevelTwoClassData = res.data
            // 設置分頁數據
            // this.setPaginations()
          })
          .catch((err) => {
            console.log(err)
          })
      },
      getMaterials() {
        // 	第一次進來，要是沒有找到 localStorage.material_class 就會全讀資料庫
        // 如果有紀錄的話，就會只讀紀錄部分的分類商品

        if (!this.choiceLevelTwoValue[1]) return
        this.$axios
          .get(`/api/material/get-from-class/${this.choiceLevelTwoValue[1]}`)
          .then((res) => {
            this.allMaterialData = res.data
            this.allMaterialData.sort(function(a, b) {
              return Number(a.type) - Number(b.type)
            })
            this.setPaginations()
          })
          .catch((err) => {
            console.log(err)
          })
      },
      setPaginations() {
        // 分頁屬性設置
        this.my_paginations.total = this.allMaterialData.length
        this.my_paginations.page_index = 1
        if (localStorage.material_page_size) {
          this.my_paginations.page_size = Number(localStorage.material_page_size)
        } else {
          this.my_paginations.page_size = 5
        }
        // 設置分頁數據
        this.tableData = this.allMaterialData.filter((item, index) => {
          return index < this.my_paginations.page_size
        })
      },
      // 添加一筆新的商品分類代號 TD SS GG ... 等等
      addMaterialLevelOneClass() {
        this.dialog = {
          show: true,
          title: '新增原物料分類',
          option: 'add'
        }
      },
      addMaterialLevelTwoClass() {
        this.levelTwoDialog = {
          show: true,
          title: '新增第二層分類',
          option: 'add'
        }
        // console.log(this.levelTwoDialog)
      },
      getMaterilaClassOneNameById(row) {
        let className = ''
        this.materialClassData.forEach((e) => {
          if (e._id === row.material_class) {
            className = e.name
          }
        })
        return className
      },
      getMaterilaClassTwoNameById(row) {
        let className = ''
        this.materialLevelTwoClassData.forEach((e) => {
          if (e._id === row.level_two_id) {
            className = e.name
          }
        })
        return className
      },
      getUserInfo() {
        this.$axios
          .get('/api/user/user-info')
          .then((res) => {
            this.allUserNameId = res.data
          })
          .catch((err) => {
            console.log(err)
          })
      },
      getSuppliers() {
        // 撈整個資料庫所有的供應商資料
        this.$axios
          .get('/api/supplier')
          .then((res) => {
            this.allSupplierlData = res.data
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
    text-align: left;
    margin-top: 3px;
  }
  .materal-class-container {
    display: inline-block;
    margin-left: 10px;
    width: 300px !important;
  }

  /* 直接調整 el-cascader 沒有用，因為外面套了一個 div 該 class 為 .el-cascader--mini */
  .el-cascader--mini {
    width: 100% !important;
  }
</style>
