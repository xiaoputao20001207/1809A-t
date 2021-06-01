import { getPlanList } from '@/service'
import { IPlanListItem, IPlanStatus } from '@/utils/interface'
import {makeAutoObservable} from 'mobx'

class plan {
    constructor(){
        makeAutoObservable(this)
    }
    palnList:IPlanListItem[]=[]
    async getPlanList(params:IPlanStatus){
        const result=await getPlanList(params)
        console.log(result)
        if(result.rows){
            this.palnList=result.rows
        }
    }
}
export default new plan
