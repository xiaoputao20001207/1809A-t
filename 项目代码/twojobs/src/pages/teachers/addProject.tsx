import React, { Component, useEffect, useState } from 'react'
import './addProject.less'
import { Button,  InputNumber,Form,Input,Select,Upload,Tabs,Layout,Menu,Cascader,Radio,message } from 'antd';
import {WalletTwoTone, FullscreenOutlined, LoadingOutlined, PlusOutlined,CopyOutlined} from '@ant-design/icons';
import { getaddlistzhuanye, getaddlistone,updatecode  } from '../../service/index'
import { IRouteComponentProps } from 'umi';
import styles from "./proJect.less"
import Editor from 'for-editor'
import {SendOutlined,SaveOutlined} from '@ant-design/icons';
import useStore from '@/context/useStore';
import { ISkilldairn, Addpro } from '@/utils/interface';
import { observer } from 'mobx-react-lite';

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const addProject: React.FC<IRouteComponentProps> = ({ history }) => {
  const tab = ['实训大纲', '实训任务', '项目资源', '实训环境', '前置项目']
  const Demo = () => (
    <Tabs defaultActiveKey="1" className={styles.Tabs}>
      <TabPane tab="实训大纲" key="1">
        <Layout>
          <Content>
            <Layout>
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
                <Editor
                  placeholder="开始编辑..."
                  // value={title}
                  // onChange={(value) => { settitle(value); console.log(value) }}
                />
              </Content>
            </Layout>
          </Content>
        </Layout>
      </TabPane>
      <TabPane tab="实训任务" key="2">
        <Button type="primary">+添加任务</Button>
      </TabPane>
      <TabPane tab="项目资源" key="3">
        <Layout>
          <Content>
            <Layout>
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
                    <CopyOutlined />
                    保存
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
                      <Input placeholder="请输入链接地址" />
                    </div>
                    <div>
                      <span>描述</span>
                      <Input placeholder="请输入内容" />
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
            <CopyOutlined />
            保存
          </div>
          <div className={styles.environment_content}>
            <div>
              <span>环境名称</span>
              <Input placeholder="请输入标题" />
              <span>+</span>
              <span>-</span>
            </div>
            <div>
              <span>环境地址</span>
              <Input placeholder="请输入外部链接地址" />
              <span>+</span>
              <span>-</span>
            </div>
            <div>
              <span>环境描述</span>
              <Input placeholder="请输入内容" />
              <span>+</span>
              <span>-</span>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane tab="前置项目" key="5">
        <div className={styles.lead}>
          <div className={styles.lead_title}>
            <CopyOutlined />
            保存
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
    

  //定义方法
  const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [pictureUrl, setpictureUrl] = useState('')
    const [majorStationList, setmajorStationList] = useState([])
    const [shpwUrl, setshpwUrl] = useState('')
    const [sxType, setsxType] = useState('')
    const [trade, settrade] = useState([])
    const [version, setversion] = useState('1')
    const [zhuanye, setzhuanye] = useState([])
    const [hangye, sethangye] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    const [imageUrl, setImageUrl] = useState<any>()

    const options = [
        {
            value: '1',
            label: '生产实训',
        },
        {
            value: '2',
            label: '专业实训',
        },
        {
            value: '3',
            label: '专业群实训',
        }
    ];

    useEffect(() => {
        getaddlistzhuanye().then(ok => {
            setzhuanye(ok.data)
        })
        getaddlistone().then(ok => {
            sethangye(ok.data)
        })
    }, [])

    function getBase64(img: any, callback: any) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file: any) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    function onChangeabc(value: any) {
        setmajorStationList(value)
    }
    function onChangeacb(value: any) {
        settrade(value)
    }
    function onChangecba(value: any) {
        setsxType(value)
    }
    function onChangegs(value: any) {
        setversion(value)
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    function handleChange(info: any) {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl: any) =>

                setImageUrl(imageUrl)

                // setLoading(false)
            );
            console.log(setImageUrl)
        }
    };
    
    let versionId=localStorage.getItem("versionId");
    console.log(versionId);
    
    return (
        <div className='cww_project_box'>
            <div className="shen">
                <div className="box_herad">
                    <h2 className="yz">添加项目</h2>
                    <div className="btn">
                    <Button className='btn1'>返回</Button>
                    <span className='btn2'> <span>提交审核</span></span>
                    </div>
                </div>
                <div className="box_shen">
                    <div className="cww_one">
                        <span className='cww_one_s1'><b>基本信息</b></span>  <span className='cww_one_s2' onClick={() => {
                            updatecode({
                                description: description,
                                id: "",
                                knowledge: [],
                                majorId: "",
                                majorStationList:majorStationList,
                                name: name,
                                pictureUrl: imageUrl,
                                showUrl: shpwUrl,
                                stationId: "",
                                subjectTime: 1,
                                sxType: "1",
                                trade: trade,
                                tradeId: "",
                                version: version,
                                versionId: ""
                            }).then(ok =>{
                              console.log(ok);
                              
                              let versionId=ok.data.versionId;
                            localStorage.setItem("versionId",versionId)
                              let id =ok.data.id
                                message.success('添加成功',1,()=>{
                                     history.replace(`/teachers/Projectdetail`)
                                })
                            })
                        }}> <WalletTwoTone />保存</span>
                    </div>
                    <div className="cww_two">
                        <div className="cww_two_one">
                            <div className="cww_two_two">
                                <div className="cww_two_two_one">
                                    <FullscreenOutlined /> <b>项目名称</b>  <input type="text" className='ipt1' placeholder='请输入项目名称'  value={name} onChange={(e) =>{
                                        setname(e.target.value)
                                    }}/>
                                    <FullscreenOutlined />  <b>版本 V</b> <input type="text" className='ipt2' value={version}  onChange={(e) =>{
                                        setversion(e.target.value)
                                    }}/>
                                </div>
                                <div className="cww_two_two_two">
                                    <input type="text" className='ipt7' placeholder='请输入简介' value={description}  onChange={(e) =>{
                                        setdescription(e.target.value)
                                    }}/>
                                </div>
                                <div className="cww_two_two_san">
                                    <FullscreenOutlined /> <b>专业</b>   <Cascader options={zhuanye} onChange={onChangeabc} placeholder="请选择" className='ipt3' />
                                    <FullscreenOutlined /> <b>行业</b> <Cascader options={hangye} onChange={onChangeacb} placeholder="请选择" className='ipt4' />
                                </div>
                                <div className="cww_two_two_si">
                                    <FullscreenOutlined /> <b>实训类型</b> <Cascader options={options} onChange={onChangecba} placeholder="选择类型" className='ipt5' />
                                    <b>预期总工时</b> <InputNumber min={1} max={10} defaultValue={3} onChange={onChangegs} className='ipt6' /><b>天</b>
                                </div>
                                <div className="cww_two_two_wu">
                                    <b>技能点</b> 技能点由任务知识点内容生成
                                </div>
                            </div>
                            <div className="cww_two_san">
                                <div className="cww_two_san_one">
                                    <FullscreenOutlined /> <b>封面</b>
                                </div>
                                <div className="cww_two_san_two">
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                        style={{width:"100%",height:"100%",padding:"100px"}}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                </div>
                                <div className="cww_two_san_san">
                                    <FullscreenOutlined /> <b>演示地址</b>  <input type="text" placeholder='请输入演示地址' className='ipt8' value={shpwUrl}  onChange={(e) =>{
                                        setshpwUrl(e.target.value)
                                    }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
              {
               versionId?<Demo />:tab.map(((item,index)=>{
                     return <div className="footer_top" key={index}>
                       <h1>{item}</h1>
                     </div>
               }))
              }
            </div>
        </div>
    )

}

export default addProject
