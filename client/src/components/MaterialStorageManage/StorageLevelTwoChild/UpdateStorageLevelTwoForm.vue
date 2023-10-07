<template>
  <div class="border-8 border-red-700 my-1 relative p-2">
    <!-- 第一行 -->
    <div class="flex flex-row justify-start">
      <!-- 更新按鈕 -->
      <div class="basis-1/12 pr-2">
        <div class=" flex justify-center items-center h-full w-full">
          <span
            @click="updataStorageLevelTwoData()"
            class="text-xs  hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 text-white bg-gradient-to-r from-sky-500 to-indigo-500 focus:ring-4 font-xs rounded-sm  px-2 py-1 text-center cursor-pointer m-auto"
          >
            更新
          </span>
        </div>
      </div>

      <!-- 商品編號 -->
      <div class="basis-5/12 pr-2">
        <div>
          <label
            for="small-input"
            class="block text-xs font-medium text-gray-900 dark:text-gray-300"
            >分類編號 (不可重複)</label
          >
          <el-input
            size="mini"
            type="type"
            v-model="copyStorageLevelTwoData.type"
          ></el-input>
        </div>
      </div>
      <!-- 商品名稱 (第二層) -->
      <div class="basis-6/12 pr-2">
        <div>
          <label
            for="small-input"
            class="block text-xs font-medium text-gray-900 dark:text-gray-300"
            >分類名稱 (第二層)</label
          >
          <el-input
            size="mini"
            type="type"
            v-model="copyStorageLevelTwoData.name"
          ></el-input>
        </div>
      </div>
    </div>

    <!-- 第二行 -->
    <div class="flex flex-row justify-start mt-2">
      <!-- 空格，對齊更新 -->
      <div class="basis-1/12 pr-2"></div>
      <!-- 備註說明 -->
      <div class="basis-5/12 pr-2">
        <label
          for="small-input"
          class="block text-xs font-medium text-gray-900 dark:text-gray-300"
          >備註說明</label
        >
        <el-input
          size="mini"
          type="type"
          v-model="copyStorageLevelTwoData.describe"
        ></el-input>
      </div>

      <!-- 換第一層分類 -->
      <div class="basis-5/12 pr-2">
        <label
          for="storage-class-level-two-modal-name"
          class="m-0 block text-xs font-medium text-gray-700"
          >大分類 (更換)</label
        >
        <el-select
          @change="formDataSelectChang"
          v-model="copyStorageLevelTwoData.level_one_id"
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

      <!-- 是否啟用，無上限，超過一個會變成輪播 -->
      <div class="basis-1/12 pr-2">
        <!-- 空出來 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['storageLevelTwo', 'storageLevelOne'],
  data() {
    return {
      copyStorageLevelOneData: {},
      copyStorageLevelTwoData: {}
    }
  },
  watch: {
    storageLevelTwo: {
      handler(newData) {
        this.copyStorageLevelTwoData = _.cloneDeep(newData)
      },
      deep: true,
      immediate: true
    },
    storageLevelOne: {
      handler(newData) {
        this.copyStorageLevelOneData = _.cloneDeep(newData)
      },
      deep: true,
      immediate: true
    }
  },

  mounted() {},

  computed: {
    // 新增第二層的時候，下拉選單用的，這邊是第一層的資料
    getStorageLevelOneClass() {
      return this.storageLevelOne
    }
  },
  methods: {
    // 當更換第一層分類的時候會觸發
    formDataSelectChang(selectedLevelOneId) {
      const selectedLevelOne = this.getStorageLevelOneClass.find(
        (levelOneData) => levelOneData._id === selectedLevelOneId
      )
      this.copyStorageLevelTwoData.level_one_name = ''
      if (selectedLevelOne)
        this.copyStorageLevelTwoData.level_one_name = selectedLevelOne.name
    },

    // 更新 left side banner 的資料
    async updataStorageLevelTwoData() {
      const { status } = await this.$store.dispatch(
        this._M.SERVER_PUT_STORAGE_LEVEL_TWO_DATA,
        this.copyStorageLevelTwoData
      )
      // 如果成功，通知父元件
      if (status === 200) {
        this.$message({
          message: '修改第二層分類成功',
          type: 'success'
        })
        this.$emit('updateStorageLevelTwoData', this.copyStorageLevelTwoData)
      }

      if (status !== 200)
        this.$message({
          message: '修改第二層分類失敗',
          type: 'error'
        })
    }
  }
}
</script>
