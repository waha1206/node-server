<template>
  <div class="text-center h-[40px] leading-none">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="paginations.page_index"
      :page-size="paginations.page_size"
      :page-sizes="paginations.page_sizes"
      :total="paginations.total"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['paginationData', 'localStorageName'],
  data() {
    return {
      pageData: [],
      paginations: {
        page_index: 1, // 位於當前第幾頁
        total: 0, // 總數
        page_size: 14, // 每一頁顯示幾條數據
        page_sizes: [5, 10, 12, 13, 14, 16, 18, 20, 25, 28, 30, 300] // 選擇一頁要顯示多少條
        // layouts: 'total, sizes, prev, pager, next, jumper'
      }
    }
  },
  mounted() {
    this.setPaginations(this.paginationData)
  },
  methods: {
    setPaginations(data) {
      this.paginations.page_size = !_.isEmpty(localStorage.getItem(this.localStorageName))
        ? Number(localStorage.getItem(this.localStorageName))
        : 12

      this.paginations.total = data.length
      this.paginations.page_index = 1

      this.pageData = data.filter((item, index) => {
        return index < this.paginations.page_size
      })
      this.$emit('update:tableData', this.pageData)
    },
    // 分頁的 function
    handleSizeChange(page_size) {
      // 切換每頁有幾條數據
      localStorage.setItem(this.localStorageName, page_size)
      this.paginations.page_index = 1
      this.paginations.page_size = page_size
      this.pageData = this.paginationData.filter((item, index) => {
        return index < page_size
      })
      this.$emit('update:tableData', this.pageData)
    },
    handleCurrentChange(page) {
      // 獲取當前頁面
      let index = this.paginations.page_size * (page - 1)
      // 數據的總數
      let nums = this.paginations.page_size * page
      // 容器
      let tables = []
      for (let i = index; i < nums; i++) {
        if (this.paginationData[i]) {
          tables.push(this.paginationData[i])
        }
        this.pageData = tables
      }
      this.$emit('update:tableData', this.pageData)
    }
  },
  watch: {
    paginationData: function(val) {
      this.setPaginations(val)
    }
  }
}
</script>

<style lang="scss" scoped></style>
