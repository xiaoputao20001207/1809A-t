import { getCaptureImage, goLogin } from "@/service/modules/login"
import { LoginParams } from "@/utils/interface"
import { setCookie } from "@/utils/user"
import { makeAutoObservable } from "mobx"
interface captchItem{
    img:string,
    uuid:string
}
class User{
    constructor(){
        makeAutoObservable(this)
    }
    captchImage={} as captchItem
    authorization:string=''
    //验证码
    async getCaptureImage(){
        let result = await getCaptureImage()
        if(result.code==200){
            let {img,uuid} = result
            this.captchImage= {img,uuid}
        }
    }

    //登录
    async login(data:LoginParams){
        console.log(data)
        let result = await goLogin({...data,uuid:this.captchImage.uuid,})
        if(result.code==200){
            let authorization = this.authorization=`Bearer ${result.token}`
            setCookie(authorization)
        }
    }

}
export default new User