import Vue from 'vue'
import App from './App.vue'
import axios from './http'
import moment from 'moment'
import ElementUI from 'element-ui'
// 引入繁體中文
import locale from 'element-ui/lib/locale/lang/zh-TW'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import UploadImg from './components/global/UploadImgs.vue'
import MyPagination from './components/global/MyPagination.vue'
import _ from 'lodash'

// 導入全局變量

import constants from './constants'

// 將 _M 添加到 vue 原型上面
Vue.prototype._M = constants

// https://www.cnblogs.com/yck123/p/11212979.html
// 滑鼠事件控制台警告 - 使用的插件
import 'default-passive-events'
// 把判斷 permission 的功用函式引入
import { includePermission } from '../src/utils/permission'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale }) // 掛載繁體中文

Vue.prototype.$axios = axios

Vue.prototype._ = _

Vue.component('upload-img', UploadImg)

Vue.component('MyPagination', MyPagination)

// 局部註冊的自定義指令，把值轉換成為有千位符號的逗號
// https://medium.com/itsems-frontend/vue-custom-directives-c991ce456748
// 使用方式 → <span id="number" v-price:currency="temp"></span>
Vue.directive('price', {
  bind: function(el, binding) {
    el.innerHTML = binding.value
      .toString()
      .replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function(all, pre, groupOf3Digital) {
        return pre + groupOf3Digital.replace(/\d{3}/g, ',$&')
      })
  }
})

// 判斷此 html 有沒有包含允許的 promission，為了不跟 v-if 衝突所以自定義 v-promission
// 使用方式 →
Vue.directive('permission', {
  bind: function(el, binding) {
    const permissions = binding.value
    if (!includePermission(permissions)) {
      el.classList.add('hide')
    } else {
      el.classList.remove('hide')
    }
  }
})

// 輸入數字轉加標點符號-正整數、改變顏色
// https://jsfiddle.net/mani04/bgzhw68m/
// 有個小BUG就是，要先把 this.value 用 parseFloat 轉換過，後面才可以使用 .toFixed()
// 使用方式 <my-currency-input type="registered_capital" v-model="formData.registered_capital" ></my-currency-input>
// 20210206 新增了一個功能是 readyOnly :isReadyOnly="false" 可輸入  :isReadyOnly="true" 只允許讀取
Vue.component('my-currency-int-input', {
  props: ['value', 'isReadyOnly', 'width', 'height', 'bgcColor', 'txtColor'],
  template: `
			<div>
					<input
					class="my-currency-int-input"
					v-bind:style="styleObject"
					v-if="isReadyOnly" type="text" v-model="displayValue" @blur="isInputActive = false" @focus="isInputActive = true" readonly/>
					<input
					class="my-currency-input"
					v-bind:style="styleObject"
					v-else type="text" v-model="displayValue" @blur="isInputActive = false" @focus="isInputActive = true"/>
			</div>`,
  data: function() {
    return {
      isInputActive: false
    }
  },
  computed: {
    styleObject: {
      get: function() {
        const styleObject = {
          width: this.width + 'px',
          height: this.height + 'px',
          backgroundColor: this.bgcColor,
          color: this.txtColor,
          // paddingLeft: '10px'
          paddingRight: '10px',
          textAlign: 'right'
          // textAlign:'center'
        }
        return styleObject
      }
    },
    displayValue: {
      get: function() {
        if (this.isInputActive) {
          // Cursor is inside the input field. unformat display value for user
          return this.value.toString()
        } else {
          // User is not modifying now. Format display value for user interface
          return (
            '$ ' +
            parseFloat(this.value)
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
          )
        }
      },
      set: function(modifiedValue) {
        // Recalculate value after ignoring "$" and "," in user input
        let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ''))
        // Ensure that it is not NaN
        if (isNaN(newValue)) {
          newValue = 0
        }
        // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
        // $emit the event so that parent component gets it
        this.$emit('input', newValue)
      }
    }
  }
})
// 輸入數字轉加標點符號
// https://jsfiddle.net/mani04/bgzhw68m/
// 有個小BUG就是，要先把 this.value 用 parseFloat 轉換過，後面才可以使用 .toFixed()
// 使用方式 <my-currency-input type="registered_capital" v-model="formData.registered_capital" ></my-currency-input>
// 20210206 新增了一個功能是 readyOnly :isReadyOnly="false" 可輸入  :isReadyOnly="true" 只允許讀取
Vue.component('my-currency-input', {
  props: ['value', 'isReadyOnly', 'width', 'height'],
  template: `
			<div>
					<input
					class="my-currency-input"
					v-bind:style="styleObject"
					v-if="isReadyOnly" type="text" v-model="displayValue" @blur="isInputActive = false" @focus="isInputActive = true" readonly/>
					<input
					class="my-currency-input"
					v-bind:style="styleObject"
					v-else type="text" v-model="displayValue" @blur="isInputActive = false" @focus="isInputActive = true"/>
			</div>`,
  data: function() {
    return {
      isInputActive: false
    }
  },
  computed: {
    styleObject: {
      get: function() {
        const styleObject = {
          width: this.width + 'px',
          height: this.height + 'px'
          // textAlign:'center'
        }
        return styleObject
      }
    },
    displayValue: {
      get: function() {
        if (this.isInputActive) {
          // Cursor is inside the input field. unformat display value for user
          return this.value.toString()
        } else {
          // User is not modifying now. Format display value for user interface
          return (
            '$ ' +
            parseFloat(this.value)
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
          )
        }
      },
      set: function(modifiedValue) {
        // Recalculate value after ignoring "$" and "," in user input
        let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ''))
        // Ensure that it is not NaN
        if (isNaN(newValue)) {
          newValue = 0
        }
        // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
        // $emit the event so that parent component gets it
        this.$emit('input', newValue)
      }
    }
  }
})

