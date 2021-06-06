import React ,{FC,useEffect} from 'react'
import { Form, Input, Button, Checkbox, Radio, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {LoginPerson} from '@/utils/personcenter'
import useStore from '@/context/useStore';
import { observer } from 'mobx-react-lite'
import { history, setLocale,getLocale} from 'umi'
import './login.css'
import { removeCookie } from '@/utils/auth';

const Login:FC = ()=>{

    let {logins} = useStore()

    //刚进页面调验证码接口
    useEffect(() => {
        logins.Verificationcode()
        removeCookie()
    }, [])

    //点击登录
    function onFinish(value:LoginPerson){
        logins.loginPage(value).then(res=>{
            if(res){
                message.success('登录成功',2)
                //存储刚登陆的时间
                let starttime = + new Date()
                localStorage.setItem('startTime',JSON.stringify(starttime))
                
                history.replace('/teachers/postskill')
            }else{
                message.error('登录失败',2)
            }
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
                    style={{width:'100%'}}
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

                        <Form.Item >
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
                        
                            <img src={`data:image/gif;base64,${logins.loginList.img}`} alt="" 
                                     onClick={()=>logins.Verificationcode()}  
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
export default observer(Login)