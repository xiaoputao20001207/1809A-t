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
});

