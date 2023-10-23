<template>
  <div>
    <!-- 整個隱藏 -->
    <div
      id="edit-material-to-storage-modal"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 md:inset-0 h-modal h-full sm:h-full bg-slate-400/70"
      @click.stop="closeEditMaterialToStorageModal"
    >
      <!-- 主體 -->
      <div
        class="relative px-4 w-[1280px] h-full md:h-auto m-auto top-[50px] text-xs"
        @click.stop=""
      >
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex justify-between items-center p-2 rounded-t border-b dark:border-gray-600"
          >
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
              新增原物料到倉庫： {{ getModalInfo }}
            </h3>
            <!-- 把視窗關閉起來 -->
            <button
              @click.stop="closeEditMaterialToStorageModal"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="extralarge-modal"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-2 flex flex-row">
            <!-- main -->

            <!-- 左邊表格，列出所有的問答的的清單列表 -->
            <div class="ml-2 basis-3/4">
              <!-- 這邊會是很多欄位 -->
              <div class="grid grid-cols-4 gap-2">
                <!-- 原料照片 占 1 欄 3 列 -->
                <img class="shadow-md col-span-1 row-span-5" :src="editDataImgs" alt="" />
                <!-- 商品編號 -->
                <div
                  class="flex flex-row justify-start items-center col-span-1 hover:bg-red-300 rounded-sm px-1"
                >
                  <label for="type" class="whitespace-nowrap">商品編號</label>
                  <el-input
                    id="type"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="editDataForm.type"
                    placeholder="每單位的成本"
                  ></el-input>
                </div>
                <!-- 原料名稱 -->
                <div
                  class="flex flex-row justify-start items-center col-span-2 hover:bg-red-300 rounded-sm px-1"
                >
                  <label for="product_name" class="whitespace-nowrap">原料名稱</label>
                  <el-input
                    id="product_name"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="editDataForm.product_name"
                    placeholder=""
                  ></el-input>
                </div>
                <!-- 單位成本 -->
                <div
                  class="flex flex-row justify-start items-center col-span-1 hover:bg-red-300 rounded-sm px-1"
                >
                  <label for="unit_price" class="whitespace-nowrap">單位成本</label>
                  <el-input
                    id="unit_price"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="editDataForm.unit_price"
                    placeholder="每單位的成本"
                  ></el-input>
                </div>
                <!-- 商品售價 -->
                <div
                  class="flex flex-row justify-start items-center col-span-1 hover:bg-red-300 rounded-sm px-1 relative"
                >
                  <!-- 跳出 ? 說明視窗 -->
                  <!-- <el-tooltip
                    class="item"
                    effect="dark"
                    content="商品售價=單位成本x(1+商品利潤/100)"
                    placement="right"
                    style="z-index: 10"
                  >
                    <img
                      class="w-[20px] absolute top-0 right-0 z-10 cursor-pointer"
                      src="~assets/icons/svg/question-f-svgrepo-com.svg"
                    />
                  </el-tooltip> -->
                  <label for="retail_price" class="whitespace-nowrap">商品售價</label>
                  <el-input
                    id="retail_price"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="retailPrice"
                    placeholder=""
                    :disabled="true"
                  ></el-input>
                </div>
                <!-- 商品利潤 -->
                <div
                  class="flex flex-row justify-start items-center col-span-1 hover:bg-red-300 rounded-sm px-1"
                >
                  <label for="product_profit" class="whitespace-nowrap">商品利潤</label>
                  <el-input
                    id="product_profit"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="editDataForm.product_profit"
                    placeholder=""
                  ></el-input>
                </div>
                <!-- 現有庫存 -->
                <div
                  class="flex flex-row justify-start items-center col-span-1 hover:bg-red-300 rounded-sm px-1"
                >
                  <label for="storage" class="whitespace-nowrap">現有庫存</label>
                  <el-input
                    id="storage"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="editDataForm.storage"
                    placeholder=""
                  ></el-input>
                </div>
                <!-- 最低庫存 -->
                <div
                  class="flex flex-row justify-start items-center col-span-1 hover:bg-red-300 rounded-sm px-1"
                >
                  <label for="stock_alert" class="whitespace-nowrap">最低庫存</label>
                  <el-input
                    id="stock_alert"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="editDataForm.stock_alert"
                    placeholder=""
                  ></el-input>
                </div>
                <!-- 採購天數 -->
                <div
                  class="flex flex-row justify-start items-center col-span-1 hover:bg-red-300 rounded-sm px-1"
                >
                  <label for="lead_time" class="whitespace-nowrap">採購天數</label>
                  <el-input
                    id="lead_time"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="editDataForm.lead_time"
                    placeholder=""
                  ></el-input>
                </div>
                <!-- 商品單位 -->
                <div
                  class="flex flex-row justify-start items-center col-span-1 hover:bg-red-300 rounded-sm px-1"
                >
                  <label for="unit" class="whitespace-nowrap">商品單位</label>
                  <el-input
                    id="unit"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="editDataForm.unit"
                    placeholder=""
                  ></el-input>
                </div>
                <!-- 商品材質 -->
                <div
                  class="flex flex-row justify-start items-center col-span-1 hover:bg-red-300 rounded-sm px-1"
                >
                  <label for="raw_material" class="whitespace-nowrap">商品材質</label>
                  <el-input
                    id="raw_material"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="editDataForm.raw_material"
                    placeholder=""
                  ></el-input>
                </div>
                <!-- 商品顏色 -->
                <div
                  class="flex flex-row justify-start items-center col-span-1 hover:bg-red-300 rounded-sm px-1"
                >
                  <label for="product_color" class="whitespace-nowrap">商品顏色</label>
                  <el-input
                    id="product_color"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="editDataForm.product_color"
                    placeholder=""
                  ></el-input>
                </div>
                <!-- 最低訂購 -->
                <div
                  class="flex flex-row justify-start items-center col-span-1 hover:bg-red-300 rounded-sm px-1"
                >
                  <label for="minimum_order_quantity" class="whitespace-nowrap"
                    >最低訂購</label
                  >
                  <el-input
                    id="minimum_order_quantity"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="editDataForm.minimum_order_quantity"
                    placeholder=""
                  ></el-input>
                </div>
                <!-- 額外運費 -->
                <div
                  class="flex flex-row justify-start items-center col-span-1 hover:bg-red-300 rounded-sm px-1"
                >
                  <label for="extra_freight" class="whitespace-nowrap">額外運費</label>
                  <el-input
                    id="extra_freight"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="editDataForm.extra_freight"
                    placeholder="供應商額外要收的運費"
                  ></el-input>
                </div>
                <!-- 供應商 -->
                <div
                  class="flex flex-row justify-start items-center col-span-1 cursor-not-allowed relative"
                >
                  <div
                    @click="settingSupplier()"
                    class="rounded-full bg-black flex justify-center items-center absolute top-0 right-0 z-10 w-[16px] h-[16px] cursor-pointer"
                  >
                    <span class="text-white">+</span>
                  </div>
                  <label for="supplier_id" class="whitespace-nowrap cursor-not-allowed"
                    >供應商</label
                  >
                  <el-input
                    id="supplier_id"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="supplierName"
                    :disabled="true"
                    placeholder=""
                  ></el-input>
                </div>
                <!-- 備註 -->
                <div
                  class="h-[38px] flex flex-row justify-start items-center col-span-4 hover:bg-red-300 rounded-sm px-1"
                >
                  <label for="remark" class="whitespace-nowrap">備註</label>
                  <el-input
                    id="remark"
                    class="ml-2 text-base"
                    size="mini"
                    type="type"
                    v-model="editDataForm.remark"
                    placeholder=""
                  ></el-input>
                </div>
                <!-- 備註 -->
                <div
                  class="flex flex-col justify-start items-center col-span-4 hover:bg-red-300 rounded-sm px-1"
                >
                  <label for="product_description" class="whitespace-nowrap"
                    >採購說明</label
                  >
                  <el-input
                    id="product_description"
                    class="text-base mb-1"
                    type="textarea"
                    placeholder="商品於採購的時候需要注意的事項。"
                    v-model="editDataForm.new_product_description"
                    :rows="10"
                    maxlength="1000"
                    show-word-limit
                    style="margin-top: 8px"
                  >
                  </el-input>
                </div>
              </div>
            </div>
            <!-- 左邊的編輯區 結束 -->

            <!-- 右邊的編輯區 -->
            <!-- 右邊的輸入區，這邊輸入完成後會清空表單內容 -->
            <div class="ml-2 pl-3 py-2 pr-2 basis-1/4 border-l">
              <div class="flex flex-row justify-start items-center mb-4">
                <span class="text-lg text-gray-600 font-bold">新增倉庫原料</span>
                <button
                  @click="reloadStorageClassData()"
                  type="button"
                  class="ml-2 p-[6px] text-xs font-medium text-center text-white bg-blue-700 rounded-sm hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  更新分類
                </button>
              </div>

              <!-- 新增人員 -->
              <form @submit.prevent="editMaterialFromStorage">
                <div class="grid grid-cols-6 gap-6">
                  <div class="cursor-not-allowed col-span-6 sm:col-span-6">
                    <label for="supplier_id" class="whitespace-nowrap cursor-not-allowed"
                      >編輯人員</label
                    >
                    <el-input
                      id="supplier_id"
                      class="text-base"
                      size="mini"
                      type="type"
                      v-model="lastEditPerson"
                      :disabled="true"
                      placeholder=""
                    ></el-input>
                  </div>
                </div>
                <!-- 原料種類 -->
                <div class="grid grid-cols-6 gap-6 mt-2">
                  <div class="cursor-not-allowed col-span-6 sm:col-span-6">
                    <label for="supplier_id" class="whitespace-nowrap cursor-not-allowed"
                      >原料種類</label
                    >
                    <el-input
                      id="supplier_id"
                      class="text-base"
                      size="mini"
                      type="type"
                      v-model="materialKind"
                      :disabled="true"
                      placeholder=""
                    ></el-input>
                  </div>
                </div>
                <!-- 原料擁有者 supplier 那邊選取 -->
                <div class="grid grid-cols-6 gap-6 mt-2">
                  <div class="cursor-not-allowed col-span-6 sm:col-span-6">
                    <label
                      @click="settingMaterialOnwer"
                      for=""
                      class="whitespace-nowrap cursor-pointer relative"
                      >擁有者
                      <!-- 跳出 + 從 supplier 中挑選擁有者 -->
                      <!-- 這邊的資料會連結到 customer 裡面去，未來需要新增 -->
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="從供應商中挑選出來，點擊新增"
                        placement="right"
                        style="z-index: 10"
                      >
                        <div
                          class="rounded-full bg-black flex justify-center items-center absolute top-0 right-[-20px] z-10 w-[16px] h-[16px] cursor-pointer"
                        >
                          <span class="text-white">+</span>
                        </div>
                      </el-tooltip>
                    </label>
                    <el-input
                      class="text-base"
                      size="mini"
                      type="type"
                      v-model="onwerName"
                      :disabled="true"
                      placeholder=""
                    ></el-input>
                  </div>
                </div>
                <!-- 第一層大分類 -->
                <div class="grid grid-cols-6 gap-6 mt-2">
                  <div class="col-span-6 sm:col-span-6">
                    <!-- 下拉式選單 -->
                    <label
                      for="storage-class-level-two-modal-name"
                      class="mb-1 block  font-medium text-gray-700"
                      >分類 (可更換)</label
                    >
                    <el-cascader
                      v-model="cascaderValue"
                      :options="cascaderOptions"
                      size="mini"
                      filterable
                      :props="{ expandTrigger: 'hover' }"
                      :style="{ width: '100%' }"
                      @change="handleChange"
                    ></el-cascader>
                  </div>
                  <!-- 第三列 -->
                  <div class="col-span-6 sm:col-span-6">
                    <!-- 尚未決定內容 -->
                  </div>
                </div>

                <!-- 送出表單 觸發 editMaterialFromStorage() -->
                <div class="mt-8 text-right">
                  <button
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    更新資料
                  </button>
                </div>
              </form>
            </div>
            <!-- 右邊的編輯區 結束 -->
          </div>
        </div>
      </div>
    </div>
    <SettingSupplierModal
      :visible.sync="settingSupplierModalVisible"
      @select-supplier="emitSelectSupplier"
    ></SettingSupplierModal>
    <SettingOnwerModal
      :visible.sync="settingOnwerModalVisible"
      @setting-onwer="emitSettingOnwer"
    ></SettingOnwerModal></div
