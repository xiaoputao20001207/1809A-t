import { getSkillLabel } from '@/services';
import { ISkillLabel } from '@/utils/interface';
import {makeAutoObservable} from 'mobx'

class Skill{
    addPostSkill(res: any) {
        throw new Error('Method not implemented.');
    }
    skillAddItem: any;
    getSkillDetail(arg0: string) {
        throw new Error('Method not implemented.');
    }
    constructor(){
        makeAutoObservable(this);
    }

    // 定义仓库中的属性
    skillLabel:ISkillLabel[]=[];
    // 定义仓库中的方法
    async getSkillLabel(){
        let result = await getSkillLabel();
        if(result.data){
            this.skillLabel = result.data;
        }            
    }    
}

// 抛出一个实例
export default new Skill;