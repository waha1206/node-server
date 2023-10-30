<template>
  <div class="materials-manager ">
    <el-container>
      <el-header>
        <el-button type="primary" size="small" @click="addStorageLevelOneClass"
          >新增第一層倉庫分類</el-button
        >
        <el-button type="primary" size="small" @click="addStorageLevelTwoClass"
          >新增第二層倉庫分類</el-button
        >
        <div class="materal-class-container">
          <el-cascader
            v-model="cascaderValue"
            :options="cascaderOptions"
            size="mini"
            filterable
            clearable
            collapse-tags
            :props="{ expandTrigger: 'hover' }"
            :style="{ width: '300px' }"
            @change="handleCascaderChange"
          ></el-cascader>
        </div>
      </el-header>
      <!-- 分頁 -->
      <div class="mt-2 flex flex-row justify-start items-center w-full">
        <button
          @click="getMaterialStorageByLevelTwo()"
          type="button"
          class="ml-[20px] p-[6px] text-xs font-medium text-center text-white bg-blue-700 rounded-sm hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          更新資料
        </button>
        <MySearch
          :title="'商品名稱'"
          :searchData="getSearchData"
          :searchField="searchField"
          @search-result="emitResult"
        ></MySearch>

        <!-- 搜尋 -->

        <MyPagination
          :paginationData="getSearchResult"
          :localStorageName="ptah"
          :tableData.sync="tableData"
        >
        </MyPagination>
      </div>
      <!-- 分頁結束 -->
      <div class="el-main">
        <div class="p-2 grid grid-cols-8 material-storage-image-container">
          <div
            v-for="material in getTableData"
            :key="material._id"
            class="  rounded-sm  p-1 "
          >
            <!-- 圖片，這邊使用到懶加載技術 -->
            <div
              class="flex flex-col w-full items-center justify-center relative  m-[2px] p-[2px] overflow-hidden hover:border border-solid border-red-600"
            >
              <div
                :class="
                  Number(material.stock_alert) > Number(material.storage)
                    ? 'bg-red-600'
                    : 'bg-blue-600'
                "
                class="absolute text-white text-[12px] p-1 top-[140px] right-1 flex justify-start items-start flex-col"
              >
                <p>存：{{ material.storage }}</p>
                <div class=" border border-solid w-full border-white "></div>
                <p>安：{{ material.stock_alert }}</p>
              </div>
              <!-- 有幾個孩子 -->
              <div class="absolute top-0 right-0 bg-gray-50 rounded-full z-10">
                <span
                  :class="
                    getChildrenNumber(material)
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400'
                  "
                  class=" text-xs w-[20px] h-[20px] flex justify-center items-center rounded-full"
                >
                  {{ getChildrenNumber(material) }}
                </span>
              </div>

              <!-- 圖片 -->
              <img
                :storage-data-src="material._id"
                class="storage-search-result hover:scale-105  duration-300 hover:opacity-75"
                alt=""
              />
              <span class="text-xs p-[2px] w-full mt-1">
                {{ material.product_name }}
              </span>

              <!-- 鎖定或是刪除 -->
              <div
                @click="deleteMaterialStorage(material)"
                class="absolute border shadow border-solid top-1 right-1 bg-gray-50 p-1 hover:scale-105 overflow-hidden duration-300 hover:bg-yellow-300 text-xs"
              >
                <span
                  v-if="getChildrenNumber(material)"
                  class="bg-red-600 text-white border border-white rounded-sm w-[36px] h-[30px] flex justify-center items-center cursor-not-allowed "
                >
                  鎖定
                </span>
                <span
                  v-else
                  class="border border-red-500 border-solid rounded-sm cursor-pointer w-[36px] h-[30px] flex justify-center items-center"
                >
                  刪除
                </span>
              </div>

              <!-- 編輯倉庫的原料 -->

              <div
                @click="editMaterialStorageData(material)"
                class="absolute border shadow border-solid top-1 left-1 bg-gray-50 p-1 hover:scale-105 overflow-hidden duration-300 hover:bg-yellow-300 text-xs"
              >
                <span
                  class="border border-red-500 border-solid rounded-sm cursor-pointer w-[36px] h-[30px] flex justify-center items-center"
                >
                  編輯
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-container>

    <!-- 非常重要的知識點，遠端讀取資料庫後，要等到接收到遠端資料完畢後，才可以掛載子元件
		判斷式大概如下：v-if="allSupplierlData[0]"
		詳細的說明網頁連結：https://bit.ly/2LCp1CV
		 -->

    <!-- 這邊放的是元件 新增第一層，新增第二層 ... -->
    <StorageClassLevelOneModal
      :visible.sync="levelOneModalVisible"
    ></StorageClassLevelOneModal>
    <StorageClassLevelTwoModal
      :visible.sync="levelTwoModalVisible"
    ></StorageClassLevelTwoModal>
    <EditMaterialStorageModal
      :originalData="originalData"
      :visible.sync="editMaterialStorageVisible"
      @update-edit-data="updateEditData"
    ></EditMaterialStorageModal>
  </div>
