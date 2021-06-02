import React, { useState } from 'react';
import style from './addProject.less';
import styles from "./proJect.less"
import { IRouteComponentProps, request } from 'umi';
import { Button, Form, Input, Select, Upload,Tabs,Layout, Menu ,Cascader,Radio} from 'antd';
import Editor from 'for-editor'
import {SendOutlined,SaveOutlined,CopyOutlined} from '@ant-design/icons';
import useStore from '@/context/useStore';
import { ISkilldairn, Addpro } from '@/utils/interface';
import { observer } from '_mobx-react-lite@3.2.0@mobx-react-lite';
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const { SubMenu } = Menu;
//定义header
const tab = ['实训大纲', '实训任务', '项目资源', '实训环境', '前置项目']
const Demo = () => (
  <Tabs defaultActiveKey="1" className={styles.Tabs}>
      <TabPane tab="实训大纲" key="1" >
          <Layout >
              <Content >
                  <Layout >
                      <Sider className="site-layout-background" width={260}>
                          <Menu
                              className={styles.ant_menu}
                              mode="inline"
                              defaultSelectedKeys={['1']}
                              defaultOpenKeys={['sub1']}
                              style={{ height: '100%' }}
                          >
                              {
                                  // TrainingSyllabus.map((item, index) => {
                                  //     return <SubMenu key={index} title={item.label}>
                                  //         {
                                  //             item.children.map((_item1: any, index1: any) => {
                                  //                 return <Menu.Item key={_item1.value}>{_item1.label}</Menu.Item>
                                  //             })
                                  //         }
                                  //     </SubMenu>
                                  // })
                              }
                          </Menu>
                      </Sider>
                      <Content style={{ padding: '0 24px', minHeight: 280 }}>
                          <Editor placeholder="开始编辑..."
                              // value={title}
                              // onChange={(value) => { settitle(value); console.log(value) }} 
                              />
                      </Content>
                  </Layout>
              </Content>
          </Layout>
      </TabPane>
      <TabPane tab="实训任务" key="2" >
          <Button type="primary">+添加任务</Button>
      </TabPane>
      <TabPane tab="项目资源" key="3">
          <Layout >
              <Content >
                  <Layout >
                      <Sider className="site-layout-background" width={260}>
                          <Menu
                              className={styles.ant_menu}
                              mode="inline"
                              defaultSelectedKeys={['1']}
                              defaultOpenKeys={['sub1']}
                              style={{ height: '100%' }}
                          >
                              {
                                  // ProjectResourcesList.map((item, index) => {
                                  //     return <SubMenu key={index} title={item.label}>
                                  //         {
                                  //             item.children.map((_item1: any, index1: any) => {
                                  //                 return <Menu.Item key={_item1.value}>{_item1.label}</Menu.Item>
                                  //             })
                                  //         }
                                  //     </SubMenu>
                                  // })
                              }
                          </Menu>
                      </Sider>
                      <Content style={{ padding: '0 24px', minHeight: 280 }}>
                          <div className={styles.resource}>
                              <div className={styles.resource_title}>
                                  <CopyOutlined />保存
                            </div>
                              <div className={styles.resource_content}>
                                  <div>
                                      <span>资源名称</span>
                                      <Input />
                                      <span>+</span>
                                      <span>-</span>
                                  </div>
                                  <div>
                                      <span>提交类型</span>
                                      <Radio>文件</Radio>
                                      <Button type="primary">+上传文件</Button>
                                  </div>
                                  <div>
                                      <Radio>链接</Radio>
                                      <Input placeholder='请输入链接地址' />
                                  </div>
                                  <div>
                                      <span>描述</span>
                                      <Input placeholder='请输入内容' />
                                  </div>
                                  <div>
                                      <span>教师</span>
                                      <Radio>可见</Radio>
                                      <Radio>可下载</Radio>
                                  </div>
                                  <div>
                                      <span>学生</span>
                                      <Radio>可见</Radio>
                                      <Radio>可下载</Radio>
                                      <Radio>不可见</Radio>
                                  </div>
                              </div>
                          </div>
                      </Content>
                  </Layout>
              </Content>
          </Layout>
      </TabPane>
      <TabPane tab="实训环境" key="4">
          <div className={styles.environment}>
              <div className={styles.environment_title}>
                  <CopyOutlined />保存
                            </div>
              <div className={styles.environment_content}>
                  <div>
                      <span>环境名称</span>
                      <Input placeholder='请输入标题' />
                      <span>+</span>
                      <span>-</span>
                  </div>
                  <div>
                      <span>环境地址</span>
                      <Input placeholder='请输入外部链接地址' />
                      <span>+</span>
                      <span>-</span>
                  </div>
                  <div>
                      <span>环境描述</span>
                      <Input placeholder='请输入内容' />
                      <span>+</span>
                      <span>-</span>
                  </div>
              </div>
          </div>
      </TabPane>
      <TabPane tab="前置项目" key="5">
          <div className={styles.lead}>
              <div className={styles.lead_title}>
                  <CopyOutlined />保存
              </div>
              <div className={styles.lead_content}>
                  <p>添加与新项目关联的项目</p>
                  <div>
                      {/* <Cascader options={LeadProjectList} placeholder="Please select" className={styles.select} /> */}
                  </div>
              </div>
          </div>
      </TabPane>
  </Tabs>
);
const AddProject: React.FC<IRouteComponentProps> = ({history,location}) => {
  //下拉菜单
  let [form] = Form.useForm();
  //引入usestore
  const { proSkill, skill } = useStore();
      //获取地址栏id判断是不是详情页
      let versionId = location.query.versionId as string
  //实训类型
  const dairn = ['全部', '生产实训', '教学实训', '专业群实训'];
  //添加项目
  async function addProject(value: Addpro) {
    let versionId = await proSkill.addProject(value);
    console.log(versionId);

    history.replace(`/teachers/addProject?versionId=${versionId}&see=false`)
  }
  //上传
  async function upLoad(e: any) {
    console.log(e);
    let form = new FormData();
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      form.append(files[i].name, files[i]);
    }
    request('http://123.206.55.50:11000/upload', {
      method: 'POST',
      form, //表示请求体
    });
  }
  return (
    <div className={style.addpro}>
      <div className={style.con}>
        <div className={style.top}>
          <h2>添加项目</h2>
          <div>
            <Button>返回</Button>
            <Button type="primary" icon={<SendOutlined />}>
              提交审核
            </Button>
          </div>
        </div>
        <div className={style.center}>
          <Form
            className={style.antform}
            onFinish={addProject}
            initialValues={proSkill.proAddItem}
            key={1}
          >
            <div className={style.ft}>
              <h2>基本信息</h2>
              <Button
                icon={<SaveOutlined />}
                type="link"
                block
                className="btn"
                htmlType="submit"
              >
                {false ? '编辑' : '保存'}
              </Button>
            </div>
            <div className={style.fc}>
              <div className={style.fcl}>
                <div className={style.fcl1}>
                  {/* 项目名称 */}
                  <Form.Item
                    name="name"
                    label="项目名称"
                    rules={[{ required: true, message: '请输入项目名称' }]}
                    className={style.f1}
                  >
                    <Input placeholder="请输入项目名称" disabled={false} />
                  </Form.Item>
                  {/* 版本 */}
                  <Form.Item
                    name="version"
                    label="版本 V"
                    rules={[{ required: true, message: '请输入版本' }]}
                    className={style.f2}
                  >
                    <Input />
                  </Form.Item>
                </div>
                {/* 简介 */}
                <Form.Item
                  label=""
                  name="description"
                  rules={[{ required: true, message: '请输入简介' }]}
                >
                  <TextArea placeholder="请输入项目简介" className={style.f3} />
                </Form.Item>
                <div className={style.fcl2}>
                  {/* 专业 */}
                  <Form.Item
                    name="trade"
                    label="专业"
                    rules={[{ required: true, message: '请选择专业' }]}
                    className={style.f4}
                  >
                    <Select placeholder="请选择专业">
                      {skill.toplist.map((item) => {
                        return (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  {/* 行业 */}
                  <Form.Item
                    name="majorStationList"
                    label="行业"
                    rules={[{ required: true, message: '请选择行业' }]}
                    className={style.f5}
                  >
                    <Select placeholder="请选择行业">
                      {proSkill.toplist1.map((item, index) => {
                        return (
                          <Select.Option key={index} value={item.id}>
                            {item.label}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className={style.fcl3}>
                  {/* 实训类型 */}
                  <Form.Item
                    name="sxType"
                    label="实训类型"
                    rules={[{ required: true, message: '请选择类型' }]}
                    className={style.f6}
                  >
                    <Select placeholder="请选择实训类型">
                      {dairn.map((item, index) => {
                        return (
                          <Select.Option key={index} value={index}>
                            {item}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  {/* 预期总工时 */}
                  <Form.Item
                    name="subjectTime"
                    label="预期总工时"
                    rules={[{ required: true, message: '请选择天数' }]}
                    className={style.f7}
                  >
                    <Input type="number" />
                    <span>天</span>
                  </Form.Item>
                </div>
                <div className={style.fcl4}>
                  {/* 技能点 */}
                  <Form.Item name="note" label="技能点">
                    <span>技能点由知识点内容生成</span>
                  </Form.Item>
                </div>
              </div>
              <div className={style.fcr}>
                {/* 上传 */}
                <Form.Item
                  label="封面"
                  name="pictureUrl"
                  className={style.upload}
                >
                  {/* <span>+
                    <p>上传封面</p>
                  </span>
                  <input type="file" onChange={(e)=>upLoad(e as any)}/> */}
                  <Upload
                  className={style.upl}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                  >
                    +上传封面
                  </Upload>
                </Form.Item>
                {/* 演示地址 */}
                <Form.Item
                  name="showUrl"
                  label="演示地址"
                  rules={[{ required: true, message: '请输入演示地址' }]}
                  className={style.ys}
                >
                  <Input placeholder="请输入演示地址" />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        <div className={style.foot}>
        <div className={styles.bottom}> 
            {
                false ? <Demo /> : <div className={styles.tabTitle}>
                    {
                        tab.map((item, index) => {
                            return <h1 key={index}>{item}</h1>
                        })
                    }
                </div>
            }

        </div>
        </div>
      </div>
    </div>
  );
};
export default observer(AddProject);
