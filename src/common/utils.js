export function debounce(func, delay){
    let timer = null
    return function (...args) {
      if (timer) clearTimeout(timer)
      timer =setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
// 防抖动函数，延迟发送请求，不用多次请求啦
