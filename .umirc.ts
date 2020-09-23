/*
 * @Author: 蒋承志
 * @Description: file content
 * @Date: 2020-09-16 11:37:11
 * @LastEditTime: 2020-09-23 17:05:00
 * @LastEditors: 蒋承志
 */
import { defineConfig } from 'umi';

export default defineConfig({
  antd: {},
  dva: {
    immer: true, // 表示是否启用 immer 以方便修改 reducer。
    hmr: false, // 表示是否启用 dva model 的热更新。
    skipModelValidate: false, // 是否跳过 model 验证。
    extraModels: [], // 配置额外到 dva model。
  },
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
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    { exact: true, path: '/login', component: '@/pages/login/index' },
    {
      path: '/',
      exact: false,
      // redirect: '/test',
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/home', component: '@/pages/home/index' },
        { exact: true, path: '/isTest', redirect: '/home', component: '@/pages/isTest/index' },
      ],
    }
  ],
});
