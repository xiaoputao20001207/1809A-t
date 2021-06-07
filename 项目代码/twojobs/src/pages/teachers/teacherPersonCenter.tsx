import React,{FC, useEffect, useState} from 'react'
import { observer } from 'mobx-react-lite'
import './teacherPersonCenter.css'
import {UserOutlined, MailOutlined, MobileOutlined} from '@ant-design/icons'
import {Tabs, Form, Input, Radio, Button, message, Modal, } from 'antd'
import useStore from '@/context/useStore'
import {Four} from '@/utils/personcenter'
import {history} from 'umi'

const { TabPane } = Tabs;

const TeacherPersonCenter:FC = ()=>{

    let {personcenter, skill} = useStore()

    const [isModalVisible, setIsModalVisible] = useState(false);

    function callback(key:any) {
        console.log(key);
    }

    //关闭
    function closeOwnPage(){
        personcenter.close()
        history.replace('/teachers/needHandle')
    }
    //保存事件
    function onFinish(value:Four){
        
        let email = value.email;
        let phonenumber = value.phonenumber;
        let userName = value.userName;
        personcenter.changeOwnPage(email,phonenumber,userName).then(res=>{
            message.success(res.msg,1)
        })
    }

    //修改密码
    function onFinishpwd(value:any){

        let oldPassword = value.oldPassword
        let newPassword = value.newPassword

        if(/^\d{6}/.test(value.password) && /^\d{6}/.test(value.oldPassword) && /^\d{6}/.test(value.newPassword)){
            if(value.newPassword === value.password){
                personcenter.changePassword(oldPassword,newPassword).then(res=>{
                    //console.log(res);
                    
                   if(res.code === 500){
                        message.error(res.msg,2)
                   }else{
                       message.success(res.msg,2)
                   }
                   

                })
               
            }
        }else{
            message.error('输入有误字段小于6个字符',2)
        }
    }
    
    //显示弹框
    function showModal( ){
        setIsModalVisible(true)
    }

    //个人详情回显
    useEffect(() => {
        personcenter.getPersonMessage()
        //skill.GetHeaderPhoto()
    },[])
    
    return <div className='teacher_pages'>
            {/* <Modal>

            </Modal> */}
            {
                isModalVisible?
                <div className='mask' style={{width:'100%',height:'100%',background:'rgba(0,0,0,0.5)',position:'fixed',top:'0',left:'0',zIndex:999999}}>
                    <div className='mask-son'>
                        <h2>
                            <span>修改头像</span> 
                            <span style={{color:'rgb(94, 94, 94)',padding:'0 10px'}} onClick={()=>setIsModalVisible(false)}>X</span> 
                        </h2>
                        <div className='mask-center'>
                            <div className='mask-left'>
                                <div>
                                    <img src={`http://111.203.59.61:8060${skill.userList.avatar}`}  alt=""/>
                                </div>
                            </div>
                            <div className='mask-right'>
                                    <img src={`http://111.203.59.61:8060${skill.userList.avatar}`}  alt=""/>
                            </div>
                        </div>
                        <div className='mask-bottom'>
                            <div>
                                <input type="file" placeholder='选择修改' onChange={(e)=>{
                                    let form = new FormData()
                                    let files = e.target.files
                                    console.log(files);
                                    
                                    if(files){
                                        for(let i=0; i<files.length; i++){
                                            form.append('file',files[i])
                                        }
                                        skill.UpPhoto(form)
                                    }
                                    setIsModalVisible(false)
                                }}/>
                                <span>+</span>
                                <span>-</span>
                                <span>正转</span>
                                <span>反转</span>
                            </div>
                            {/* <button onClick={()=>{setIsModalVisible(false)}}>提交</button> */}
                        </div>
                    </div>
            </div>:
            null
            }
                <div className="el-row">
                    <div className="el-left">
                        <h3>个人信息</h3>
                        <div className='el_left_img'>
                            <img src={`http://111.203.59.61:8060${skill.userList.avatar}`} alt="" onClick={()=>{
                                showModal()
                            }}/>
                        </div>
                        <div className='information'>
                        <div className='el_left_icon'><div><UserOutlined /><span>用户名称</span></div><span>{personcenter.personMessage.userName}</span></div>
                        <div className='el_left_icon'><div><MobileOutlined /><span>手机号码</span></div><span> <span>{personcenter.personMessage.phonenumber}</span></span></div>
                        <div className='el_left_icon'><div><MailOutlined /><span>用户邮箱</span></div><span> <span>{personcenter.personMessage.email}</span></span></div>
                        </div>
                    </div>
                    <div className="el-right">
                        <h3>基本资料</h3>
                       <div className='right_data'>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="基本资料" key="1">
                                <Form
                                    name="basic"
                                    // form={form}
                                    onFinish={onFinish}
                                    initialValues={personcenter.personMessage}
                                    key={JSON.stringify(personcenter.personMessage)}
                                    >
                                        <Form.Item
                                            label="用户名称"
                                            name="userName"
                                            rules={[{ required: true, message: 'Please input your username!' }]}
                                            style={{ marginTop:'16px', width:'700px',height:'36px'}}
                                        >
                                            <Input style={{lineHeight:'26px'}}/>
                                        </Form.Item>

                                        <Form.Item
                                            style={{ marginTop:'16px', width:'700px',height:'36px'}}
                                            label="手机号码"
                                            name="phonenumber"
                                            rules={[{ required: true, message: 'Please input your phonenumber!' }]}
                                        >
                                            <Input 
                                                style={{lineHeight:'26px'}}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            style={{ marginTop:'16px', width:'680px',height:'36px'}}
                                            label="邮箱"
                                            name="email"
                                            rules={[{ required: true, message: 'Please input your email!' }]}>
                                            <Input 
                                                style={{lineHeight:'26px',marginLeft:'23px'}}
                                            />
                                        </Form.Item>
                                        
                                        <Form.Item name="sex" label="性别" style={{ marginTop:'16px', width:'680px',height:'36px',marginLeft:'10px'}}>
                                            <Radio.Group style={{marginLeft:'10px'}}>
                                                <Radio value="0">男</Radio>
                                                <Radio value="1">女</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        
                                        <Form.Item>
                                            <Button type="primary" style={{margin:'20px 10px 0 40px'}} htmlType="submit">保存</Button>
                                            <Button type="primary" danger onClick={()=>closeOwnPage()}>关闭</Button>
                                        </Form.Item>
                                    </Form>
                                </TabPane>
                                <TabPane tab="修改密码" key="2">
                                    <Form
                                        name="basic"
                                        initialValues={{ remember: true }}
                                        onFinish={onFinishpwd}
                                        >
                                            <Form.Item
                                                // hidden={true}
                                                label="旧密码"
                                                name="oldPassword"
                                                rules={[{ required: true, message: 'Please input your old password!' }]}
                                                style={{ marginTop:'16px', width:'700px',height:'36px'}}>
                                                <Input.Password  style={{lineHeight:'26px'}}/>
                                            </Form.Item>

                                            <Form.Item
                                                style={{ marginTop:'16px', width:'700px',height:'36px'}}
                                                label="新密码"
                                                name="newPassword"
                                                rules={[{ required: true, message: 'Please input your new password!' }]}>
                                                <Input.Password style={{lineHeight:'26px'}} />
                                            </Form.Item>

                                            <Form.Item
                                                style={{ marginTop:'16px', width:'700px',height:'36px'}}
                                                label="确认密码"
                                                name="password"
                                                rules={[{ required: true, message: 'Please input your password!' }]}>
                                                <Input.Password style={{lineHeight:'26px'}}/>
                                            </Form.Item>
                                                 
                                            <Form.Item>
                                                <Button type="primary" style={{margin:'20px 10px 0 40px'}} htmlType="submit">保存</Button>
                                                <Button type="primary" danger onClick={()=>closeOwnPage()}>关闭</Button>
                                            </Form.Item>
                                        </Form>
                                </TabPane>
                            </Tabs>
                       </div>
                    </div>
                </div>
            </div>
}

export default observer(TeacherPersonCenter)