// 輸入數字轉加百分比 %
// https://jsfiddle.net/mani04/bgzhw68m/
// 有個小BUG就是，要先把 this.value 用 parseFloat 轉換過，後面才可以使用 .toFixed()
// 使用方式 <my-currency-input type="registered_capital" v-model="formData.registered_capital" ></my-currency-input>
// 20210206 新增了一個功能是 readyOnly :isReadyOnly="false" 可輸入  :isReadyOnly="true" 只允許讀取
Vue.component('my-percentage-input', {
  props: ['value', 'isReadyOnly', 'width', 'height'],
  template: `
			<div class="my-percentage-div">
					<input
						v-bind:style="styleObject"
						class="my-percentage-input"
						v-if="isReadyOnly"
					  type="text"
						v-model="displayValue"
						@enter="isInputActive = true"
						@blur="isInputActive = false"
						@focus="isInputActive = true"
						readonly
						/>
					<input
						v-bind:style="styleObject"
						class="my-percentage-input"
						@enter="isInputActive = true"
						v-else
						type="text"
						v-model="displayValue"
						@blur="isInputActive = false"
						@focus="isInputActive = true"
						/>
			</div>`,
  data: function() {
    return {
      // 當游標 在 input 框裡面的時候 觸發事件 @focue ="isInputActive = true"
      // 當游標 離開 input 框裡面的時候 觸發事件 @blur ="isInputActive = false"
      isInputActive: false
    }
  },
  methods: {},
  computed: {
    styleObject: {
      get: function() {
        const styleObject = {
          width: this.width + 'px',
          height: this.height + 'px'
          // textAlign:'center'
        }
        return styleObject
      }
    },
    displayValue: {
      get: function() {
        // 當游標在 input 裡面的時候，給使用者看到的是 未經過格式化的字串 例如 2.86
        if (this.isInputActive) {
          // Cursor is inside the input field. unformat display value for user
          return this.value.toString()
        } else {
          // 當游標離開了 input 的時候，觸發了 @blur 這時候格式化輸入的字串給使用者看 例如 $ 2.86
          // User is not modifying now. Format display value for user interface
          return (
            parseFloat(this.value)
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,') + ' %'
          )
        }
      },
      set: function(modifiedValue) {
        // Recalculate value after ignoring "$" and "," in user input
        // [^ 取反，非數字，這個意思是除了 0-9 . 以外都把它用後面的 '' 空字符取代掉
        let newValue = parseFloat(modifiedValue.replace(/[^\d]/g, ''))
        // Ensure that it is not NaN  確保這個傳入的數值不是 NaN
        if (isNaN(newValue)) {
          newValue = 0
        }
        // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
        // $emit the event so that parent component gets it
        this.$emit('input', newValue)
      }
    }
  }
})

moment.locale('zh-TW')
Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
