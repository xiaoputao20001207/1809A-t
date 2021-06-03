import React from "react"
import styles from "./questionHandle.less"
import { getQuestionHandleList } from '@/service/index'
import {IQuestionHandleQuery, IQuestionHandleList} from "@/utils/question"
// import "../index.less"
import {observer} from "mobx-react-lite"
import useStore from "@/context/useStore"
import { useState } from "react"
import { useEffect } from "react"
import classNames from 'classnames';
import { Button , Input} from 'antd';
import { SearchOutlined,DownOutlined } from '@ant-design/icons';


const sources=['网站2021A班']
const statuss=['全部','精品','认证','被屏蔽']
const trainingType=['实训','面试']

const QuestionHandle:React.FC=()=>{
    let [skillLabel, setSkillLabel] = useState([])
    let [curSkill, setCurSkill] = useState('')
    let [curStatus, setCurStatus] = useState(0)
    let [dataSource, setDataSource] = useState<IQuestionHandleList[]>([])
    let [isMyInfo, setMyInfo] = useState(false);
    let [title, setTitle] = useState('');
    let [searchTitle, setSearchTitle] = useState('');
    let queryParams:IQuestionHandleQuery = { searchTitle: '', pageNum: 1, pageSize: 10, classId: 9};

    let {questionhandle}=useStore()//store

    //发起请求  获取项目列表
    useEffect(() => {
        let queryParams: IQuestionHandleQuery = {} as IQuestionHandleQuery
        //拼接参数
        if (curStatus) {
            queryParams = { ...queryParams,  status: curStatus }
        } else {
            queryParams = { ...queryParams, status: '' as unknown as number }
        }
        getQuestionHandleList(queryParams).then(res => {
            console.log('res',res);
            if (res.code == 200) {
                setDataSource(res.rows)
            }
        })
        console.log(questionhandle,111);
    }, [curSkill, curStatus, isMyInfo, searchTitle]);


    return <div className={styles.questionhandle}>
        <section className={styles.question}>
            <div className={styles.box_con}>
                <div className={styles.box_contop}>
                    <h2>来源:</h2>
                    {
                        sources.map((item,index)=>{
                            return <span  className={item === curSkill ? classNames(styles.span, styles.active) : styles.span} onClick={e => setCurSkill(item)} key={item}>{item}</span>
                        })
                    }
                </div>
                <div className={styles.box_conbot}>
                    <h2>状态:</h2>
                    {
                        statuss.map((item,index)=>{
                            return <span  className={index === curStatus ? classNames(styles.act) : ''} key={item} onClick={e => setCurStatus(index)}>{item}</span>
                        })
                    }
                </div>
            </div>
            <div className={styles.box_tent}>
                <div className={styles.box_tenttop}>
                    <span>待处理问答</span>
                    <span>所有问答</span>
                </div>
                <div className={styles.box_tentcon}>
                    <div className={styles.tentcon_top}>
                        <div className={styles.top_nav}>
                            <div className={styles.allcheck}>
                                <input type="checkbox"/>
                                <span>全选</span>
                            </div>
                            <div className={styles.allright}>
                                <Button>批量回答</Button>
                                <Button>批量选择相似问题答案</Button>
                                <Input className={styles.input} placeholder="搜索问答" suffix={<SearchOutlined onClick={()=>setSearchTitle(title)}/>} value={title} onChange={e=>setTitle(e.target.value)} onKeyDown={e=>{
                                    if (e.keyCode === 13){
                                        setSearchTitle(title)
                                    }
                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tentcon_list}>
                        {
                            dataSource.map((item,index)=>{
                                return <div  className={styles.tentcon_lis}>
                                    <div className={styles.lis1}>
                                        <div className={styles.lis1_left}>
                                            <span>{item.className}</span>
                                            <span>{item.qUserName}</span>
                                            <span>{item.replyTime}发布</span>
                                            <span>实训类型：<span className={styles[`typenum${item.typeNum}`]}>{trainingType[Number(item.typeNum)]}</span></span>
                                        </div>
                                        <div className={styles.lis1_right}>
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABMUlEQVQ4T2NkoDJgBJn3/////9Qyl/YGTpuzhuHtu48kOZiJiZkhMymQQUiInwHFhY2dc0H+Z2BiAgsTDUABBgq1mtJENAM75jAE+Tky6GopE20YTGFjxxwGaSkxTAMjQ9wY1FTkyDJQSlKUjgZu23WM4fS5awz1FSlg1z57+YZh9vwN4HBiZmYGi4G86etpy2Ckrw5m43UhSAEIpMYFMEhJiTB0T1zM8O37TwYpSRGG1PgAhp17jjOcOHOVgYmJiaG2LImwgWBXPXsDNgwGbt15hBK+9+8/YVBUlIG7lr5hSGo0EwxDqhkIMsjMSIto8zzdrHCHISwpEG0aVKGwEB/D23efMJMNqQaB1Lf1LGD4/ecPWCtGLJNjILKvqGYgyNCJ01cwRIV4ouZlcl2IrA8Abo7Ck35b2UQAAAAASUVORK5CYII=" alt=""/>
                                            <span>{item.answerCount}</span>
                                        </div>
                                    </div>
                                    <div className={styles.lis2}>
                                        <img src="http://111.203.59.61:8060/static/img/authentication.c814dd7c.svg" alt=""/>
                                        <span>{item.questionTitle}</span>
                                    </div>
                                    <div className={styles.lis3}>
                                        <div className={styles.lis3_left}>
                                            <input type="checkbox"/>
                                        </div>
                                        <div className={styles.lis3_cen}>
                                            <div>{item.questionContent}</div>
                                            <div>查看全部<DownOutlined></DownOutlined></div>
                                        </div>
                                        <div className={styles.lis3_bot}>

                                        </div>
                                    </div>
                                    {/* 底部 */}
                                    <div className={styles.lis4} style={{display:'flex',alignItems:'center'}}>
                                        <Button type="primary" style={{margin:"10px 10px 10px 100px"}}>回答</Button>
                                        <Button type="primary" style={{margin:"10px"}}>选择其他有 "正确答案" 的类似问题</Button>
                                        <Button style={{margin:"10px",color:'orange',border:'1px solid orange'}}>设为精品</Button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    </div>   
}

export default observer(QuestionHandle)