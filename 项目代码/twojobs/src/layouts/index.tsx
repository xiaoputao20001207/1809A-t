import { IRouteComponentProps } from 'umi'
import React,{FC} from 'react'
import TeacherLayout from './teacherLaout';


const Layout:FC<IRouteComponentProps> = props => {
    //监听窗口关闭
    // // $(window).on('beforeunload',function(){return'Your own message goes here...';});
    // console.log(window)
    // window.onbeforeunload = onbeforeunload_handler;       
    // console.log(window)
    // window.onbeforeunload = onbeforeunload_handler;       
    // // $(window).on('beforeunload',function(){return'Your own message goes here...';});
    // function onbeforeunload_handler(){   
    //     var warning="确认关闭www.someabcd.com?";       
    //     //你的业务操作。。。。      
    //     return warning;   
    // }     
    if(/\/teacher/.test(props.location.pathname)){
        return <TeacherLayout>{props.children}</TeacherLayout>
    }
    return props.children
}
export default Layout

