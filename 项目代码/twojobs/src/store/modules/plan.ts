import {makeAutoObservable} from 'mobx'

class plan {
    constructor(parameters){
        makeAutoObservable(this)
    }
    palnList:IPlanListItem[]=[]
    async getPlanList(){
        const result=await getPlanList(params)
        if(res.rows){
            palnList=res.rows
        }
    }
}
export default new plan