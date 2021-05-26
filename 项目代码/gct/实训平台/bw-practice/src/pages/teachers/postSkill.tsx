import React, { useContext, useEffect, useState } from 'react';
import {getSkillLabel, getSkillList} from '@/services/index'
import {ISkillLabel, ISkillListItem, ISkillListQuery} from '@/utils/interface'
import {Table,Input,Button} from 'antd'
import {EyeOutlined,RollbackOutlined,FormOutlined,SearchOutlined,DeleteOutlined,DeliveredProcedureOutlined} from '@ant-design/icons'



// 直接引入样式
import './postSkill.less'
// 启用了css module ***
import styles from './postSkill.less' //css模块化代码
import classnames from 'classnames'
import {observer} from 'mobx-react-lite'
import useStore from '@/context/useStore';
import { Link } from 'umi';




const status = ['全部','草稿','已发布','待审核','已驳回']
const columns = [
    {
      title: '岗位名称',
      dataIndex: 'name',
      align:'center'
    },
    {
      title: '专业',
      dataIndex: 'majorName',
      align:'center'
    },
    {
      title: '版本号',
      dataIndex: 'stationVersion',
      align:'center'
    },
    {
        title: '技能数量',
        dataIndex: 'skillNum',
        align:'center'
    },
    {
        title: '作者',
        dataIndex: 'userName',
        align:'center'
    },
    {
        title: '发起时间',
        dataIndex: 'createTime',
        align:'center'
    },
    {
        title: '状态',
        render: (row:ISkillListItem) => <span className={styles[`status${row.status}`]}>{status[Number(row.status)]}</span>,
        align:'center'
    },
    {
        title: '操作',
        align:'center',
        render: (row:ISkillListItem) => {
            if(row.status ==='3'){
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
    },

];

  
const PostSkill:React.FC=props=>{

    let [skillLabel,setSkillLabel] = useState<ISkillLabel[]> ( [] );
    let [curSkill,setCurSkill] = useState('');
    let [isMyInfo,setMyInfo] = useState(false);
    let [curStatus,setCurStatus] = useState(0);
    let [title,setTitle] = useState('');
    let [searchTitle,setSearchTitle] = useState('') //搜索
    let [dataSource,setDataSource] = useState<ISkillListItem []>([])
    let queryParams:ISkillListQuery = {isAsc:'desc',searchTitle:'',pageNum:1,pageSize:10,isMyInfo:false};
    

    let {skill} = useStore();
    
    // 钩子
    // 发起请求获取专业标签
    useEffect(()=>{
        skill.getSkillLabel();
    },[])

    // 发起请求获取项目列表
    useEffect(()=>{
        // 拼接 参数
        let queryParams:ISkillListQuery = {} as ISkillListQuery;
        if (curStatus){
            queryParams={...queryParams,isMyInfo,searchTitle,majorId:curSkill,status:curStatus}
        }else{
            queryParams={...queryParams,isMyInfo,searchTitle,majorId:curSkill,status:'' as unknown as number}
        }

        //debugger;//断点

        getSkillList(queryParams).then(res=>{
            console.log('getSkillList',res);
            if(res.code==200){
                setDataSource(res.rows)
            }
        })
    },[curSkill,curStatus,isMyInfo,searchTitle])



    return <div className="main_postSkill">

        <section className="header_box">
            {/* 专业 */}
            <section className="major_box">
                <div>专业:</div>
                <ul className={styles.statusList}>
                    {
                        [{id:'',name:'全部',},...skill.skillLabel].map(item=>{
                            return <span className={item.id===curSkill ? classnames(styles.span,styles.active) : styles.span} key={item.id} onClick={e=>setCurSkill(item.id)}>{item.name}</span>
                        })
                    }
                </ul>
            </section>
            {/* 状态 */}
            <section className="state_box">
                <div>状态</div>
                <ul className="statusList">
                    {
                        status.map((item,index)=>{
                            return <span className={index===curStatus ? classnames(styles.span,styles.active) : styles.span} key={item} onClick={e=>setCurStatus(index)}>{item}</span>
                        })
                    }
                </ul>
            </section>
        </section>

        {/* 表格 */}
        <div className="table_box">
            {/* 搜索 */}
            <section className="wrap">
                <div></div>
                <div className="only_one">
                    <div className="only_my">
                        <input type="checkbox" checked={isMyInfo} onChange={e=>setMyInfo(e.target.checked)}/> <span>仅看我的</span>
                    </div>
                    <Input className="ipt"  placeholder="请输入搜索的岗位" suffix={<SearchOutlined onClick={()=>setSearchTitle(title)}/>} value={title} onChange={e=>setTitle(e.target.value)} onKeyDown={e=>{
                        if(e.keyCode === 13){
                            // console.log(title);
                            setSearchTitle(title)
                        }
                    }}/>
                    {/* 添加岗位 */}
                    <Link to="/teachers/addPostSkill?see=false">
                        <Button type="primary"> + 添加岗位</Button>
                    </Link>
                </div>
            </section>
        </div>
        
        {/* 表格 */}
        <Table rowKey="stationId" dataSource={dataSource} columns={columns}></Table >
        
    </div>
}

export default observer(PostSkill);