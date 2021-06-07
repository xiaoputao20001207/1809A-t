import style from './answerDetail.less'
import React , {useState,useEffect} from 'react'
import {IRouteComponentProps} from 'umi'
import { IaddReply, getAnswerDetail, getAnswerList, getInfo, getReply ,addCollection, deleteCollection} from '@/service/index'
import {IanswerDetail, IAnswerList, IReply, IUser} from '@/utils/question'
import {MessageOutlined} from '@ant-design/icons'
import {Button,List} from 'antd'
import classNames from 'classnames'
import Editor from 'for-editor'
const answerDetail:React.FC<IRouteComponentProps> = (props)=>{
    // 定义组件内的状态
    let [answerDetail,setAnswerDetail] = useState<IanswerDetail>({} as IanswerDetail)
    let [answerList,setAnswerList] = useState<IAnswerList []>([])
    let [reply,setReply] = useState<IReply>({} as IReply)
    let [user,setUser] = useState<IUser>({} as IUser)
    let [answerContent,setAnswerContent] = useState('') //回答问题时输入的内容
    let [answerView,setAnswerView] = useState(false)

    const  addReply = ()=>{ //提交回答
        IaddReply(answerDetail.answerId,answerContent).then((ok)=>{
            if(ok.code == 200){
                alert('提交成功')
                getAnswerList(props.location.query.answerId as string).then(ok=>{ //获取回答列表
                    setAnswerList(ok.rows)
                }).then(()=>{                
                        setAnswerContent('')
                })
            }
        }) 
    }
    
    let Collection = (type:string)=>{
        if(type == 'add'){
            addCollection(answerDetail.answerId).then((res)=>{
                if(res.code == 200){
                    setAnswerDetail({...answerDetail,collection:1})
                }
            })
        }else{
            deleteCollection(answerDetail.answerId).then((res)=>{
                if(res.code == 200){
                    setAnswerDetail({...answerDetail,collection:0})
                }
            })
        }
    }
    //钩子函数
     useEffect(()=>{
        getAnswerDetail(props.location.query.answerId as string).then(ok=>{ //提问者详情
             setAnswerDetail(ok.data)
        })
        getAnswerList(props.location.query.answerId as string).then(ok=>{ //获取回答列表
             setAnswerList(ok.rows)
        })
        getReply().then(ok=>{ //获取登录用户的回答数
            setReply(ok.data)
        })
        getInfo().then(res=>{ //当前登录的用户
            setUser(res.user)
        })
    },[])
    return <div className = {style.answerDetail}>
        <div className = {style.body}>
            <div className={style.left}>
                <div className={style.top}>
                    <h3>
                        {answerDetail.questionTitle}
                    </h3>
                    <p className={style.p2}>
                        <img data-v-1b0cb3fa="" alt="" src={`http://111.203.59.61:8060${answerDetail.userPictureUrl}`}/>
                        <span>{answerDetail.userName}</span>
                        <span>发布于{answerDetail.pushTime}</span>
                        <span style={{float:'right'}}><MessageOutlined />{answerDetail.answerCount}</span>
                    </p>
                    <p>
                        {answerDetail.questionContent}
                    </p>
                    <p className={style.p3}>
                        {
                          Array(answerDetail.labels).map((item,index)=>{
                              return <span key={index}>
                                  {item}
                              </span>
                          })
                        }
                        
                    </p>
                    <p className={style.p4}>
                        <Button type="primary" onClick = {()=>{setAnswerView(!answerView)}} >
                            回答
                        </Button>
                        {
                            answerDetail.collection?
                            <Button type="primary" onClick ={()=>{Collection('')}}> 
                            取消收藏
                            </Button>:<Button type="primary" onClick ={()=>{Collection('add')}}> 
                            收藏
                            </Button>
                        }
                        
                        
                    </p>
                </div>

                <div className = {answerView?classNames(style.writeAnswer,style.active):style.writeAnswer}> {/*写回答的弹出框*/}
                        <p><img style={{width:'35px',height:'35px',borderRadius:'50%'}} src={`http://111.203.59.61:8060${user.avatar}`}/> {user.nickName}</p>
                        <Editor style={{height:'410px'}}  value={answerContent} onChange={(e)=>{setAnswerContent(e)}}/>
                        <Button type="primary" onClick={()=>{addReply()}}>
                            发布
                        </Button>
                </div>
                <div className={style.bottom}>
                <List
                    itemLayout="horizontal"
                    header={<div>全部回答（{answerList.length}）</div>}
                    bordered
                    dataSource={answerList}
                    renderItem={item => (
                        <List.Item className={classNames(style.antlistitem,'ant-list-item')}>
                            <p><img style={{width:'35px',height:'35px',borderRadius:'50%'}} src={`http://111.203.59.61:8060${item.userPictureUrl}`} /> <span>{item.userName} 发布于{item.replyDate}</span></p>
                            <p>{item.replyContext}</p>
                        </List.Item>
                    )}
                />
                </div>  
            </div>
            {/* 右侧我的问答 */}
            <div className={style.right}>
                    <div className = {style.rightTop}>
                        <h3>我的问答</h3>
                        <p><img style={{width:'40px',height:'40px',borderRadius:'50%'}} src={`http://111.203.59.61:8060${answerDetail.userPictureUrl}`} /> <span>{answerDetail.userName}</span></p>
                        <div className={style.wen}>
                            <div style={{width:'24px',height:'24px',background:"#ff8d41",textAlign: 'center',lineHeight:'24px',fontSize:'16px',color:'#fff'}}>
                                问
                            </div>
                            <div>
                                提了<span>{reply.numberQuestions}</span>个问题<span>{reply.numberReplies}</span>人进行了回答
                            </div>
                        </div>
                        <div className={style.da}>
                            <div style={{width:'24px',height:'24px',background:"#3bc9a9",textAlign: 'center',lineHeight:'24px',fontSize:'16px',color:'#fff'}}>
                                答
                            </div>
                            <div>
                                回答了<span>{reply.replyCount}</span>个问题
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
}

export default answerDetail