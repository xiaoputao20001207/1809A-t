import { FC } from "react";
import {Breadcrumb} from "antd"
import React from "react";
import { useLocation } from "react-router";
import { Link } from "umi";

interface Iprops{
    path:string,
    breadcrumbName:string
}

const BreadCrumb:FC=()=>{
    const location = useLocation()
    // console.log(location)
    //对url进行切割
    const routes = location.pathname.split('/').filter(item=>item).map(item=>{
        return {
            path:`/${item}`,
            breadcrumbName:item
        }
    })
    // console.log(routes)

    function itemRender(route:Iprops , params:{}, routes:Iprops [], paths:string []) {
        const last = routes.indexOf(route) === 0;
        return last ? (
          <span>{route.breadcrumbName}</span>
        ) : (
          <Link to={paths.splice(1).join('/')}>{route.breadcrumbName}</Link>
        );
      }
    return <Breadcrumb itemRender={itemRender} routes={routes} />
}
export default BreadCrumb