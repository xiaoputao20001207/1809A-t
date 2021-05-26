import { getSkillLabel, getStationVersionList ,getSkillDetail,addPostSkill} from "@/services"
import { ISkillAddItem, ISkillLabel, ISkillListQuery, IStationVersionList } from "@/utils/interface"
import {makeAutoObservable} from "mobx"

class Skill {
    constructor(){
        makeAutoObservable(this);
    }
// 定义仓库中的属性
    selectStationLabel:ISkillLabel[]=[];//专业数据
    dataSource:IStationVersionList[] = [] //表格数据
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
//定义方法
    //获取专业数据
    async getSkillLabel(){
        let result = await getSkillLabel()
        if(result.data){
            this.selectStationLabel = result.data
        }
    }

//获取表格数据
    async getStationVersionList(params:ISkillListQuery){
        let result = await getStationVersionList(params)
        if(result.code==200){
            this.dataSource = result.rows
        }
    }
    /*
        majorId: "P0003"
        majorName: ""
        name: "颠三倒四"
        stationVersion: 1
        stationLevelList: :[]
        stationVersionId: ""
        userName: "郭老师"
    */
   //新增岗位
    async addpostSkill(params:ISkillAddItem){
        // 专业id 版本号 描述 薪资范围  岗位任务 岗位名称
        let {majorId,stationVersion,describes,salaryList,stationTask,name} = params
        let stationLevelList = this.skillAddItem.stationLevelList//获取  薪酬 岗位描述 岗位任务信息
        // 赋值成提完整数据 包含所保存的填写所有信息
        stationLevelList[0] = {...stationLevelList[0],salaryList:salaryList as number[],describes:describes as string,stationTask:stationTask as string}
        //
        this.skillAddItem = {...this.skillAddItem,majorId,name,stationVersion,stationLevelList}
        console.log('skillAddItem', this.skillAddItem);
        // debugger
        let result = await this.addpostSkill(this.skillAddItem)
        console.log(result)
        return {stationVersionId:'1'}
        // if(result.data){
            // this.skillAddItem = result.data
            // return result.data.stationVersionId
        // }
    }


      // 获取岗位详情
    async getSkillDetail(stationVersionId: string){
        let result = await getSkillDetail(stationVersionId);
        if (result.data){
            this.skillAddItem = result.data;
        }
    }
}

export default new Skill