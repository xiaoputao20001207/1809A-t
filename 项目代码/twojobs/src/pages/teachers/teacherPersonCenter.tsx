import { observer } from 'mobx-react-lite'
import React,{FC, useEffect} from 'react'
import './teacherPersonCenter.css'
import {UserOutlined, MailOutlined, MobileOutlined} from '@ant-design/icons'
import {Tabs, Form, Input, Radio, Button } from 'antd'
import useStore from '@/context/useStore'

const { TabPane } = Tabs;

const TeacherPersonCenter:FC = ()=>{

    let {personcenter} = useStore()

    function callback(key:any) {
        console.log(key);
    }

    //完成事件
    function onFinish(value:any){
        let email = value.email;
        let phonenumber = value.phonenumber;
        let userName = value.userName;
        personcenter.changeOwnPage(email,phonenumber,userName)
    }

    //修改密码
    function onFinishpwd(value:any){
        let oldPassword = value.oldPassword
        let newPassword = value.newPassword

        if(/^\d{6}/.test(value.password) && /^\d{6}/.test(value.oldPassword) && /^\d{6}/.test(value.newPassword)){
            if(value.newPassword === value.password){
                personcenter.changePassword(oldPassword,newPassword).then(res=>{
                    alert(res.msg)
                })
            }
        }else{
            alert('输入有误字段小于6个字符')
        }
    }
    
    useEffect(() => {
        personcenter.getPersonMessage()
        
    },[])

    //表单实例
    // let [form] = Form.useForm()
    
    return <div className='teacher_pages'>
                <div className="el-row">
                    <div className="el-left">
                        <h3>个人信息</h3>
                        <div className='el_left_img'>
                            <img src="http://111.203.59.61:8060/file_service/group1/M00/00/18/rBsCHWCect6AAI6AAAC1i-52NMk29.jpeg" alt=""/>
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
                                                //placeholder={personcenter.personMessage.phonenumber}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            style={{ marginTop:'16px', width:'680px',height:'36px'}}
                                            label="邮箱"
                                            name="email"
                                            rules={[{ required: true, message: 'Please input your email!' }]}>
                                            <Input 
                                                style={{lineHeight:'26px',marginLeft:'23px'}}
                                               // placeholder={personcenter.personMessage.email}
                                            />
                                        </Form.Item>
                                        
                                        <Form.Item name="性别" label="性别" style={{ marginTop:'16px', width:'680px',height:'36px',marginLeft:'10px'}}>
                                            <Radio.Group style={{marginLeft:'10px'}}>
                                                <Radio value="0">男</Radio>
                                                <Radio value="1">女</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        
                                        <Form.Item>
                                            <Button type="primary" style={{margin:'20px 10px 0 40px'}} htmlType="submit">保存</Button>
                                            <Button type="primary" danger>关闭</Button>
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
                                                label="旧密码"
                                                name="oldPassword"
                                                rules={[{ required: true, message: 'Please input your old password!' }]}
                                                style={{ marginTop:'16px', width:'700px',height:'36px'}}>
                                                <Input  style={{lineHeight:'26px'}}/>
                                            </Form.Item>

                                            <Form.Item
                                                style={{ marginTop:'16px', width:'700px',height:'36px'}}
                                                label="新密码"
                                                name="newPassword"
                                                rules={[{ required: true, message: 'Please input your new password!' }]}>
                                                <Input style={{lineHeight:'26px'}} />
                                            </Form.Item>

                                            <Form.Item
                                                style={{ marginTop:'16px', width:'700px',height:'36px'}}
                                                label="确认密码"
                                                name="password"
                                                rules={[{ required: true, message: 'Please input your password!' }]}>
                                                <Input style={{lineHeight:'26px'}}/>
                                            </Form.Item>
                                                 
                                            <Form.Item>
                                                <Button type="primary" style={{margin:'20px 10px 0 40px'}} htmlType="submit">保存</Button>
                                                <Button type="primary" danger>关闭</Button>
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