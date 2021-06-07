import React,{ FC, useEffect, useState } from 'react'
import { GetListItem} from '@/service/index'
import { ISkillListQuery,IStationVersionList} from '@/utils/interface'
import { EyeOutlined, RollbackOutlined, FormOutlined, DeleteOutlined, DeliveredProcedureOutlined, SendOutlined  } from '@ant-design/icons';
import './postSKill.css'
import { Input, Space, Button, Table,} from 'antd';
import style from './postless.less'
import {observer} from 'mobx-react-lite'
import useStore from '@/context/useStore';
import {history} from 'umi'

const { Search } = Input;

const status = ['全部','草稿','已发布','待审核','已驳回']

const columns = [
    {
      title: '岗位名称',
      dataIndex: 'name',
    //   align:"center"
    },
    {
      title: '专业',
      dataIndex: 'majorName',
    //   align:"center"
    },
    {
      title: '版本号',
      dataIndex: 'stationVersion',
    //   align:"center"
    },
    {
        title: '技能数量',
        dataIndex: 'skillNum',
        // align:"center"
    },
    {
        title: '作者',
        dataIndex: 'userName',
        // align:"center"
    },
    {
        title: '发起时间',
        dataIndex: 'createTime',
        // align:"center"
    },
    {
            title: '状态',
            render: (row: IStationVersionList) => <span className={style[`status${row.status}`]}>{status[Number(row.status)]}</span>,
    },
    {
        title: '操作',
        render:(row:IStationVersionList)=>{
            if(row.status === '3'){
                return <div className={style.action}>
                        <EyeOutlined style={{ color: '#679cf6' }} />
                        <RollbackOutlined style={{ color: '#679cf6' }} />
                </div>
            }else if(row.status === '1'){
                return <div className={style.action}>
                        <FormOutlined style={{ color: '#679cf6' }} />
                        <SendOutlined style={{ color: '#679cf6' }}/>
                        <DeleteOutlined style={{ color: '#679cf6' }} />
                    </div>
            }
            
        }
      },
];

const Postskill:FC = (props)=>{

    //专业每一项高亮
    const [curStatus, setcurStatus] = useState('')

    //状态每一项高亮
    const [carStatus, setcarStatus] = useState(0)

    //头部每一项状态
    const [dataSource, setdataSource] = useState<ISkillListQuery[]>([])
    
    //搜索
    const [searchTitle,setsearchTitle] = useState('')

    //仅看我的
    const [isMyInfo,setisMyInfo] = useState(false)

    let {skill} = useStore()

    //头部发起请求 头像
    useEffect(() => { 
        skill.Gettoplist()
    }, [])

    //表格发起请求
    useEffect(()=>{
        let queryParams:ISkillListQuery = {} as ISkillListQuery
        if(carStatus){
            queryParams = {...queryParams,majorId:curStatus,status:carStatus,searchTitle,isMyInfo}
        }else{
            queryParams = {...queryParams,majorId:curStatus,status:'' as unknown as number,searchTitle,isMyInfo}
        }
        GetListItem(queryParams).then(res=>{
            if(res.code === 200){
<<<<<<< HEAD
=======
                //console.log(res.rows,'11111111111111111')
>>>>>>> 70564c58dea78ba023e507fe5dbf71c7afb730b7
                setdataSource(res.rows)
            }
        })
    },[curStatus,carStatus,searchTitle,isMyInfo])
    
    
    return <div className='box'>
        <div className='topfather'>
                <div className="top">
                    <b>专业:</b>
                    {
                        [{name:'全部',id:''},...skill.toplist].map(item=>{
                            return <span key={item.id} className={item.id===curStatus?'active':''} onClick={e=>setcurStatus(item.id)}>{item.name}</span>
                        })
                    }
            
            </div>
            <div className='topc'>
                    <b>状态:</b>
                    {
                        status.map((item,index)=>{
                            return <span key={index} className={index===carStatus?'active':''} onClick={e=>setcarStatus(index)}>{item}</span>
                        })
                    }
            </div>
        </div>
        <div className="search">
            <div className='search-son'>
                <input type="checkbox" onChange={e=>setisMyInfo(e.target.checked)}/>
                <span>仅看我的</span>
                <Space direction="vertical">
                    <Search placeholder="搜索岗位" onSearch={value => setsearchTitle(value)} style={{ width: 200 }} />
                </Space>
                <Button type="primary" onClick={()=>{
                    history.replace('/teachers/addPostSkill')
                }}>+添加岗位</Button>
            </div>
        </div>
        <div className="tab">
            <Table dataSource={dataSource} columns={columns} rowKey="stationId"></Table>1
        </div>
    </div>
}
export default observer(Postskill)