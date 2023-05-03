const path = require('path');  

module.exports = {
  publicPath: './',
  pages: {
    index: {
      title: "heypath",
    }
  },
  configureWebpack: {  
    resolve: {  
      alias: {  
        "@": path.join(__dirname, "src"), 
      },  
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData:
          '@import "@/scss/variables.scss";',
      },
    },
  },
}