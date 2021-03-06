import { Addpostskill, GetHeaderPhoto, getSkillDetail, Gettoplist, UpPhoto } from '@/service'
import { ISkillAddItem, ISkillLabel, UserItem } from '@/utils/interface'
import {makeAutoObservable} from 'mobx'

class Skill{
    constructor(){
        makeAutoObservable(this)
    }

    //定义属性
    toplist:ISkillLabel [] = []

    //定义用户所有信息
    userList:UserItem = {}

    //定义新增岗位
    skillAddItem:ISkillAddItem = {
        "majorId": "",
        "name": "",
        "stationVersion": 1,
        "userName": "郭老师",
        "stationVersionId": "",
        "majorName": "",
        "stationLevelList": [
            {
                "describes": "请输入岗位描述",
                "salaryList": [
                   5000,
                   20000 
                ],
                "stationLevel": 1,
                "stationTask": "请输入岗位任务",
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

    //定义方法
    async Gettoplist(){
        let result = await Gettoplist()
        if(result.data){
            this.toplist = result.data
        }
    }

    //新增岗位
    async addPostSkill(params:ISkillAddItem){
        let {describes,majorId,name,salaryList,stationTask,stationVersion} = params;
        let stationLevelList = this.skillAddItem.stationLevelList;
        stationLevelList[0] = {...stationLevelList[0],salaryList:salaryList as number[], describes:describes as string, stationTask:stationTask as string }
        this.skillAddItem = {...this.skillAddItem,majorId,name,stationVersion,stationLevelList}
        console.log('skill',this.skillAddItem);
        let result = await Addpostskill(this.skillAddItem)
        console.log(result);
        if(result.data){
            this.skillAddItem = result.data
            return result.data.stationVersionId;
        }
    }

    //获取岗位详情接口
    async getSkillDetail(stationVersionId:string){
        let result = await getSkillDetail(stationVersionId)
        if(result.data){
            this.skillAddItem = result.data
        }
    }

    //获取头像
    async GetHeaderPhoto(){
        let result = await GetHeaderPhoto()
        if(result.code === 200){
            this.userList = result.user
        }
    }

    //上传头像
    async UpPhoto(data:FormData){
        let result = await UpPhoto(data)
        console.log(data,result);
        if(result.code === 200){
            this.userList.avatar = result.imgUrl
        }
    }
}
export default new Skill