import React,{useEffect,useState} from 'react'
import { Button, Input, Table,message } from 'antd'
import { SearchOutlined,EyeOutlined,DeleteOutlined } from '@ant-design/icons'
import styles from './planList.less'
import useStore from "@/context/useStore";
import {observer} from 'mobx-react-lite'
import { IPlanListItem, IPlanStatus } from '@/utils/interface';
import {NavLink} from 'umi'
import { deleteClassPlan } from '@/service';
const columns = [
    {
        title: '班级/计划',
        render:(row:IPlanListItem)=>{
            return <div>
                <p>{row.className}</p>
                <p>{row.planname}</p>
            </div> 
        }
    },
    {
        title: '时间',
        render:(row:IPlanListItem)=>{
            return <div>
                <p>距离结束还剩：{row.surplusTime}</p>
                <p>开始：{row.begintime}</p>
                <p>结束：{row.endtime}</p>
            </div>
        }
    },
    {
        title: '进度',
        render:(row:IPlanListItem)=>{
            return <div>
                {row.progress}%
            </div>
        }
    },
    {
        title: '操作',
        render:(row:IPlanListItem)=>{
            return <div>
                <NavLink to={`/teachers/viewPlan?plan_id=${row.id}&class_id=${row.classid}`}><EyeOutlined style={{fontSize:'17px'}}/></NavLink>
                <DeleteOutlined style={{color:'#679cf6',marginLeft:'20px',fontSize:'17px'}} onClick={()=>{
                    deleteClassPlan(row.id).then(res=>{
                        if(res.status==0){
                            message.info(res.msg);
                        }
                    })
                }}/>
            </div>
        }
    }
];



const planList: React.FC = () => {
    const status = [{name:'全部',classId:''},{name:'网站2021A班',classId:'9'}]
    const navList = ['未开始', '进行中', '已结束']
    const [ifFinished,setifFinished]=useState(6)
    const [classId,setClassId]=useState('')
    const [searchName,setsearchName]=useState('')
    const [con,setcon]=useState('')
    const {plan}=useStore()
    let planParams:IPlanStatus={classId:'',searchName:''}

    useEffect(()=>{
        if(classId){
            planParams={...planParams,classId,searchName,ifFinished}
        }else{
            planParams={...planParams,classId:'',searchName,ifFinished}
        }
        plan.getPlanList(planParams)
        console.log('plan..........',plan.palnList)
    },[classId,ifFinished,searchName])
    return <div className={styles.planList}>
        <div className={styles.content}>
            <section className={styles.titleText}>
                班级：{
                    status.map((item, index) => {
                        return <span key={index} onClick={()=>setClassId(item.classId)}>
                            {item.name}
                        </span>
                    })
                }
            </section>
            <section style={{paddingLeft: '30px'}}>
                <p>
                    {
                        navList.map((item, index) => {
                            return <span className={index==ifFinished?styles.active:''} style={{display:'inline-block',width:'80px',height:'30px',lineHeight:'30px', borderRadius:"30px",textAlign:'center',background:'#eee'}} key={index} onClick={()=>setifFinished(index)}>
                                {item}
                            </span>
                        })
                    }
                    <NavLink to="/teachers/addPlan"><Button className={styles.addPlan} type="primary" >添加计划</Button></NavLink>
                    <Input className={styles.searchInput} placeholder="搜索计划/项目/任务" suffix={<SearchOutlined onClick={()=>{setsearchName(con),setcon('')}}/>} 
                        value={con} onChange={e=>setcon(e.target.value)}/>
                </p>
            </section>
            <section>
                <Table rowKey="id" columns={columns} dataSource={plan.palnList} />
            </section>
        </div>
    </div>
}

export default observer(planList)