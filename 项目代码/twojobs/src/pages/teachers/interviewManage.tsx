import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { FC } from "react"
import "./interviewManage.css"
import styles from "./interviewManage.less"
import { IRouteComponentProps } from "@umijs/renderer-react"
import {Button ,message,Input,Table ,Switch} from "antd"
import {CaretRightOutlined ,PauseOutlined ,CheckOutlined,CloseOutlined} from "@ant-design/icons"
import {detailForget, interviewManage} from "@/service/index"
import { InterViewListItem, InterviewManageQuery } from "@/utils/interview"
import useStore from "@/context/useStore"
import {history} from 'umi'

const { Search } = Input;

let checked:boolean ;


const columns = [
    {
      title: '岗位名称',
    //   dataIndex: 'stationName',
      render:(row:InterViewListItem)=>{
          return <a onClick={()=>{history.push(`/teachers/interviewRecord?interviewId=${row.interviewId}&shield=${Boolean(row.shield)}&see=true`)}}>{row.stationName}</a>
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
                return <span key={row.status}>有</span>
            }else{
                return <span key={row.status}>无</span>
            }
        },
        align:"center"
    },
    {
        title: '屏蔽',
        render:(row:InterViewListItem)=>{
            if(!row.shield){//未被屏蔽
                return  <Switch defaultChecked={false} onChange={(checked)=>{onchange(checked,row.interviewId,row.status=0)}} key={row.majorId}/>
            }else if(row.shield){//被屏蔽
                return <Switch defaultChecked onChange={(checked)=>{onchange(checked,row.interviewId,row.status=1)}} key={row.majorId}/>
            }
        }
    }
];
function onchange(checked:boolean,id:string,status:number){
    checked=!checked
    detailForget(id,status)
    if(checked){
        message.success({
            content:'取消屏蔽',
            marginTop: '15vh',
        });
    }else{
        message.success('屏蔽成功');
    }
}   

const InterviewManage:FC<IRouteComponentProps>=(history)=>{
    const {interviewManage} =useStore()
    const [searchTitle,setSearchTitle] = useState('')//搜索框内容
    
    useEffect(()=>{
        //设置params 参数
        // let params = {} as InterviewManageQuery
        // if(searchTitle){
        //     params= {pageNum:1,pageSize:10,searchTitle,}
        // }else{
        //     params= {pageNum:1,pageSize:10,searchTitle:''}
        // }
        // //调用接口
        // interviewManage.getinterviewManage(params)
        getInterviewManage()

    },[searchTitle])

    function getInterviewManage(){
        let params = {} as InterviewManageQuery
        if(searchTitle){
            params= {pageNum:1,pageSize:10,searchTitle,}
        }else{
            params= {pageNum:1,pageSize:10,searchTitle:''}
        }
        //调用接口
        interviewManage.getinterviewManage(params)
    }


    return <div  data-v-0759f553="" data-v-7178e8ae="" className="box_model">
                <div data-v-0759f553="" className="breadcrumb_box">
                    <div data-v-0759f553="" className="breadcrumb_list">
                        <div aria-label="Breadcrumb" role="navigation" className="el-breadcrumb middle_text">
                            <span className="el-breadcrumb__item">
                                <span role="link" className="el-breadcrumb__inner is-link">面试</span>
                                <span role="presentation" className="el-breadcrumb__separator">/</span>
                            </span>
                            <span className="el-breadcrumb__item" aria-current="page">
                                <span role="link" className="el-breadcrumb__inner">面试记录管理</span>
                                <span role="presentation" className="el-breadcrumb__separator">/</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.mainlist}>
                        <div className={styles.search}>
                            <Search className={styles.aa} placeholder="输入内容" allowClear onChange={e=>{setSearchTitle(e.target.value)}} style={{ width: 200 }} />
                        </div>
                        <Table columns={columns} dataSource={interviewManage.interviewManageList} rowKey='1'/>
                    </div>

    </div>
}
export default observer(InterviewManage)