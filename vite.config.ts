import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // 设置 `@` 指向 `src` 目录
    },
  },
  base: './', // 设置打包路径
  server: {
    host: '0.0.0.0',
    port: 3332, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace('/api/', '/'),
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: './assets',
    cssCodeSplit: true,
    sourcemap: false,
    terserOptions: {
      compress: {
        // 生产环境去除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
