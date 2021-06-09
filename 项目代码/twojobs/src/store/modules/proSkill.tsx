import {  Gettoplist1 ,GetListDairnItem, Gettoplist2, DelItem, EditorDetail} from '@/service';
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
  //详情
  detailList:Addpro={
    answerCount: 0,
    authorName: null,
    description: "",
    discussCount: 0,
    favorCount: null,
    favorites: null,
    favoritesInd: false,
    id: "",
    knowledge: [],
    knowledgeId: null,
    knowledgeName: null,
    labelName: "",
    majorId: "",
    majorName: "",
    majorStationChineseList: [""],
    majorStationList: [""],
    name: "",
    pictureUrl: "",
    showUrl: "",
    stationId: "",
    stationIds: "",
    stationName: "",
    stuCount: null,
    subjectTime: 5,
    sxType: "2",
    trade: [""],
    tradeId: "",
    tradeName: "",
    version: "",
    versionId: "",
  }
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
  //详情
  async EditorDetail(versionId:string){
     let result =await EditorDetail(versionId);
     if(result){
         this.detailList=result.data
     }
     console.log(this.detailList);
     
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
