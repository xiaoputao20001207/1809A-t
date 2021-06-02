import React from 'react'
import { Select, Input, InputNumber, DatePicker, Space, Button, Modal,message } from 'antd';
import { useEffect,useState } from 'react'
// import useStore from '@/context/useStore';
import styles from './addPlan.less'
import {observer} from 'mobx-react-lite'
import { IAddPlanList } from '@/utils/interface';
import { getClassStudent } from '@/service';
import useStore from '@/context/useStore';
const { Option } = Select;
const { RangePicker } = DatePicker;


const addPlan: React.FC = () => {
    //时间戳
    function onChange(date: any, dateString: any) {
        console.log(date, dateString);

    }
    
    const [isshow,setisshow]=useState(false)
    const [values,setvalues]=useState('')
    // function setstatus(oldlist:IAddPlanList[]){
        //     let newlist=oldlist.map(item=>{
            //         return {...item,issay:false}
            //     })
            //     setlist(newlist)
            // }
            //数据store
            const { addPlan } = useStore()
            useEffect(()=>{
                // getClassStudent().then((res)=>{
                //     setaddPlanList(res.data)
                // })
                addPlan.getClassStudent()
            },[])
            function changeKrom(e:React.ChangeEvent<HTMLInputElement>){
                setvalues(e.target.value)
                console.log(e.target.value)
            }
            //全选
            function changeAll(){
                // console.log(checkAll)
                addPlan.checkAll=!addPlan.checkAll
                addPlan.addPlanList.forEach(item=>{
                    item.flag= addPlan.checkAll
                })
            }
            //单选
            function changeStatus(id:string){
                // setissayAll()
                addPlan.addPlanList.forEach(item=>{
                    if(item.id==id){
                        item.flag=!item.flag
                    }
                })
                addPlan.checkAll= addPlan.addPlanList.every(item=>item.flag)
                console.log(addPlan.addPlanList)
            }

    return <div className={styles.addPlan}>
        <p>计划/添加计划</p>
        <section>
            <h2>添加计划</h2>
            <div><span>
                班级：
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择班级"
                >
                    <Select.Option value="tom">网站2021A班</Select.Option>
                </Select></span>
                <span>
                    成员数<Input placeholder="成员数" disabled defaultValue='10' />
                </span>
                <span>
                    分组：
                    <InputNumber min={1} max={20} defaultValue={1} />
                </span>
            </div>
            <div>计划：<span><Input placeholder="请输入计划" onChange={changeKrom}/></span></div>
            <div><Space direction="vertical" size={12}>
                <RangePicker onChange={onChange} />
            </Space></div>
            <div><Button type="primary" onClick={()=>{
                // console.log('valuse.....',values)
                if(!values){
                    message.error('内容不能为空')
                }else{
                    setisshow(true)
                }
            }}>自动分组</Button><Button onClick={()=>{
                console.log('valuse.....',values)
                if(!values){
                    message.error('内容不能为空')
                }else{
                    setisshow(true)
                }
                
            }}>手动分组</Button></div>
        </section>
        {isshow&&<div className={styles.maskbox}>
            <div className={styles.bounced}>
                <ul>
                    <li>全选<input type="checkbox" onChange={changeAll} checked={addPlan.checkAll} /></li>
                    {
                        addPlan.addPlanList!=[] && addPlan.addPlanList.map(item=>{
                            return item.isMove==false&&<li key={item.userid}>
                                {/* <img src={item.avatar} alt=""/> */}
                                <div><input type="checkbox" onChange={()=>{changeStatus(item.id)}} checked={item.flag}/>{item.username}</div>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <div onClick={()=>{
                        addPlan.list.push(`组${addPlan.num+=1}`)
                        console.log(addPlan.list)
                    }}>+创建小组</div>
                    <ul>
                        {
                            addPlan.list.map((item,index)=>{
                                return <li key={index+'a'}>
                                    <button onClick={()=>{
                                        addPlan.addPlanList.map(item=>{
                                            return item.isMove=item.flag
                                        })
                                    }}>+</button>
                                    <span>{item}</span>
                                    <ul>
                                        {
                                            addPlan.addPlanList.map((item,index)=>{
                                                return item.isMove==true&&<li key={index+'b'}>
                                                    <div><input type="checkbox" onChange={()=>{changeStatus(item.id)}} checked={item.flag}/>{item.username}</div>
                                                </li> 
                                            })
                                        }
                                    </ul>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <Button onClick={()=>{
                    setisshow(false)
                }}>取消</Button>
                <Button>确认</Button>
            </div>
        </div>}
    </div>
}

export default observer(addPlan)

