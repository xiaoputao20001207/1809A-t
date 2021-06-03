import {  Gettoplist1 ,GetListDairnItem, Gettoplist2, DelItem} from '@/service';
import { Addpro, Imohu, ISkilldairn, ISkilldairnObj } from '@/utils/interface';
import { makeAutoObservable } from 'mobx';

class proSkill {
  constructor() {
    makeAutoObservable(this);
  }
  //表格数据
  setdataSource:ISkilldairnObj[]=[]
  //定义类型
  toplist1: ISkilldairn[] = [];
  toplist2:ISkilldairn[]=[]
  // topItem:ISkilldairn[] = [];
  proAddItem:Addpro[]=[]

  //定义方法
  async Gettoplist1() {
    let result = await Gettoplist1();
    if (result.data) {
      this.toplist1 = result.data;
    }
  }
  async Gettoplist2() {
    let result = await Gettoplist2();
    if (result.data) {
      this.toplist2 = result.data;
    }
  }
  //删除
  async DelItem (versionId:string){
    let result=await DelItem(versionId);
    if(result){
      return result;
    }
  }
//表格数据
   async GetListDairnItem(queryParams:Imohu){
     let result=await GetListDairnItem(queryParams);
     
     if(result){
       this.setdataSource=result.rows ;
       console.log(result);
     }
   }
}
export default new proSkill();
