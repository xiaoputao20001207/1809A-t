import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { FC } from "react"
import style from './postless.less'
import './postSKill.css'
import useStore from "@/context/useStore"
import { Input, Space, Button, Table,} from 'antd';
import {history} from 'umi'
import { InterViewListItem, Interviewquery } from "@/utils/interview"
import { getinterviewTableList } from "@/service"

const { Search } = Input;

const status = ['通过','未通过','不确定']


const columns = [
    {
      title: '岗位名称',
    //   dataIndex: 'stationName',
      render:(row:InterViewListItem)=>{
          return <a onClick={()=>{history.replace(`/teachers/interviewRecord?interviewId=${row.interviewId}&shield=${row.shield}&see=true`)}}>{row.stationName}</a>
      },
      align:"center"
    },
    {
      title: '公司名称',
      dataIndex: 'companyName',
      align:"center"
    },
    {
      title: '面试时间',
      dataIndex: 'interviewTime',
      align:"center"
    },
    {
        title: '面试官',
        dataIndex: 'intervierManagement',
        align:"center"
    },
    {
        title: '专业',
        dataIndex: 'majorName',
        align:"center"
    },
    {
        title: '提交人',
        dataIndex: 'commitName',
        align:"center"
    },
    {
        title: '面试结果',
        render:(row: InterViewListItem) => {
            if(row.status==1){
                return<span>通过</span>
            }else if(row.status==0){
                return <span>不确定</span>
            }
        },
        align:"center"
    },
    {
        title: '录音文件',
        render:(row: InterViewListItem) => {
            if(row.issoundrecord==1){
                return <span>有</span>
            }else{
                return <span>无</span>
            }
        },
        align:"center"
    },
];




const InterviewList:FC=()=>{
    const [curStatus, setcurStatus] = useState('')//专业
    const [carStatus, setcarStatus] = useState(0)//面试结果
    const [searchTitle, setsearchTitle] = useState('')//搜索框
    const [dataSource, setdataSource] = useState([])//搜索框


    let {interview} = useStore()


    //请求专业数据
    useEffect(()=>{
        interview.getselectStationLabel()
    },[])
    //请求表格数据  模糊搜索
    useEffect(()=>{
        let params = {} as Interviewquery
        if(carStatus || curStatus ||searchTitle){
            params = {...params,searchTitle,majorId:curStatus,status:carStatus,pageNum:1,pageSize:10}
        }else{
            params = {...params,searchTitle:'',status:'' as unknown as number ,pageNum:1,pageSize:10}
        }
        getinterviewTableList(params).then(res=>{
            setdataSource(res.rows)
        })
    },[searchTitle,carStatus,curStatus])


    return <div className='box'>
    <p className={style.management}><span>面试</span>/面试记录</p>
    <div className='topfather'>
            <div className="top">
                <b>专业:</b>
                {
                   [{name:'全部',id:''},...interview.skillLabelList].map(item=>{
                        return <span key={item.id} className={item.id===curStatus?'active':''} onClick={e=>setcurStatus(item.id)}>{item.name}</span>
                    })
                }
        
        </div>
        <div className='topc'>
                <b>面试结果:</b>
                {
                    ['全部',...status].map((item,index)=>{
                        return <span key={index} className={index===carStatus?'active':''} onClick={e=>setcarStatus(index)}>{item}</span>
                    })
                }
        </div>
    </div>
    <div className="search">
        <div className='search-son'>
            <Space direction="vertical">
                {
                    // 小问题
                    // 在搜索事件触发时 才会更改searchTitle 的内容  做不到实时监听  onChange onSearch
                }
                <Search placeholder="搜索岗位/公司名称" onChange={e => setsearchTitle(e.target.value)} style={{ width: 200 }} />
            </Space>
        </div>
    </div>
    <div className="tab">
        <Table dataSource={dataSource} columns={columns} rowKey="interviewId"></Table>
    </div>
</div>
}
export default observer(InterviewList)