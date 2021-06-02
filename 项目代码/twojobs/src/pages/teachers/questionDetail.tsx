import { useEffect, useState } from 'react'
import classNames from 'classnames';
import styles from './questionDetail.less'
import { Input, Button, Pagination, List, Modal } from "antd"
import useStore from "@/context/useStore"
import { MessageOutlined, SearchOutlined } from '@ant-design/icons';
import React from 'react';
import { observer } from "mobx-react-lite"
import { Link } from 'umi';
import "./questionDetail.less"//样式

//渲染分类列表
const status = [
    {
        name: "全部",
        type: ""
    },
    {
        name: "实训",
        type: "0",
    },
    {
        name: "答辩",
        type: "4",
    },
    {
        name: "面试",
        type: "1",
    },
    {
        name: "工作",
        type: "2",
    },
    {
        name: "其他",
        type: "3",
    },
    {
        name: "我的问答",
        type: "5",
    },
]
//渲染实训类型函数
let type = (id: string) => {
    switch (id) {
        case '0':
            return '实训'
        case '4':
            return '答辩'
        case '1':
            return '面试'
        case '2':
            return '工作'
        case '3':
            return '其他'
        case '5':
            return '我得回答'
    }
}
//渲染蓝色小标题
let renderlabels = (labels: string[]) => {
    return labels.map((item, index) => {
        return <span key={index}>{item}</span>
    })
}
const questionDetail: React.FC = () => {
    //接口数据
    const [questionParams, setquestionParams] = useState({ isAsc: "desc", pageNum: 1, pageSize: 8, type: "" })
    //搜索框的数据
    const [searchtitle, setTitle] = useState("")
    //链接mobx
    let { questionDetail } = useStore()
    //初始进入页面获取数据
    useEffect(() => {
        questionDetail.getquestionDetailList({ ...questionParams, questionTitle: questionDetail.title, authentication: questionDetail.authentication, type: questionDetail.curIndex, pageNum: questionDetail.pageNum, pageSize: questionDetail.pageSize, quality: questionDetail.quality })


    }, [])
    //监听数据变化时调用接口获取数据
    useEffect(() => {
        questionDetail.getquestionDetailList({ ...questionParams, questionTitle: questionDetail.title, authentication: questionDetail.authentication, type: questionDetail.curIndex, pageNum: questionDetail.pageNum, pageSize: questionDetail.pageSize, quality: questionDetail.quality })
    }, [questionDetail.curIndex, questionDetail.pageNum, questionDetail.quality, questionDetail.authentication, questionDetail.title])
    return <div className="questionDetail_box">

                
        {/*状态栏切换    */}
        <section className={styles.state}>
            <b>状态：</b>
            <ul className="input_tab">
                {
                    status.map((item, index) => {
                        return <span className={item.type === questionDetail.curIndex ? classNames(styles.active) : '11'} key={item.type} onClick={e => questionDetail.setcurIndex(item.type as string)}>{item.name}</span>
                    })
                }
            </ul>
        </section>

        <section className={classNames(styles.main)}>
            {/* 筛选,搜索框,我要提问*/}
            <div className={classNames(styles.search)} style={{width:'95%',margin:'0 30px',height:'70px'}}>

                <div className={styles.s1}>
                    <input type="checkbox" checked={!!questionDetail.quality} onChange={e => questionDetail.setMyquality(e.target.checked)} style={{ marginLeft: "5px" }} /><span>仅看精品</span>
                    <input type="checkbox" checked={!!questionDetail.authentication} onChange={e => questionDetail.setauthentication(e.target.checked)} style={{ marginLeft: "5px" }} /><span>仅看教师认证答案</span>
                </div>
                <Input style={{ width: '210px', height: '35px' }} className={styles.input} placeholder="搜索问题" suffix={<SearchOutlined onClick={() => questionDetail.setSearchTitle(searchtitle)} />} value={searchtitle} onChange={e => setTitle(e.target.value)} onKeyDown={e => {
                    if (e.keyCode === 13) {
                        questionDetail.setSearchTitle(searchtitle)
                    }
                }} />

                <Button style={{ background: '#ffba00', width: '117px', height: '36px' }} className={styles.question} type="primary"
                    onClick={() => {
                        questionDetail.changeFlag()
                    }}
                >+我要提问</Button>
                <Modal  title={<h2>提问</h2>}  okText="发布" cancelText="取消" visible={questionDetail.flag} onOk={questionDetail.handleOk} onCancel={questionDetail.handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

            </div>
            <List  className={classNames(styles.List)} itemLayout="vertical" size="large" dataSource={questionDetail.questionDetailList}
                footer={

                    <Pagination current={questionDetail.pageNum} onChange={e => questionDetail.setpageNum(e)} total={questionDetail.total} />
                }
                renderItem={(item, index) => (
                    <List.Item
                        className={classNames(styles.Item)}
                        key={item.answerId}
                        style={{width:'1600px'}}
                    >
                        <ul  >
                            <li > <p><span>{item.qUserName}</span><span>{item.replyTime}</span><span>实训类型:<span style={{ color: "#679cf6" }}>{type(item.typeNum)}</span></span></p> <p><MessageOutlined className={classNames(styles.icon)} />{item.answerCount}</p></li>
                            <li><h2>{item.quality ? <img src="http://111.203.59.61:8060/static/img/boutique.fc46be52.svg" alt="" /> : ""}{item.authentication ? <img src="http://111.203.59.61:8060/static/img/authentication.c814dd7c.svg" alt="" /> : null} {item.questionTitle}</h2> </li>
                            <li>{questionDetail.showAllindex==index ? <span>{item.questionContent}</span> : <b>{item.questionContent}</b>} <a onClick={() => {
                                

                                questionDetail.change(item.supportUpB, index)
                            }}>查看全部</a></li>
                            <li className={classNames(styles.labels)}>
                                {item.labels.length ? renderlabels(item.labels) : null}
                            </li>
                        </ul>
                        <div>
                            <Button type="primary" size="large">回答</Button>
                        </div>
                    </List.Item>
                )}
            />,
        </section>
    </div>
}

export default observer(questionDetail)
