import Index from "../views/Index"

import Login from "../views/Login"
const routes = [
    {
        from:'/',
        to:'/login'
    },
    {
        path:'/login',
        component:Login
    }
]
export default routes