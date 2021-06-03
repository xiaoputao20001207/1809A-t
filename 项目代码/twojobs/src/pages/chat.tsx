import React, { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { message } from 'antd'
import styles from './chat.less'

const COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];

interface IMessage {
    username: string
    message: string
}
let socket: Socket; // socket实例

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [text, setText] = useState('');
    const [username, setUsername] = useState('');
    const [isAddUser, setIsAddUser] = useState(false);
    const messageList = useRef<HTMLElement>(null);
    const shuru = useRef<HTMLElement>(null);

    // 监听消息列表，让页面自动滚到最下方
    useEffect(() => {
        if (!messageList.current){
            return;
        }
        (messageList.current as HTMLElement).scrollTop = messageList.current?.scrollHeight as number;
        console.log(messageList.current.scrollTop, messageList.current?.scrollHeight);
    }, [messages]);

    useEffect(() => {
        console.log('socket...', socket);
        if (socket) {
            return;
        }
        // 建立socket实例
        socket = io('http://10.0.8.42:3000');
        // 监听连接成功
        socket.on('connect', () => {
            console.log('alerady connect');
            socket.emit('add user', username);
        })
        // 监听message
        socket.on('new message', (res: IMessage) => {
            // console.log('res...', res, messages, [...messages, res]);
            setMessages(messages=>[...messages, res])
        })
        // 监听用户进入聊天室
        socket.on('user joined', (data) => {
            console.log('data...', data);
            let message = '';
            if (data.numUsers === 1) {
                message += `there's 1 participant`;
            } else {
                message += `there are ${data.numUsers} participants`;
            }
            setMessages(messages=>[...messages, ({ ...data, message })])
        });
    }, [])

    // 随机获取用户名的颜色
    function getUsernameColor() {
        let index = Math.floor(Math.random() * 12);
        return COLORS[index];
    }

    // 处理用户发送消息
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            if (!text) {
                message.warn('please input your message');
                return;
            }
            console.log('send messages...', messages);
            setMessages([...messages, {message: text, username}]);
            socket.emit('new message', text);
        }
    }

    // 处理用户起昵称
    function handleUserKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            if (!username) {
                message.warn('please input your nickName');
                return;
            }
            socket.emit('add user', username);
            setIsAddUser(true);
        }
    }

    return <div className={styles.container}>
        {!isAddUser ? <section className={styles.wrap}>
            <span>What's your nickname?</span>
            <input type="text" value={username}  onChange={e => setUsername(e.target.value)} onKeyDown={e => handleUserKeyDown(e)} placeholder='请输入昵称' />
        </section> :
        <section className={styles.chat}>
            <section className={styles.list} ref={messageList}>
                {messages && messages.map((item, index) => {
                    return <p key={index}>
                        <span style={{ color: getUsernameColor() , display:'inline-block', margin:"5px 15px" , border:"2px solid #000" ,padding:"3px 7px"}}>{item.username}</span>
                        <span>{item.message}</span>
                    </p>
                })}
            </section>
            <section>
                <input type="text" ref={shuru} value={text} className={styles.inp} onChange={e => setText(e.target.value)} onKeyDown={e => handleKeyDown(e)} placeholder="天马行空" />
            </section>
        </section>}
    </div>
}

export default Chat;