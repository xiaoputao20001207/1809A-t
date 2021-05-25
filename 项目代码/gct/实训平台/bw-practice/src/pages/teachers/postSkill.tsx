import React, { useContext, useEffect, useState } from 'react';
import {getSkillLabel, getSkillList} from '@/services/index'
import {ISkillLabel, ISkillListItem, ISkillListQuery} from '@/utils/interface'
import {Table,Input} from 'antd'
import {EyeOutlined,RollbackOutlined,FormOutlined,SearchOutlined,DeleteOutlined,DeliveredProcedureOutlined} from '@ant-design/icons'



// 直接引入样式
import './postSkill.less'
// 启用了css module ***
import styles from './postSkill.less' //css模块化代码
import classnames from 'classnames'
import {observer} from 'mobx-react-lite'
import useStore from '@/context/useStore';




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
    let [searchTitle,setSearchTitle] = useState('')
    let [dataSource,setDataSource] = useState<ISkillListItem []>([])
    let queryParams:ISkillListQuery = {isAsc:'desc',searchTitle:'',pageNum:1,pageSize:10,isMyInfo:false} as ISkillListQuery;
    

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

        getSkillList(queryParams).then(res=>{
            console.log('getSkillList',res);
            if(res.code==200){
                setDataSource(res.rows)
            }
            
        })
    },[curSkill,curStatus,isMyInfo,searchTitle])



    

    
    return <div>
        <section>
            <section>
                <span className="box_two">专业:</span>
                <ul className={styles.statusList}>
                    {
                        [{id:'',name:'全部',},...skill.skillLabel].map(item=>{
                            return <span className={item.id===curSkill ? classnames(styles.span,styles.active) : styles.span} key={item.id} onClick={e=>setCurSkill(item.id)}>{item.name}</span>
                        })
                    }
                </ul>
            </section>

            <section>
                <span className="box_two">状态</span>
                <ul className="statusList">
                    {
                        status.map((item,index)=>{
                            return <span className={index===curStatus ? classnames(styles.span,styles.active) : styles.span} key={item} onClick={e=>setCurStatus(index)}>{item}</span>
                        })
                    }
                </ul>
            </section>
        </section>
        <div className="wrap">
            <input type="checkbox" checked={isMyInfo} onChange={e=>setMyInfo(e.target.checked)}/>仅看我的
            <Input className="ipt"  placeholder="请输入搜索的岗位" suffix={<SearchOutlined onClick={()=>setSearchTitle(title)}/>} value={title} onChange={e=>setTitle(e.target.value)} onKeyDown={e=>{
                if(e.keyCode === 13){
                    console.log(title);
                    setSearchTitle(title)
                }
            }}/>

            <button className="btn"> + 添加岗位</button>
        </div>

        {/* 表格 */}
        <Table rowKey="stationId" dataSource={dataSource} columns={columns}></Table >
    </div>
}

export default observer(PostSkill);