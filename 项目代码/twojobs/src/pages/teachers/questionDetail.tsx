import { useEffect, useState } from 'react'
import classNames from 'classnames';
import styles from './questionDetail.less'
import { Input, Button, Pagination, List, Modal,
Form,Checkbox,Select,message } from "antd"
import useStore from "@/context/useStore"
import { MessageOutlined, SearchOutlined,DownOutlined } from '@ant-design/icons';
import React from 'react';
import { observer } from "mobx-react-lite"
import "./questionDetail.less"//样式
import Editor from 'for-editor'

const {Option} = Select;
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
const onFinishFailed = (errorInfo: any) => {
    console.log('onFinishFailed:', errorInfo);
};
const onFinish = (errorInfo: any) => {

    console.log('onFinish:', errorInfo);
};

const list = [ "实训","面试", "工作", "其他"]
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
    return (
        <div className="questionDetail_box">
            <section className={styles.state}>
                <p className="title"> 问答 / 问答列表</p>
            </section>
                
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
                <div className={classNames(styles.search)}>

                    <div className={styles.s1}>
                        <input type="checkbox" 
                            checked={!!questionDetail.quality} 
                            onChange={e => questionDetail.setMyquality(e.target.checked)} 
                            style={{ marginLeft: "5px" }} />
                            <span>仅看精品</span>
                        <input type="checkbox" 
                            checked={!!questionDetail.authentication} 
                            onChange={e => questionDetail.setauthentication(e.target.checked)}
                            style={{ marginLeft: "5px" }} />
                            <span>仅看教师认证答案</span>
                    </div>

                    <Input style={{ width: '210px', height: '35px' }} 
                        className={styles.input} 
                        placeholder="搜索问题" 
                        suffix={<SearchOutlined onClick={() => questionDetail.setSearchTitle(searchtitle)} />} 
                        value={searchtitle} 
                        onChange={e => setTitle(e.target.value)} 
                        onKeyDown={e => {
                            if (e.keyCode === 13) {
                                questionDetail.setSearchTitle(searchtitle)
                            }
                    }} />

                    <Button style={{ background:'#ffba00', width:'117px', height:'36px' }} 
                            className={styles.question} type="primary"
                            onClick={() => {
                                questionDetail.changeFlag()
                            }}>+我要提问</Button>
                
                    <Modal title={<h3>提问</h3>}
                            centered={true}
                            footer={null}
                            visible={questionDetail.flag} onCancel={questionDetail.handleCancel}
                            width={792}>

                        <Form name="basic"
                              initialValues={{ remember: true }}
                              onFinish={onFinish}
                              onFinishFailed={onFinishFailed}>
                            <Form.Item>
                                <p>标题</p>
                                <Form.Item name="questionTitle">
                                    <Input placeholder="请输入问题名称" />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item name="标签" style={{ display: 'inline-block', width: "220px", margin: "10px" }}>
                                <Select size="large" 
                                        placeholder="请选择问题类型" 
                                        onChange={(e) => { questionDetail.changeclass(e as string) }}>
                                    {
                                        list.map(item => {
                                            return <Option value={item} key={item}>{item}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            {
                                questionDetail.curpro=="实训"
                                ? <div style={{display:"inline-block"}}> 
                                <Form.Item style={{ display: 'inline-block', width: "220px", margin: "10px" }} name="项目">
                                    <Select  size="large" placeholder="请选择项目" >
                                    {
                                        questionDetail.list.map((item, index) => {
                                            return <Option value={index} key={index}>{item.value}</Option>
                                        })
                                    }
                                    </Select>
                                </Form.Item>
                                <Form.Item style={{ display: 'inline-block', width: "220x", margin: "10px" }} name="任务">
                                    <Select   size="large" placeholder="请选择任务" >
                                        <Option value="" >{ }</Option>
                                    </Select>
                                </Form.Item></div>
                                :null
                            }
                            {
                                questionDetail.curpro=="面试"
                                ?<div style={{display:"inline-block"}}> 
                                <Form.Item style={{ display: 'inline-block', width: "220x", margin: "10px" }} name="项目">
                                    <Input style={{height:"32px"}} name="text1"  placeholder="公司" /> 
                                </Form.Item>
                                <Form.Item style={{ display: 'inline-block', width: "220x", margin: "10px" }} name="任务">
                                    <Input style={{height:"32px"}} name="text2" placeholder="岗位"  />
                                </Form.Item></div>:null
                            }
                            {
                                questionDetail.curpro=="工作"?<div style={{display:"inline-block"}}> 
                                <Form.Item style={{ display: 'inline-block', width: "220x", margin: "10px" }} name="项目">
                                    <Input style={{height:"32px"}} name="text1"  placeholder="工作详情" /> 
                                </Form.Item>
                                </div>
                                :null
                            }
                            {
                                questionDetail.curpro=="其他"
                                ?<div style={{display:"inline-block"}}> 
                                <Form.Item style={{ display: 'inline-block', width: "220x", margin: "10px" }} name="项目">
                                    <Input style={{height:"32px"}} name="text1"  placeholder="其他" /> 
                                </Form.Item>
                                </div>
                                :null
                            }
                            
                            <Form.Item name="questionContent">
                                <p>描述</p>
                                <Editor subfield={true} style={{height:"300px"}}/>
                            </Form.Item>

                            <Form.Item>
                                <p>标签</p>
                                <Form.Item  >
                                    <Input value={questionDetail.labelsvalue} 
                                           placeholder="最多可输入5个标签，回车添加标签"
                                           onChange={(e) => {
                                                questionDetail.changelabelsvalue(e)
                                           }}
                                           onKeyDown={(e) => {
                                                questionDetail.addtext(e)
                                           }} />
                            
                                </Form.Item>
                                {//添加标签 
                                    questionDetail.labels.map((item, index) => {
                                        return <span className={styles.labelsspan} key={index} style={{background:"#ccc",padding:"2px 5px",margin:"10px 5px"}}>{item}
                                                    <span onClick={() => { questionDetail.deletelabes(index) }} style={{ marginLeft:"5px"}}>x</span>
                                                </span>
                                    })
                                }
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" htmlType="submit">发布</Button>
                            </Form.Item>
                        </Form>
                    
                    </Modal>
                </div>

                <List className={classNames(styles.List)} 
                      itemLayout="vertical" size="large" 
                      dataSource={questionDetail.questionDetailList}
                      footer={<Pagination 
                                    current={questionDetail.pageNum} 
                                    onChange={e => questionDetail.setpageNum(e)} 
                                    total={questionDetail.total} />
                            }
                      renderItem={(item, index) => (
                        <List.Item className={classNames(styles.Item)} key={item.answerId}>
                            <ul>
                                <li>{/* 第一行 */}
                                    <p>{/* 左侧 */}
                                        <span>{item.qUserName}</span>
                                        <span>{item.replyTime}</span>
                                        <span>实训类型:
                                            <span style={{color:"#679cf6" }}>{type(item.typeNum)}</span>
                                        </span>
                                    </p> {/* 右侧 */}
                                    <p><MessageOutlined className={classNames(styles.icon)} />{item.answerCount}</p>
                                </li>
                                <li>{/* 第二行 */}
                                    <h2>
                                        {item.quality ? <img src="http://111.203.59.61:8060/static/img/boutique.fc46be52.svg" alt="" /> : ""}
                                        {item.authentication ? <img src="http://111.203.59.61:8060/static/img/authentication.c814dd7c.svg" alt="" /> : null} 
                                        {item.questionTitle}
                                    </h2> 
                                </li>{/* 第三行 */}
                                <li>{questionDetail.showAllindex==index ? <span>{item.questionContent}</span> : <b>{item.questionContent}</b>} 
                                    <a onClick={() => { questionDetail.change(item.supportUpB, index)}}>查看全部<DownOutlined /></a>
                                </li>
                                {/* 第四行 */}
                                <li className={classNames(styles.labels)}>
                                    {item.labels.length ? renderlabels(item.labels) : null}
                                </li>
                            </ul>
                            {/* 右侧回答 */}
                            <div>
                                <Button type="primary" size="large">回答</Button>
                            </div>
                        </List.Item>
                      )}
                />
            </section>
        </div>
    )
}

export default observer(questionDetail)
