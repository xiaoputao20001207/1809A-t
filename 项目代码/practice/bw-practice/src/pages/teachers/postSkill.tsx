import React, { useEffect, useState } from 'react';
import {Link} from "umi"
import { Table, Input, Button } from 'antd';
import { getSkillLable,getSkillList } from '@/service/index';
import {ISkillLable,ISkillListItem, ISkillListQuery} from "../../utils/interface";
import { EyeOutlined, RollbackOutlined, FormOutlined, DeleteOutlined, DeliveredProcedureOutlined, SearchOutlined } from '@ant-design/icons';
import "./postSkill.css"
import styles from "./postSkill.less"
const status=["全部","草稿","已发布","待审核","已驳回"]
const columns = [
    {
        title: '岗位名称',
        dataIndex: 'name',
        align:"center"
    },
    {
        title: '专业',
        dataIndex: 'majorName',
        align:"center"
    },
    {
        title: '版本号',
        dataIndex: 'stationVersion',
        align:"center"
    },
    {
        title: '技能数量',
        dataIndex: 'skillNum',
        align:"center"
    },
    {
        title: '作者',
        dataIndex: 'userName',
        align:"center"
    },
    {
        title: '发起时间',
        dataIndex: 'createTime',
        align:"center"
    }, {
        title: '状态',
        render: (row: ISkillListItem) => <span className={styles[`status${row.status}`]}>{status[Number(row.status)]}</span>,
        align:"center"
    },{
        title:'操作',
        render: (row: ISkillListItem) => {
            if (row.status === '3') {
                return <div className={styles.action}>
                    <EyeOutlined style={{ color: '#679cf6' }} />
                    <RollbackOutlined style={{ color: '#679cf6' }} />
                </div>
            } else if (row.status === '1') {
                return <div className={styles.action}>
                    <FormOutlined style={{ color: '#679cf6' }} />
                    <DeliveredProcedureOutlined style={{ color: '#679cf6' }} />
                    <DeleteOutlined style={{ color: '#679cf6' }} />
                </div>
            }
        },
        align:"center"
    }
];
const PostSkill: React.FC = (props) => {
let [skillLable,setSkillLable]=useState<ISkillLable[]>([]);
let [curSkill, setCurSkill] = useState('');
let [isMyInfo, setMyInfo] = useState(false);
let [searchTitle, setSearchTitle] = useState('');
let [title, setTitle] = useState('');
let [curStatus, setCurStatus] = useState(0);
let [dataSource, setDataSource] = useState<ISkillListItem[]>([]);
let queryParams:ISkillListQuery ={ isAsc: 'desc', searchTitle: '', pageNum: 1, pageSize: 10, isMyInfo: false } ;
  //发起请求
  useEffect(() => {
    getSkillLable().then((res) => {
      if(res.code==200){
          setSkillLable(res.data)
      }
    });
  }, []);

   // 发起请求获取项目列表
   useEffect(() => {
    // 拼接下参数
    let queryParams: ISkillListQuery = {} as ISkillListQuery;
    if (curStatus) {
        queryParams = { ...queryParams,isMyInfo ,searchTitle,majorId: curSkill, status: curStatus }
        console.log(isMyInfo);
    } else {
        queryParams = { ...queryParams,isMyInfo,searchTitle, majorId: curSkill, status: '' as unknown as number }
    }
    getSkillList(queryParams).then(res => {
        if (res.code == 200) {
            setDataSource(res.rows);
        }
    })
}, [curSkill, curStatus,isMyInfo,searchTitle]);

  return <div className="teacher">
      <div className="ps">
           <div className="professional">
               专业:
               {
                   [{id:"",name:"全部"},...skillLable].map(item=>{
                       return <span className={item.id===curSkill?"active":""} onClick={e=>setCurSkill(item.id)} key={item.id}>{item.name}</span>
                   })
               }
           </div>
           <div className="state">
               状态:
               {
                status.map((item,index)=>{
                    return <span className={index===curStatus?"active":""} onClick={e=>setCurStatus(index)} key={item}>{item}</span>
                })
               }
           </div>
      </div>
           <div className="main">
            <div className="res">
                <div className="bb">
                </div>
            <div className="aa">
            <input className="iptd" type="checkbox" checked={isMyInfo} onChange={e=>setMyInfo(e.target.checked)}/>只看我的
            <Input className="ipt" placeholder="搜索岗位" suffix={<SearchOutlined onClick={()=>setSearchTitle(title)}/>} value={title} onChange={e=>setTitle(e.target.value)} onKeyDown={e=>{
                if (e.keyCode === 13){
                    console.log(title);
                    setSearchTitle(title)
                }
            }}/>
            <Link to="/teachers/addPostSkill?see=false">
                <Button type="primary">＋添加岗位</Button>
            </Link>
            </div>
            </div>
           <Table rowKey="stationId" dataSource={dataSource} columns={columns}></Table>
           </div>
  </div>;
};

export default PostSkill;
