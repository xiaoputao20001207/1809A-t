import React ,{FC, useState} from 'react'
import { Form, Input, Button,Checkbox,Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import useStore from '@/context/useStore';

const Login:FC = ()=>{

    let {logins} = useStore()

    // let [value,setValue] = useState()
    let [url,setUrl] = useState('data:image/gif;base64,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')

    //验证码
    function vaildation(){
        logins.Verificationcode().then(res=>{
            if(res.code === 200){
                setUrl(`data:image/gif;base64,${res.img}`)
                sessionStorage.setItem('uuid',res.uuid)
            }
        })
    }

    //点击登录
    function onFinish(value:any){
        logins.loginPage(value).then(res=>{
            console.log(res);
            
        })
    }

    return <div className='login'>
                <div className='mask'>
                <h3>八维生产性实训平台</h3>
                    <div className='login_big'>
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                            style={{height:'55px',padding:'0 30px',lineHeight:'55px'}}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号"  style={{height:'35px'}}/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                            style={{height:'55px',padding:'0 30px',lineHeight:'55px'}}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            style={{height:'35px'}}
                            />
                        </Form.Item>

                        <Form.Item
                        >
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                            className='yes'
                            style={{height:'55px',padding:'0 30px',lineHeight:'55px'}}
                        >
                            <Input  
                                placeholder='输入验证码' 
                                className='dan'
                                type="code"
                                style={{height:'35px',width:'210px'}}
                                />
                        </Form.Item>
                                <img src={url} alt="" 
                                     onClick={vaildation}  
                                     style={{width:'100px',height:'40px',marginLeft:'110px',marginTop:'7px'}}/>
                        </Form.Item>

                        <div style={{display:'flex'}}>
                        <Form.Item style={{height:'55px',padding:'0 30px',lineHeight:'55px',width:"230px"}}>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item name="key" label="" style={{height:'55px',lineHeight:'55px',width:"200px"}}>
                                <Radio.Group style={{marginLeft:'10px'}}>
                                    <Radio value="student">学生</Radio>
                                    <Radio value="teacher">老师</Radio>
                                </Radio.Group>
                        </Form.Item>
                        </div>

                        <Form.Item style={{height:'55px',padding:'0 30px',lineHeight:'55px',marginTop:'10px'}}>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{height:'40px'}}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                    </div>
                </div>
            </div>
}
export default Login