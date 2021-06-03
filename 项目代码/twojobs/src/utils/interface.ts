//头部的接口
export interface ISkillLabel {
  id: string;
  name: string;
  parentId: string;
  children?: any;
}

// 类型接口
// export interface ISkilltype{
//     id:string;
//     name:string;
//     parentId:string;
// }

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


export interface questionDetailList {
    isAsc: string
    pageNum: number
    pageSize: number
    type: string
    questionTitle?: string
    quality?: string|number
    authentication?: string|number
    searchVal?: string
  }
  
  export interface questionAnserItem {
    answerId: string;
    proId?: any;
    taskId?: any;
    stepId?: any;
    qUserId: string;
    qUserName: string;
    qUserLevel?: any;
    createTime: string;
    taskName?: any;
    rUserId?: any;
    rUserName?: any;
    rUserLevel?: any;
    questionTitle: string;
    questionContent: string;
    answerCount: number;
    favorCount?: any;
    unSupportCount: number;
    supportCount: number;
    type?: any;
    typeNum: string;
    replyTime: string;
    labels: any[];
    avatar?: any;
    replyContext?: any;
    shield: number;
    quality: number;
    replyId?: any;
    className?: any;
    authentication: number;
    collection: number;
    supportUp?: any;
    unsupportDown?: any;
    supportUpB: boolean;
    unsupportDownB: boolean;
  }
  
  export interface IinterviewManageTableItem {
    interviewId: string;
    stationId?: any;
    companyName: string;
    interviewTime: string;
    intervierManagement: string;
    majorId: string;
    commitPeople: string;
    status: number;
    issoundrecord: number;
    stationName: string;
    majorName: string;
    commitName: string;
    duration?: any;
    site?: any;
    record?: any;
    shield: number;
    askAndanswerList?: any;
    soundrecordList?: any;
  }

  export interface IinterviewManageQuery {
    pageNum: number;
    pageSize: number;
    searchTitle?: string;
  }
  
  export interface interviewList {
    interviewId: string;
    stationId?: any;
    companyName: string;
    interviewTime: string;
    intervierManagement: string;
    majorId: string;
    commitPeople: string;
    status: number;
    issoundrecord: number;
    stationName: string;
    majorName: string;
    commitName: string;
    duration?: any;
    site?: any;
    record?: any;
    shield: number;
    askAndanswerList?: any;
    soundrecordList?: any;
  }
  
  export interface DefenceList {
    defenceId: string;
    degenceName: string;
    defenceClassId?: any;
    defencePlanId?: any;
    defenceCreateTime: string;
    defenceEndTime: string;
    defenceStatus: number;
    defenceMajorId?: any;
    defenceAdress?: any;
    className: string;
    planName: string;
    majorName: string;
    defenceAuthor: string;
    defenceScore?: any;
    defenceHistoryId?: any;
    taskProgressId?: any;
    scoreId?: any;
    defenceRater?: any;
    raterName?: any;
    defenceAuthorName: string;
    avaScore?: any;
    projectName?: any;
    groupName?: any;
    taskName?: any;
    defenceGroupInfoList?: any;
    defenceScoreList?: any;
  }
  
  export interface DefeneState {
    pageNum: number,
    pageSize: number | string,
    searchTitle: string,
    defenceMjorId: string,
    defenceStatus: string,
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
//添加项目
export interface Addpro{
  description: string,
  id: string,
  knowledge: [],
  majorId: string,
  majorStationList:[""],
  name: string,
  pictureUrl: string,
  showUrl: string,
  stationId: string,
  subjectTime: number,
  sxType: string,
  trade: [],
  tradeId: string,
  version: number,
  versionId: string
}
//添加
export interface Imohu{
  specialtyTag?:string, 
  industryTag?:string,
   isAsc: string,
  pageNum: number,
  pageSize: number,
  sxtype?: number|string,
  status?: number|string,
  proName?: string,
  newProjectList: number,
  versionId?: string,
}
//行业表格
export interface ISkilldairnObj {
  id: string;
  specialtyTag:number;
  status: number;
  searchTitle:string;
  isMyInfo:boolean;
  curDairn:number;
  industryTag:number;
  taskCount:number;
  sxtype:number;
  proName:string,
  newProjectList:number;
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


//添加项目
// export interface Addpro {
//   name: string;
//   version:number;
//   description: string;
//   majorStationChineseList:  string[];
//   tradeName: string|number;
//   type: sxtype[];
//   subjectTime: number,
//   pictureUrl:string
// }
interface sxtype{
  sxType:string,
  sxType1:string
}
  
