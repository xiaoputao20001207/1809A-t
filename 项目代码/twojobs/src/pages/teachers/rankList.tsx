import { getAnswerRecordRangking, getrankList, getRecordRangking } from "@/service/modules/rankList"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { FC } from "react"
import { Tabs ,Table} from 'antd';
import rankList from "@/store/modules/rankList";
import useStore from "@/context/useStore"
import style from "./rankList.less"
import classNames from 'classnames';
import "./rankList.css"


const { TabPane } = Tabs;


const columns = [
    {
      title: '排名',
      align:"center",
      dataIndex:'rangking'
    },
    {
        title: '提交人',
        dataIndex: 'commitName',
        align:"center"
    },
    {
      title: '面试记录提交数',
      dataIndex: 'count',
      align:"center"
    },
    {
      title: '班级',
      dataIndex: 'className',
      align:"center"
    },
    {
        title: '专业',
        dataIndex: 'majorName',
        align:"center"
    },
   
]


const RankList:FC=()=>{
    const [classInfo,setClassInfo] = useState([])
    const [classId,setClassId] = useState('')
    const [key,setKey] = useState('1')
    const {rankList} =useStore()
    const [RecordRanking,setRecordRanking] = useState([]) //面试记录榜单
    const [AnswerRecordRanking,setAnswerRecordRanking] = useState([]) //面试记录榜单
    const [curId,setCurId]= useState(0)
    // const 
    useEffect(()=>{
        //请求班级数据
        getrankList().then(res=>{
            setClassInfo(res.data)
        })
    },[])

    useEffect(()=>{
        //记录榜单
        getRecordRangking(classId).then(res=>{
            setRecordRanking(res.rows)
        })
         //面试题榜单
         getAnswerRecordRangking(classId).then(res=>{
            setAnswerRecordRanking(res.rows)
        })
    },[classId])


    return <div  data-v-0759f553="" data-v-7178e8ae="" className="box_model">
                
                <div data-v-c6b29ed6="" className="box_content">
                        <div data-v-c6b29ed6="" className={style.resource_type}>
                            <div data-v-c6b29ed6="" className={style.r_t_title}>班级：</div>
                            <div data-v-c6b29ed6="" className={style.r_t_list}>
                                {
                                    [{id:'',classname:"全部"},...classInfo].map((item,index)=>{
                                        return <span key={item.id} onClick={()=>{
                                            setClassId(item.id)
                                            setCurId(index)
                                        }} className={item.id==classId?classNames(style.rankitem,style.active):style.rankitem}>{item.classname}</span>
                                    })
                                }
                            </div>
                        </div>
                        
                        <div className={style.ranklist}>
                            <Tabs defaultActiveKey="1" onChange={()=>{setKey(key)}}>
                                <TabPane tab="面试记录榜单" key="1" id="aa">
                                    <Table columns={columns} dataSource={RecordRanking} rowKey='2'/>
                                </TabPane>
                                <TabPane tab="面试题榜单" key="2">
                                    <Table columns={columns} dataSource={AnswerRecordRanking} rowKey='1'/>
                                </TabPane>
                            </Tabs>
                        </div>
                </div>
    </div>
}
export default observer(RankList)