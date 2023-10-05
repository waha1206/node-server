<template>
  <div>
    <!-- 整個隱藏 -->
    <div
      id="storage-class-level-two-modal"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 md:inset-0 h-modal h-full sm:h-full bg-slate-400/70"
      @click.stop="closeStorageClassLevelTwoModal"
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
              新增原物料倉庫第二層： {{ getModalInfo }}
            </h3>
            <button
              @click.stop="closeStorageClassLevelTwoModal"
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
              <div>
                <el-table
                  :data="getTableData"
                  stripe
                  size="medium"
                  highlight-current-row
                  ref="storageLevelTwoClassTable"
                  @current-change="handleCurrentChange"
                >
                  <!-- 讓表格左邊的 > 點下去會展開 -->
                  <el-table-column type="expand">
                    <!-- 這邊使用 slot 把元件塞進去，讓程式碼比較簡潔乾淨 -->
                    <template slot-scope="props">
                      <!-- 這邊可以放元件，如果需要的話 -->
                      <UpdateStorageLevelTwoForm
                        :storageLevelOne="props.row"
                        @updateStorageLevelTwoData="updateStorageLevelTwoData"
                      ></UpdateStorageLevelTwoForm> </template
                  ></el-table-column>
                  <!-- 左邊的表格 很多 main banner 資料 -->

                  <!-- 序號 -->
                  <el-table-column
                    type="index"
                    label="序號"
                    width="50"
                    align="center"
                    header-align="center"
                  >
                  </el-table-column>

                  <!-- 主題 -->
                  <el-table-column
                    prop="type"
                    label="編號"
                    header-align="left"
                    align="left"
                    width="100"
                  ></el-table-column>

                  <!-- 主題 -->
                  <el-table-column
                    prop="name"
                    label="中文名稱"
                    header-align="left"
                    align="left"
                    width="200"
                  ></el-table-column>

                  <!-- 備註說明 -->
                  <el-table-column
                    prop="describe"
                    label="備註說明 (內容說明)"
                    header-align="left"
                    align="left"
                    width=""
                  ></el-table-column>

                  <!-- 是否啟用，多的 main banner 會變成輪播狀態 -->
                  <el-table-column
                    prop=""
                    label="歸屬"
                    header-align="center"
                    align="center"
                    width="92"
                  >
                    <template slot-scope="scope">
                      <!-- 這邊會放　屬於 myoacg 還是 ooxx 的公司擁有的資料 多供應商的概念 -->
                      <!-- <span v-if="scope.row.activate" class="bg-yellow-100 border px-[2px] py-[1px] text-blue-600">
                        已啟用
                      </span>
                      <span v-else class="border px-[2px] py-[1px] bg-yellow-100 text-red-600 font-bold"> 未啟用 </span> -->
                    </template>
                  </el-table-column>

                  <!-- 展開 expand -->
                  <el-table-column
                    prop=""
                    label="編輯"
                    header-align="center"
                    align="center"
                    width="92"
                  >
                    <template slot-scope="scope">
                      <span
                        @click="editStorageLevelTwoData(scope.row)"
                        class="btn hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 text-white bg-gradient-to-r from-sky-500 to-indigo-500 focus:ring-4 font-xs rounded-sm text-xs px-2 py-1 text-center cursor-pointer m-auto"
                      >
                        編輯
                      </span>
                    </template>
                  </el-table-column>

                  <!-- 刪除 main banner 會有防刪功能 -->
                  <el-table-column
                    prop=""
                    label="刪除"
                    header-align="center"
                    align="center"
                    width="80"
                  >
                    <template slot-scope="scope">
                      <span
                        @click="handleDeleteStorageLevelTwo(scope.row)"
                        class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 shadow-md shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-xs rounded-sm text-xs px-2 py-1 text-center cursor-pointer m-auto hover:from-yellow-500 hover:to-pink-500"
                      >
                        刪除
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 左邊的表格 很多 main banner 資料 end -->
              </div>

              <!-- 翻頁 -->
              <div class="p-2 ml-1 mt-2">
                <keep-alive>
                  <MyPagination
                    :paginationData="getStorageLevelTwoData"
                    :localStorageName="path"
                    :tableData.sync="tableData"
                  >
                  </MyPagination>
                </keep-alive>
              </div>
            </div>
            <!-- 表格區結束 -->

            <!-- 右邊的輸入區，這邊輸入完成後會清空表單內容 -->
            <div class="ml-2 pl-3 py-2 pr-2 basis-1/4 border-l">
              <p class="mb-4 text-lg text-gray-600 font-bold">新增第二層分類</p>

              <!-- 表格 -->
              <form @submit.prevent="addStorageLevelTwoClass">
                <!-- <el-form-item label="第一層分類：">
                <el-select
                  @change="formDataSelectChang"
                  v-model="formData.level_one_id"
                  placeholder="選擇第一層的分類"
                  filterable
                  size="mini"
                >

                  <el-option
                    v-for="(levelOneData, index) in groupLevelOneData"
                    :key="index"
                    :value="levelOneData._id"
                    :label="levelOneData.name"
                  >

                    <span style="float: left">{{ levelOneData.type }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ levelOneData.name }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item> -->

                <div class="grid grid-cols-6 gap-6 ">
                  <div class="col-span-6 sm:col-span-6">
                    <label
                      for="storage-class-level-two-modal-name"
                      class="m-0 block text-xs font-medium text-gray-700"
                      >分類編號 (例如：G0001)</label
                    >
                    <el-input
                      class="mt-2"
                      size="mini"
                      type="type"
                      v-model="basicForm.type"
                      placeholder="請輸入4碼數字 例如：0001"
                    ></el-input>
                  </div>
                  <div class="col-span-6 sm:col-span-6">
                    <label
                      for="storage-class-level-two-modal-name"
                      class="m-0 block text-xs font-medium text-gray-700"
                      >分類名稱 (例如：拉鍊)</label
                    >
                    <el-input
                      class="mt-2"
                      size="mini"
                      type="type"
                      v-model="basicForm.name"
                      placeholder="請輸入中文名稱"
                    ></el-input>
                  </div>
                </div>
                <div class="mt-8 text-right">
                  <button
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    新增此筆資料
                  </button>
                </div>
              </form>
            </div>

            <!-- main 結束 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpdateStorageLevelTwoForm from './StorageLevelTwoChild/UpdateStorageLevelTwoForm.vue'

