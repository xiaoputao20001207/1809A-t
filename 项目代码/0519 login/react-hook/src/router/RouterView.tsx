import {Switch,Route,Redirect} from "react-router-dom"
import {FC} from "react"
interface RouterProps{
    routes:Array<RouterItem>
}
interface RouterItem{
    path?:string,
    from?:string,
    to?:string,
    component?:any,
    children?:Array<RouterItem>
}

const RouterView :FC<RouterProps> = ({routes})=>{
    if(!routes){
        return null
    }
    const routelist = routes.filter(item=>item.component)
    const redirects = routes.filter(item=>!item.component)
    return (
        <Switch>
            {
                routelist.map((item,index)=>{
                    return <Route key={index} path={item.path} render={routerProps=>{
                        if(item.children){
                            return <item.component {...routerProps} routes={item.children}/>
                        }
                        return <item.component {...routerProps} />
                    }}></Route>
                })
            }
            {
                redirects.map((item,index)=>{
                    return <Redirect key={index} from={item.from} to={item.to as string}></Redirect>
                })
            }
        </Switch>
    )
}
export default RouterView