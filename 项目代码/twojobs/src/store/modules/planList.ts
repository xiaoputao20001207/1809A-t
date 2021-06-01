import { GetplanList } from '@/service/modules/planList';
import { IplanList, IplanListItem } from '@/utils/interface';
import { makeAutoObservable } from 'mobx';


class PlanList {
    constructor() {
        makeAutoObservable(this)
    }
    //定义属性
    planListItem: IplanListItem[] = []
    //定义方法
    async GetplanList(queryParams: string) {
        let result = await GetplanList(queryParams);
        console.log(result);
        if (result.code === 200) {
            this.planListItem = result.rows
            return result.rows.classid;
        }
    }
}

export default new PlanList