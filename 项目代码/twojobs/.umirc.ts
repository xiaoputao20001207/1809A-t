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
    // 按需加载
    // dynamicImport: {
    //     loading: '@/Loading',
    // },
    // hash:true,
    // history:{type:'hash'},
    // // 路由前缀
    // base:'/1809A/gongchengting/practice/',
    // // 资源输出路径
    // publicPath: process.env.NODE_ENV === 'production' ? '/1809A/gongchengting/practice/' : '/',
    

});

