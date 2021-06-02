import { addSubmitItem, changeValueItem, delSubmitItem, getStationSkillDetail, initSkill } from '@/service/modules/description'
import {makeAutoObservable} from 'mobx'
import { IStationSkillDetail, ISkillDescriptionListItem, Items } from '@/utils/interface'

function setKeyById(skillList:Items[]){
    skillList.forEach(item => {
        item.key = item.id;
        if(item.children){
            setKeyById(item.children)
        }
    });
}

class Description{
    constructor(){
        makeAutoObservable(this)
    }

    //定义脚部第一层存放的全部内容
    skillList:Items[] = []

    skillDetail:IStationSkillDetail = {} as IStationSkillDetail
    
    //添加第一层
     async initSkill(stationVersionId:string,parentId='0'){
        let result = await initSkill(stationVersionId, parentId)
        if(result.code === 200){
            let skillList = result.data.labelTreeIdList
            setKeyById(skillList)
            this.skillList = skillList
        }
     }

     //添加第二层和每一层
     async addSubmitItem(stationVersionId:string,parentId:string){
        let result = await addSubmitItem(stationVersionId,parentId)
        if(result.code === 200){
            let skillList = result.data.labelTreeIdList
            setKeyById(skillList)
            this.skillList = skillList
        }
     }

     //删除某一项
     async delSubmitItem(skillId:string){
         let result = await delSubmitItem(skillId)
        // console.log(result)
        if(result.code === 200){
            let skillList = result.data
            setKeyById(skillList)
            this.skillList = skillList
        }
     }
      // 获取当前技能详情
    async getStationSkillDetail(skillId:string){
        let result = await getStationSkillDetail(skillId)
        if (result.data){
            this.skillDetail = result.data;
        }
    }

     async changeValueItem(){
        let result = await changeValueItem(this.skillDetail)
        if(result.code===200){
            this.skillDetail = result.data;
        }
     }

     // 本地修改当前技能的label
    modifySKillDetail(params: {[key:string]: string|number}){   
        this.skillDetail = {...this.skillDetail, ...params}
        // console.log('params...', params, this.skillDetail);
    }
} 
  
export default new Description