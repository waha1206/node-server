<template>
  <div>
    <!-- <div class="flex border-2 border-gray-200 rounded w-auto"> -->
    <div class="flex">
      <div class="relative flex justify-start items-center">
        <span class="px-2 text-sm font-bold text-gray-700 w-[100px]">{{ title }}</span>
        <!-- <span class="animate-ping absolute h-2 w-2 rounded-full bg-red-400 opacity-50"></span> -->

        <el-input
          id="customer-data-search-input"
          type="text"
          size="mini"
          placeholder="請輸入關鍵字 ..."
          @keyup.esc="fnCleanQueryStr"
          v-model="queryStr"
          :style="{ width: '250px', fontSize: '16px' }"
        />
        <span class="absolute right-[35px] text-xs  text-gray-400 font-bold">{{
          getSearchNum
        }}</span>

        <span
          @mousedown="fnCleanQueryStr"
          class="px-3 text-white bg-gray-600 hover:bg-gray-800 border-l w-[24px] h-[28px] flex items-center justify-center text-center"
        >
          <span>X</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
const debounce = (function() {
  let timer = 0
  return function(func, delay) {
    clearTimeout(timer)
    timer = setTimeout(func, delay)
  }
})()

export default {
  props: ['searchData', 'searchField', 'title'],
  data() {
    return {
      queryStr: '',
      searchResultData: [],
      combineDataArray: []
    }
  },
  watch: {
    // 當 props 接收到第一次的資料更新，就設定好第一次要顯示出來的資料
    searchData: {
      handler(searchData) {
        // 這邊會把 欲搜尋的欄位從 searchData 中取出來，然後轉成字串合併為搜尋字串
        this.combineDataArray = _.cloneDeep(
          this.combineDataHandler(searchData, this.searchField)
        )
        this.fnSearch()
      },
      deep: true
    },
    queryStr() {
      debounce(() => {
        this.fnSearch()
      }, 200)
    }
  },
  computed: {
    getSearchNum() {
      let result = this.searchResultData.length
      return result > 0 ? `${result}筆` : '沒找到'
    }
  },
  methods: {
    combineDataHandler(searchData, searchFiled) {
      if (_.isEmpty(searchData)) return []
      // 1.首先要把 searchData 逐一的拆分
      // result = [{ searchStr: search_str, trackData: innerArr } ...]
      let finial_result = searchData.reduce((result, innerArr) => {
        // reduce 開始
        // 2.再來要 把 innerArr 每個欄位都比較過，然後把欄位名稱 = searchFiled 陣列裡面的資料一樣的 value 取出
        let combin_search_str = ''
        // 3.哪幾個欄位要過濾出 搜尋文字
        searchFiled.forEach((filedName) => {
          // 4.要過濾的物件 innerArr (過濾這個物件裡面的個欄位，要使用 Object.entries)
          Object.entries(innerArr).forEach(([key, value]) => {
            if (key === filedName) {
              combin_search_str += value
            }
          })
        })
        // 5.把過濾後的取得的 組合好的字串跟 物件 做結合 然後推進去 陣列
        let obj = {
          searchStr: combin_search_str,
          trackData: innerArr
        }
        return result.concat(obj)
      }, []) // reduce 結束
      // 返還 combin 完的資料 [{ searchStr: search_str, trackData: innerArr } ...] [ same ] ...
      return finial_result
    },

    // 200 ms 觸發一次搜尋
    fnSearch() {
      let that = this
      let sp = new RegExp(' ', 'gi')
      let result = []

      // 如果沒資料，或是欲搜尋的字串內容有空字元，就返回，返回的時候給完整的資料
      if (this.queryStr.length == 0 || this.queryStr.match(sp)) {
        result = _.cloneDeep(this.searchData)
        this.searchResultData = _.cloneDeep(this.searchData)

        // 這邊移動到 父元件 去排序了
        // result.sort((a, b) => {
        //   return a.create_date < b.create_date ? 1 : -1
        // })
        this.$emit('search-result', result)
        return
      }

      // 當輸入資料後
      let reg = new RegExp(this.queryStr, 'gi')

      this.searchResultData = []

      this.combineDataArray.filter((item) => {
        let my_str = item.searchStr
        my_str = my_str.trim()
        // 公司名稱有找到就塞進去
        // if (item.company.match(reg) != null || item.nick_name.match(reg) != null) {
        if (my_str.match(reg) != null) {
          this.searchResultData.push(item.trackData)
        }
        //
      })

      // 這邊的排序移動到 父元件去使用 getSearchResult()
      // this.searchResultData.sort((a, b) => {
      //   return a.create_date < b.create_date ? 1 : -1
      // })
      // this.searchResultData = _.orderBy(result, ['create_date'], ['desc'])

      // emit 搜尋的結果 給 父元件
      this.$emit('search-result', this.searchResultData)
    },
    fnCleanQueryStr() {
      this.queryStr = ''
    }
  }
}
</script>
