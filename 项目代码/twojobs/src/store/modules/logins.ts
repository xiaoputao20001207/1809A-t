import { loginPage, Verificationcode } from "@/service/modules/logins"

class Logins{
    //验证码接口
    async Verificationcode(){
       let result = await Verificationcode()
        return result
    }

    //登录接口
    async loginPage(value:any){
      let result = await loginPage(value)
        return result
    }
}
export default new Logins