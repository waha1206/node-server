<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import jwt_decode from 'jwt-decode'
export default {
  name: 'app',
  created() {
    // 注意 store.dispath 這個是可以使用異步函數，而Mutation 則為同步函數
    // Action 提交的是 mutation，而不是直接变更状态。
    // Action 可以包含任意异步操作。
    if (localStorage.eleToken) {
      const decode = jwt_decode(localStorage.eleToken)
      this.$store.dispatch('setIsAutnenticated', !this.isEmpty(decode))
      this.$store.dispatch('setUser', decode)
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
