import {Switch,Redirect,Route} from 'react-router-dom'
import React, {FC} from 'react'
import {View} from '../type'

interface P{
    routes:Array<View>
}

const Props:FC<P>=({routes})=>{
    if(!routes){
        return null
    }
    let routerList = routes.filter(item => item.component)
    let redirects = routes.filter(item => !item.component)

    return<Switch>
        {
            routerList.map((item,index)=>{
                return <Route path={item.path} key={index} render={(routerProps)=>{
                    if(item.children){
                        return <item.component {...routerProps} routes={item.children}/>
                    }
                    return <item.component {...routerProps} />
                }}/>
            })
        }
        {
            redirects.map((item,index)=>{
                return <Redirect key={index} from={item.from} to={(item.to as string)}/>
            })
        }
    </Switch>
}
export default Props