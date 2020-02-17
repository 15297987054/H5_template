module.exports = {
  proxy: {
    '/group1': {    // 映射为图片服务器.
      target: 'http://192.168.1.71:8888',  // 后端接口的地址.
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true  //是否跨域
    },
    '/api': {//将www.exaple.com印射为/apis 183
      target: 'http://192.168.1.50:8084',  // 后端 测试接口的地址.
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true  //是否跨域
    },
    '/media': { //将www.exaple.com印射为/apis
      target: 'http://192.168.1.50:8084',  // 后端测试接口的地址.
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '/media': ''
      }
    }
  }
}
