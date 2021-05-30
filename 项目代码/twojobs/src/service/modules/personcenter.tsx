import {request} from 'umi'

//个人主页获取信息
export const getPersonMessage = ()=>{
    return request('/system/user/profile')
}

//退出
export const exit = ()=>{
    return request('/logout')
}

//修改密码
export const changePassword = (oldPassword:string,newPassword:string)=>{
    return request('/system/user/profile/updatePwd',{
        method:'PUT',
        params:{
            oldPassword,newPassword
        }
    })
}

//修改个人资料
export const changeOwnPage = ()=>{
    return request('/system/user/profile',{
        method:'PUT'
    })
}