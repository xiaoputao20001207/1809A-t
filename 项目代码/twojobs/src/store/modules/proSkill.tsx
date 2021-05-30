import { Addproject, Gettoplist1 } from '@/service';
import { Addpro, ISkilldairn } from '@/utils/interface';
import { makeAutoObservable } from 'mobx';

class proSkill {
  constructor() {
    makeAutoObservable(this);
  }
  //定义类型
  toplist1: ISkilldairn[] = [];
  // topItem:ISkilldairn[] = [];
  proAddItem: Addpro = {
    name: '',
    version: 1,
    trade: '',
    majorStationList: '',
    sxType: '',
    subjectTime: 1,
    note: '',
    pictureUrl: '',
    showUrl: '',
    versionId: '',
  };

  //定义方法
  async Gettoplist1() {
    let result = await Gettoplist1();
    if (result.data) {
      this.toplist1 = result.data;
    }
  }
  // async Gettoplist2(){
  //     let res = await Gettoplist2();
  //     if(res){
  //         this.topItem=res.data;
  //         console.log(res.data);
  //     }
  // }

  //添加项目
  async addProject(params: Addpro) {
    let {
      name,
      version,
      trade,
      majorStationList,
      sxType,
      subjectTime,
      note,
      pictureUrl,
      showUrl,
    } = params;
    //    let proJectList=this.proAddItem.proJectList;

    let result = await Addproject(this.proAddItem);
    if (result) {
      this.proAddItem = result.data;
      console.log(result.data);
      
      return result.data.stationVersionId;
    }
  }
}

export default new proSkill();
