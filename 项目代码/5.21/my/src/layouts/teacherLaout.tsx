import { Layout } from 'antd'
import React from 'react'
import './teacher.css'
import { NavLink } from 'umi'
import { Popover } from 'antd';

const { Header, Content, Footer } = Layout
const content = (
    <div style={{width:'100px'}}>
      <p>计划</p>
      <p>进度</p>
      <p>答辩</p>
    </div>
  );
  const contentinterview = (
    <div style={{width:'100px'}}>
      <p>面试记录</p>
      <p>面试记录管理</p>
      <p>面试排行榜</p>
    </div>
  );
  const contentquestions = (
    <div style={{width:'100px'}}>
      <p>问答列表</p>
      <p>问答管理</p>
    </div>
  );
const TeacherLayout: React.FC = (props) => {
    return <Layout>
        <Header>
            <img src="http://111.203.59.61:8060/static/img/w_bw.172a76e5.png" alt=""/>
            
            <NavLink to='/teacher/postSkill'>岗位</NavLink>
            <NavLink to='/teachers/proManagement'>项目</NavLink>
            <Popover placement="bottomLeft" content={content} trigger="hover">
                <NavLink to='/teachers/postSkill'>实训</NavLink>
            </Popover>
            <Popover  placement="bottomLeft" content={contentinterview} trigger="hover">
                <NavLink to='/teachers/postSkill'>面试</NavLink>
            </Popover>
            <Popover  placement="bottomLeft" content={contentquestions} trigger="hover">
                <NavLink to='/teachers/postSkill'>问答</NavLink>
            </Popover>
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