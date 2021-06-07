import { getselectClassPlan, getViewList, getViewSortList } from '@/service/modules/view'
import { IPlanDetail, ISelectClassPlan, Iview, IViewSortList } from '@/utils/interface'
import {makeAutoObservable} from 'mobx'
class view {
    constructor(){
        makeAutoObservable(this)
    }
    viewList:IPlanDetail={} as IPlanDetail
    async getViewList(params:Iview){
        const result= await getViewList(params)
        if(result.data){
            this.viewList=result.data
        }
        console.log(this.viewList)
    }
    viewSortList:IViewSortList[]=[]
    async getViewSortList(params:Iview){
        const result=await getViewSortList(params)
        // if(result.data){
        //     this.viewSortList=result.data
        // }
        console.log('viewSortList+++++++++',result)
        this.viewSortList=result.data.map((item:IViewSortList)=>{
            return {...item,studentUrl:'http://111.203.59.61:8060'+item.studentUrl}
        })
    }
    selectClassPlan:ISelectClassPlan[]=[]
    async getselectClassPlan(){
        const result=await getselectClassPlan()
        if(result.data){
            this.selectClassPlan=result.data
        }
    }
    
}
export default new view