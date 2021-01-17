import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from './router'

let loading
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加載中...',
    background: 'rgba(0,0,0,0,7)'
  })
}

function endLoading() {
  loading.close()
}

// 請求攔截
axios.interceptors.request.use(
  (config) => {
    // 開始加載動畫
    startLoading()
    if (localStorage.eleToken) {
      // 設置統一個請求 header 把 ls 裡面的 tokent 放進去驗證客戶是否是 合法的
      config.headers.Authorization = localStorage.eleToken
      // console.log('NODE-SERVER/http.js', '請求攔截')
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 響應攔截
axios.interceptors.response.use(
  (response) => {
    // 結束加載動畫
    endLoading()
    return response
  },
  (error) => {
    // 錯誤提醒
    endLoading()

    const { status } = error.response
    console.log(status)
    if (status == 401) {
      Message.error('token 失效，請重新登入！')
      // 清除 token
      localStorage.removeItem('eleToken')
      // 跳轉到登入頁面
      router.push('/login')
    } else {
      Message.error(error.response.data)
    }
    return Promise.reject(error)
  }
)

export default axios
