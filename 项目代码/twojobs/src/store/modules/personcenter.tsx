import { changeOwnPage, changePassword, closePage, exit, getPersonMessage, } from "@/service/modules/personcenter"
import {PersoncenterList} from '@/utils/personcenter'
import {makeAutoObservable} from 'mobx'

class Personcenter{
    constructor(){
        makeAutoObservable(this)
    }

    //个人中心详情
    personMessage:PersoncenterList = {} as PersoncenterList

    async getPersonMessage(){
       let result = await getPersonMessage()
       this.personMessage = result.data  
    }

    //退出 
    async exit(){
       await exit()
    }

    //修改密码
    async changePassword(oldPassword:string,newPassword:string){
        let result = await changePassword(oldPassword,newPassword)
        return result
    }

    //修改基本资料
    async changeOwnPage(email:string,phonenumber:string,userName:string){
      return await changeOwnPage({...this.personMessage,email,phonenumber,userName})
    }

    //关闭
    async close(){
        await closePage()
    }
}
export default new Personcenter