import React, { Component, FC, useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox ,Radio} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./login.css"
import { goLogin } from '@/service/modules/login';
import { LoginParams } from '@/utils/interface';
import { observer } from 'mobx-react-lite';
import useStore from '@/context/useStore';
import { IRouteComponentProps } from '@umijs/renderer-react';

const  Login :FC<IRouteComponentProps>=({location,history})=> {
    const [key,setKey]= useState('teacher')
    const [src,setSrc]= useState('')
    const {user} = useStore()

    useEffect(()=>{
        changeImg()//验证码
    },[])
//表单提交
    async function onFinish(values: any) {
            //登录
        let result = await user.login(values)
        // if(result){
        //     if(location.query.redirect){
        //         history.replace(decodeURIComponent(location.query.redirect))
        //     }else{
        //         history.replace('/')
        //     }
        // }
    };
    function onChange(e:any){
        setKey(e.target.value)
    };
    function changeImg(){
        user.getCaptureImage()
    }
        return (
            <div className='login'>
                <Form 
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true ,username:'郭老师',password:'123456',key:'teacher'}}
                    onFinish={onFinish}
                    >
                    <h2>八维生产性实训平台</h2>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                        />
                    </Form.Item>

                    <Form.Item >
                        <Form.Item
                        className='ver'
                        name="code"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="验证码" />
                        </Form.Item>
                        {
                            user.captchImage.img? <img onClick={changeImg} src={ `data:image/gif;base64,${user.captchImage.img}`} alt="" />
                            :''
                        }
                       
                    </Form.Item>

                    <Form.Item >
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住密码</Checkbox>
                        </Form.Item>
                        <Radio.Group>
                            <Radio value={'student'}>学生</Radio>
                            <Radio value={'teacher'}>老师</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
}

export default observer(Login)