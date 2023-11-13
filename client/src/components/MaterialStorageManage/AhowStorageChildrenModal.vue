<template>
  <div>
    <!-- 整個隱藏 -->
    <div
      id="show-storage-children-modal"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 md:inset-0 h-modal h-full sm:h-full bg-slate-400/70"
      @click.stop="closeStorageChildrenModal"
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
              這些都是我的小孩： {{ getModalInfo }}
            </h3>
            <button
              @click.stop="closeStorageChildrenModal"
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
          <!-- 翻頁 -->
          <div class="p-2 ml-1 mt-2">
            <keep-alive>
              <MyPagination
                :paginationData="getUnitConversationRateData"
                :localStorageName="path"
                :tableData.sync="tableData"
              >
              </MyPagination>
            </keep-alive>
          </div>
          <div class="p-2 grid grid-cols-6 gap-1 storage-image-container">
            <!-- main 這邊列出所有孩子 -->
            <div
              v-for="material in getTableData"
              :key="material._id"
              class="bg-gray-50 rounded-sm border p-1 w-full "
            >
              <div
                class="flex flex-col w-full items-center justify-center hover:border-red-700 border-2 text-sm relative overflow-hidden"
              >
                <!-- 圖片 -->
                <img
                  :src="material.imgs[0]"
                  alt=""
                  class="hover:opacity-75 duration-500 hover:scale-105 storage-search-result max-w-full"
                />
                <!-- 原料名稱 -->
                <span class="text-xs mt-1 p-[2px] w-full">
                  {{ material.product_name }}
                </span>
              </div>
              <!-- 顯示原料結束 -->
            </div>
          </div>

          <!-- main 結束 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['visible', 'fatherData'],
  components: {},
  data() {
    return {
      path: 'show_storage_children_modal', // MyPagination
      storageMaterialChildrenData: [], // 取得單位轉換率的所有資料
      tableData: [],
      fatherName: ''
    }
  },
  async mounted() {},

  watch: {
    // 要查詢孩子的父親資料
    fatherData: {
      async handler(father) {
        this.fatherName = father.product_name
        await this.getStorageMaterialChildren(father)
      }
    },

    // 視窗顯示，消失
    visible: {
      handler(val) {
        let el = document.getElementById('show-storage-children-modal')
        if (el) el.classList.toggle('hidden')
      }
    }
  },
  computed: {
    // 取得 倉庫第一層的所有資料
    getUnitConversationRateData() {
      return this.storageMaterialChildrenData
    },

    // 返回表單需要的資料
    getTableData() {
      return this.tableData
    },

    // modal 最上面的那個顯示資訊
    getModalInfo() {
      return this.fatherName
    }
  },
  methods: {
    // 取得所有轉換率的資料
    async getStorageMaterialChildren(father) {
      const { my_children } = father
      const { data, status } = await this.$store.dispatch(
        this._M.SERVER_GET_MATERIAL_BY_MANY_ID,
        my_children
      )
      this.storageMaterialChildrenData = status === 200 ? data : []
    },

    // 驗證欄位資料

    // 刪除這筆資料
    handleDeleteUnitConversationRate(row) {
      //
    },

    // 關閉視窗
    closeStorageChildrenModal() {
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
  background-color: #ffffa0 !important;
}

/deep/.el-table tr {
  .el-table__expanded-cell {
    padding: 0;
  }
}
</style>
