import { Breadcrumb } from 'antd'
import React,{FC} from 'react'
import {useLocation, Link, useIntl} from 'umi'

interface IBreadItem{
    path:string,
    breadcrumbName:string
}

const BreadCrumbs:React.FC = ()=> {
    const location = useLocation()
    let intl = useIntl()
    //console.log(location.pathname.split('/').filter(item => item).map(item=>{return{path:`/${item}`,breadcrumbName:item}}));
    
    const routes:IBreadItem[] = location.pathname.split('/').filter(item =>item).map(item=>{
        return {
            path:`/${item}`,
            breadcrumbName:item
        }
    })

    function itemRender(route:IBreadItem, params:{}, routes:IBreadItem[], paths:string[]) {
        const last = routes.indexOf(route) === 0;
        
        // {console.log(route.breadcrumbName)}
        return last ? (
          <span>{intl.formatMessage({id:'breadcrumb.'+route.breadcrumbName})}</span>
        ) : (
          <Link to={paths.splice(1).join('/')}>{intl.formatMessage({id:'breadcrumb.'+route.breadcrumbName})}</Link>
        );
      }

    return <Breadcrumb itemRender={itemRender} routes={routes} style={{padding:'0 20px',lineHeight:'80px',marginBottom:'10px',background:'rgba(103, 156, 246, 0.1)'}}/>;
}
export default BreadCrumbs