></template>

<script>
import SettingSupplierModal from './EditMaterialStorageModalChild/SettingSupplierModal.vue'
import SettingOnwerModal from './EditMaterialStorageModalChild/SettingOnwerModal.vue'
import _M from '../../constants'
import _O from '../../other_code'

export default {
  props: ['visible', 'originalData'],
  components: { SettingSupplierModal, SettingOnwerModal },
  data() {
    return {
      // 讀取資料庫資料
      storageLevelOneClassData: [], // 第一層分類，原始資料
      storageLevelTwoClassData: [], // 第二層分類，原始資料
      // 聯集選擇器
      cascaderOptions: [], // 沒有上帝模式，正常
      cascaderValue: [], // [0] level one  [1] level two
      cascaderLocalStoragePath: {
        levelOne: 'edit_material_storage_modal_level_one', // 聯集選擇器的 localStorage 儲存位置
        levelTwo: 'edit_material_storage_modal_level_two' // 聯集選擇器的 localStorage 儲存位置
      },
      // 額外根資料庫要的關於傳入物件需要的資料
      editDataForm: {}, //
      editDataImgs: [], // 圖片

      // 畫面上的表格欄位
      supplierName: '', // 供應商的名字
      lastEditPerson: '', // 修改表單的人中文名稱
      materialKind: '', // 原料的種類 目前有 1-8 種
      retailPrice: '', // 商品售價 = 單位成本 x (1+商品利潤/100)

      // 供應商相關
      settingSupplierModalVisible: false, // 顯示 供應商的 modal
      allSupplierData: [], // 所有供應商資料

      // 擁有者
      settingOnwerModalVisible: false,
      onwerName: '', // 使用者名稱的顯示

      // 驗證欄位
      REQUIRED_FIELDS: [
        'product_name',
        'unit_price',
        'storage',
        'level_one_id',
        'level_two_id',
        'material_onwer' // 這邊會是 supplier 的 _id 字串
      ]
    }
  },

  async mounted() {
    await this.getSupplierData()
    // 讀取聯集選擇器
    await this.reloadStorageClassData()
  },

  watch: {
    // 當資料更新
    originalData: {
      async handler(storageData) {
        if (this._.isEmpty(storageData._id)) return

        // 取得 material storage 商品圖片
        const { imgs } = await this.$store.dispatch(
          _M.SERVER_GET_MATERIAL_STORAGE_IMG_BY_ID,
          storageData._id
        )
        this.$set(this, 'editDataImgs', imgs[0]) // 這個是物件

        // 複製一份資料給 這個 madal 使用
        this.editDataForm = this._.cloneDeep(storageData)
        this.$set(this.editDataForm, 'imgs', imgs) // 這個是陣列

        // 供應商的部分，如果有的話就更新目前供應商，沒有的話就清除紀錄
        if (storageData.supplier_id) {
          const { company } = this.allSupplierData.find((supplier) => {
            return supplier._id === storageData.supplier_id
          })
          this.supplierName = company
        } else {
          this.supplierName = ''
        }

        // 擁有者的部分，如果有的話就更新目前供應商，沒有的話就清除紀錄
        if (storageData.material_onwer) {
          const { company: onwer } = this.allSupplierData.find((supplier) => {
            return supplier._id === storageData.material_onwer
          })
          this.onwerName = onwer
        } else {
          this.onwerName = ''
        }

        // 設定分類
        this.$set(this, 'cascaderValue', [
          this.editDataForm.level_one_id,
          this.editDataForm.level_two_id
        ])

        // 顯示原料種類
        this.materialKind = this.getMaterialKind(this.editDataForm.kind)

        // 編輯人員
        const user = this.$store.getters.user
        this.editDataForm.last_edit_person = user.id
        this.lastEditPerson = user.name

        // 修改時間
        this.editDataForm.last_modify_date = new Date()
      },
      deep: true
    },
    // modal 顯示或是消失
    visible: {
      handler(val) {
        let el = document.getElementById('edit-material-to-storage-modal')
        if (el) el.classList.toggle('hidden')
      }
    },
    // 監控 editDataForm.product_profit 的變化來改變商品售價
    'editDataForm.product_profit': {
      handler(newProfit) {
        let profit = parseFloat(newProfit)

        if (isNaN(profit)) profit = 0 // 確保轉換出來的值沒有問題
        // 公式 商品售價 = 單位成本 x (1+商品利潤/100)
        // retail_price = unit_price x (1+product_profit/100)

        // 如果利潤 = 0 那 商品售價 = 單位成本 改變兩個地方 1.要送出的表單 2.html 裡面的
        if (!profit) {
          this.editDataForm.retail_price = this.editDataForm.unit_price
          this.retailPrice = this.editDataForm.unit_price
        }
        // 如果利潤 !== 0 那要改變兩個地方 1.要送出的表單 2.html 裡面的
        if (profit) {
          let percent = 1 + profit / 100
          this.editDataForm.retail_price = (
            this.editDataForm.unit_price * percent
          ).toFixed(2)
          this.retailPrice = this.editDataForm.retail_price
        }
      },
      deep: true
    },
    // 監控 editDataForm.unit_price 的變化來改變商品售價
    'editDataForm.unit_price': {
      handler(newUnitPricd) {
        let unitPrice = parseFloat(newUnitPricd)
        let profit = parseFloat(this.editDataForm.product_profit)

        if (isNaN(unitPrice)) unitPrice = 0 // 確保轉換出來的值沒有問題
        if (isNaN(profit)) profit = 0 // 確保轉換出來的值沒有問題
        // 公式 商品售價 = 單位成本 x (1+商品利潤/100)
        // retail_price = unit_price x (1+product_profit/100)

        // 如果成本 = 0 那 商品售價 = 單位成本 改變兩個地方 1.要送出的表單 2.html 裡面的
        if (!unitPrice) {
          this.editDataForm.retail_price = unitPrice
          this.editDataForm.unit_price
          this.retailPrice = unitPrice
        }
        // 如果利潤 = 0 那 商品售價 = 單位成本 改變兩個地方 1.要送出的表單 2.html 裡面的
        if (!profit) {
          this.editDataForm.retail_price = this.editDataForm.unit_price
          this.retailPrice = this.editDataForm.unit_price
        }

        // 如果利潤 !== 0 那要改變兩個地方 1.要送出的表單 2.html 裡面的
        if (profit) {
          let percent = 1 + profit / 100
          this.editDataForm.retail_price = (
            this.editDataForm.unit_price * percent
          ).toFixed(2)
          this.retailPrice = this.editDataForm.retail_price
        }
      },
      deep: true
    }
  },
  computed: {
    // modal title 顯示的是 目前選擇的 供應商 product_name
    getModalInfo() {
      const { product_name = '' } = this.editDataForm || {}
      return product_name ? product_name : '您可以挑選要綁定的倉庫原料！'
    }
  },
  methods: {
    // 重新讀取 one two class 的資料
    async reloadStorageClassData() {
      await this.getStorageLevelOneClass()
      await this.getStorageLevelTwoClass()
      // 初始化聯集選擇器
      this.initClassOption()
    },

    // 讀取 倉庫分類 第一層
    async getStorageLevelOneClass() {
      const resData = await this.$store.dispatch(_M.SERVER_GET_STORAGE_LEVEL_ONE_DATA)
      this.storageLevelOneClassData = [...resData.data]
    },

    // 讀取 倉庫分類 第二層
    async getStorageLevelTwoClass() {
      const resData = await this.$store.dispatch(_M.SERVER_GET_STORAGE_LEVEL_TWO_DATA)
      this.storageLevelTwoClassData = [...resData.data]
    },

    // 初始化 cascader 聯集選擇器，建立 options 第一層/第二層 ...
    // options:[{value, label, children:[{value, label}]}]
    initClassOption() {
      this.cascaderOptions = this.storageLevelOneClassData.reduce(
        (options, currentLevelOne) => {
          let obj = {
            value: currentLevelOne._id,
            label: currentLevelOne.type + ' ' + currentLevelOne.name,
            children: []
          }
          this.storageLevelTwoClassData.forEach((item) => {
            if (item.level_one_id === currentLevelOne._id)
              obj.children.push({
                value: item._id,
                label: item.type + ' ' + item.name
              })
          })
          options.push(obj)
          return options
        },
        []
      )
    },

    // 關閉視窗
    closeEditMaterialToStorageModal() {
      this.$emit('update:visible', false)
    },
    // --------------- about supplier ---------------
    settingSupplier() {
      this.settingSupplierModalVisible = true
    },

    // 更新供應商資料
    emitSelectSupplier(supplier) {
      this.$set(this, 'supplierName', supplier.company)
      this.$set(this.editDataForm, 'supplier_id', supplier._id)
    },
    // 取得所有供應商資料
    async getSupplierData() {
      this.allSupplierData = await this.$store.dispatch(_M.SERVER_GET_ALL_SUPPLIER)
    },

    // --------------- about onwer ---------------
    // 跳出選擇擁有者的表單，選擇哪個供應商
    settingMaterialOnwer() {
      this.settingOnwerModalVisible = true
    },

    // 更新擁有者資料
    emitSettingOnwer(supplier) {
      this.$set(this, 'onwerName', supplier.company)
      this.$set(this.editDataForm, 'material_onwer', supplier._id)
    },

    // 當聯集下拉式選單產生變動的時候，主動的把第一層與第二層的 _id 加入倒 form 中
    handleChange(classOneAndTwoId) {
      this.$set(this.editDataForm, 'level_one_id', classOneAndTwoId[0])
      this.$set(this.editDataForm, 'level_two_id', classOneAndTwoId[1])
    },

    // --------------- about other ---------------
    // 取得material kind 的種類
    getMaterialKind(kind) {
      const value = _O.MATERIAL_KIND[kind]
      return value !== undefined ? value : '出現未知錯誤'
    },

    // 更新 material storage
    async editMaterialFromStorage() {
      // 如果有要驗證的欄位為空
      if (!this.validateForm()) {
        this.$notify({
          title: '有欄位缺少資料',
          dangerouslyUseHTMLString: true,
          message: `
          <strong>請檢查一下欄位是否有填寫</strong> <br>
          單位成本<br>
          分類<br>
          擁有者<br>
          分類 (必選)<br>
          `,
          type: 'error', // success warning info error
          duration: 0,
          offset: 100
        })
        return
      }

      const resData = await this.$store.dispatch(
        _M.SERVER_PUT_MATERIAL_STORAGE,
        this.editDataForm
      )

      const { status, data } = resData

      if (status !== 200) {
        this.$notify({
          title: '更新失敗',
          dangerouslyUseHTMLString: true,
          message: `
          <strong>伺服器出現異常</strong> <br>
          錯誤代碼：${status}！<br>
          `,
          type: 'error', // success warning info error
          duration: 0,
          offset: 100
        })

        return
      }

      // 把父元件的資料做更新
      // 1.更新 table
      // 2.更新所有資料

      this.$emit('update-edit-data', data)

      this.$notify({
        title: '資料更新成功',
        dangerouslyUseHTMLString: true,
        message: `
          <strong>恭喜您成功更新資料</strong> <br>
          成功代碼：${status}！<br>
          `,
        type: 'success', // success warning info error
        duration: 0,
        offset: 100
      })
    },

    // 驗證資料，自己手寫自定義
    validateForm() {
      // 商品名稱 單位成本 現有庫存 第一層分類 第二層分類
      let isValid = true
      this.REQUIRED_FIELDS.forEach((field) => {
        // if (!this.materialStorageForm[field]) isValid = false
        // 增加嚴格的檢查，讓缺少欄位的狀況下，驗證失敗
        if (!this.editDataForm.hasOwnProperty(field) || !this.editDataForm[field]) {
          isValid = false
        }
      })
      return isValid
    }
  }
}
</script>
