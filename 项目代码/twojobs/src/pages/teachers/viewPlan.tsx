import React, { useEffect,useState } from 'react'
import { observer } from 'mobx-react-lite'
import useStore from "@/context/useStore";
import { IRouteComponentProps } from 'umi'
import { Iview } from '@/utils/interface';
import { Progress, Table,Select } from 'antd'
import { TeamOutlined, CheckCircleOutlined, FieldTimeOutlined } from '@ant-design/icons'
const { Option } = Select;

const columns = [
    {
        title: "姓名",
        dataIndex: "username",
    },
    {
        title: "5.18任务测试",
        // render:(row:StuList)=>{
        //     return row.sProList&&<Progress percent={row.sProList[0].sTaskList[0].progress} status="active"/>
        // },
        children: [
            {
                title: '5.18测试任务',
                // render:(row:StuList)=>{
                // return row.sProList&&<Progress percent={row.sProList[0].sTaskList[0].progress} status="active"/>
                // }
            },
            {
                title: '时长：54天',
                align: 'center',
            },
        ],

    }
]


const viewPlan: React.FC<IRouteComponentProps> = (props) => {
    console.log(props.location.query.class_id, props.location.query.plan_id)
    // let classid=props.location.query.class_id
    let classPlanid = props.location.query.plan_id
    let [id,setid]=useState('')
    const [isshow,setisshow]=useState(true)
    let viewParams: Iview = { classid: '9', classPlanid: '' }
    const { view } = useStore()
    useEffect(() => {
        viewParams = { ...viewParams, classid: '9', classPlanid: classPlanid as string }
        view.getViewList(viewParams)
        view.getViewSortList(viewParams)
        view.getselectClassPlan()
        console.log('view.viewList.list...', view.viewList)
        console.log('view.getViewSortList....', view.viewSortList)
    }, [])
    function handleChange(value:string) {
        console.log("value....",value);
        // alert(value)
        const newselectClassPlan = view.selectClassPlan.filter(item=>{
            return item.planname==value
        })
        setid(newselectClassPlan[0].id)
    }
    useEffect(()=>{
        viewParams = { ...viewParams, classid: '9', classPlanid: id as string }
        view.getViewList(viewParams)
        view.getViewSortList(viewParams)
    },[id])
    
    return <div>
        <section>
            进度/进度监控
        </section>
        <section>
            <h4>{view.viewList.className}</h4>
            <h3>{view.viewList.planname}</h3>
            <p>{view.viewList.begintime}~{view.viewList.endtime}</p>
        </section>
        <h1 onClick={()=>{console.log(111)}}>点击打印</h1>
        <div>
            <Select placeholder='请选择' style={{ width: 120 }} onChange={handleChange}>
                {
                    view.selectClassPlan&&view.selectClassPlan.map((item,index)=>{
                    return <Option key={item.id} value={item.planname}>{item.planname}</Option>
                    })
                }
            </Select>
        </div>
        <section>
            <div>
                <p>{view.viewList.countStus}</p>
                <p>总人数</p>
            </div>
            <div>
                <p>{view.viewList.progress}%</p>
                <p>完成率</p>
            </div>
            <div>
                <p>{view.viewList.countCompleted}</p>
                <p>按期完成人数</p>
            </div>
            <div>
                <p>{view.viewList.countUncompleted}</p>
                <p>延期未完成人数</p>
            </div>
        </section>
        <div className='view-left'>
            {
                view.viewList.list && view.viewList.list.map((item,index) => {
                    return <div key={index}>
                        <button onClick={()=>setisshow(!isshow)}>{isshow?'收起':'展开'}</button>
                        {isshow&&<div>
                        <p>{item.groupname}</p>
                        <p><Progress percent={item.groupProgress} status="active" /></p>
                        <p>
                            <span><TeamOutlined />人员：{item.members}</span>
                            <span><CheckCircleOutlined />按期完成：{item.finished}</span>
                            <span><FieldTimeOutlined />延期未完成：{item.unfinished}</span>
                        </p>
                        <p>
                            <span>完成</span>
                            <span>进行中</span>
                            <span>未进行</span>
                        </p>
                        <Table rowKey='id' columns={columns} dataSource={item.stuList} />
                        </div>
                        }
                    </div>
                })
            }
        </div>
        <div className='view-right'>
            <h3>班级排行</h3>
            {
                view.viewSortList && view.viewSortList.map((item, index) => {
                    return <div key={index+'aa'}>
                        <div><img src='' alt="" /></div>
                        <div>
                            <p><span>{item.username}</span><span>{Number(item.taskCompletedpProgress) * 100}%</span></p>
                            <p><span>{item.groupname}</span><span>{item.endtime}</span></p>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}
export default observer(viewPlan)
