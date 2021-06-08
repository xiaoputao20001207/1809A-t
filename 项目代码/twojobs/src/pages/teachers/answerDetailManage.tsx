import style from './AnswerDetailManage.less';
// import './addDefence.less'
import React, {useEffect,useState} from 'react';
import {IRouteComponentProps,Link} from 'umi';
import useStore from '@/context/useStore';
import {observer} from 'mobx-react-lite';
import {Button,Switch,Modal,Table,Pagination,Input} from 'antd';
import {MessageOutlined , SwapOutlined ,SearchOutlined} from '@ant-design/icons';
import {ISAnswerDetailIte, Responsevisble} from '@/utils/answerDetailface';
import Editor from 'for-editor'

interface answerEdit{
  answerId: string,questionValue:string
}

// const columns = [
//   { title: '问题名称', dataIndex: 'questionTitle'},
//   { title: '类型', dataIndex: 'typeName'},
//   { title: '发起人', dataIndex: 'author'},
//   { title: '发起时间', dataIndex: 'createTime'},
//   { title: '来源', dataIndex: 'source'},
// ];

const AnswerDetailManage:React.FC<IRouteComponentProps>= (props) => {

    const {answerDetail} = useStore();

    const [answerDetailID,setanswerDetailID]=useState(props.location.query.answerId);
    const [answerFlag,setanswerFlag]=useState(false);
    const [answerInp,setanswerInp]=useState('');
    // const [visible, setVisible] = useState(false);
    const [ResponsevisbleTyps,setResponsevisbleTyps]=useState<string>('1')
    //输入框onchang
    const [inpTitles,setinpTitles]=useState('');
    //输入框发送
    const [inpInterViews,setinpInterViews]=useState('')
    const [pageNum,setpageNum]=useState(1);
    const [pageSize,setpageSize]=useState(10);

    // // 类型列表
    // const allData=[
    //     {text:'全部',type:''},
    //     {text:'实训',type:'0'},
    //     {text:'答辩',type:'4'},
    //     {text:'面试',type:'1'},
    //     {text:'工作',type:'2'},
    //     {text:'其他',type:'3'},
    // ]

    useEffect(()=>{
        answerDetail.answerDetails(answerDetailID as string);
    },[])

    //点击发布评论
    let answrParams : answerEdit = {} as answerEdit;
    useEffect(() => {
        answrParams = {...answrParams,answerId: answerDetailID as string,questionValue:answerInp}
    }, [answerDetailID,answerInp])

    //评论数据
    let parquery : ISAnswerDetailIte = {} as ISAnswerDetailIte;
    useEffect(()=>{
        parquery = {...parquery,answerId:answerDetailID as string,pageNum,pageSize}
        answerDetail.anserDetailComment(parquery)
    },[answerDetailID,pageNum,pageSize])

    //弹框出来Table表格
    let parTable : Responsevisble = {} as Responsevisble;
    useEffect(()=>{
        parTable = {...parTable,type:ResponsevisbleTyps,questionTitle:inpInterViews}
        answerDetail.ResponsevisbleTable(parTable)
    },[ResponsevisbleTyps,inpInterViews])


    //屏蔽之后数据
    async function shielOnChange(replyId:string) {
        await answerDetail.shielOnChange(replyId as string)
        if(answerDetail.answerCode === 200){
          //重新调用请求评论数据渲染
          answerDetail.anserDetailComment({...parquery,answerId:answerDetailID as string})
        }
    }

    //取消屏蔽之后的数据
    async function removeOnChange(replyId:string) {
        await answerDetail.removeOnChange(replyId as string)
        if(answerDetail.answerCode === 200){
        //再次调用请求评论数据渲染
        answerDetail.anserDetailComment({...parquery,answerId:answerDetailID as string})
        }
    }

    //添加认证数据
    async function answerAuthent(replyId:string){
        await answerDetail.answerAuthentication(replyId)
        if(answerDetail.answerCode === 200){
            //重新调用请求评论数据渲染
            answerDetail.anserDetailComment({...parquery,answerId:answerDetailID as string})
        }
    }

    //撤销认证
    async function removeAnswer(replyId:string){
        await answerDetail.removeAnswer(replyId);
        if(answerDetail.answerCode === 200){
            answerDetail.anserDetailComment({...parquery,answerId:answerDetailID as string})
        }
    }


    //设置精品
    async function addBoutique(){
        await answerDetail.addBoutique(answerDetailID as string);
        if(answerDetail.answerCode === 200){
            answerDetail.answerDetails(answerDetailID as string)
        }
     }

    //取消精品
    async function remoteBoutique(){
        await answerDetail.remoteBoutique(answerDetailID as string);
        if(answerDetail.answerCode === 200){
            answerDetail.answerDetails(answerDetailID as string)
        }
    }

    //改变发布的值
    function answerEditor(val: string){
        setanswerInp(val)
    }

    //发布评论
    async function addAnswerEditor(){
        await answerDetail.addAnswerEditor(answrParams)
        if(answerDetail.answerCode === 200){
        answerDetail.anserDetailComment({...parquery,answerId:answerDetailID as string})
        }
    }

    // function showModal(){
    //     setVisible(true);//开启弹框
    // };


 
    const anSwerDetails=answerDetail.answerList
  
    return <div className={style.AnswerDetailManage}>
        <div className={style.AnswerBrief}>
            <div className={style.answerleftBox}>
                <div className={style.answeTitle}>{answerDetail.answerList.quality
                                                    ?<b>精品</b>
                                                    :null}<span>{anSwerDetails.questionTitle}</span>
                </div>

                <div className={style.answeImg}>
                    <img src="http://111.203.59.61:8060/file_service/group1/M00/00/18/rBsCHWCk1LuAcDgMAADpZTEOJJ016.jpeg" alt="" />
                    <span>{anSwerDetails.userName}</span>
                    <span>发布于{anSwerDetails.pushTime}</span>
                </div>

                <div className={style.answeContent}>{anSwerDetails.questionContent}</div>

                <div className={style.answerBtn}>
                    <Button type="primary" onClick={()=>{setanswerFlag(true)}}>回答</Button>
                    <Button type="primary" 
                            // onClick={()=>{showModal()
                            //     setResponsevisbleTyps('')
                            // }}
                            >选择其它有"正确答案"的类似问题</Button>
                    {answerDetail.answerList.quality
                    ?<Button onClick={()=>{remoteBoutique()}}>取消精品</Button>
                    :<Button  onClick={()=>{addBoutique()}}>设为精品</Button>}
                </div>
            </div>

            <div className={style.answerrightBox}>
                <MessageOutlined className={style.aa}/>
                <span>{answerDetail.total}</span>
            </div>

        </div>

        { //回答md附文本
            answerFlag 
            ? <div className={style.answerEditor}>
                <Editor value={answerInp} onChange={(e)=>{answerEditor(e)}}/>
                <div className={style.btns}>
                    <Button type="primary" onClick={()=>{
                        addAnswerEditor()
                        setanswerInp('')
                    }}>发布</Button>
                </div>
            </div>:null
        }

        {/* 全部回答 */}
        <div className={style.anserDetailCommentbo}>
            {/* 第一行 */}
            <div className={style.anserCommentTitle}>
                <b>全部回答({answerDetail.total})</b> 
                <p>
                    <span>默认排序</span>
                    {/* <SwapOutlined className={style.sortord}/> */}
                </p>
            </div>

            {/* 渲染评论列表 */}
            {
                answerDetail.answerCommentList.map((item,index)=>{
                    return <div key={item.replyId} className={style.anserCommentItems}>
                                <div className={style.anserCommentItemsone}>
                                    <img src="	http://111.203.59.61:8060/file_service/group1/M00/00/18/rBsCHWCect6AAI6AAAC1i-52NMk29.jpeg" alt="" className={style.Titleimg}/>
                                    <div className={style.anserCommentItemsonewt}>
                                        <span>{item.userName}</span> 
                                        <span>发布于{item.replyDate}</span>
                                    </div>
                                    {item.authentication //教室认证
                                    ?<img src="http://111.203.59.61:8060/static/img/teacher_authentication.6b60f685.svg" alt="" className={style.authenticationImg}/>
                                    :null}

                                    {item.shield //被屏蔽
                                    ?<img src="http://111.203.59.61:8060/static/img/sheild.c2ae03f1.svg" alt="" className={style.shieldImg}/>
                                    :null}
                                    {/* 撤销按钮 */}
                                    <div className={style.anserCommentItemsThree}>
                                            {item.authentication
                                            ?<Button onClick={()=>{removeAnswer(item.replyId)}}>撤销认证</Button>
                                            :<Button onClick={()=>{answerAuthent(item.replyId)}}>认证该答案</Button>}

                                            <Switch checked={item.shield==1} className={style.answerSwitch} onChange={()=>{
                                                if(item.shield==1){
                                                    removeOnChange(item.replyId)
                                                }else{
                                                    shielOnChange(item.replyId)
                                                }
                                            }}/>
                                    </div>
                                </div>
                                {/* 评论 */}
                                <div className={style.anserCommentItemstwo}>
                                    <span>{item.replyContext}</span>
                                </div>
                            </div>
                })
            }
        </div>
        {/* 分页 */}
        <div className={style.Paginations}>
            <div> 
                <Pagination defaultCurrent={1} 
                    total={answerDetail.total} 
                    pageSize={Number(pageSize)} 
                    onChange={(page)=>{
                    setpageNum(page)
                }}/>
            </div>
        </div>
       
       {/* 点击出现弹框 */}
        {/* <Modal title="选择其它有“正确答案”的类似问题"
               centered visible={visible}
               onOk={() => setVisible(false)}
               onCancel={() => setVisible(false)}
               width={1200}>
            <div className={style.ResponseInput}>
                <Input placeholder="搜索问题" 
                        suffix={<SearchOutlined 
                        onClick={()=>setinpInterViews(inpTitles)}/>}
                        value={inpTitles}
                        onChange={e=>{
                            setinpTitles(e.target.value)
                        }}
                        style={{marginLeft:350}} 
                        onKeyDown={e=>{
                            if(e.keyCode == 13){
                                setinpInterViews(inpTitles)
                            }
                        }}/>
            </div>
            <div className={style.answerResponse}>
                <b>类型:</b>
                {
                    allData.map((item,index)=>{
                    return <span key={index+'tt'} 
                                 className={item.type==ResponsevisbleTyps?style.activ:''} 
                                 onClick={()=>{
                                    setResponsevisbleTyps(item.type)      
                                 }}>{item.text}</span>
                    })
                }
            </div> */}
            {/* 表格 */}
            {/* <Table dataSource={answerDetail.ResponsevisbleTableList} columns={columns} style={{width:"1100px"}}/>
      </Modal> */}
    </div>
}

export default observer(AnswerDetailManage);