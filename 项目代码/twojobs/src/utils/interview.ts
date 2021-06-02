// 放置面试类所有接口
export interface ISkillLabel {
    id: string;
    name: string;
    parentId: string;
    children?: any;
  }

  //面试记录表格
export  interface InterViewListItem{
    askAndanswerList: any
    commitName: string
    commitPeople: string
    companyName: string
    duration: any
    intervierManagement: string
    interviewId: string
    interviewTime: string
    issoundrecord: number
    majorId: string
    majorName: string
    record: any
    shield: string
    site: any
    soundrecordList: any
    stationId: any
    stationName: string
    status: number
}

//表格携带参数
export interface Interviewquery{
    searchTitle: string,
    status: number,
    pageNum: 1,
    pageSize: 10,
    majorId: string
}

export interface InterviewDetail {
  interviewId: string;
  stationId?: any;
  companyName: string;
  interviewTime: string;
  intervierManagement: string;
  majorId?: any;
  commitPeople?: any;
  status: number;
  issoundrecord: number;
  stationName: string;
  majorName: string;
  commitName: string;
  duration: string;
  site: string;
  record: string;
  shield: string;
  askAndanswerList: AskAndanswerList[];
  soundrecordList: any[];
}

export interface AskAndanswerList {
  defenceHistoryId?: any;
  taskProgressId?: any;
  question: string;
  answer?: any;
  answerList?: any;
  interviewId: string;
  meeting: number;
}

export interface InterviewManageList {
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
  shield: string;
  askAndanswerList?: any;
  soundrecordList?: any;
}
//面试管理请求 的数据 参数
export interface InterviewManageQuery{
    pageNum: number,
    pageSize: number,
    searchTitle: string
}

export interface RankClassInfo {
  searchValue?: any;
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  remark?: any;
  params: Params;
  id: string;
  classname: string;
  collegeId?: any;
  majorId?: any;
}

interface Params {
}

export interface RecordRanking {
  majorName?: any;
  commitName: string;
  count: number;
  rangking: number;
  className: string;
}