import { Layout } from 'antd'
import React from 'react'
import './teacher.css'
import { NavLink } from 'umi'
import { Popover, Avatar, Image, Badge } from 'antd';
import { BellOutlined, UserOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout
const content = (
    <div style={{width:'100px'}}>
     <p> <NavLink to="/teachers/planList">计划</NavLink></p>
      <p><NavLink to="/teachers/viewPlan">进度</NavLink></p>
      <p><NavLink to="/teachers/defence">答辩</NavLink></p>
      <p><NavLink to="/teachers/planListManage">计划(管理)</NavLink></p>
    </div>
  );
  const contentinterview = (
    <div style={{width:'100px'}}>
      <p><NavLink to="/teachers/interviewList">面试记录</NavLink></p>
      <p><NavLink to="/teachers/interviewManage">面试记录管理</NavLink></p>
      <p><NavLink to="/teachers/rankList">面试排行榜</NavLink></p>
    </div>
  );
  const contentquestions = (
    <div style={{width:'100px'}}>
      <p><NavLink to="/teachers/questionDetail">问答列表</NavLink></p>
      <p><NavLink to="/teachers/questionHandle">问答管理</NavLink></p>
    </div>
  );
  const Laozy = (
    <div style={{width:'100px'}}>
      <p><NavLink to="/teachers/answerDetail">问答</NavLink></p>
      <p><NavLink to="/teachers/answerDetail">问答</NavLink></p>
    </div>
  );
  const headerList = (
    <div style={{width:'100px'}}>
      <p><NavLink to="/teachers/teacherPersonCenter"> <UserOutlined style={{color:'grey'}}/> <span>个人中心</span></NavLink></p>
      <p><NavLink to="/teachers/needHandle"> <ProfileOutlined style={{color:'grey'}}/> <span> 我的代办</span> </NavLink></p>
      <p> <LogoutOutlined style={{color:'grey'}}/> <a>退出</a></p>
    </div>
  );
const TeacherLayout: React.FC = (props) => {
    return <Layout>
        <Header>
            <img src="http://111.203.59.61:8060/static/img/w_bw.172a76e5.png" alt=""/>
            
            <NavLink to='/teachers/postSkill'>岗位</NavLink>
            <NavLink to='/teachers/proManagement'>项目</NavLink>
            <Popover placement="bottomLeft" content={content} trigger="hover">
               <a>实训</a>
            </Popover>
            <Popover  placement="bottomLeft" content={contentinterview} trigger="hover">
                <a>面试</a>
            </Popover>
            <Popover  placement="bottomLeft" content={contentquestions} trigger="hover">
               <a>问答</a>
            </Popover>
           <div style={{float:'right',marginRight:'100px',height:'50px'}}>
            <Popover  placement="bottomRight" content={Laozy}trigger="hover">
                <Badge count={2}  style={{marginTop:"15px",position:'absolute',top:'-30px',right:'5px'}}>
                  <BellOutlined style={{fontSize:'25px',color:"white",position:'absolute',top:'-13px',right:'5px'}}/>
                </Badge>
              </Popover>
              <Popover  placement="bottomLeft" content={headerList} trigger="hover">
              
                  <img 
                    style={{margin:'0 5px 0 25px',width:'40px',height:'40px',borderRadius:"50%"}}
                    src="http://111.203.59.61:8060/file_service/group1/M00/00/18/rBsCHWCect6AAI6AAAC1i-52NMk29.jpeg" alt=""/>
               <span style={{color:'white'}}>郭老师</span>
              </Popover>
           </div>
        </Header>
        <Content>{props.children}</Content>
        <Footer>
            <div data-v-01b3f466="" data-v-7178e8ae="" className="bw_bottom">
                <div data-v-01b3f466="" className="b_b_detail">
                    <div data-v-01b3f466="" className="b_b_left">
                            <div data-v-01b3f466="" className="bw_img"><img data-v-01b3f466="" src="http://111.203.59.61:8060/static/img/bottom_logo.c8aa9859.png" alt=""/></div>
                            <div data-v-01b3f466="" className="b_w_tel">400-008-0987</div></div>
                            <div data-v-01b3f466="" className="b_b_middle">
                            <div data-v-01b3f466="" className="middle_one middle"><div data-v-01b3f466="" className="middle_title">走进八维</div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/about.html">集团概况</a></div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/news/index.html">八维动态</a></div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/lead.html">领导关怀</a></div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/honour.html">企业荣誉</a></div></div>
                            <div data-v-01b3f466="" className="middle_two middle"><div data-v-01b3f466="" className="middle_title">八维文化</div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/culture.html">八维理念</a></div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/spirit.html">八维精神</a></div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/dak.html">文化驿站</a></div></div>
                            <div data-v-01b3f466="" className="middle_three middle"><div data-v-01b3f466="" className="middle_title">社会责任</div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/duty/public.html">社会公益</a></div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/duty/great.html">大善之举</a></div></div>
                            <div data-v-01b3f466="" className="middle_four middle"><div data-v-01b3f466="" className="middle_title">联系我们</div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/partners.html">业务合作</a></div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/sign_up.html">咨询报名</a></div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/concact.html">联系方式</a></div></div></div>
                            <div data-v-01b3f466="" className="b_b_right"><img data-v-01b3f466="" src="http://111.203.59.61:8060/static/img/wechat.e60a83ec.png" alt=""/>
                            <div data-v-01b3f466="" className="wechat_text">八维微信公众号</div></div></div>
            </div>
                            <div data-v-01b3f466="" className="b_b_sign_bootm_son">京公网安备 11010802031438号 © Copyright 2020. 八维教育版权所有 | 京ICP备12008262号-12</div>
        </Footer>
    </Layout>
}
export default TeacherLayout