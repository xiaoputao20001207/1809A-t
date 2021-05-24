import React, { Component } from "react";
import { request } from 'umi'
import "./login.css"
import {RouteComponentProps} from "react-router-dom"
interface Iprops extends RouteComponentProps{

}
export default class Login extends Component<Iprops> {
  state = {
    src: "",
    username: "",
    password: "",
    code: "",
    teacher: false,
    students: true,
    repassword: false,
  };
  //进页面首先调用一下
  componentDidMount() {
    this.getImg();
  }
  //获取验证码
  getImg = () => {
    request("http://111.203.59.61:8060/dev-api/captchaImage").then((ok) => {
      this.setState({
        src: ok.img,
      });
      localStorage.setItem("uuid", ok.uuid);
    });
  };
  //点击登录调用接口
  login = () => {
    let uuid = localStorage.getItem("uuid");
    let key = this.state.teacher ? "teacher" : "student";
    const { username, password, code } = this.state;
    if (username === "") {
      alert("用户名不能为空");
    } else if (password === "") {
      alert("密码不能为空");
    } else if (code === "") {
      alert("请输入验证码");
    } else {
        request("http://111.203.59.61:8060/dev-api/login", {
          username,
          password,
          code,
          uuid,
          key,
        })
        .then((res) => {
          this.props.history.push("/teachers/postSkill");
        });
    }
  };
  //获取username and password
  change = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  //改变记住密码状态
  changepassword = () => {
    this.setState({
      repassword: !this.state.repassword,
    });
  };
  //改变单选状态
  changestudents = () => {
    this.setState({
      students: !this.state.students,
      teacher: !this.state.teacher,
    });
  };
  //改变单选状态
  changeteacher = () => {
    this.setState({
      students: !this.state.students,
      teacher: !this.state.teacher,
    });
  };
  render() {
    const { username, password, code, teacher, students, repassword } =
      this.state;
    return (
      <div className="login">
        <div className="con">
          <h2>八维生产性实训平台</h2>
          <div className="userpass">
            <input
              type="text"
              value={username}
              name="username"
              onChange={this.change}
              placeholder="用户名"
            />
            <input
              type="text"
              value={password}
              name="password"
              onChange={this.change}
              placeholder="密码"
            />
            <div className="yan">
              <input
                type="text"
                value={code}
                name="code"
                onChange={this.change}
                placeholder="验证码"
              />
              <span>
                <img
                  src={"data:image/gif;base64," + this.state.src}
                  alt=""
                  onClick={() => {
                    this.getImg();
                  }}
                />
              </span>
            </div>
            <div className="xuan">
              <input
                type="checkbox"
                onChange={this.changepassword}
                checked={repassword}
              />
              记住密码
              <input
              className="study"
                type="radio"
                onChange={this.changestudents}
                checked={students}
              />
              学生
              <input
              className="teacher"
                type="radio"
                onChange={this.changeteacher}
                checked={teacher}
              />
              老师
            </div>
            <button onClick={() => this.login()}>登录</button>
          </div>
        </div>
      </div>
    );
  }
}
