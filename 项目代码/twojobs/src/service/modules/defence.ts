import { SaveItem } from '@/utils/interface'
import { request} from 'umi' 
 //提交数据
 export let defenceInfo = ()=>request('/sxpt/defenceInfo',{
     method:"post",
     data:{'defenceGroupInfoList': []}
 })
 
 //获取表格答辩数据
export let getDefenceListitem = (defenceMjorId:string,defenceStatus:number,searchTitle:string)=>
    request('/sxpt/defence/getDefenceList',{params:{defenceMjorId,defenceStatus,searchTitle,pageNum: 1
    ,pageSize: 10}})
//保存数据
export let  savedefence = (params:SaveItem)=> request('/sxpt/defence',{
     method:"post",
     data:params
})
//获取班级计划数据

 export let getClasssPlanTree = ()=>request('/sxpt/defence/getClasssPlanTree')
 //获取组的数据
 export let getclassTeam =
 (classid:string,classPlanid:string)=>request('/sxpt/progress/selectClassPlanInit',{params:{classid, classPlanid}})

 //删除
 export let delteDefen =(id:string)=>request(`/sxpt/defence/deleteDefence/${id}`,{
     method:"DELETE"
 })
 //去答辩
 export let defenceHistory =(defenceId:any)=>request('/sxpt/defenceHistory', 
   { method:'post' ,data:{defenceId}})
 //详情数据
 export let getDefenceDetial=( defenceId:string,defenceHistoryId:string)=>
  request('/sxpt/defence/getDefenceDetial',{params:{defenceId,defenceHistoryId }})