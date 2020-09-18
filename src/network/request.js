import axios from 'axios'

// 3.instance本就是promise
export function request(config){
    // 1.创建axios的实列
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/z8',
      timeout: 5000
    })

  // 3.请求拦截
    instance.interceptors.request.use(config => {
      return config
    }, err => {
      // console.log(err)
    });

     // 3.1响应拦截
    instance.interceptors.response.use(res => {
      return res.data
    }, err => {
      console.log(err)
    })

    // 2.发送真正的网络请求
    return instance(config) //本身就是一个promise
}
