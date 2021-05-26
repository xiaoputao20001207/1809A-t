import React, { Component } from 'react'
import { Form, Input, Button, Checkbox ,Radio} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./login.scss"
import axios from "axios"
interface Iprops {
    onFinish:()=>void,
    changeImg:()=>void,
    onChange:(e:any)=>void
}
export default class Login extends Component<Iprops> {
    state={
        value:'',
        src:'data:image/gif;base64,'+"/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAA8AKADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDtrW1ga1hZoIySikkoOeKsCztv+feL/vgU2z/484P+ua/yqyKiMY8q0IjGPKtCIWdr/wA+0P8A3wKeLK1/59of+/YqQVj634q0vw89uuoTFDOcKFXPHcn2rWlh5VZqFON2+iQ2orVo1hZWn/PrD/37FOFjaf8APrB/37FZWoeK9H0zTBqE97GYGGY9hyX9gO9T+H/Edh4jsBeWLkqG2sjDDIfQiqeEqKn7Vw929r20v2FaF7GiLCz/AOfWD/v2KcLCz/59IP8Av2Kj1C/i03T57yUEpChcgdTimaPrVjrmnx3thOssLjt1U+hHY1HsHye05dNr+Y+WO1i0NPsv+fS3/wC/Y/wpw06y/wCfO3/79L/hU2cCuQ8X/EXTvCjpbiI3l63JgR9uxfVjg49hitMPhJ4moqVGN5MTUUrs6wadY/8APnb/APfpf8KcNNsf+fK3/wC/S/4VU0HWYNd0e11G3BWO4QMFbqp7j8DmtUVlOlyScZLVD5Y9iuNMsP8Anytv+/S/4U8aZYf8+Nt/36X/AAqwKUsFGTU8sewcsexANL0//nxtv+/K/wCFPGlaf/z4Wv8A35X/AArhNZ+LujaP4i/sswS3EUbbLi4jYYjbuAP4sd+fXrXd2epWl9axXNvcRywygFHVgQwNdNfAVqEYzqwspbabiXI9EOGlad/z4Wv/AH5X/CnDSdO/6B9r/wB+V/wq0vNPFc3LHsPlj2Ko0nTf+gfaf9+V/wAKranpenx6Reuljaq6wOVYQqCDtPI4rWFVdW/5At//ANe8n/oJpSjHlegpRjyvQ5Kz/wCPOD/rmv8AKrIqvZ/8ecH/AFzX+VWRTj8KHH4UI/CmvK/iZYNqKRTpnzrfIA/vKe31r1YrkVzXiHRvtcTEDmuvCYqphK0a9LdDlFSVmeGaNHZS3TLfklQvyruwCa1PDniOTwhr0kkDGeykO2RAfvLng/Uf40viPQ1sFknKEMD26da5kKWHygk+lfoWFxFDMac69WTVOVouL2T7p9PJ6a/I5JJwdlufQ99qNrrnh1ngkEltdQkBh6Ef54rz/wCHN6/h/wAWXOkXPyi5HyE9yOR+YzWNoviy90CxtrG5sgbElju53nJycduM9K1vEFulzYQ63p0gMtsRNFIvoDk/l/Svn4YWeDlPCVNaNbSMrpq6fuvTz3X+Rq5KXvLdHtU0+23Lj0r558WxNf8AjHVdxPmnDR5PXAHH5V7VourR634dt7yPpLHkgdj3H515H40RdO8Wx3UiN5UseG2jqRx/hXHkcq1DE1KdPSpyyS9U07fhYqrZxTexsfCvxeNOuRoF++xJJD9nZuNrnqn4np759RXt4mRYt7HCjqfT3NfNF/pkOp2QvrFg0gHIH8WOx9x/ntXd+AviYs0EWka3MRcj5Ibl+kg7Bj/e9+/167ZjhFjoSx2Gi1JfxIdYvv6P+utlCXL7r+R6X4g8T6Z4Y083mpTbFJwiIMvIfRR3qlpPi/TPE2ltd6ZMTtOJIpBh4z23D+vT8q838TaNpdlqs2t38lxc2kajy7RyXSMk9Bk/d6YXoPpxXOtZW2ryHUPDd2dOlb5J4VYxgA/7vT6dDXNRwODqUOZykv79vcT/AJX1+ffyG5STOmtrXQYLvU9Is1hnYyM9xERnAJ+6PZeBx04zzXHa5ot3ocZuLHUJhapICse8gxnPHsecVuaVc+EtAuYtPld2vAfnvwv+rf69h7DI7HPNavjbSZJ9Ecw7ZHIDAx9Gwc8fX/Oa7aOLrYLGwfNL2c2rua3Wzku3l1StclxUo+aO4+GvjL/hI9CiiuZAb+3UJLk8vjgN+Pf3rv15FfMHgWW70nxRZI++B3fjJ4de496+mbSTzIlPtXm51haWHxLdBpwlqrbfLyLpybjqWhVXVv8AkCX/AP17Sf8AoJq2Kq6v/wAgS/8A+vaT/wBBNeNL4WVL4WclZ/8AHlB/1zX+VWRVey/48oP+ua/yqyKI/Cgj8KHCkeMOpBFOFOAqijhvFehpc20g2Agg5rx69099Hvld0LQFsfT2r6TurVZ4yCK4TXfDKXAdGiDo3UV6OXY94WTjNXpy0ku68vNdCJw5ttzye8ll1TbHaxsYIu57mtnw5JcWuj6lDdKVt9hKhugODn8+K6+18JfuljSIIi9ABUep+FLq4jjtEdYrVjmYjO9gD0HGPx/SvR/teFSmsHGChSTTT1clZ3b82/1sR7Np83Uv/CzzR4a8t87WkYpn0qfxboMV+oE8PmIrbhyRg/hXQ+GdMWyt44Y02RooVV9BXQ3Onx3EeGUGvJxWLlVxU8TT91ttq26NIxtGzPmzUNAvLOd0tHb7PJ1BbGPY+tZN1ZvbscKxQY+YivoW88IxTMSFrCu/Ail+EBB6jHWvXw3E+MpTi52klvpq/Nvv5/fczdGLOZ8H2epT6bcx6mxntpVXyllfzDjHPrgYxxVPV/CEguvP0qT7IzcOgJVSPbHT6dK9W0Lw4LWIKy8DjFas3h6KRs7RXnf2riI4iWIp2i5bpL3fu2/4Jfs1azPIbDwlp8Wnm2ntRMzj5piMPn1B7f5zmn6L4V1KxvS0uptLYxoyRQkseD7Hhex49K9fTw9CExtFJ/YCIDhah5pi5RnGc7qe99fuvt8g5I6HgOpTyeFvEhLWons3dZkjclQHHdGH3SD6djX0f4euheaVbXG3b5sSvt9MjOK4bWvCcN+3k3NussJOdp7H1BHIruNDgaC2RCMADAA7VWMxdPEUaSUbTirN99rfPv8An2Ixab7G4Kq6v/yBL/8A69pP/QTVsVV1f/kCX/8A17Sf+gmvMl8LHL4WclZf8eVv/wBc1/lVkVzMWtXMUSRqkRCKFGQe341J/b91/wA84f8Avk/41lGtGyM41Y2R0opwrmf+Ehu/+ecH/fJ/xpf+Eiu/+ecH/fJ/xqvbRH7aJ1AGaje2STqornP+EkvP+eUH/fJ/xpf+ElvP+eUH/fJ/xo9tEPbROjS0jUcKKjksEkbJArB/4Se9/wCeVv8A98t/jS/8JRe/88rf/vlv8aPbRD20TqLe2WIYAq0BXHf8JVfD/llb/wDfLf40v/CV33/PK2/75b/Gj20Q9tE7IKDR5KnqBXHf8Jbf/wDPG2/75b/Gl/4S/UP+eNt/3y3/AMVR7aIe2idokar0FSgCuH/4TDUP+eNr/wB8t/8AFUv/AAmWo/8APG1/75b/AOKo9tEPbRO6Ap20GuE/4TPUf+eNr/3w3/xVL/wmupf88LT/AL4b/wCKo9tEPbRO2a1RzkqKniiCDAFcH/wm2pf88LT/AL4b/wCKpf8AhONT/wCeFp/3w3/xVHtoh7aJ6CKq6v8A8gPUP+vaT/0E1xX/AAnOp/8APC0/74b/AOKqO58Z6jdWs1u8NqElRkYqrZAIxx81TKtGzFKrGzP/2Q=="
    }
    onFinish = (values: any) => {
        axios.post('http://111.203.59.61:8060/dev-api/login',{
            username:values.username,
            key:this.state.value,
            password:values.password,
            uuid:localStorage.getItem('uuid'),
            code:values.ver
        }).then(res=>{
            if(res.data.code==200){
                console.log('灯枯成功')
            }
        })
      };
      onChange = (e:any) => {
        this.setState({
            value:e.target.value
        })
      };
      changeImg=()=>{
            axios.get('http://111.203.59.61:8060/dev-api/captchaImage').then(res=>{
                this.setState({
                    src:'data:image/gif;base64,'+res.data.img
                })
                localStorage.setItem('uuid',res.data.uuid)
            })
      }
    render() {
        return (
            <div className='login'>
               <Form 
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
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
                        name="ver"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="验证码" />
                        </Form.Item>
                        <img onClick={this.changeImg} src={this.state.src} alt="" />
                    </Form.Item>

                    <Form.Item >
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Radio.Group onChange={(e)=>{this.onChange(e)}} value={this.state.value}>
                            <Radio value={'student'}>学生</Radio>
                            <Radio value={'teacher'}>老师</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                        </Button>
                    </Form.Item>
                    </Form>
            </div>
        )
    }
}
