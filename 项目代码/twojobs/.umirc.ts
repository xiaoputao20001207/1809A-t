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
  // dynamicImport: {
  //   loading: '@/Loading',
  // },
  // hash: true,
  // history:{ type : 'hash' },
  // base:'/1809A/guoqiansheng/practice/',
  // publicPath: process.env.NODE_ENV === 'production' ? '/1809A/guoqiansheng/practice/' : '/',
});

