import { IRouteComponentProps } from 'umi'
import React,{FC} from 'react'
import TeacherLayout from './teacherLaout';


const Layout:FC<IRouteComponentProps> = props => {
    // console.log(props.children,'layout');
    if(/\/teacher/.test(props.location.pathname)){
        return <TeacherLayout>{props.children}</TeacherLayout>
    }
    return props.children
}
export default Layout

