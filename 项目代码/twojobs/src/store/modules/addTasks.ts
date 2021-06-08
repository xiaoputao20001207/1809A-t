import { AddTaskItem } from "@/service"
import { makeAutoObservable } from 'mobx'
interface ITaskList {
    assessmentStandard: string
    createBy: null
    createTime: null
    id: string
    orderNum: string
    params: {}
    proVersionId: string
    proid: string
    remark: null
    searchValue: null
    stage: string
    stageNum: null
    steptCount: number
    subjectTime: string
    taskDes: null
    taskName: string
    type: null
    updateBy: null
    updateTime: null
}
interface IaddTaskItem {
    assessmentStandard: string
    proVersionId: string
    proid: string
    steptCount: string
    subjectTime: number
    taskName: string
}
class addTasks {
    constructor() {
        makeAutoObservable(this)
    }
    TaskList: ITaskList[] = []

    async AddTaskItem(data: IaddTaskItem) {
        let result = await AddTaskItem(data);
        if (result) {
            alert(result.msg)
            this.TaskList.push(result.data)
        }
    }
}
export default new addTasks()