module.exports={
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'router':'@/router',
        'views':'@/views'
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // autoprefixer(),
          require("postcss-px-to-viewport")({
            viewportWidth: 374, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            viewportHeight: 667, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
            unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数
            viewportUnit: "vw", //指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ['.ignore'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false, // 允许在媒体查询中转换`px`,
            exclude:[/TabBar/]
          })
        ]
      }
    }
  }
}
//在js中使用正则：  /正则相关规则/
//exclude中存放的元素必须是正则表达式
//按照需要排除的文件填写对应正则表达式
//正则规则
//1. ^abc 必须是以abc开头的内容
//2. abc$  必须是以abc结尾的内容
