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
              <!-- 選擇大分類，決定表格的內容 -->
              <div class="flex flex-row items-center">
                <label
                  for="storage-class-level-two-modal-name"
                  class="m-0 block text-xs font-medium text-gray-700 mx-2"
                  >大分類 (過濾)</label
                >
                <el-select
                  @change="selectRuleChange"
                  v-model="selectLevelOneDataId"
                  placeholder="選擇第一層的分類"
                  filterable
                  size="mini"
                >
                  <el-option
                    v-for="(levelOneSelectData, index) in getSelectLevelOneClass"
                    :key="`${levelOneSelectData._id}+${index}`"
                    :value="levelOneSelectData._id"
                    :label="levelOneSelectData.name"
                  >
                    <!-- 編號靠左邊 -->
                    <span style="float: left">{{ levelOneSelectData.type }}</span>
                    <!-- 分類名稱靠右邊 -->
                    <span style="float: right; color: #8492a6; font-size: 13px">{{
                      levelOneSelectData.name
                    }}</span>
                  </el-option>
                </el-select>
              </div>
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
                        :storageLevelTwo="props.row"
                        :storageLevelOne="getStorageLevelOneClass"
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

                  <!-- 主題 -->
                  <el-table-column
                    prop="level_one_name"
                    label="一層分類"
                    header-align="left"
                    align="left"
                    width="100"
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
                <div class="grid grid-cols-6 gap-6 ">
                  <div class="col-span-6 sm:col-span-6">
                    <label
                      for="storage-class-level-two-modal-name"
                      class="m-0 block text-xs font-medium text-gray-700"
                      >大分類 (必選)</label
                    >
                    <el-select
                      @change="formDataSelectChang"
                      v-model="basicForm.level_one_id"
                      placeholder="選擇第一層的分類"
                      filterable
                      size="mini"
                    >
                      <el-option
                        v-for="(levelOneData, index) in getStorageLevelOneClass"
                        :key="index"
                        :value="levelOneData._id"
                        :label="levelOneData.name"
                      >
                        <!-- 編號靠左邊 -->
                        <span style="float: left">{{ levelOneData.type }}</span>
                        <!-- 分類名稱靠右邊 -->
                        <span style="float: right; color: #8492a6; font-size: 13px">{{
                          levelOneData.name
                        }}</span>
                      </el-option>
                    </el-select>
                  </div>
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
      // localStorage 的初始化設定
      getSelectLevelOneDataIdPath: '', // 定義路徑
      selectLevelOneDataId: '', // 初始化的值，這邊是指第一層分類的 _id，要透過上面的路徑讀取去初始化
      path: 'storage_class_level_two_modal', // MyPagination
      selectLevelOneData: [], // 第一層的選單，包含全部的分類選項
      storageLevelOneData: [], // 倉庫第一層分類的全部資料
      storageLevelTwoData: [], // 倉庫第二層分類的全部資料
      basicForm: {
        level_one_id: '', // 第一層的 _id
        level_one_name: '', // 第一層的 名稱 (有疑慮，如果第一層更改名稱，那這裡面會失效)
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
    this.initSeleceLevelOneDataAndId()
  },

  watch: {
    visible: {
      handler(val) {
        let el = document.getElementById('storage-class-level-two-modal')
        if (el) el.classList.toggle('hidden')
      }
    }
  },
  computed: {
    // 左邊的表單選擇要揭示的是哪個分類
    getSelectLevelOneClass() {
      return this.selectLevelOneData
    },

    // 新增第二層的時候，下拉選單用的，這邊是第一層的資料
    getStorageLevelOneClass() {
      return this.storageLevelOneData
    },

    // 檢查是否所有欄位都有填寫
    checkFiledIsEmpty() {
      return Object.values(this.basicForm).some((val) => {
        return _.isEmpty(val)
      })
    },

    // 把資料餵給 pagaination 元件 順便過濾一下資料用
    getStorageLevelTwoData() {
      const fillterData = this.storageLevelTwoData.filter((item) => {
        if (this.selectLevelOneDataId === 'ffffffff') return item
        if (item.level_one_id === this.selectLevelOneDataId) return item
      })
      return fillterData
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
    // 當過濾表格的規則改變後到這邊
    selectRuleChange() {
      localStorage.setItem(
        this.getSelectLevelOneDataIdPath,
        JSON.stringify(this.selectLevelOneDataId)
      )
    },

    // 初始化第一層的選擇，包含全部的分類，另外對於 localStorage 做初始化
    initSeleceLevelOneDataAndId() {
      // 如果沒有 _id 紀錄，那就給他預設值 ffffffff 代表全部商品
      this.selectLevelOneDataId = localStorage.getItem(this.getSelectLevelOneDataIdPath)
        ? JSON.parse(localStorage.getItem(this.getSelectLevelOneDataIdPath))
        : 'ffffffff'
      // if (_.isEmpty(this.storageLevelOneData)) return []
      // 解構，複製陣列的方式之一
      this.selectLevelOneData = [...this.storageLevelOneData]
      const obj = {
        name: '全部分類',
        type: '00000',
        _id: 'ffffffff'
      }
      // 於陣列的第一個位置塞進去一個物件
      this.selectLevelOneData.unshift(obj)
    },

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
        this._M.SERVER_ADD_LEVEL_TWO_STORAGE_DATA,
        this.basicForm
      )
      let { status } = await this.$store.dispatch(
        this._M.SERVER_GET_STORAGE_LEVEL_TWO_DATA
      )
      if (status === 200) await this.getAllStorageLevelTwoData()
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

    // 暫時沒用 當選擇 level one 的那個下拉式選單資料改變後會觸發
    formDataSelectChang(selectedLevelOneId) {
      const selectedLevelOne = this.getStorageLevelOneClass.find(
        (levelOneData) => levelOneData._id === selectedLevelOneId
      )
      this.basicForm.level_one_name = ''
      if (selectedLevelOne) this.basicForm.level_one_name = selectedLevelOne.name
    },

    // emit
    // 編輯完資料後，更新父元件裡面的資料
    updateStorageLevelTwoData(storageLevelOne) {
      // 使用 $set 更新資料，可以使用 index 或是 'key' 兩種方式，我這邊使用 index 的方式
      let storageLevelTwoDataIndex = this.storageLevelTwoData.findIndex(
        (item) => item._id === storageLevelOne._id
      )

      if (storageLevelTwoDataIndex !== -1) {
        // $set 會產生響應觸發 computed 這是我的目的，然後會讓 html 的部分重新渲染
        this.$set(this.storageLevelTwoData, storageLevelTwoDataIndex, storageLevelOne)

        // 更新資料後，把父元件的資料也更新完，找到 tableData 中該筆資料，然後再重新展開
        // 為什麼要重新展開呢？因為方便閱讀
        // 為什麼展開的時候會被關閉呢？因為 tableData 資料更新後，畫面會重新渲染，然後把已經打開的expand 關閉
        // 所以我們要重新打開他，讓操作的視覺上看起來是舒服的，體驗也更好
        this.$nextTick(() => {
          // 在這裡可以處理 DOM 已更新後的操作
          let tableDataRef = this.tableData.find(
            (item) => item._id === storageLevelOne._id
          )
          if (tableDataRef) {
            this.$refs.storageLevelTwoClassTable.toggleRowExpansion(tableDataRef)
          }
        })
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
