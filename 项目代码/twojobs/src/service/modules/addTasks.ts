import {request} from "umi"
interface IaddTaskItem{
    assessmentStandard: string
    proVersionId: string
    proid: string
    steptCount:string
    subjectTime: number
    taskName: string
}
export let AddTaskItem =(data:IaddTaskItem)=>{
  return  request('/sxpt/task',{
      method:"POST",
      data
  })
}