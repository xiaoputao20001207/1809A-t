import React from 'react'
import { Select, Input, InputNumber, DatePicker, Space, Button, Modal, message } from 'antd';
import { useEffect, useState } from 'react'
// import useStore from '@/context/useStore';
import styles from './addPlan.less'
import { observer } from 'mobx-react-lite'
import { IAddPlanList } from '@/utils/interface';
import { getClassStudent } from '@/service';
import useStore from '@/context/useStore';
import planList from './planList';
import {PlusCircleOutlined,CloseCircleOutlined} from '@ant-design/icons'
const { Option } = Select;
const { RangePicker } = DatePicker;


const addPlan: React.FC = () => {
    //时间戳
    function onChange(date: any, dateString: any) {
        console.log(date, dateString);

    }

    const [isshow, setisshow] = useState(false)
    const [isshow1, setisshow1] = useState(false)
    const [values, setvalues] = useState('')
    // function setstatus(oldlist:IAddPlanList[]){
    //     let newlist=oldlist.map(item=>{
    //         return {...item,issay:false}
    //     })
    //     setlist(newlist)
    // }
    //数据store
    const { addPlan } = useStore()
    useEffect(() => {
        // getClassStudent().then((res)=>{
        //     setaddPlanList(res.data)
        // })
        addPlan.getClassStudent()
    }, [])
    function changeKrom(e: React.ChangeEvent<HTMLInputElement>) {
        setvalues(e.target.value)
        console.log(e.target.value)
    }
    //全选
    function changeAll() {
        // console.log(checkAll)
        addPlan.checkAll = !addPlan.checkAll
        addPlan.addPlanList.forEach(item => {
            item.flag = addPlan.checkAll
        })

    }
    //单选
    function changeError(id: string) {
        addPlan.addPlanList.forEach(item => {
            if (item.id == id) {
                item.isMove = false
                item.flag = false
            }
        })
    }
    function changeStatus(id: string) {
        // setissayAll()
        addPlan.addPlanList.forEach(item => {
            if (item.id == id) {
                item.flag = !item.flag
            }
        })
        addPlan.checkAll = addPlan.addPlanList.every(item => item.flag)
        console.log(addPlan.addPlanList)
    }

    return <div className={styles.addPlan}>
        <section className={styles.connect}>
            <div className={styles.navTitle}><div><span></span>添加计划</div></div>
            <div className={styles.con}>
                <div className={styles.conlist}>
                    <div className={styles.floats}>
                        <div>
                            <span className={styles.team}>班级</span>
                            <Select
                                className={styles.select}
                                showSearch
                                style={{ width: 200 }}
                                placeholder="请选择班级"
                            >
                                <Select.Option value="tom">网站2021A班</Select.Option>
                            </Select>
                        </div>
                        <div>
                            <span className={styles.team}>成员数</span><Input className={styles.input} placeholder="成员数" disabled defaultValue='10' />
                        </div>
                        <div>
                            <span className={styles.team}>分组</span>
                            <InputNumber style={{ width: '70px' }} min={1} max={20} defaultValue={1} />
                        </div>
                    </div>
                    <div className={styles.floatss}><span className={styles.team}>计划</span><span><Input className={styles.inputs} placeholder="请输入计划" onChange={changeKrom} /></span></div>
                    <div className={styles.floatsss}><span className={styles.team}>时间</span>
                        <Space direction="vertical" size={12}>
                            <RangePicker onChange={onChange} />
                        </Space>
                    </div>
                    <div className={styles.button}><Button className={styles.buttons} onClick={() => {
                        // console.log('valuse.....',values)
                        if (!values) {
                            message.error('内容不能为空')
                        } else {
                            setisshow1(true)
                            addPlan.num = 1
                            addPlan.list = [`组${addPlan.num}`]
                            addPlan.addPlanList.forEach(item => {
                                item.flag = true
                                item.dist = addPlan.list[0]
                                item.isMove = true
                            })
                        }
                    }}>自动分组</Button><Button className={styles.buttons} type="primary" onClick={() => {
                        console.log('valuse.....', values)
                        if (!values) {
                            message.error('内容不能为空')
                        } else {
                            setisshow(true)
                        }

                    }}>手动分组</Button></div>
                </div>
            </div>
        </section>
        {isshow1 && <div className={styles.maskbox1}>
            <div className={styles.bounced1}>
                <div style={{padding:'10px'}}><h3>分组</h3></div>
                <div className={styles.leftList}>
                    <div className={styles.allYes}><input style={{marginLeft:'15px'}} type="checkbox" onChange={changeAll} checked={addPlan.checkAll} /><span style={{fontSize:'15px',marginLeft:'15px'}}>全选</span></div>
                    <ul className={styles.ulList}>
                        {
                            addPlan.addPlanList.length && addPlan.addPlanList.map(item => {
                                return item.isMove == false && <li key={item.userid} className={styles.ulListItem}>
                                    <input type="checkbox" onChange={() => { changeStatus(item.id) }} checked={item.flag} />
                                    <img className={styles.imgItem} src={item.avatar} alt="" />
                                    <div>{item.username}</div>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className={styles.rightList}>
                    <div style={{fontSize:'17px'}}>当前已分{addPlan.list.length}个小组</div>
                    <div className={styles.createTeam} onClick={() => {
                        addPlan.num += 1
                        addPlan.list.push(`组${addPlan.num}`)
                        console.log(addPlan.list)
                        addPlan.addPlanList.map((item, index) => {
                            if (item.isMove == false) {
                                item.dist = `组${addPlan.num}`
                            }
                            return item
                        })
                        console.log('addPlan.addPlanList..........', addPlan.addPlanList)

                    }}><PlusCircleOutlined className={styles.iconAdd} />创建小组</div>
                    <ul className={styles.ulList1}>
                        {
                            addPlan.list.map((item, index) => {
                                return <li key={index + 'a'}>
                                    <div className={styles.teamTitle}>
                                        <PlusCircleOutlined className={styles.iconAdd} onClick={() => {
                                            addPlan.addPlanList.forEach(item1 => {
                                                item1.isMove = item1.flag
                                            })
                                        }}/>
                                        <div className={styles.teamItem}>{item}</div>
                                    </div>
                                    <ul className={styles.ulList1Ul}>
                                        {
                                            addPlan.addPlanList.map((item2, index2) => {
                                                return item == item2.dist && item2.isMove == true && <li key={index2 + 'b'}>
                                                    <img className={styles.imgItem} src={item2.avatar} alt="" />
                                                    <CloseCircleOutlined className={styles.iconRight}  onClick={() => { changeError(item2.id) }}/><span>{item2.username}</span>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <Button className={styles.buttonGo} onClick={() => {
                    setisshow1(false)
                    addPlan.addPlanList.forEach(item => {
                        item.flag = false
                        item.isMove = false
                        item.dist = ''
                    })
                    addPlan.num = 0
                    addPlan.list = []
                }}>取消</Button>
                <Button className={styles.buttonGo} type="primary" onClick={() => {
                    addPlan.newaddPlanList = addPlan.addPlanList.filter(item => {
                        return item.isMove == true
                    })
                    console.log('newaddPlanList.......', addPlan.newaddPlanList)
                    if (addPlan.list.length && addPlan.newaddPlanList.length) {
                        setisshow1(false)
                    } else {
                        message.info('请分配人员')
                    }
                    if (addPlan.newaddPlanList != []) {
                        addPlan.islook = true
                    }
                }}>确认</Button>
            </div>
        </div>}

        {isshow && <div className={styles.maskbox1}>
            <div className={styles.bounced1}>
                <div style={{padding:'10px'}}><h3>分组</h3></div>
                    <div className={styles.leftList}>
                    <ul className={styles.ulList}>
                        <li>全选<input type="checkbox" onChange={changeAll} checked={addPlan.checkAll} /></li>
                        {
                            addPlan.addPlanList != [] && addPlan.addPlanList.map(item => {
                                return item.isMove == false && <li className={styles.ulListItem} key={item.userid}>
                                    <input type="checkbox" onChange={() => { changeStatus(item.id) }} checked={item.flag} />
                                    <img className={styles.imgItem} src={item.avatar} alt="" />
                                    <span>{item.username}</span>
                                </li>
                            })
                        }
                    </ul>
                    </div>
                <div className={styles.rightList}>
                    <div style={{fontSize:'17px'}}>当前已分{addPlan.list.length}个小组</div>
                    <div className={styles.createTeam} onClick={() => {
                        addPlan.num += 1
                        addPlan.list.push(`组${addPlan.num}`)
                        console.log(addPlan.list)
                        addPlan.addPlanList.map((item, index) => {
                            if (item.isMove == false) {
                                item.dist = `组${addPlan.num}`
                            }
                            return item
                        })
                        console.log('addPlan.addPlanList..........', addPlan.addPlanList)
                    }}>+创建小组</div>
                    <ul className={styles.ulList1}>
                        {
                            addPlan.list.map((item, index) => {
                                return <li key={index + 'a'}>
                                    <div className={styles.teamTitle}>
                                    <PlusCircleOutlined className={styles.iconAdd} onClick={() => {
                                        addPlan.addPlanList.forEach(item1 => {
                                            item1.isMove = item1.flag
                                        })
                                    }} />
                                    <span>{item}</span>
                                    </div>
                                    <ul className={styles.ulList1Ul}>
                                        {
                                            addPlan.addPlanList.map((item2, index2) => {
                                                return item == item2.dist && item2.isMove == true && <li key={index2 + 't'}>
                                                    <img className={styles.imgItem} src={item2.avatar} alt="" />
                                                    <CloseCircleOutlined className={styles.iconRight}  onClick={() => { changeError(item2.id) }}/><span>{item2.username}</span>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <Button onClick={() => {
                    setisshow(false)
                    addPlan.addPlanList.forEach(item => {
                        item.flag = false
                        item.isMove = false
                        item.dist = ''
                    })
                    addPlan.list = []
                }}>取消</Button>
                <Button type="primary" onClick={() => {
                    addPlan.newaddPlanList = addPlan.addPlanList.filter(item => {
                        return item.isMove == true
                    })
                    console.log('newaddPlanList.......', addPlan.newaddPlanList)
                    if (addPlan.list.length && addPlan.newaddPlanList.length) {
                        setisshow(false)
                    } else {
                        message.info('请分配人员')
                    }
                }}>确认</Button>
            </div>
        </div>}

        <div>
            <div className={styles.newaddPlanList}>
                {addPlan.list[0]&&<h4 className={styles.h4} style={{fontSize:'25px'}}>{addPlan.list[0]}</h4>}
                {addPlan.list[0]&&<h4 className={styles.h4}>项目计划0个</h4>}
                {addPlan.list[0]&&<h4 className={styles.h4}>任务0个</h4>}
                {
                    addPlan.newaddPlanList && addPlan.newaddPlanList.map((item, index) => {
                        return item.dist == '组1' && <div className={styles.jihua} key={index + 'd'}>
                            <span>{item.username}</span>
                        </div>
                    })
                }
            </div>
            <div className={styles.newaddPlanList}>
                {addPlan.list[1]&&<h4 className={styles.h4} style={{fontSize:'25px'}}>{addPlan.list[1]}</h4>}
                {addPlan.list[1]&&<h4 className={styles.h4}>项目计划0个</h4>}
                {addPlan.list[1]&&<h4 className={styles.h4}>任务0个</h4>}
                
                {
                    addPlan.newaddPlanList && addPlan.newaddPlanList.map((item, index) => {
                        return item.dist == '组2' && <div className={styles.jihua} key={index + 'd'}>
                            <span>{item.username}</span>
                        </div>
                    })
                }
            </div>
            <div className={styles.newaddPlanList}>
                {addPlan.list[2]&&<h4 className={styles.h4} style={{fontSize:'25px'}}>{addPlan.list[2]}</h4>}
                {addPlan.list[2]&&<h4 className={styles.h4}>项目计划0个</h4>}
                {addPlan.list[2]&&<h4 className={styles.h4}>任务0个</h4>}
                {
                    addPlan.newaddPlanList && addPlan.newaddPlanList.map((item, index) => {
                        return item.dist == '组3' && <div className={styles.jihua} key={index + 'd'}>
                            <span>{item.username}</span>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}

export default observer(addPlan)

