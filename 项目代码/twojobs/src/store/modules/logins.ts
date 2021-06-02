import { loginPage, Verificationcode } from "@/service/modules/logins"
import { setCookie } from "@/utils/auth";
import { LoginPerson } from "@/utils/personcenter";
import {makeAutoObservable} from 'mobx'

class Logins{
    constructor(){
      makeAutoObservable(this)
    }
    //定义数据
    loginList:LoginPerson= {} as LoginPerson
    authorization:string =''

    //验证码接口
    async Verificationcode(){
      let result = await Verificationcode()
      if(result.code===200){
          this.loginList = result
      }
    }

    //登录接口
    async loginPage(value:LoginPerson){
      let result = await loginPage({...value,uuid:this.loginList.uuid})
        if(result.code===200){
          let authorization = this.authorization = `Bearer ${result.token}`
          setCookie(authorization)
          return authorization
        }
    }
}
export default new Logins