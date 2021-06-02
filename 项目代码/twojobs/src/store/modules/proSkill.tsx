import { Addproject, Gettoplist1 ,GetListDairnItem} from '@/service';
import { Addpro, ISkilldairn, ISkilldairnObj } from '@/utils/interface';
import { makeAutoObservable } from 'mobx';

class proSkill {
  constructor() {
    makeAutoObservable(this);
  }
  //表格数据
  setdataSource:ISkilldairnObj[]=[]
  //定义类型
  toplist1: ISkilldairn[] = [];
  // topItem:ISkilldairn[] = [];
  proAddItem = {
  //  "name": '',
  //       "version": '',
  //       "description": '',
  //       "majorStationChineseList":[],
  //       "tradeName": '',
  //       "subjectTime": '',
  //       "pictureUrl":'',
  //       "type": [{
  //           "sxType1": "1",
  //           "sxType": "生产实训"
  //       }, {
  //           "sxType1": "2",
  //           "sxType": "集体实训"
  //       }, {
  //           "sxType1": "3",
  //           "sxType": "专业群实训"
  //       }]
  };

  //定义方法
  async Gettoplist1() {
    let result = await Gettoplist1();
    if (result.data) {
      this.toplist1 = result.data;
    }
  }
//表格数据
   async GetListDairnItem(queryParams:ISkilldairnObj){
     let result=await GetListDairnItem(queryParams);
     if(result){
       this.setdataSource=result.rows;
     }
   }
//添加项目
async addProject(params: any) {
  //结构
  // let { name, version, description, majorStationChineseList, tradeName, subjectTime, sxType } = params;
  // // 获取类型
  // // let type = this.addIndustryItem.type;
  // //深拷贝传过来的数值
  // this.proAddItem = { ...this.proAddItem, name, version, description, majorStationChineseList, tradeName, subjectTime };
  // // 调用添加链接
  // let result = await Addproject(this.proAddItem);
  // //容错处理
  // if (result.data) {
  //     this.proAddItem = result.data;
  //     console.log(result)
  //     return result.data.versionId;
  // }
  }
}
export default new proSkill();
