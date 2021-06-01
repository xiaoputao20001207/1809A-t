import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { FC } from "react"
import style from './interviewList.less'
import './interviewList.css'
import useStore from "@/context/useStore"
import { Input, Space, Button, Table,} from 'antd';
import {history} from 'umi'
import { InterViewListItem, Interviewquery } from "@/utils/interview"
import { getinterviewTableList } from "@/service"
import classNames from 'classnames';

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


    return <div  data-v-0759f553="" data-v-7178e8ae="" className="box_model">
                <div data-v-0759f553="" className="breadcrumb_box">
                    <div data-v-0759f553="" className="breadcrumb_list">
                        <div aria-label="Breadcrumb" role="navigation" className="el-breadcrumb middle_text">
                            <span className="el-breadcrumb__item">
                                <span role="link" className="el-breadcrumb__inner is-link">面试</span>
                                <span role="presentation" className="el-breadcrumb__separator">/</span>
                            </span>
                            <span className="el-breadcrumb__item" aria-current="page">
                                <span role="link" className="el-breadcrumb__inner">面试记录</span>
                                <span role="presentation" className="el-breadcrumb__separator">/</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div data-v-c6b29ed6="" className={style.resource_type}>
                            <div data-v-c6b29ed6="" className={style.r_t_title1}>专业：
                                    {
                                        [{name:'全部',id:''},...interview.skillLabelList].map(item=>{
                                                return <span key={item.id} className={item.id==curStatus?classNames(style.rankitem,style.active):style.rankitem} onClick={e=>setcurStatus(item.id)}>{item.name}</span>
                                            })
                                    }
                            </div>
                            
                            <div data-v-c6b29ed6="" className={style.r_t_title2}>面试结果：
                                    {
                                        ['全部',...status].map((item,index)=>{
                                            return <span key={index} className={index==carStatus?classNames(style.rankitem,style.active):style.rankitem} onClick={e=>setcarStatus(index)}>{item}</span>
                                        })
                                    }
                            </div>
                            
                        </div>


                <div className="searchlist">
                        <Space direction="vertical">
                            {
                                // 小问题
                                // 在搜索事件触发时 才会更改searchTitle 的内容  做不到实时监听  onChange onSearch
                            }
                            <Search placeholder="搜索岗位/公司名称" onChange={e => setsearchTitle(e.target.value)} style={{ width: 200 }} />
                        </Space>
                </div>
                <div className={style.interviewtab}>
                    <Table dataSource={dataSource} columns={columns} rowKey="interviewId"></Table>
                </div>
</div>
}
export default observer(InterviewList)