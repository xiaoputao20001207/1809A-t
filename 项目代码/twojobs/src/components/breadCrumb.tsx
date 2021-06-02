import { Breadcrumb } from 'antd'
import React,{FC} from 'react'
import {useLocation, Link} from 'umi'

interface IBreadItem{
    path:string,
    breadcrumbName:string
}

const BreadCrumbs:React.FC = ()=> {
    const location = useLocation()
    //console.log(location);
    console.log(location.pathname.split('/').filter(item => item).map(item=>{return{path:`/${item}`,breadcrumbName:item}}));
    
    const routes:IBreadItem[] = location.pathname.split('/').filter(item =>item).map(item=>{
        return {
            path:`/${item}`,
            breadcrumbName:item
        }
    })
    function itemRender(route:IBreadItem, params:{}, routes:IBreadItem[], paths:string[]) {
        const last = routes.indexOf(route) === 0;
        return last ? (
          <span>{route.breadcrumbName}</span>
        ) : (
          <Link to={paths.splice(1).join('/')}>{route.breadcrumbName}</Link>
        );
      }

    return <Breadcrumb itemRender={itemRender} routes={routes} style={{padding:'0 20px',lineHeight:'80px',marginBottom:'10px',background:'rgba(103, 156, 246, 0.1)'}}/>;
}
export default BreadCrumbs