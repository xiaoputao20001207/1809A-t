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
  //添加岗位的数据
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