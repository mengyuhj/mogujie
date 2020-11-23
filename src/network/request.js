import axios from 'axios'

// ES6 Promise的封装
export function request(options) {
  // 1.创建axios的实例对象
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })

  // 过滤器(拦截器)
  instance.interceptors.request.use(config => {
    // console.log(config);
    //只有返回数据之后才会执行以后的步骤
    return config
  }, err => {
    console.log(err);
  });

  // 通过实例发送网络请求
  return instance(options)  //返回为promise
}

// ES5封装方式
// export function request(options, success, failure) {
//   // 1.创建axios的实例对象
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//
//   // 过滤器(拦截器)
//   instance.interceptors.response.use(res => {
//     return res.data
//   })
//
//   // 通过实例发送网络请求
//   instance(options)
//       .then(res => {
//         success(res)
//       }).catch(err => {
//         failure(err)
//       })
// }
