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
      <!-- 商品名稱 (第一層) -->
      <div class="basis-6/12 pr-2">
        <div>
          <label
            for="small-input"
            class="block text-xs font-medium text-gray-900 dark:text-gray-300"
            >分類名稱 (第一層)</label
          >
          <el-input
            size="mini"
            type="type"
            v-model="copyStorageLevelTwoData.name"
          ></el-input>
          <!-- <input
            type="text"
            v-model="copyStorageLevelTwoData.name"
            class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          /> -->
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

      <!-- 0:影片 1:圖片 2:轉址 -->
      <div class="basis-5/12 pr-2">
        <!-- 空出來 -->
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
  props: ['storageLevelTwo'],
  data() {
    return {
      copyStorageLevelTwoData: {}
    }
  },
  watch: {
    storageLevelTwo: {
      handler(val) {
        this.copyStorageLevelTwoData = _.cloneDeep(val)
      },
      deep: true,
      immediate: true
    }
  },

  mounted() {},

  computed: {},
  methods: {
    // 更新 left side banner 的資料
    async updataStorageLevelTwoData() {
      const { status } = await this.$store.dispatch(
        this._M.SERVER_PUT_STORAGE_LEVEL_ONE_DATA,
        this.copyStorageLevelTwoData
      )
      if (status === 200) {
        // 這邊是 emit 的用法
        this.$emit('updateStorageLevelTwoData', this.copyStorageLevelTwoData)
      }
    }
  }
}
</script>
