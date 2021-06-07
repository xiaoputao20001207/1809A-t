import React, { useEffect,useState } from 'react'
import { observer } from 'mobx-react-lite'
import useStore from "@/context/useStore";
import { IRouteComponentProps } from 'umi'
import { Iview } from '@/utils/interface';
import { Progress, Table,Select } from 'antd'
import { TeamOutlined, CheckCircleOutlined, FieldTimeOutlined } from '@ant-design/icons'
import styles from './viewPlan.less'
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
    
    return <div className={styles.viewPlan}>
        <div className={styles.context}>
            <section className={styles.titleTwo}>
                <h2>{view.viewList.className}</h2>
                <h3>{view.viewList.planname}</h3>
                <p>{view.viewList.begintime}~{view.viewList.endtime}</p>
            </section>
            <div>
                <Select className={styles.input} placeholder='请选择' style={{ width: 120 }} onChange={handleChange}>
                    {
                        view.selectClassPlan&&view.selectClassPlan.map((item,index)=>{
                        return <Option key={index+'z'} value={item.planname}>{item.planname}</Option>
                        })
                    }
                </Select>
            </div>
            <section className={styles.box}>
                <div>
                    <p className={styles.one} style={{color: '#679cf6'}}>{view.viewList.countStus}</p>
                    <p className={styles.two}>总人数</p>
                </div>
                <div>
                    <p className={styles.one}>{view.viewList.progress}%</p>
                    <p  className={styles.two}>完成率</p>
                </div>
                <div>
                    <p className={styles.one} style={{color: '#3bc9a9'}}>{view.viewList.countCompleted}</p>
                    <p className={styles.two}>按期完成人数</p>
                </div>
                <div>
                    <p className={styles.one} style={{color: '#fc3535'}}>{view.viewList.countUncompleted}</p>
                    <p className={styles.two}>延期未完成人数</p>
                </div>
            </section>
            <div className={styles.list}>
                <div className={styles.left}>
                    {
                        view.viewList.list && view.viewList.list.map((item,index) => {
                            return <div key={index+'12548'}>
                                <button className={styles.button} onClick={()=>setisshow(!isshow)}>{isshow?'收起':'展开'}</button>
                                {isshow&&<div>
                                <p style={{width:'100px',marginTop:'30px',marginLeft:'20px',fontSize:'25px'}}>{item.groupname}</p>
                                <div><Progress percent={item.groupProgress} status="active" /></div>
                                <p className={styles.person}>
                                    <span><TeamOutlined />人员：{item.members}</span>
                                    <span><CheckCircleOutlined />按期完成：{item.finished}</span>
                                    <span><FieldTimeOutlined />延期未完成：{item.unfinished}</span>
                                </p>
                                <p className={styles.gogogo}>
                                    <span><span style={{display:'inline-block',width:'5px',height:'5px',borderRadius:'50%',background:'#3bc9a9',marginRight:'5px'}}></span>完成</span>
                                    <span><span style={{display:'inline-block',width:'5px',height:'5px',borderRadius:'50%',background:'#ffa841',marginRight:'5px'}}></span>进行中</span>
                                    <span><span style={{display:'inline-block',width:'5px',height:'5px',borderRadius:'50%',background:'#e6ebf5',marginRight:'5px'}}></span>未进行</span>
                                </p>
                                <Table rowKey='item.id' columns={columns} dataSource={item.stuList} />
                                </div>
                                }
                            </div>
                        })
                    }
                </div>
                <div className={styles.right}>
                    <h3>班级排行</h3>
                    {
                        view.viewSortList.length && view.viewSortList.map((item, index) => {
                            return <div className={styles.sortList} key={index+'aa'}>
                                    <span>{index<=2?'TOP.'+Number(index+1):Number(index+1)}</span><img className={styles.image} src={item.studentUrl} alt="" />
                                    <p><span>{item.username}</span><span>{Number(item.taskCompletedpProgress) * 100}%</span></p>
                                    <p><span>{item.groupname}</span><span>{item.endtime}</span></p>
                                
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </div>
}
export default observer(viewPlan)
