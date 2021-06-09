import { FC, useEffect, useState ,useRef} from "react";
import { Socket, io } from 'socket.io-client';
import { message } from 'antd'

import "./weichat.css"
// interface IuserList {
//     username: string
// }
interface IMessage {
    username: string
    message?: string
    text?:string
}
let socket: Socket; // socket实例

const WeiChat:FC=()=>{
    const [username,setUsername] = useState('')
    const [text,setText] = useState('')
    const [isLogin,setIsLogin] = useState(false)
    const [messages, setMessages] = useState<IMessage[]>([]);
    const content = useRef<HTMLElement>(null);
    
    const [userList,setUserList] = useState<string[]>([])
//用户名单
// const userList:any = []

    let socket = io('http://localhost:8080');
    useEffect(() => {
        socket.on('send',data=>{
            setMessages(messages=>[...messages, data])
            console.log(messages)
        })
    }, [])

    //用户登录
    function loginchat(){
        //用户名为空
        if(!username){
            message.warn('请正确输入您的用户名称');
            return false
        }
        socket.emit('login', {username});
        //登录成功
        socket.on('loginSuccess',data=>{
            message.success(data.msg);
            //用户名
            setUserList([...userList,data.data.username]);
            //改变 状态
            setIsLogin(!isLogin)
        })


    }
    //发送信息
    function sendMessage(){
        if(!text){
            message.warn('不能发送空信息哦~~~');
            return false
        }
    // 向socket发送 trigger_send事件,带上 发送的内容 以及 当事人名字
        socket.emit('trigger_send', { message:text, username});
        setMessages([...messages, {message: text, username}]);
    }
    return <div className="chat">
        {
            !isLogin?<div className="chatlogin">
                <h2>用户登录</h2>
                <div>用户名:</div>
                <input type="text" className="login_name" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                <button className="goChat" onClick={loginchat}>登录</button>
            </div>
            : <div className='weichat'>
                {
                    userList?<div className="userchat">
                            <p>聊天室总人数--{userList.length}</p>
                            { userList.map((item,index)=>{
                                return <span key={index}>{item +'进入聊天室啦~~'}</span>
                            })}
                            <div className="contentchat">
                                {
                                    messages && messages.map((item,index)=>{
                                        return (username===item.username) && item.message?<div className="self" key={index+'q'}>
                                            <span>{username}</span>
                                            <span>{item.message}</span>
                                        </div>
                                        :<div className="other" key={index+'q'}>
                                            <span>{item.username}</span>
                                            <span>{item.message}</span>
                                        </div>
                                    })
                                }
                            </div>
                            
                            <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}} />
                            <button onClick={sendMessage}>发送</button>
                    </div>
                    :''
                }
                </div>

        }
            
        </div>
}
export default WeiChat