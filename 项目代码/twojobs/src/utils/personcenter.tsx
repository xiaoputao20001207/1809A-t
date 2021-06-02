
//个人主页详情接口
export interface PersoncenterList {
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
  majorName?: any;
  admin: boolean;
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

interface Params {
}


//登录接口
export interface LoginPerson{
  code: string;
  img:string;
  password: string;
  username: string;
  uuid?: string;
  msg:string;
}

export interface Four{
  email: string;
  phonenumber: string;
  sex: string;
  userName: string
} 