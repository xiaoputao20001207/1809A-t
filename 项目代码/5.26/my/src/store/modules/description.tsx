import { initSkill } from '@/service/modules/description'
import { IStationSkillDetail } from '@/utils/interface'
import {makeAutoObservable} from 'mobx'

class Description{
    constructor(){
        makeAutoObservable(this)
    }

    //定义脚部第一层存放的全部内容
     skillDetail:IStationSkillDetail = {} as IStationSkillDetail

     async initSkill(stationVersionId:string,parentId='0' as string){
        let result = await initSkill(stationVersionId, parentId)
        if(result.data){
            this.skillDetail = result.data.labelTreeIdList
            //return result.data.labelTreeIdList
        }
     }
}
export default new Description