<template>
  <div class="border-8 border-red-700 my-1 relative p-2">
    <!-- 第一行 -->
    <div class="flex flex-row justify-start">
      <!-- 更新按鈕 -->
      <div class="basis-1/12 pr-2">
        <div class=" flex justify-center items-center h-full w-full">
          <span
            @click="updataUnitConversationRateData()"
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
            >編號 (不可重複)</label
          >
          <el-input
            size="mini"
            type="type"
            v-model="copyUnitConversationRateData.type"
          ></el-input>
        </div>
      </div>
      <!-- 單位名稱 -->
      <div class="basis-6/12 pr-2">
        <div>
          <label
            for="small-input"
            class="block text-xs font-medium text-gray-900 dark:text-gray-300"
            >單位名稱</label
          >
          <el-input
            size="mini"
            type="type"
            v-model="copyUnitConversationRateData.name"
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
          v-model="copyUnitConversationRateData.describe"
        ></el-input>
      </div>

      <!-- 轉換率 (純數字) -->
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
  props: ['updateUnitConversationRateData'],
  data() {
    return {
      copyUnitConversationRateData: {}
    }
  },
  watch: {
    updateUnitConversationRateData: {
      handler(val) {
        this.copyUnitConversationRateData = _.cloneDeep(val)
      },
      deep: true,
      immediate: true
    }
  },

  mounted() {},

  computed: {},
  methods: {
    // 更新 left side banner 的資料
    async updataUnitConversationRateData() {
      const { status } = await this.$store.dispatch(
        this._M.SERVER_PUT_UNIT_CONVERSATION_RATE,
        this.copyUnitConversationRateData
      )
      if (status === 200) {
        // 這邊是 emit 的用法
        this.$emit('updateUnitConversationRateData', this.copyUnitConversationRateData)
      }
    }
  }
}
</script>