</template>

<script>
import StorageClassLevelOneModal from '../../components/MaterialStorageManage/StorageClassLevelOneModal.vue'
import StorageClassLevelTwoModal from '../../components/MaterialStorageManage/StorageClassLevelTwoModal.vue'
import EditMaterialStorageModal from '../../components/MaterialStorageManage/EditMaterialStorageModal.vue'
import _M from '../../constants'
import _O from '../../other_code'

export default {
  name: 'material-storage-manager',
  components: {
    StorageClassLevelOneModal,
    StorageClassLevelTwoModal,
    EditMaterialStorageModal
  },
  data() {
    return {
      // 搜尋的部分，翻頁相關
      searchField: ['product_name', 'product_color', 'raw_material', 'remark', 'unit'], // 給搜尋列定義那些欄位需要搜尋文字
      searchResult: [], // 從搜尋元件過濾出來的資料，這邊的資料會餵給 pagination
      ptah: 'material_storage_manage_page_size', // 此業的顯示頁面儲存
      tableData: [], // 部分的，片段的資料，從 pagination 的元件取得該資料

      // 讀取 material storage
      levelOneModalVisible: false, // 跳出新增第一層 class 視窗
      levelTwoModalVisible: false, // 跳出新增第二層 class 視窗
      editMaterialStorageVisible: false, // 跳出 編輯 material storage 視窗
      cascaderValue: [], // 聯集選擇器，綁定項的選擇值
      cascaderOptions: [], // 聯集選擇器 第一層 第二層 第N層 ...
      storageLevelOneClassData: [],
      storageLevelTwoClassData: [],

      // ---- material storage all father ----
      materialStorageData: [], // 要顯示出來的原物料陣列 - 根據 cascaderValue 讀取

      // 給子元件要編輯的資料，點擊 【編輯】 按鈕後複製原始資料到這邊
      originalData: {}
    }
  },

  beforeRouteEnter(to, from, next) {
    // console.log('元件內的 beforeRouterEnter，不能使用this,因為此時尚未創建成功')
    next()
  },
  beforeRouteLeave(to, from, next) {
    // console.log('beforeRouteLeave 我要離開這個元件了')
    next()
  },
  created() {},
  async mounted() {
    await this.reloadStorageClassData()
    await this.getMaterialStorageByLevelTwo() // 透過第二層的 _id 取得資料
  },
  watch: {},
  computed: {
    // 原始資料 → a.給搜尋 → b.給 pagaination → c.給 table
    // a.給搜尋 - 吐回資料 emitResult → this.searchResult
    getSearchData() {
      return this.materialStorageData
    },

    // b.餵給 pagination - 吐回資料 → :tableData.sync="tableData
    getSearchResult() {
      return this.searchResult
    },

    // c.給 table
    getTableData() {
      this.$nextTick(() => {
        this.observerImg()
      })
      return this.tableData
    },

    // modal title 顯示的是 目前選擇的 供應商 product_name
    getModalInfo() {
      const { product_name = '' } = this.myFatherMaterialData || {}
      return product_name ? product_name : '您可以挑選要綁定的倉庫原料！'
    },

    // 取得 father 圖片
    getMyFatherImg() {
      const { imgs = [] } = this.myFatherMaterialData || {}
      return imgs ? imgs[0] : false
    }
  },

  methods: {
    // --------------- 跳出視窗部分 ---------------
    addStorageLevelOneClass() {
      this.levelOneModalVisible = true
    },
    addStorageLevelTwoClass() {
      this.levelTwoModalVisible = true
    },
    editMaterialStorageData(originalData) {
      this.editMaterialStorageVisible = true

      this.$set(this, 'originalData', originalData)
    },
    // --------------- 跳出視窗部分 end ---------------

    // --------------- material storage 刪除 編輯 ---------------
    // 刪除 material storage
    async deleteMaterialStorage(materialStorage) {
      if (materialStorage.my_children.length) return
      const resData = await this.$store.dispatch(
        _M.SERVER_DELETE_MATERIAL_STORAGE,
        materialStorage._id
      )
      const { status, data: deleteMaterialStorageData } = resData
      console.log('resData :', resData)

      if (status !== 200) {
        this.$notify({
          title: '刪除失敗',
          dangerouslyUseHTMLString: true,
          message: `
          <strong>刪除資料出現問題</strong> <br>
          錯誤代碼：${status}！<br>
          `,
          type: 'error', // success warning info error
          duration: 0,
          offset: 100
        })
        return
      }
      // 如果刪除成功，那就更新資料
      // 1.this.tableData 使用 $set 讓他響應
      // 2.this.materialStorageData 使用 assign 不要有響應
      this.tableData = this.tableData.filter(
        (item) => item._id !== deleteMaterialStorageData._id
      )
      this.materialStorageData = this.materialStorageData.filter(
        (item) => item._id !== deleteMaterialStorageData._id
      )
    },

    // 元件更新後，通知父元件刷新資料
    // 1.tableData - 當前頁面
    // 2.materialStorageData - 總資料 使用 assign 不要響應
    updateEditData(newData) {
      const { _id } = newData
      // all data array
      const material_index = this.materialStorageData.findIndex(
        (material) => material._id === _id
      )
      if (material_index !== -1)
        Object.assign(this.materialStorageData[material_index], newData)
      // table
      const table_index = this.tableData.findIndex((material) => material._id === _id)
      if (table_index !== -1) this.$set(this, tableData[material_index], newData)
    },

    // --------------- material storage 刪除 編輯 end ---------------

    // 搜尋結果
    emitResult(searchResult) {
      this.searchResult = _.cloneDeep(searchResult)
    },

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
      this.cascaderOptions.unshift(_O.MATERIAL_STORAGE_DEFAULT_OPTIONS)
      this.initCascaderGetLocalStorageData()
    },

    // 讀取 localStorage 初始化 聯集選擇器 的資料
    initCascaderGetLocalStorageData() {
      // 這邊要初始化 cascaderValue 聯集選擇器
      const levelOneId =
        localStorage.getItem('setting_material_father_modal_level_one') !== null
          ? JSON.parse(localStorage.getItem('setting_material_father_modal_level_one'))
          : '00000'
      const levelTwoId =
        localStorage.getItem('setting_material_father_modal_level_two') !== null
          ? JSON.parse(localStorage.getItem('setting_material_father_modal_level_two'))
          : '00000'
      this.$set(this, 'cascaderValue', [levelOneId, levelTwoId])
    },

    // 透過第二層的 _id 取得資料
    async getMaterialStorageByLevelTwo() {
      if (_.isEmpty(this.cascaderValue[1])) {
        this.$notify({
          title: '資料錯誤',
          dangerouslyUseHTMLString: true,
          message: `
          <strong>聯集選擇器錯誤</strong> <br>
          cascaderValue[1]資料為空<br>
          請重新選擇第二層的選項！<br>
          如再有錯誤，可能是程式碼出現錯誤。
          `,
          type: 'error', // success warning info error
          duration: 0,
          offset: 100
        })
        return
      }
      // 跟資料庫要資料
      const resData = await this.$store.dispatch(
        _M.SERVER_GET_MATERIAL_STORAGE_BY_LEVEL_TWO_NO_IMG,
        this.cascaderValue[1]
      )
      // 後續寫到這邊，先存檔，明天再繼續

      const { status, data } = resData
      this.materialStorageData = data
    },

    // 當聯集下拉式選單產生變動的時候，這邊可以記錄選擇的第一層，第二層到 localStorage
    // classOneAndTwoId[0] level one _id
    // classOneAndTwoId[1] level two _id
    async handleCascaderChange(classOneAndTwoId) {
      localStorage.setItem(
        'setting_material_father_modal_level_one',
        JSON.stringify(classOneAndTwoId[0])
      )
      localStorage.setItem(
        'setting_material_father_modal_level_two',
        JSON.stringify(classOneAndTwoId[1])
      )
      await this.getMaterialStorageByLevelTwo()
    },
    // ----------------------- observer go -----------------------
    // 找到所有的 img 每次搜尋完都要先抓出來
    observerImg() {
      const imageContainer = document.querySelector('.material-storage-image-container')
      const options = {
        root: imageContainer,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.5
      }
      const images = document.querySelectorAll('.storage-search-result')
      this.observer = new IntersectionObserver(this.callback, options)
      images.forEach((image) => {
        if (image.hasAttribute('storage-data-src')) {
          // console.log('image-has-storage-data-src :', image)
          this.observer.observe(image)
        }
      })
    },

    // 觀察的 callback
    async callback(entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        this.loadImg(entry.target)
        this.observer.unobserve(entry.target)
      })
    },

    // 讀取 img
    async loadImg(target) {
      const data_src = target.getAttribute('storage-data-src') // 取得屬性 storage-data-src 的值
      const data = await this.$store.dispatch(
        _M.SERVER_GET_MATERIAL_STORAGE_IMG_BY_ID,
        data_src
      )

      const { imgs } = data
      if (_.isEmpty(imgs)) target.setAttribute('src', require(`@/assets/noimage.png`))
      else target.setAttribute('src', imgs[0]) // 設定新的屬性並且賦予它值
    },
    // ----------------------- observer end -----------------------

    // ----------------------- 雜七雜八 -----------------------
    // father 有多少 child
    getChildrenNumber(material) {
      return material.my_children.length
    }

    // ----------------------- 雜七雜八 end -----------------------
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
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;

  width: 1740px;
  height: 100%;
  padding: 5px;
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
