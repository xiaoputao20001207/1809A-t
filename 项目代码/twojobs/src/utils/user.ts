import Cookie from "js-cookie"
const key='authorization'
//设置登录态
export function setCookie(value:string){
    Cookie.set(key,value,{expires:1})
}
//删除登录态
export function removeCookie(){
    Cookie.remove(key)
}
//获取登录态
export function getCookie(){
    return Cookie.get(key)
}