import { Layout ,Menu, Dropdown, message} from 'antd';
import { FC, useState } from 'react';
import { DownOutlined , MailOutlined ,AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import "./teachersLayout.css"
import { NavLink } from 'umi';
const { SubMenu } = Menu;
// interface Iprops{
//     onClick:(key:string)=>void
// }
const { Header, Content, Footer } = Layout;
const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">计划</Menu.Item>
      <Menu.Item key="2">进度</Menu.Item>
      <Menu.Item key="3">答辩</Menu.Item>
    </Menu>
  );
  
  const menu1 = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">面试记录</Menu.Item>
      <Menu.Item key="2">面试记录管理</Menu.Item>
      <Menu.Item key="3">面试排行榜</Menu.Item>
    </Menu>
  );
  const menu2 = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">问答列表</Menu.Item>
      <Menu.Item key="2">问答管理</Menu.Item>
    </Menu>
  );
const BasicLayout:FC=(props) =>{
  const [current,setCurrent]= useState('')
 const  handleClick = (e: any) => {
    console.log('click ', e);
    
  };
      return (
        <Layout>
          <Header>
            {/* <div style={{ color: 'white' }}>王者荣耀资料库</div> */}
            <img src="http://111.203.59.61:8060/static/img/w_bw.172a76e5.png" alt="" className='img'/>
            <NavLink to="/teachers/postSkill" className="head-item headshine">岗位</NavLink>
            <NavLink to="/teachers/proManagement" className="head-item">项目</NavLink>4r
            <Dropdown overlay={menu} className="head-item">
              <NavLink to="/teachers/proManagement" className="head-item ant-dropdown-link">实训 <DownOutlined /></NavLink>
            </Dropdown>
            <Dropdown overlay={menu1} className="head-item">
            <NavLink to="/teachers/proManagement" className="head-item ant-dropdown-link">面试 <DownOutlined /></NavLink>
            </Dropdown>
            <Dropdown overlay={menu2} className="head-item">
            <NavLink to="/teachers/proManagement" className="head-item ant-dropdown-link">问答 <DownOutlined /></NavLink>
            </Dropdown>

      {/* <Menu onClick={(e)=>{handleClick(e)}} selectedKeys={[current]} mode="horizontal">
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <NavLink to="/teachers/postSkill">岗位</NavLink>
        </Menu.Item>
        <Menu.Item key="alipay">
          <NavLink to="/teachers/proManagement">项目</NavLink>
        </Menu.Item>
      </Menu> */}

          </Header>
          <Content style={{ padding: '0 50px' }}>
            {props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <div data-v-01b3f466="" data-v-7178e8ae="" className="bw_bottom">
                <div data-v-01b3f466="" className="b_b_detail">
                        <div data-v-01b3f466="" className="b_b_left">
                            <div data-v-01b3f466="" className="bw_img"><img data-v-01b3f466="" src="http://111.203.59.61:8060/static/img/bottom_logo.c8aa9859.png" alt="" /></div>
                            <div data-v-01b3f466="" className="b_w_tel">400-008-0987</div>
                        </div>
                        <div data-v-01b3f466="" className="b_b_middle">
                            <div data-v-01b3f466="" className="middle_one middle"><div data-v-01b3f466="" className="middle_title">走进八维</div>
                                <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/about.html">集团概况</a></div>
                                <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/news/index.html">八维动态</a></div>
                                <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/lead.html">领导关怀</a></div>
                                <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/honour.html">企业荣誉</a></div>
                            </div>
                            <div data-v-01b3f466="" className="middle_two middle"><div data-v-01b3f466="" className="middle_title">八维文化</div>
                                <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/culture.html">八维理念</a></div>
                                <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/spirit.html">八维精神</a></div>
                                <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/dak.html">文化驿站</a></div>
                            </div>
                            <div data-v-01b3f466="" className="middle_three middle"><div data-v-01b3f466="" className="middle_title">社会责任</div>
                                <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/duty/public.html">社会公益</a></div>
                                <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/duty/great.html">大善之举</a></div>
                            </div>
                            <div data-v-01b3f466="" className="middle_four middle"><div data-v-01b3f466="" className="middle_title">联系我们</div>
                                <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/partners.html">业务合作</a></div>
                                <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/sign_up.html">咨询报名</a></div>
                                <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/concact.html">联系方式</a></div>
                            </div>
                        </div>
                    <div data-v-01b3f466="" className="b_b_right">
                        <img data-v-01b3f466="" src="http://111.203.59.61:8060/static/img/wechat.e60a83ec.png" alt=""/>
                        <div data-v-01b3f466="" className="wechat_text">八维微信公众号</div>
                    </div>
                </div>
                    <div data-v-01b3f466="" className="b_b_sign">京公网安备 11010802031438号 © Copyright 2020. 八维教育版权所有 | 京ICP备12008262号-12</div>
            </div>
          </Footer>
        </Layout>
      );
    }
    
    export default BasicLayout;