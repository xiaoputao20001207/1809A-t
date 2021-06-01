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
//答辩表格数据
export interface defenceTable {
  defenceId: string;
  degenceName: string;
  defenceClassId?: any;
  defencePlanId?: any;
  defenceCreateTime: string;
  defenceEndTime: string;
  defenceStatus: number;
  defenceMajorId?: any;
  defenceAdress?: any;
  className?: string;
  planName?: string;
  majorName?: string;
  defenceAuthor: string;
  defenceScore?: any;
  defenceHistoryId?: any;
  taskProgressId?: any;
  scoreId?: any;
  defenceRater?: any;
  raterName?: any;
  defenceAuthorName?: string;
  avaScore?: any;
  projectName?: any;
  groupName?: any;
  taskName?: any;
  defenceGroupInfoList?: any;
  defenceScoreList?: any;
}
//班级计划数据
export interface classPlanItem {
  value: string;
  label: string;
  parentId?: any;
  children: Child[];
  content?: any;
  proId?: any;
}

interface Child {
  value: string;
  label: string;
  parentId?: any;
  children?: any;
  content?: any;
  proId?: any;
}
//小组数据
export interface TeamItem {
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
  countCompleted?: any;
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
  taskList: any[];
  sTaskList?: any;
  taskCompletedCount?: any;
  taskCompletedpProgress?: any;
  beginTime: string;
  endTime: string;
}

interface StuList {
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
  sTaskList: any[];
  taskCompletedCount?: any;
  taskCompletedpProgress?: any;
  beginTime: string;
  endTime: string;
}
//答辩保存数据
export interface SaveItem {
  defenceAdress: string;
  defenceAuthorName: string;
  defenceClassId: string;
  defenceCreateTime: string;
  defenceEndTime: string;
  defenceId: string;
  defenceMajorId: string;
  defencePlanId: string;
  defenceScore: string;
  degenceName: string;
  majorList: string;
}