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