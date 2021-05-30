import { getAll } from "@/service/modules/need"
import {NeedList} from '@/utils/need'
class Need{

    needTabList:NeedList [] = []

    //点击查看全部
    async getAll(){
        await getAll()
        // if(result.code === 200){
        //     this.needTabList = result.row
        // }
    }
}
export default new Need