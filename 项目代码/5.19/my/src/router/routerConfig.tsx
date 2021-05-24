//引入一级路由
import Login from '../view/Login'

let routes = [
    {
        from:'/',
        to:'/login'
    },
    {
        path:"/login",
        component:Login
    }
]
export default routes