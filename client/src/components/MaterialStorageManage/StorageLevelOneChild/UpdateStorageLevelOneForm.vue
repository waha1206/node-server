<template>
  <div class="border-8 border-red-700 my-1 relative p-2">
    <!-- 第一行 -->
    <div class="flex flex-row justify-start">
      <!-- 更新按鈕 -->
      <div class="basis-1/12 pr-2">
        <div class="flex justify-center items-center h-full w-full">
          <span
            @click="updataStorageLevelOneData()"
            class="p-3 btn hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 text-white bg-gradient-to-r from-sky-500 to-indigo-500 focus:ring-4 font-xs rounded-sm text-xs px-2 py-1 text-center mr-2 cursor-pointer m-auto"
          >
            更新
          </span>
        </div>
      </div>

      <!-- 商品編號 -->
      <div class="basis-5/12 pr-2">
        <div>
          <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >商品編號 (不可重複)</label
          >
          <input
            type="text"
            v-model="copyLeftSideBannerData.name"
            class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <!-- 商品名稱 (第一層) -->
      <div class="basis-6/12 pr-2">
        <div>
          <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >商品名稱 (第一層)</label
          >
          <input
            type="text"
            v-model="copyLeftSideBannerData.describe"
            class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- 第二行 -->
    <div class="flex flex-row justify-start mt-2">
      <!-- 空格，對齊更新 -->
      <div class="basis-1/12 pr-2"></div>
      <!-- 備註說明 -->
      <div class="basis-5/12 pr-2">
        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >備註說明</label
        >
        <input
          type="text"
          v-model="copyLeftSideBannerData.video_url"
          class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
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
  props: ['leftSideBanner', 'activateLeftSideBannerNum'],
  data() {
    return {
      copyLeftSideBannerData: {},
      leftSideBannerFiles: [] // 首頁使用的 Q&A 的小圖 像素 330 * 220
    }
  },
  watch: {
    leftSideBanner: {
      handler(val) {
        this.copyLeftSideBannerData = _.cloneDeep(val)
        const { imgs } = this.copyLeftSideBannerData
        if (imgs === undefined || imgs.length === 0) return
        this.leftSideBannerFiles = _.cloneDeep(imgs)
      },
      deep: true,
      immediate: true
    }
  },

  mounted() {},

  computed: {
    getActivateLeftSideBannerNum() {
      return this.activateLeftSideBannerNum
    },
    getLeftSideBannerFiles() {
      return this.leftSideBannerFiles
    }
  },
  methods: {
    // 子元件 discountImgs 更動
    updateAddLeftSideBannerImgs(img) {
      this.leftSideBannerFiles.push(img)
    },
    updateRemoveLeftSideBannerImgs(index) {
      this.leftSideBannerFiles.splice(index, 1)
    },
    // 更新 left side banner 的資料
    async updataStorageLevelOneData() {
      if (this.leftSideBannerFiles.length) {
        this.copyLeftSideBannerData.imgs = this.leftSideBannerFiles.join('|')
      }
      if (_.isEmpty(this.leftSideBannerFiles)) {
        this.copyLeftSideBannerData.imgs = []
      }

      const { status } = await this.$store.dispatch(_M.PUT_LEFT_SIDE_BANNER_DATA, this.copyLeftSideBannerData)
      if (status === 200) {
        // 這邊是 emit 的用法
        this.$emit('getAllLeftSideBannerData')
      }
    }
  }
}
</script>
