import { getSkillLabel } from '@/services';
import { ISkillAddItem, ISkillLabel } from '@/utils/interface';
import {makeAutoObservable} from 'mobx'

class Skill{
    
    constructor(){
        makeAutoObservable(this);
    }

    // 定义仓库中的属性
    skillLabel:ISkillLabel[]=[];
    // 定义新增岗位参数
    skillAddItem: ISkillAddItem = {
        "majorId": "",
        "name": "",
        "stationVersion": 1,
        "userName": "郭老师",
        "stationVersionId": "",
        "majorName": "",
        "stationLevelList": [
            {
                "describes": "123",
                "salaryList": [
                   5000,
                   20000
                ],
                "stationLevel": 1,
                "stationTask": "456",
                "level_name": "初级",
                "disabled": false
            },
            {
                "describes": "",
                "salaryList": [
                    12000,
                    20000
                ],
                "stationLevel": 2,
                "level_name": "中级",
                "stationTask": "",
                "disabled": false
            },
            {
                "describes": "",
                "salaryList": [
                    20000,
                    40000
                ],
                "stationLevel": 3,
                "stationTask": "",
                "level_name": "高级",
                "disabled": false
            }
        ]
    }

    // 定义仓库中的方法
    async getSkillLabel(){
        let result = await getSkillLabel();
        if(result.data){
            this.skillLabel = result.data;
        }            
    }   
    
    // 新增岗位
    async addPostSkill(params:ISkillAddItem){
        let {describes,majorId,name,salaryList,stationTask,stationVersion}=params;
        let stationLevelList = this.skillAddItem.stationLevelList;
        stationLevelList[0]={...stationLevelList[0],salaryList:salaryList as number[],describes:describes as string,stationTask:stationTask as string}
        this.skillAddItem = {...this.skillAddItem,majorId,name,stationVersion,stationLevelList}
        // console.log('skillAddItem-----',this.skillAddItem);
        let result = await this.addPostSkill(this.skillAddItem)
        // debugger;
        if(result.data){
            this.skillAddItem = result.data;
            return result.data.stationVersionId;
        }
    }

    // 获取岗位详情想
    async getSkillDetail(stationVersionId:string){
        let result = await this.getSkillDetail(stationVersionId)
        if(result.data){
            this.skillAddItem = result.data;
        }

    }
}

// 抛出一个实例
export default new Skill;