import { changePassword, exit, getPersonMessage, } from "@/service/modules/personcenter"
import {PersoncenterList} from '@/utils/personcenter'
class Personcenter{

    //个人中心详情
    personMessage:PersoncenterList = {} as PersoncenterList

    async getPersonMessage(){
       let result = await getPersonMessage()
       this.personMessage = result.data  
       console.log(this.personMessage);
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
        console.log('还没写呢');
    }

}
export default new Personcenter