export default {
  props: ['visible'],
  components: { UpdateStorageLevelTwoForm },
  data() {
    return {
      path: 'storage_class_level_two_modal', // MyPagination
      storageLevelTwoData: [], // 倉庫第一層分類的全部資料
      basicForm: {
        type: '', // 編號 英文+數字
        name: '' // 中文名稱
        // 這邊要來個屬於哪個公司或供應商的 0:麥歐 1:其他a 2:其他b 以此類推
      },
      tableData: []
    }
  },
  async mounted() {
    await this.getAllStorageLevelOneData()
    await this.getAllStorageLevelTwoData()
  },

  watch: {
    visible: {
      handler(val) {
        console.log('val :', val)

        let el = document.getElementById('storage-class-level-two-modal')
        if (el) el.classList.toggle('hidden')
      }
    }
  },
  computed: {
    // 檢查是否所有欄位都有填寫
    checkFiledIsEmpty() {
      return Object.values(this.basicForm).some((val) => {
        return _.isEmpty(val)
      })
    },

    // 取得 倉庫第一層的所有資料
    getStorageLevelTwoData() {
      return this.storageLevelTwoData
    },

    // 返回表單需要的資料
    getTableData() {
      return this.tableData
    },

    // modal 最上面的那個顯示資訊
    getModalInfo() {
      return '刪除功能已經關閉，要刪除請找 Leo'
    }
  },
  methods: {
    // 開啟 expand 根據 ref
    editStorageLevelTwoData(row) {
      this.$refs.storageLevelTwoClassTable.toggleRowExpansion(row)
    },

    // 取得倉庫第一層的所有分類
    async getAllStorageLevelOneData() {
      const { data, status } = await this.$store.dispatch(
        this._M.SERVER_GET_STORAGE_LEVEL_ONE_DATA
      )

      this.storageLevelOneData = status === 200 ? data : []
    },

    // 取得倉庫第二層的所有分類
    async getAllStorageLevelTwoData() {
      const { data, status } = await this.$store.dispatch(
        this._M.SERVER_GET_STORAGE_LEVEL_TWO_DATA
      )

      this.storageLevelTwoData = status === 200 ? data : []
    },

    // 新增一筆倉庫分類資料
    async addStorageLevelTwoClass() {
      if (this.checkFiledIsEmpty) {
        this.$message({
          message: '有星號的欄位都必須要填寫喔！',
          type: 'error'
        })
        return
      }

      await this.$store.dispatch(
        this._M.SERVER_ADD_LEVEL_ONE_STORAGE_DATA,
        this.basicForm
      )
      let data2 = await this.$store.dispatch(this._M.SERVER_GET_STORAGE_LEVEL_ONE_DATA)
      console.log('data2 :', data2)
    },

    // 刪除這筆資料
    handleDeleteStorageLevelTwo(row) {
      //
    },

    // 關閉視窗
    closeStorageClassLevelTwoModal() {
      this.$emit('update:visible', false)
    },

    // 暫時沒用
    handleCurrentChange() {},

    // emit
    updateStorageLevelTwoData(storageLevelOne) {
      let itemToModify = this.storageLevelTwoData.find(
        (item) => item._id === storageLevelOne._id
      )
      if (itemToModify) {
        // itemToModify.name = storageLevelOne.name
        // itemToModify.type = storageLevelOne.type
        // itemToModify.describe = storageLevelOne.describe
        const { name, type, describe } = storageLevelOne
        Object.assign(itemToModify, { name, type, describe })
      }
    }
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
  background-color: #ffffa0 !important;
}

/deep/.el-table tr {
  .el-table__expanded-cell {
    padding: 0;
  }
}
</style>
