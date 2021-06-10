import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  antd: {
    compact: true,
  },
  //配置国际化
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
  },

  //路由按需加载
  dynamicImport: {
    loading: '@/Loading',
  },

  // 资源输出路径
  publicPath: process.env.NODE_ENV === 'production' ? '/1809A/wuxiaotong/jobhub/' : '/',

  //路由前缀
  base:'/1809A/wuxiaotong/jobhub/',

  // //修改为hash
  hash: true,
  
  // //修改路由类型
  history: { type: 'hash' },

  //埋点
  analytics: {
    baidu: 'e88f75e84335710de29f356059cdc5e0',
  },
});

