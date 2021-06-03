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
  
  export interface IQuestionHandleList {
    answerId: string;
    proId?: string;
    taskId?: string;
    stepId?: string;
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
    labels: string[];
    avatar?: any;
    replyContext?: any;
    shield: number;
    quality: number;
    replyId?: any;
    className: string;
    authentication: number;
    collection: number;
    supportUp?: any;
    unsupportDown?: any;
    supportUpB: boolean;
    unsupportDownB: boolean;
  }
  
  export interface IQuestionHandleQuery{
    pageNum: number
    pageSize: number
    classId: number
    searchTitle?: string
    status?: number
  }
  export interface commitParams{
    labels?: string[]
    questionContent: string
    questionTitle: string
    text1: string
    text2: string
    type: number
  }

  interface Params {
    [key: string]: any
  }
  
  export interface IUser {
    searchValue?: any;
    createBy: string;
    createTime: string;
    updateBy?: any;
    updateTime?: any;
    remark?: any;
    params: Params;
    userId: number;
    deptId: number;
    userName: string;
    nickName: string;
    email: string;
    phonenumber: string;
    sex: string;
    avatar: string;
    salt?: any;
    status: string;
    delFlag: string;
    loginIp: string;
    loginDate?: any;
    dept: Dept;
    roles: Role[];
    roleIds?: any;
    postIds?: any;
    majorName: string;
    admin: boolean;
  }
  export  interface IReply {
    numberQuestions: string;
    numberReplies: string;
    replyCount: string;
  }
  
  
  interface Role {
    searchValue?: any;
    createBy?: any;
    createTime?: any;
    updateBy?: any;
    updateTime?: any;
    remark?: any;
    params: Params;
    roleId: number;
    roleName: string;
    roleKey: string;
    roleSort: string;
    dataScope: string;
    status: string;
    delFlag?: any;
    flag: boolean;
    menuIds?: any;
    deptIds?: any;
    admin: boolean;
  }
  interface Dept {
    searchValue?: any;
    createBy?: any;
    createTime?: any;
    updateBy?: any;
    updateTime?: any;
    remark?: any;
    params: Params;
    deptId: number;
    parentId: number;
    ancestors?: any;
    deptName: string;
    orderNum: string;
    leader: string;
    phone?: any;
    email?: any;
    status: string;
    delFlag?: any;
    parentName?: any;
    children: any[];
  }
  // 回答页面返回数据的接口
export  interface IanswerDetail {
    answerId: string;
    userId: string;
    userName: string;
    qUserLevel?: any;
    userPictureUrl: string;
    createTime: string;
    questionTitle: string;
    questionContent: string;
    answerCount: number;
    favorCount: number;
    unSupportCount: number;
    supportCount: number;
    labels: string[];
    andAnswerReplyInfos?: any;
    typeNum: string;
    pushTime: string;
    quality: number;
    shield: number;
    authentication: number;
    collection: number;
    andAnswerReplyInfoByTeachers?: any;
  }
  // 回答列表每一条的接口
  export interface IAnswerList {
    replyId: string;
    parentId?: any;
    userId: string;
    userName: string;
    userLevel?: any;
    userPictureUrl: string;
    questionValue?: any;
    questionTitle?: any;
    questionId?: any;
    replyContext: string;
    isRight: number;
    rightId?: any;
    answerCount: number;
    unSupportCount: number;
    supportCount: number;
    replyTime: string;
    replyDate: string;
    shield: number;
    authentication: number;
    quality: number;
    selectRightReplyList?: any;
    questionIdList?: any;
  }
  export interface commitParams{
    labels?: string[]
    questionContent: string
    questionTitle: string
    text1: string
    text2: string
    type: number
  }
  
  