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
export interface IPlanListItem {
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

export interface IPlanStatus {
  classId: string;
  searchName: string;
  ifFinished?: number;
  pageNum?: number;
  pageSize?: number;
}
export interface IPlanDetail {
  className: string;
  list: List[];
  stuRank?: any;
  id: string;
  classid: string;
  planname: string;
  begintime: string;
  endtime: string;
  states: string;
  progress: string;
  countStus: number;
  countUncompleted: number;
  countCompleted: string;
  description: string;
  beginTime?: any;
  endTime?: any;
}

interface List {
  id: string;
  classid?: any;
  groupname: string;
  members: number;
  finished: number;
  unfinished: number;
  stuList: StuList[];
  groupProgress: number;
  myProject: MyProject[];
}

interface MyProject {
  proid: string;
  proname: string;
  length: string;
  taskList: TaskList[];
  sTaskList?: any;
  taskCompletedCount?: any;
  taskCompletedpProgress?: any;
  beginTime: string;
  endTime: string;
}

interface TaskList {
  id: string;
  proid: string;
  taskName: string;
  taskDes?: any;
  stage: string;
  orderNum: string;
  stageNum?: any;
  subjectTime: string;
  type?: any;
}

export interface StuList {
  groupid: string;
  groupname: string;
  members: string;
  userid: string;
  username: string;
  endtime?: any;
  sProList: SProList[];
  proList?: any;
  taskCompletedCount: number;
  taskCompletedpProgress: number;
  studentUrl?: any;
  num: number;
}

interface SProList {
  proid: string;
  proname: string;
  length: string;
  taskList?: any;
  sTaskList: STaskList[];
  taskCompletedCount?: any;
  taskCompletedpProgress?: any;
  beginTime: string;
  endTime: string;
}

interface STaskList {
  searchValue?: any;
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  remark?: any;
  params: Params;
  id: string;
  userid: string;
  taskid: string;
  proProgressid: string;
  planBegintime: string;
  planEndtime: string;
  planLenth: string;
  actBegintime: string;
  actEndtime?: null | string | string;
  length: string;
  progress: number;
  status: string;
  planid: string;
  seqnbr?: any;
  taskName?: any;
  isScore?: any;
  actUpdateTime?: any;
  orderNum: number;
  scoreStatus: number;
  score?: any;
}

interface Params {
}

export interface Iview{
  classid:string,
  classPlanid:string
}
export interface IViewSortList {
  groupid: string;
  groupname: string;
  members?: any;
  userid: string;
  username: string;
  endtime?: string;
  sProList?: any;
  proList?: any;
  taskCompletedCount?: any;
  taskCompletedpProgress: number;
  studentUrl: string;
  num: number;
}

export interface ISelectClassPlan {
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
  countCompleted?: string;
  surplusTime?: any;
}

export interface IAddPlanList {
  searchValue?: any;
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  remark?: any;
  params: Params;
  id: string;
  username: string;
  classid: string;
  classname: string;
  userid: string;
  avatar: string;
  flag?:boolean;
  isMove?:boolean;
  dist?:string;
}

interface Params {
}