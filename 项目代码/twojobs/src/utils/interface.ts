//头部的接口
export interface ISkillLabel {
  id: string;
  name: string;
  parentId: string;
  children?: any;
}

//头部点击接口
export interface ISkillListQuery{
    isAsc:string,
    pageNum:number,
    pageSize:number,
    searchTitle?:string,
    majorId?:string,
    status?:number,
    isMyInfo:boolean
}
//计划管理
export interface IplanList{
  classId: string,
searchName: string,
ifFinished: number,
pageNum: number,
pageSize: number
}
//
export interface IplanListItem {
  classId?: any;
  className: string;
  id: string;
  classid: string;
  planname: string;
  begintime: string;
  endtime: string;
  states: string;
  progress: string;
  countStus: number;
  countUncompleted: number;
  description: string;
  countCompleted?: any;
  surplusTime: string;
}
export interface IStationVersionList{
  stationId: string;
  stationVersionId: string;
  name: string;
  majorId?: string;
  userId: string;
  userName: string;
  status: string;
  skillNum?: string;
  majorName?: string;
  stationVersion: number;
  stationLevelList?: any;
  labelTreeList?: any;
  skillList?: any;
  createTime: string;
}

//添加页面接口
export interface ISkillAddItem {
  majorId: string;
  name: string;
  stationVersion: number;
  userName: string;
  stationVersionId: string;
  majorName: string;
  stationLevelList: StationLevelList[];
  describes?: string;
  salaryList?: number[];
  stationTask?: string;
}

interface StationLevelList {
  describes: string;
  salaryList: number[];
  stationLevel: number;
  stationTask: string;
  level_name: string;
  disabled: boolean;
}

//脚部
export interface IStationSkillDetail {
  searchValue?: any;
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  remark?: any;
  params: Params;
  id: string;
  skillName: string;
  stationId: string;
  stationVersionId: string;
  parentId: string;
  levelType: number;
  masterRequired: number;
  abilityStandard?: any;
  score?: any;
  scoreId?: any;
}


interface Params {
  [key:string]:any
}


export interface ISkillDescriptionListItem {
  key: string;
  id: string;
  label: string;
  parentId: string;
  children?: any;
  content?: any;
  lable:string
}

//脚部点击添加岗位每一层
export interface Items{
  children:any;
  content: any;
  id: string;
  label: string;
  parentId: string;
  key:string
}

//行业 
export interface ISkilldairn {
  id:string;
  value: string;
  label: string;
  parentId: string;
  children?: any;
  content?: any;
  proId?: any;
}
//添加

//行业表格
export interface ISkilldairnObj {
  id: string;
  specialtyTag:string;
  status: string;
  searchTitle:string;
  isMyInfo:boolean;
  curDairn:number;
  industryTag:number;
  taskCount:number;
  sxtype:string;
  proName:string,
  newProjectList:string;
}



//添加项目
export interface Addpro {
  name: string;
  version: string|number;
  description: string;
  majorStationChineseList:  string[];
  tradeName: string|number;
  type: sxtype[];
  subjectTime: string|number,
  pictureUrl:string
}
interface sxtype{
  sxType:string,
  sxType1:string
}