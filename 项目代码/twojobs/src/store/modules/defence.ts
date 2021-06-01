import  {makeAutoObservable} from 'mobx'
 import { getDefenceListitem,getclassTeam,savedefence,defenceInfo,delteDefen,defenceHistory,getDefenceDetial}  from '../../service'
 import {defenceTable,classPlanItem,TeamItem,SaveItem} from '@/utils/interface'
 import {getClasssPlanTree} from '@/service/index'
 
class defence{
   constructor(){
     makeAutoObservable(this)
   }
   //详情数据
    detailList = []
    //表格数据
    DefenceList = [] 
    //班级计划
    ClasssPlanTree:classPlanItem ={} as classPlanItem
    class =''
    //小组数据
     classTeam:TeamItem ={} as TeamItem
    //获取 切换答辩列表
    async getDefenceList(defenceMjorId:string,defenceStatus:number,searchTitle:string){
     let result = await getDefenceListitem(defenceMjorId,defenceStatus,searchTitle)
       console.log(result.rows)
      this.DefenceList = result.rows
   }
   //获取班级计划数据
    async getClasssPlanTree(){
       let result = await getClasssPlanTree()
        console.log(result.data[0].children)
        this.ClasssPlanTree = result.data[0]
      
    }
    //获取小组数据
    async getclassTeam(classid:string,classPlanid:string){
      let result = await getclassTeam(classid,classPlanid)
      console.log(result)
      this.classTeam =result.data
    }
    //保存数据
    async savedefence(params:SaveItem){
      let result =  await savedefence(params)
      console.log(result)
    }
    //提交数据
    async defenceInfo(){
      let result = await defenceInfo()
      console.log(result)
    }
    //删除数据
    async delteDefen(id:string){
      let result = await delteDefen(id)
       if(result.code==200){
        let result = await   getDefenceListitem('',0,'')
        alert('删除成功')
        this.DefenceList = result.rows
       }
    }
    //详情页面
    async getDefenceDetial(defenceId:string){
       let result1  = await defenceHistory(defenceId)
        let defenceHistoryId =  result1.data.defenceScoreHistoryId
        let result  = await getDefenceDetial(defenceId,defenceHistoryId)
        console.log(result)
        this.detailList =result.data
    }
   
}
export default new defence()