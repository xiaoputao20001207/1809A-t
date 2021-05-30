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
export interface Addpro{
  trade:string;
  name:string;
  version:number;
  majorStationList:string;
  sxType:string;
  subjectTime:number;
  note:string;
  pictureUrl:string;
  showUrl:string;
  versionId:string
}
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

interface RootObject {
  searchValue?: any;
  createBy?: any;
  createTime?: string;
  updateBy?: any;
  updateTime?: string;
  remark?: any;
  params: Params;
  id: string;
  authorid: string;
  proname: string;
  prodescription: string;
  sxtype: string;
  stucount?: any;
  score?: any;
  publishtime?: any;
  status: string;
  subjecttime?: string;
  favorcount?: any;
  pictureUrl?: any;
  richText?: any;
  newVersionId?: any;
  taskCount: number;
  trade: string;
  major: string;
  versionId: string;
  versionNum: string;
  showUrl: string;
  version: string;
}

interface Params {
}