/*
 * @Author: 蒋承志
 * @Description: file content
 * @Date: 2020-09-16 11:37:11
 * @LastEditTime: 2020-10-09 16:06:30
 * @LastEditors: 蒋承志
 */
import { defineConfig } from 'umi';

export default defineConfig({
  antd: {},
  dva: {
    immer: true, // 表示是否启用 immer 以方便修改 reducer。
    hmr: false, // 表示是否启用 dva model 的热更新。
    skipModelValidate: true , // 是否跳过 model 验证。
    // extraModels: [], // 配置额外到 dva model。
  },
  mock: false,
  // layout: {},
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash'
  },
  ignoreMomentLocale: true,
  outputPath: './dist',
  hash: true,
  manifest: {
    basePath: '/',
  },
  proxy: {
    '/api': {
      target: 'http://10.8.0.51:8081/',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/',
      exact: false,
      // redirect: '/test',
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/home', component: '@/pages/home/index' }
      ],
    }
  ],
});
