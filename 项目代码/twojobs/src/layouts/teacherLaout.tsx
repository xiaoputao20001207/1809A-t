import { Layout } from 'antd'
import React, { useEffect } from 'react'
import './teacher.css'
import { NavLink, history, useIntl } from 'umi'
import { Popover,  Badge, Spin, Select } from 'antd';
import { BellOutlined, UserOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';
import {observer} from 'mobx-react-lite'
import useStore from '@/context/useStore';
import need from '@/store/modules/need';
import { getLocale, setLocale } from '@/.umi/plugin-locale/localeExports';
import Breadcrumb from '@/components/breadCrumb'

  const { Header, Content, Footer } = Layout

  const TeacherLayout: React.FC = (props) => {

  let {personcenter,global} = useStore()
  
    //实例化
  const intl = useIntl();

  const enLanguage:{[key:string]:string} = {
      'en':'en-US',
      'en-US':'en-US'
  }

    useEffect(() => {
        setTimeout(() => {
          global.hideLoading()
        }, 1000);
        let language = navigator.language
        if(language){
          setLocale(enLanguage[language],false)
        }
    }, [])

    return <Layout>
         
          <Header>
            <img src="http://111.203.59.61:8060/static/img/w_bw.172a76e5.png" alt=""/>
            
            <NavLink to='/teachers/postSkill'>{
                intl.formatMessage({
                  id:'header.jobs'
                })
              }</NavLink>
            <NavLink to='/teachers/proManagement'>{
                intl.formatMessage({
                  id:'header.project'
                })
              }</NavLink>
            <Popover placement="bottomLeft" content={ <div style={{width:'100px'}}>
                        <p> <NavLink to="/teachers/planList">{intl.formatMessage({id:'header.training-plan'})}</NavLink></p>
                          <p><NavLink to="/teachers/viewPlan">{intl.formatMessage({id:'header.training-progress'})}</NavLink></p>
                          <p><NavLink to="/teachers/defence">{intl.formatMessage({id:'header.training-plea'})}</NavLink></p>
                        </div>} trigger="hover">
              <a>
              {
                intl.formatMessage({
                  id:'header.training'
                })
              }
              </a>
            </Popover>
            <Popover  placement="bottomLeft" content={<div style={{width:'200px'}}>
                                      <p><NavLink to="/teachers/interviewList">{intl.formatMessage({id:'header.interview-the interview records'})}</NavLink></p>
                                      <p><NavLink to="/teachers/interviewManage">{intl.formatMessage({id:'header.interview-interview Record Management'})}</NavLink></p>
                                      <p><NavLink to="/teachers/rankList">{intl.formatMessage({id:'header.interview-interview leaderboard'})}</NavLink></p>
                                    </div>} trigger="hover">
                <a>
                {
                  intl.formatMessage({
                    id:'header.interview'
                  })
                }
                </a>
            </Popover>
            <Popover  placement="bottomLeft" content={ <div style={{width:'200px'}}>
                    <p><NavLink to="/teachers/questionDetail">{intl.formatMessage({id:'header.question-list'})}</NavLink></p>
                    <p><NavLink to="/teachers/questionHandle">{intl.formatMessage({id:'header.question-management'})}</NavLink></p>
                  </div>} trigger="hover">
               <a>
                  {
                    intl.formatMessage({
                      id:'header.question'
                    })
                  }
               </a>
            </Popover>

                <Select value={getLocale()} onChange={value=>setLocale(value,false)}>
                    <Select.Option value='zh-CN' >中文</Select.Option>
                    <Select.Option value='en-US' >Engilsh</Select.Option>
                  </Select>

            <div style={{float:'right',marginRight:'100px',height:'50px'}}>
            <Popover  placement="bottomRight" content={
                        <div style={{width:'300px'}}>
                        <h2 style={{borderBottom:'1px solid #ccc',padding:'10px 0'}}><b>待办事项</b></h2>
                        {
                          need.needTabList && need.needTabList.map(item=>{
                            return <p><NavLink to="" key={1}></NavLink></p>
                          })
                        }
                        <p style={{textAlign:"center"}}><NavLink to="/teachers/needHandle"> <span style={{color:'grey'}} >查看全部</span> </NavLink></p>
                      </div>}
                    trigger="hover">
              <Badge count={2}  style={{marginTop:"15px",position:'absolute',top:'-30px',right:'5px'}}>
                  <BellOutlined style={{fontSize:'25px',color:"white",position:'absolute',top:'-13px',right:'5px'}}/>
              </Badge>
            </Popover>
              
            <Popover  placement="bottomLeft" content={
                <div style={{width:'100px'}}>
                    <p><NavLink to="/teachers/teacherPersonCenter"> <UserOutlined style={{color:'grey'}}/> <span>个人中心</span></NavLink></p>
                    <p><NavLink to="/teachers/needHandle"> <ProfileOutlined style={{color:'grey'}}/> <span> 我的代办</span> </NavLink></p>
                    <p onClick={e=>{
                        if(confirm('确定注销并退出系统吗？')){
                          personcenter.exit()
                          history.replace('/login')
                          
                        }else{
                          console.log('已取消');
                        }
                    }}> <LogoutOutlined style={{color:'grey'}}/> <a >退出</a></p>
                </div>} 
              trigger="hover">
              
                  <img 
                    style={{margin:'0 5px 0 25px',width:'40px',height:'40px',borderRadius:"50%"}}
                    src="http://111.203.59.61:8060/file_service/group1/M00/00/18/rBsCHWCect6AAI6AAAC1i-52NMk29.jpeg" alt=""/>
               <span style={{color:'white'}}>郭老师</span>
              </Popover>
           </div>
        </Header>
        <Breadcrumb></Breadcrumb>
        <Spin spinning={global.isLoading}>
          <Content>{props.children}</Content>
        </Spin>
        <Footer>
            <div data-v-01b3f466="" data-v-7178e8ae="" className="bw_bottom">
                <div data-v-01b3f466="" className="b_b_detail">
                    <div data-v-01b3f466="" className="b_b_left">
                            <div data-v-01b3f466="" className="bw_img"><img data-v-01b3f466="" src="http://111.203.59.61:8060/static/img/bottom_logo.c8aa9859.png" alt=""/></div>
                            <div data-v-01b3f466="" className="b_w_tel">400-008-0987</div></div>
                            <div data-v-01b3f466="" className="b_b_middle">
                            <div data-v-01b3f466="" className="middle_one middle"><div data-v-01b3f466="" className="middle_title" style={{width:'180px'}}>{intl.formatMessage({id:'footer.into the eight dimensions'})}</div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/about.html">集团概况</a></div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/news/index.html">八维动态</a></div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/lead.html">领导关怀</a></div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/honour.html">企业荣誉</a></div></div>
                            <div data-v-01b3f466="" className="middle_two middle"><div data-v-01b3f466="" className="middle_title" style={{width:'180px'}}>{intl.formatMessage({id:'footer.eight dimensions culture'})}</div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/culture.html">八维理念</a></div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/spirit.html">八维精神</a></div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/dak.html">文化驿站</a></div></div>
                            <div data-v-01b3f466="" className="middle_three middle"><div data-v-01b3f466="" className="middle_title" style={{width:'180px'}}>{intl.formatMessage({id:'footer.the social responsibility'})}</div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/duty/public.html">社会公益</a></div>
                            <div data-v-01b3f466="" className="href_a"><a data-v-01b3f466="" href="http://bwie.cn/bwie/duty/great.html">大善之举</a></div></div>
                            <div data-v-01b3f466="" className="middle_four middle"><div data-v-01b3f466="" className="middle_title" style={{width:'180px'}}>{intl.formatMessage({id:'footer.contact us'})}</div>
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
export default observer(TeacherLayout)