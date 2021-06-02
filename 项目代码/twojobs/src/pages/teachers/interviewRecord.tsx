import { detailForget, getinterviewDetail } from "@/service"
import { AskAndanswerList, InterviewDetail } from "@/utils/interview"
import { IRouteComponentProps } from "@umijs/renderer-react"
import { observer } from "mobx-react-lite"
import React, { useEffect, useRef, useState } from "react"
import { FC } from "react"
import "./interviewRecord.css"
import {CaretRightOutlined ,PauseOutlined } from "@ant-design/icons"
import {Button ,message} from "antd"
import style from "./interviewRecord.less"

const InterviewRecord:FC<IRouteComponentProps>=({location,history})=>{
    //获取当前id
    const id = location.query.interviewId as string
    const shield = location.query.shield
    const [detail,setDetail]= useState({} as InterviewDetail)//详情对象
    const [askAndanswerList,setAskAndanswerList] = useState([] as unknown as AskAndanswerList)//问答列表
    const audio = useRef();//获取 audio 标签
    const [paused,setPaused] = useState(true)// 控制播放与暂停
    const [flag,setFlag] = useState(false)//控制 蒙层

    useEffect(() => {
    //获取当前id
        getinterviewDetail(id).then(res=>{
            if(res.data){
                setDetail(res.data)
                setAskAndanswerList(res.data.askAndanswerList)
            }
        })
        //判断当前的屏蔽状态  
        if(shield=='true'){
            setFlag(true)
        }else{
            setFlag(false)
        }
    }, [])

    //播放
    function play(){
        audio.current.play()
        setPaused(!paused)
    }
    //暂停
    function pause(){
        audio.current.pause()
        setPaused(!paused)
    }

    //屏蔽
    function forget(){
        detailForget(detail.interviewId,detail.status=1).then(res=>{
            setFlag(!flag)
            if(flag){
                message.success({
                    content:'解除屏蔽成功',
                    marginTop: '15vh',
                });
            }else{
                message.success('屏蔽成功');
            }
            // getinterviewDetail(id).then(res=>{
            //     if(res.data){
            //         setDetail(res.data)
            //         setAskAndanswerList(res.data.askAndanswerList)
            //     }
            // })
        })
    }

    return <div data-v-0759f553="" data-v-7178e8ae="" className="box_model">
                <div data-v-0759f553="" className="breadcrumb_box">
                    <div data-v-0759f553="" className="breadcrumb_list">
                        <div aria-label="Breadcrumb" role="navigation" className="el-breadcrumb middle_text">
                            <span className="el-breadcrumb__item">
                                <span role="link" className="el-breadcrumb__inner is-link">面试</span>
                                <span role="presentation" className="el-breadcrumb__separator">/</span>
                            </span>
                            <span className="el-breadcrumb__item" aria-current="page">
                                <span role="link" className="el-breadcrumb__inner">面试记录详情</span>
                                <span role="presentation" className="el-breadcrumb__separator">/</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div data-v-0759f553="" className="box_content">
                    <div data-v-0759f553="" className="baseinfo">
                        <div data-v-0759f553="" className="addProject_title top">
                            <div data-v-0759f553="" className="top_left">
                                <span data-v-0759f553="" className="icon"></span>
                                <span data-v-0759f553="" className="top_left_title">查看面试记录</span>
                            </div>
                            <div data-v-0759f553="" className="top_right ">
                                <button data-v-0759f553="" type="button" className="el-button el-button--default el-button--medium" onClick={()=>{history.go(-1)}}><span >返回</span></button>
                                <button data-v-0759f553="" type="button" className="el-button el-button--primary el-button--medium" > <span onClick={()=>{forget()}}>{flag?'解除屏蔽':'屏蔽'}</span></button>
                            </div>
                        </div>
                       
                </div>
                
                <div className={style.maintable}>
                    {
                        //蒙层
                        flag?<div className={style.mask}>
                            <img data-v-0759f553="" src="http://111.203.59.61:8060/static/img/shield.69691644.svg" alt="" className="shield_icon"></img>
                        </div>:null
                    }
                    <table className={style.table}>
                        <tbody>
                        <tr>
                            <td className='strong'>岗位名称
                            </td>
                            <td>{detail.stationName}</td>
                            <td className='strong'>公司名称
                            </td>
                            <td>{detail.companyName}</td>
                        </tr>
                        <tr>
                            <td className='strong'>面试时间
                            </td>
                            <td>{detail.interviewTime}</td>
                            <td className='strong'>  时长
                            </td>
                            <td>{detail.duration}</td>
                        </tr>
                        <tr>
                            <td className='strong'>  地点
                            </td>
                            <td>{detail.site}</td>
                            <td className='strong'> 面试官
                            </td>
                            <td>{detail.intervierManagement}</td>
                        </tr>
                        <tr>
                            <td className='strong'>  专业
                            </td>
                            <td>{detail.majorName}</td>
                            <td className='strong'> 提交人
                            </td>
                            <td>{detail.commitName}</td>
                        </tr>
                        <tr>
                            <td className='strong'>记录-吐槽</td>
                            {/* <td colSpan='3'>{detail.askAndanswerList[0].question}</td> */}
                        </tr>
                        <tr>
                            <td className='strong'>面试结果</td>
                            <td colSpan='3'>
                                {detail.status==1?'通过':'不确定'}
                            </td>
                        </tr>
                        <tr>
                            <td className='strong'>录音文件</td>
                            <td colSpan='3'>
                                {
                                    detail.issoundrecord?detail.soundrecordList.map((item,index)=>{
                                        return <div key={index+'1'}>
                                                    <img data-v-0759f553="" src="http://111.203.59.61:8060/static/img/audio.ad85b5e9.svg" alt=""></img>
                                                    <span>{item.name}</span>
                                                    <audio ref={audio} src={'http://111.203.59.61:8060'+item.url} controls className='audio'></audio>
                                                    {paused?<Button type="primary" size='large' onClick={play}><CaretRightOutlined />播放</Button>:<Button type="primary" size='large' onClick={pause}><PauseOutlined />暂停</Button>}
                                                </div>
                                    })
                                    :'无'
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className='strong'>面试问题 </td>
                            <td colSpan='3'>
                                请如实填写面试问题和答案，面试中没有作答的题目可略过答案填写，直接输入问题即可。
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan='3'>
                                {
                                    askAndanswerList.length?
                                        <div>
                                            {
                                                askAndanswerList.map((item,index)=>{
                                                    return <div className="item" key={index+'b'}>
                                                        {
                                                            item.question?<p><span className={style.ask_title}>问</span><span>{item.question}</span></p>:'暂无'
                                                        }
                                                        {
                                                            item.answer?<p><span className={style.answer_detail}>答</span><span>{item.answer}</span></p> :'该问题没有作答/不知道答案'
                                                        }
                                                        
                                                    </div>
                                                })
                                            }
                                        </div>
                                        :'暂无问题'
                                }
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
</div>
}
export default observer(InterviewRecord)
