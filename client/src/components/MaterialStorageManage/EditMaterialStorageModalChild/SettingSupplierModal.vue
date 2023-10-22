<template>
  <div
    id="select-supplier-modal"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 md:inset-0 h-modal h-full sm:h-full bg-slate-400/70"
    @click.stop="closeSelectSupplierModal"
  >
    <!-- 主體 -->
    <div
      class="relative px-4 w-[1280px] h-full md:h-auto m-auto top-[50px]"
      @click.stop=""
    >
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex justify-between items-center p-2 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            此倉庫原料的擁有者是： {{ getModalInfo }}
          </h3>
          <!-- 把視窗關閉起來 -->
          <button
            @click.stop="closeSelectSupplierModal"
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
        <div class="p-2 flex flex-col min-h-[70vh]">
          <!-- 更新 搜尋 與翻頁-->
          <div class="flex flex-row justify-start items-center">
            <!-- 更新 -->
            <button
              @click="getSupplierData()"
              type="button"
              class="p-[6px] text-xs font-medium text-center text-white bg-blue-700 rounded-sm hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              更新資料
            </button>

            <!-- 搜尋 -->
            <MySearch
              :title="'關鍵字'"
              :searchData="getSearchData"
              :searchField="searchField"
              @search-result="emitResult"
            ></MySearch>

            <!-- 翻頁 -->
            <div class="p-2 ml-1">
              <keep-alive>
                <!-- <MyPagination :paginationData="getAccountingTrackData" :localStorageName="ptah" :tableData.sync="tableData"> -->
                <MyPagination
                  :paginationData="getSearchResult"
                  :localStorageName="ptah"
                  :tableData.sync="tableData"
                >
                </MyPagination>
              </keep-alive>
            </div>
            <!-- 翻頁 結束 -->
          </div>
          <!-- 表格 -->
          <div class="p-2">
            <el-table
              :data="getTableData"
              :header-cell-style="{ padding: '0px', height: '20px' }"
              :cell-style="{ padding: '0px', height: '20px' }"
              :row-style="{ padding: '0px' }"
              stripe
              @current-change="handleCurrentChange"
              ref="settingSupplierTable"
            >
              <!-- 供應商名稱 -->
              <el-table-column
                prop="company"
                label="供應商名稱"
                header-align="center"
                align="left"
                width="240"
              ></el-table-column>

              <!-- 取得商品分類 -->
              <el-table-column label="分類" align="left" width="200">
                <template slot-scope="scope">
                  {{ getSupplierClassNameById(scope.row) }}
                </template>
              </el-table-column>

              <!-- 商品內容 -->
              <el-table-column
                prop="remarks"
                label="供貨內容"
                header-align="center"
                align="left"
                width=""
              ></el-table-column>
              <!-- 選擇 -->
              <el-table-column
                prop=""
                label="選擇"
                header-align="center"
                align="center"
                width="60"
              >
                <template slot-scope="scope">
                  <span
                    @click.stop="selectSupplier(scope.row)"
                    class="  btn hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 text-white bg-gradient-to-r from-sky-500 to-indigo-500 focus:ring-4 font-xs rounded-sm text-xs px-2 py-1 text-center cursor-pointer m-auto"
                  >
                    點擊
                  </span>
                  <!-- <span v-else class="text-sm text-red-600 font-bold border border-red-600 bg-white py-0 px-2"> 過期 </span> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _M from '../../../constants'

export default {
  props: ['visible'],
  data() {
    return {
      modalInfo: '', // 目前選擇的供應商
      allSupplierData: [], // 所有供應商資料
      allSupplierClassData: [], // 所有供應商分類的資料

      // 搜尋的部分，翻頁相關
      searchField: ['company', 'remarks'], // 給搜尋列定義那些欄位需要搜尋文字
      searchResult: [], // 從搜尋元件過濾出來的資料，這邊的資料會餵給 pagination
      ptah: 'setting_supplier_modal_page_size', // 此業的顯示頁面儲存
      tableData: [] // 部分的，片段的資料，從 pagination 的元件取得該資料
    }
  },

  async mounted() {
    await this.getSupplierData()
    await this.getSupplierClassData()
  },

  watch: {
    visible: {
      handler(val) {
        let el = document.getElementById('select-supplier-modal')
        if (el) el.classList.toggle('hidden')
      }
    }
  },

  computed: {
    // 原始資料 → a.給搜尋 → b.給 pagaination → c.給 table
    // a.給搜尋 - 吐回資料 emitResult → this.searchResult
    getSearchData() {
      return this.allSupplierData
    },

    // b.餵給 pagination - 吐回資料 → :tableData.sync="tableData
    getSearchResult() {
      return this.searchResult
    },

    // c.給 table
    getTableData() {
      return this.tableData
    },

    // modal title 顯示的是 目前選擇的 供應商
    getModalInfo() {
      return this.modalInfo ? this.modalInfo : '你尚未選擇倉庫原料的擁有者！'
    }
  },

  methods: {
    // 搜尋結果
    emitResult(searchResult) {
      this.searchResult = _.cloneDeep(searchResult)
    },

    // 取得所有供應商資料
    async getSupplierData() {
      this.allSupplierData = await this.$store.dispatch(_M.SERVER_GET_ALL_SUPPLIER)
    },

    // 取得所有供應商分類資料
    async getSupplierClassData() {
      this.allSupplierClassData = await this.$store.dispatch(_M.SERVER_GET_SUPPLIER_CLASS)
    },

    // 取得商品分類的中文
    getSupplierClassNameById(row) {
      const supplier = this.allSupplierClassData.find(
        (itemClass) => itemClass._id === row.supplier_class
      )
      return supplier ? supplier.name : ''
    },

    // 選擇這個供應商
    selectSupplier(supplier) {
      this.$emit('select-supplier', supplier)
      this.$nextTick(() => {
        this.closeSelectSupplierModal()
      })
    },

    // 關閉視窗
    closeSelectSupplierModal() {
      this.$emit('update:visible', false)
    },

    // 暫時沒用
    handleCurrentChange() {}
  }
}
</script>

<style scoped>
/deep/.el-table .cell,
.el-table th div {
  padding-right: 0px;
  padding-left: 0px;
}
/deep/.el-table th.el-table__cell > .cell {
  padding-right: 0px;
  padding-left: 0px;
}

/deep/.my-popper {
  .el-popconfirm__action {
    .el-button:nth-child(1) {
      background: white;
    }
    .el-button:nth-child(2) {
      background: blue;
    }
  }
}

/deep/.el-table__body td.el-table__cell {
  padding-top: 0px;
  padding-bottom: 0px;
}

/deep/.el-table__body tr:hover > td {
  background-color: yellow !important;
}
</style>
