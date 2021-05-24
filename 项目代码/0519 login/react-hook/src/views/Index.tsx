import React, { Component } from 'react'
import RouterView from "../router/RouterView"
import {NavLink,RouteComponentProps} from "react-router-dom"
import "../App.scss"
interface RouterProps extends RouteComponentProps {
    routes:Array<RouterItem>
}
interface RouterItem{
    path?:string,
    from?:string,
    to?:string,
    component?:any,
    children?:Array<RouterItem>
}

export default class Index extends Component <RouterProps> {
    render() {
        return (
            <div className='index'>
                <NavLink to='/login'>登录</NavLink>
                <div className="index-view">
                    <RouterView routes={this.props.routes}></RouterView>
                </div>
            </div>
        )
    }
}
