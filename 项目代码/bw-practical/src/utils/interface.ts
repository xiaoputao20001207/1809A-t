export interface ISkillLabel {
  id: string;
  name: string;
  parentId: string;
  children?: any;
}

export interface ISkillListQuery {
  isAsc: string;
  pageNum: number;
  pageSize: number;
  searchTitle?: string;
  majorId?: string;
  status?: number;
  isMyInfo: boolean;
}

export interface ISkillListItem {
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
  
  export interface ISkillDescriptionListItem {
    key: string;
    id: string;
    label: string;
    parentId: string;
    children?: any;
    content?: any;
  }
  
  interface Params {
    [key:string]:any
  }
  
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

