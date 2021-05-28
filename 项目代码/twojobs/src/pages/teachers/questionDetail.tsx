import skill from "@/store/modules/skill"
import React, { useEffect, useState } from "react"
import './questionDetail.less'
import {Space,Input,Button} from 'antd';
import {history} from 'umi'
import { SoundOutlined } from '@ant-design/icons';


const { Search } = Input;

// 标题数据
const status = ["全部","实训","答辩","面试","工作","其他","我的回答"]
// 状态每一项高亮
// const [carStatus,setcarStatus]=useState(0)
// // 类型每一项高亮
// const [curStaus,setcurStatus]=useState('')

//
// useEffect(() => {
//     skill.Gettypelist()
// }, [])

const QuestionDetail: React.FC=()=>{
    return <div className="questionDetail">
        <div className="title">
            问答列表头部
        </div>
        {/* 主体 */}
        <div className="teacher_plan_list">
            <div className="plan_left">
                {/* 头部 */}
                <div className="tag_detail">
                    <div className="type_title">
                        类型 : 
                    </div>
                    <div className="type_allTitle">
                        {
                            status.map((item,index)=>{
                                return <span key={index} 
                                // className={index ===carStatus?'active':''}
                                // onClick={e=>setcurStatus(item.id)}
                                >{item}</span>
                            })
                        }
                    </div>
                </div>
                {/* 主体 */}
                <div className="con">
                    {/* 第一行 */}
                    <div className="input_tab">
                        <p><input type="checkbox" /><span>仅看精品</span></p>
                        <p><input type="checkbox" /><span>仅看教师认证答案</span></p>
                        <Space direction="vertical">
                            <Search placeholder="搜索问题" onSearch={value => setsearchTitle(value)} style={{ width: 200 }} />
                        </Space>
                        <Button type="primary" onClick={()=>{
                            history.replace('/teachers/addPostSkill')
                        }}>+我要提问</Button>
                    </div>
                    {/*  */}
                    {
                        <div className="typelist">
                            <div className="left">
                                {/* 1111 */}
                                <div>
                                    <div className="list_left">
                                        <div>郭老师</div>
                                        <span className="timer_after">19个小时前</span>
                                        <div>
                                            类型 : 
                                            <span> 工作 </span>
                                        </div>
                                        
                                    </div>
                                    <div className="list_right">
                                        <SoundOutlined /><span>2</span>
                                    </div>
                                </div>
                                {/* 2222 */}
                                <div>
                                    <div>
                                        <img src="http://111.203.59.61:8060/static/img/authentication.c814dd7c.svg" alt="" />
                                        <span>前端</span>
                                    </div>
                                    
                                </div>
                                {/*  */}
                                <div>
                                    <div>安发的发</div>
                                    
                                </div>
                                {/*  */}
                                <div>
                                    <div>什么是快乐星球?</div>
                                    <div>
                                        查看全部V
                                    </div>
                                </div>
                            </div>
                            <div className="right">回答</div>
                        </div>                        
                    }
                    {
                        <div className="typelist">
                            <div className="left">
                                {/* 1111 */}
                                <div>
                                    <div className="list_left">
                                        <div>郭老师</div>
                                        <span className="timer_after">19个小时前</span>
                                        <div>
                                            类型 : 
                                            <span> 工作 </span>
                                        </div>
                                        
                                    </div>
                                    <div className="list_right">
                                        <SoundOutlined /><span>2</span>
                                    </div>
                                </div>
                                {/* 2222 */}
                                <div>
                                    <div>
                                        <img src="http://111.203.59.61:8060/static/img/authentication.c814dd7c.svg" alt="" />
                                        <span>前端</span>
                                    </div>
                                    
                                </div>
                                {/*  */}
                                <div>
                                    <div>安发的发</div>
                                    
                                </div>
                                {/*  */}
                                <div>
                                    <div>什么是快乐星球?</div>
                                    <div>
                                        查看全部V
                                    </div>
                                </div>
                            </div>
                            <div className="right">回答</div>
                        </div>                        
                    }


                </div>
            </div>
        </div>
        
    </div>
}
export default QuestionDetail

