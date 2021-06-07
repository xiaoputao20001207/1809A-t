
import React from 'react';
import { useEffect, useState } from 'react'
import classNames from 'classnames'; //classnames
import styles from './questionDetail.less'//全局样式
import { Input, Button, Pagination, List, Modal, Form, Checkbox, Select, message } from "antd"
import { CommentOutlined, SearchOutlined } from '@ant-design/icons';
import useStore from "@/context/useStore"  
import { observer } from "mobx-react-lite" //高阶函数 链接mobx
import Editor from 'for-editor' //md 
import {IRouteComponentProps} from "umi"

const { Option } = Select;
//渲染分类列表
const status = [
    {name: "全部",type: ""},
    {name: "实训",type: "0"},
    {name: "答辩",type: "4"},
    {name: "面试",type: "1"},
    {name: "工作",type: "2"},
    {name: "其他",type: "3"},
    {name: "我的问答",type: "5"},
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
// 弹框里的问题类型数据
const typeList = [ "实训","面试", "工作", "其他"];

//渲染五个蓝色小标题
let renderlabels = (labels: string[]) => {
    return labels.map((item, index) => {
        return <span key={index}>{item}</span>
    })
}


const questionDetail: React.FC<IRouteComponentProps> = (props) => {
    const onFinish = (errorInfo: any) => {
      let res= questionDetail.commit(errorInfo)
        if(res){
           questionDetail.curIndex=""
        }
        
    };
    //接口数据
    const [questionParams, setquestionParams] = useState({ isAsc: "desc", pageNum: 1, pageSize: 8, type: "" })
    //搜索框的数据
    const [searchtitle, setTitle] = useState("")
    //链接mobx
    let { questionDetail } = useStore()

    //初始进入页面获取数据
    useEffect(() => {
        questionDetail.getquestionDetailList({ 
            ...questionParams, 
            questionTitle: questionDetail.title, 
            authentication: questionDetail.authentication, 
            type: questionDetail.curIndex,
            pageNum: questionDetail.pageNum, 
            pageSize: questionDetail.pageSize, 
            quality: questionDetail.quality })


    }, [])
    //当数据发送变化时调用接口获取数据
    useEffect(() => {
        questionDetail.getquestionDetailList({ 
            ...questionParams, 
            questionTitle: questionDetail.title, 
            authentication: questionDetail.authentication, 
            type: questionDetail.curIndex, 
            pageNum: questionDetail.pageNum, 
            pageSize: questionDetail.pageSize, 
            quality: questionDetail.quality })
    }, [questionDetail.curIndex, questionDetail.pageNum, questionDetail.quality, questionDetail.authentication, questionDetail.title])
    return <div>
        {/*状态栏切换*/}
        <section className={styles.state}>
            <p>类型：</p>
            <ul>{
                    status.map((item, index) => {
                        return <span className={item.type === questionDetail.curIndex ? classNames(styles.active) : '11'} 
                                     key={item.type} 
                                     onClick={e => questionDetail.setcurIndex(item.type as string)}>{item.name}</span>
                    })
                }
            </ul>
        </section>
        <section className={classNames(styles.main)}>
            {/*筛选+提问+搜索框*/}
            <div className={classNames(styles.search)}>
                <div className={styles.one}>
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
                       onKeyDown={e => {//回车事件
                            if (e.keyCode === 13) {
                                questionDetail.setSearchTitle(searchtitle)
                            }
                       }} />

                <Button className={styles.question} 
                        type="primary"
                        onClick={() => {
                            questionDetail.changeFlag()
                        }}
                >+我要提问</Button>
                
                {/* 点击我要提问 弹出框 */}
                <Modal title={<h2>提问</h2>} 
                        centered={true} footer={null} 
                        visible={questionDetail.flag} 
                        onCancel={questionDetail.handleCancel}
                        width={1250}
                        className={styles.con}>

                    <Form name="basic" 
                          initialValues={{ remember: true }}
                          onFinish={onFinish}
                          className={styles.box_con}
                           >
                        {/* 第一行 */}
                        <Form.Item >
                            <p>标题</p>
                            <Form.Item name="questionTitle">
                                <Input placeholder="请输入问题名称" style={{height:'30px'}}/>
                            </Form.Item>
                        </Form.Item>
                        {/* 第二行 */}
                        <div className={styles.con_two}>
                            <Form.Item name="type">
                                {/* 下拉列表 */}
                                <Select size="large" placeholder="请选择问题类型" onChange={(e) => {
                                    questionDetail.changeclass(e as string)
                                }}>
                                {
                                    typeList.map((item,index) => {
                                        return <Option value={index} key={item}>{item}456</Option>
                                    })
                                }
                                </Select>
                            </Form.Item>
                            {
                                questionDetail.curpro=="0" 
                                ? <div style={{display:"inline-block"}}> 
                                    <Form.Item style={{ display: 'inline-block', width: "220px", margin: "5px 10px" }} name="text1">
                                        <Select  size="large" placeholder="请选择项目" 
                                                onChange={(e)=>{
                                                    questionDetail.changeclasstwo(e)
                                                    
                                                }}>
                                        {
                                            questionDetail.list.map((item, index) => {
                                                return <Option value={item.value} key={index}
                                                
                                                >{item.name==null?item.value:item.name}</Option>
                                            })
                                        }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item style={{ display: 'inline-block', width: "220x", margin: "5px 10px" }} name="text2">
                                        <Select size="large" placeholder="请选择任务" >
                                            {
                                                questionDetail.list2.map((item,index)=>{
                                                    return <Option value={item.value} key={index}
                                                    
                                                    >{item.name==null?item.value:item.name}</Option>
                                                })
                                            }
                                            
                                        </Select>
                                    </Form.Item>
                                </div>
                                :null
                            }
                            {
                                questionDetail.curpro=="1" 
                                ? <div style={{display:"inline-block"}}> 
                                    <Form.Item style={{ display: 'inline-block', width: "220x", margin: "5px 10px" }} name="项目">
                                        <Input style={{height:"30px"}} name="text1"  placeholder="公司" /> 
                                    </Form.Item>
                                    <Form.Item style={{ display: 'inline-block', width: "220x", margin: "5px 10px" }} name="任务">
                                        <Input style={{height:"30px"}} name="text2" placeholder="岗位"  />
                                    </Form.Item></div>
                                :null
                            }
                            {
                                questionDetail.curpro=="2" 
                                ? <div style={{display:"inline-block"}}> 
                                    <Form.Item style={{ display: 'inline-block', width: "220x", margin: "5px 10px" }} name="项目">
                                        <Input style={{height:"30px"}} name="text1"  placeholder="工作详情" /> 
                                    </Form.Item>
                                    </div>
                                :null
                            }
                            {
                                questionDetail.curpro=="3" 
                                ? <div style={{display:"inline-block"}}> 
                                    <Form.Item style={{ display: 'inline-block', width: "220x", margin: "5px 10px" }} name="项目">
                                        <Input style={{height:"30px"}} name="text1"  placeholder="其他" /> 
                                    </Form.Item>
                                </div>
                                :null
                            }
                        </div>
                        
                        {/* md文档 */}
                        <Form.Item name="questionContent" >
                            <Editor subfield={true} style={{height:'260px'}}/>
                        </Form.Item>

                        <Form.Item>
                            <p>标签</p>
                            <Form.Item  >
                                <Input value={questionDetail.labelsvalue} placeholder="最多可输入5个标签，回车添加标签"
                                    onChange={(e) => {
                                        questionDetail.changelabelsvalue(e)
                                    }}
                                    onKeyDown={(e) => {
                                        questionDetail.addtext(e)
                                    }} />
                            </Form.Item>
                            {
                                //添加标签
                                questionDetail.labels.map((item, index) => {
                                    return <span className={styles.labelsspan} key={index}>{item} 
                                                <span onClick={() => { questionDetail.deletelabes(index) }} style={{ marginLeft: "5px",color:'red' }}>x</span>
                                            </span>
                                })
                            }
                        </Form.Item>

                        <Form.Item > {/*点击发布*/}
                            <Button type="primary" htmlType="submit" style={{position:'absolute',right:'0'}}>发布</Button>               
                        </Form.Item>

                    </Form>

                </Modal>

            </div>

            {/* List列表 */}
            <List className={styles.List} 
                  itemLayout="vertical" size="large" 
                  dataSource={questionDetail.questionDetailList}
                  footer={ 
                    // 分页
                    <Pagination current={questionDetail.pageNum} 
                                onChange={e => questionDetail.setpageNum(e)} 
                                total={questionDetail.total} />
                  }
                  renderItem={(item, index) => (
                    <List.Item className={styles.Item} key={item.answerId}>                    
                        <ul >
                            <li > 
                                <p>
                                    <span>{item.qUserName}</span>
                                    <span>{item.replyTime}</span>
                                    <span>实训类型:
                                        <span style={{ color: "#679cf6" }}>{type(item.typeNum)}</span>
                                    </span>
                                </p> 
                                <p><CommentOutlined className={classNames(styles.icon)} />{item.answerCount}</p>
                            </li>
                            <li>{/*认证或是精品*/}
                                <h3>{item.quality ? <img src="http://111.203.59.61:8060/static/img/boutique.fc46be52.svg" alt="" /> : ""}
                                    {item.authentication ? <img src="http://111.203.59.61:8060/static/img/authentication.c814dd7c.svg" alt="" /> : null} 
                                    {item.questionTitle}</h3> 
                            </li>
                            <li>{questionDetail.showAllindex == index ? <span>{item.questionContent}</span> : <b>{item.questionContent}</b>} 
                                {/* <a onClick={() => {questionDetail.change(item.supportUpB, index)}}>查看全部</a>  */}
                                <a>查看全部</a> 
                            </li>
                            <li className={styles.labels}>
                                {item.labels.length ? renderlabels(item.labels) : null}
                            </li>
                        </ul>
                        <div>{/*点击回答*/}
                            <Button type="primary" size="large" onClick={()=>{
                                props.history.push(`/teachers/answerDetail?answerId=${item.answerId}`)
                            }}>回答</Button>
                        </div>

                    </List.Item>
                )}
            />,
        </section>

    </div>
}

export default observer(questionDetail)