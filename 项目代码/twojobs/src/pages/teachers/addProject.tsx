import React, { Component, useEffect, useState } from 'react';
import './addProject.less';
import {
  Button,
  InputNumber,
  Form,
  Input,
  Select,
  Upload,
  Tabs,
  Layout,
  Menu,
  Cascader,
  Radio,
  message,
  Table,
  Modal,
  Space,
} from 'antd';
import {
  WalletTwoTone,
  FullscreenOutlined,
  LoadingOutlined,
  CopyOutlined,
  EyeOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  getaddlistzhuanye,
  getaddlistone,
  updatecode,
  getTrainingSyllabus,
  // getLeadProject,
  getProjectResources,
} from '../../service/index';
import { IRouteComponentProps, Link } from 'umi';
import Editor from 'for-editor';
import { SendOutlined, SaveOutlined } from '@ant-design/icons';
import useStore from '@/context/useStore';
import {
  ISkilldairn,
  Addpro,
  TrainingSyllabusList,
  ProjectResourcesList,
} from '@/utils/interface';
import { observer } from 'mobx-react-lite';
import proSkill from '@/store/modules/proSkill';
import addTasks from '@/store/modules/addTasks';
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const addProject: React.FC<IRouteComponentProps> = ({ history, location }) => {
  const tab = ['实训大纲', '实训任务', '项目资源', '实训环境', '前置项目'];

  const tabs = [1, 2, 3, 4];
  const tabList = [
    {
      tabs: 'tabs',
      jia: '＋',
      jian: '－',
    },
  ];
  //实训大纲
  let [TrainingSyllabus, setTrainingSyllabus] = useState<
    TrainingSyllabusList[]
  >([]);
  // 当前选中文档
  const [currentKey, setCurrentKey] = useState('');
  useEffect(() => {
    getTrainingSyllabus().then((ok) => {
      setTrainingSyllabus(ok.data);
    });
  }, []);
  //项目资源
  let [ProjectResourcesList, setProjectResourcesList] = useState<
    ProjectResourcesList[]
  >([]);
  let [svalue, setsvalue] = useState('');
  let [tvalue, settvalue] = useState('');
  useEffect(() => {
    getProjectResources().then((ok) => {
      setProjectResourcesList(ok.data);
    });
  }, []);
  const columns = [
    {
      title: '任务名称',
      dataIndex: 'taskName',
      //   align:"center"
    },
    {
      title: '任务结果',
      dataIndex: '',
      //   align:"center"
    },
    {
      title: '保新技能',
      dataIndex: '',
      //   align:"center"
    },
    {
      title: '提薪技能',
      dataIndex: '',
      // align:"center"
    },
    {
      title: '考核标准',
      dataIndex: 'assessmentStandard',
      // align:"center"
    },
    {
      title: '步骤数量',
      dataIndex: 'steptCount',
      // align:"center"
    },
    {
      title: '推荐工期',
      dataIndex: 'subjectTime',
      // align:"center"
    },
    {
      title: '操作',
      render: () => {
        return (
          <div>
            <EyeOutlined style={{ color: '#679cf6' }} />
            <SendOutlined style={{ color: '#679cf6' }} />
            <DeleteOutlined style={{ color: '#679cf6' }} />
          </div>
        );
      },
    },
  ];
  // const Demo1 = () => {
  //   const onFinish = values => {
  //     console.log('Received values of form:', values);
  //   };
  const Demo = () => (
    <Tabs defaultActiveKey="1">
      <TabPane tab="实训大纲" key="1">
        <Layout>
          <Sider className="site-layout-background" width={260}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              {TrainingSyllabus.map((item, index) => {
                return (
                  <SubMenu key={index} title={item.label}>
                    {/* {item.children.map((_item1: any) => {
                      return (
                        <Menu.Item key={_item1.value}>{_item1.label}</Menu.Item>
                      );
                    })} */}
                  </SubMenu>
                );
              })}
            </Menu>
          </Sider>
          <Content
            style={{ width: '1100px', padding: '0 24px', minHeight: 280 }}
          >
            <Button>保存</Button>
            <Editor
              placeholder="开始编辑..."
              // onChange={value => changeCurrentNodeContent(currentKey, value)}
              // value={() => {
              //     searchItemByKey(TrainingSyllabus, currentKey)
              // }}
            />
          </Content>
        </Layout>
      </TabPane>
      <TabPane tab="实训任务" key="2">
        <Link
          to={`/teachers/addTask?proId=${id}&versionId=${versionId}&see=false`}
        >
          <Button type="primary">+添加任务</Button>
        </Link>
        <div>
          <Table
            dataSource={addTasks.TaskList}
            columns={columns}
            rowKey="versionId"
            style={{ width: '900px', textAlign: 'center' }}
          ></Table>
        </div>
      </TabPane>
      <TabPane tab="项目资源" key="3">
        <Layout>
          <Content>
            <Layout>
              <Sider className="site-layout-background" width={280}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                >
                  {ProjectResourcesList.map((item, index) => {
                    return (
                      <SubMenu key={index} title={item.label}>
                        {item.children.map((_item1: any, index1: any) => {
                          return (
                            <Menu.Item key={_item1.value}>
                              {_item1.label}
                            </Menu.Item>
                          );
                        })}
                      </SubMenu>
                    );
                  })}
                </Menu>
              </Sider>
              <Content
                style={{ width: '800px', padding: '0 24px', minHeight: 280 }}
              >
                <div>
                  <div>
                    <CopyOutlined />
                    保存
                  </div>
                  <div>
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
                      <Radio.Group
                        defaultValue="a"
                        size="small"
                        style={{ marginTop: 16 }}
                      >
                        <Radio.Button value="a">可见</Radio.Button>
                        <Radio.Button value="b">不可见</Radio.Button>
                      </Radio.Group>
                    </div>
                    <div>
                      <span>学生</span>
                      <Radio.Group
                        defaultValue="a"
                        size="small"
                        style={{ marginTop: 16 }}
                        value={svalue}
                      >
                        <Radio.Button value="a">可见</Radio.Button>
                        <Radio.Button value="b">可下载</Radio.Button>
                        <Radio.Button value="c">不可见</Radio.Button>
                      </Radio.Group>
                    </div>
                  </div>
                </div>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </TabPane>
      <TabPane tab="实训环境" key="4">
      <Form name="dynamic_form_nest_item" autoComplete="off">
      <Form.Item>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  fieldKey={[fieldKey, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  fieldKey={[fieldKey, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                       <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  fieldKey={[fieldKey, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
      </TabPane>
      <TabPane tab="前置项目" key="5">
        <div>
          <div>
            <p style={{ marginLeft: '400px' }}>添加与新项目关联的项目</p>
            <Form name="dynamic_form_nest_item" autoComplete="off">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          name="gender"
                          rules={[
                            {
                              required: true,
                              message: 'Please select gender!',
                            },
                          ]}
                        >
                          <Select placeholder="请选择">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                          </Select>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                        <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                  </>
                )}
              </Form.List>
            </Form>
          </div>
        </div>
      </TabPane>
    </Tabs>
  );
  function jia(item: any) {
    tabList.push(item);
    console.log(tabList);
  }
  //定义方法
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [pictureUrl, setpictureUrl] = useState('');
  const [majorStationList, setmajorStationList] = useState([]);
  const [shpwUrl, setshpwUrl] = useState('');
  const [sxType, setsxType] = useState('');
  const [trade, settrade] = useState([]);
  const [version, setversion] = useState('1');
  const [zhuanye, setzhuanye] = useState([]);
  const [hangye, sethangye] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<any>();
  let [id1, setversionId] = useState('');
  let [id2, setId] = useState('');
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
    },
  ];

  useEffect(() => {
    getaddlistzhuanye().then((ok) => {
      setzhuanye(ok.data);
    });
    getaddlistone().then((ok) => {
      sethangye(ok.data);
    });
  }, []);

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
    setmajorStationList(value);
  }
  function onChangeacb(value: any) {
    settrade(value);
  }
  function onChangecba(value: any) {
    setsxType(value);
  }
  function onChangegs(value: any) {
    setversion(value);
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  function handleChange(info: any) {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(
        info.file.originFileObj,
        (imageUrl: any) => setImageUrl(imageUrl),

        // setLoading(false)
      );
      console.log(setImageUrl);
    }
  }
  //返回
  function aa() {
    history.replace(`/teachers/proManagement`);
  }
  //
  let versionId = location.query.versionId as string;
  let id = location.query.proId as string;
  //详情
  useEffect(() => {
    if (versionId) {
      proSkill.EditorDetail(versionId);
    }
  }, [versionId]);
  //上传图片
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="cww_project_box">
      <div className="shen">
        <div className="box_herad">
          <h2 className="yz">添加项目</h2>
          <div className="btn">
            <Button className="btn1" onClick={() => aa()}>
              返回
            </Button>
            <span className="btn2">
              {' '}
              <span>提交审核</span>
            </span>
          </div>
        </div>
        <div className="box_shen">
          <div className="cww_one">
            <span className="cww_one_s1">
              <b>基本信息</b>
            </span>{' '}
            {versionId || id1 ? (
              <span className="cww_one_s2">
                <WalletTwoTone />
                编辑
              </span>
            ) : (
              <span
                className="cww_one_s2"
                onClick={() => {
                  if (
                    description != '' &&
                    majorStationList != [] &&
                    name != '' &&
                    shpwUrl != ''
                  ) {
                    updatecode({
                      description: description,
                      id: '',
                      knowledge: [],
                      majorId: '',
                      majorStationList: majorStationList,
                      name: name,
                      pictureUrl: isModalVisible,
                      showUrl: shpwUrl,
                      stationId: '',
                      subjectTime: 1,
                      sxType: '1',
                      trade: trade,
                      tradeId: '',
                      version: version,
                      versionId: '',
                    }).then((ok) => {
                      message.success('添加成功', 1, () => {
                        history.replace(
                          `/teachers/addProject?VersionId=${id1}&proId=${id2}&see=false`,
                        );
                        setversionId((id1 = ok.data.versionId));
                        setId((id2 = ok.data.id));
                        proSkill.EditorDetail(id1);
                      });
                    });
                  } else {
                    alert('请完善信息');
                  }
                }}
              >
                {' '}
                <WalletTwoTone />
                保存
              </span>
            )}
          </div>
          <div className="cww_two">
            <div className="cww_two_one">
              <div className="cww_two_two">
                <div className="cww_two_two_one">
                  <FullscreenOutlined /> <b>项目名称</b>{' '}
                  {versionId || id1 ? (
                    <span>{proSkill.detailList.name}</span>
                  ) : (
                    <input
                      type="text"
                      className="ipt1"
                      placeholder="请输入项目名称"
                      value={name}
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                    />
                  )}
                  <FullscreenOutlined /> <b>版本 V</b>{' '}
                  {versionId || id1 ? (
                    <span>{proSkill.detailList.version}</span>
                  ) : (
                    <input
                      type="text"
                      className="ipt2"
                      value={version}
                      onChange={(e) => {
                        setversion(e.target.value);
                      }}
                    />
                  )}
                </div>
                <div className="cww_two_two_two">
                  {versionId || id1 ? (
                    <span>{proSkill.detailList.description}</span>
                  ) : (
                    <input
                      type="text"
                      className="ipt7"
                      placeholder="请输入简介"
                      value={description}
                      onChange={(e) => {
                        setdescription(e.target.value);
                      }}
                    />
                  )}
                </div>
                <div className="cww_two_two_san">
                  <FullscreenOutlined /> <b>专业</b>{' '}
                  {versionId || id1 ? (
                    <span>
                      {[
                        proSkill.detailList.labelName,
                        proSkill.detailList.stationName,
                      ]}
                    </span>
                  ) : (
                    <Cascader
                      options={zhuanye}
                      onChange={onChangeabc}
                      placeholder="请选择"
                      className="ipt3"
                    />
                  )}
                  <FullscreenOutlined /> <b>行业</b>{' '}
                  {versionId || id1 ? (
                    <span>{proSkill.detailList.tradeName}</span>
                  ) : (
                    <Cascader
                      options={hangye}
                      onChange={onChangeacb}
                      placeholder="请选择"
                      className="ipt4"
                    />
                  )}
                </div>
                <div className="cww_two_two_si">
                  <FullscreenOutlined /> <b>实训类型</b>{' '}
                  {versionId || id1 ? (
                    <span>{proSkill.detailList.sxType}</span>
                  ) : (
                    <Cascader
                      options={options}
                      onChange={onChangecba}
                      placeholder="选择类型"
                      className="ipt5"
                    />
                  )}
                  <b>预期总工时</b>{' '}
                  {versionId || id1 ? (
                    <span>{proSkill.detailList.subjectTime}</span>
                  ) : (
                    <InputNumber
                      min={1}
                      max={10}
                      defaultValue={3}
                      onChange={onChangegs}
                      className="ipt6"
                    />
                  )}
                  <b>天</b>
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
                  {proSkill.ProjectDetailImg ? (
                    // 详情页自带图片
                    <img
                      src={`http://111.203.59.61:8060${proSkill.ProjectDetailImg}`}
                      alt=""
                      onClick={showModal}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    // 添加后的图片
                    <img
                      src={`http://111.203.59.61:8060${proSkill.detailList.pictureUrl}`}
                      alt=""
                      onClick={showModal}
                      style={{ width: '100%', height: '100%' }}
                    />
                  )}
                  <Modal
                    title="上传封面"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <Input
                      type="file"
                      onChange={(e) => {
                        let form = new FormData();
                        let files = e.target.files;
                        if (files) {
                          for (let i = 0; i < files.length; i++) {
                            form.append('file', files[i]);
                          }
                          proSkill.addProjectImg(form);
                        }
                      }}
                    />
                  </Modal>
                  {/* } */}
                </div>
                <div className="cww_two_san_san">
                  <FullscreenOutlined /> <b>演示地址</b>
                  {versionId || id1 ? (
                    <span>{proSkill.detailList.showUrl}</span>
                  ) : (
                    <input
                      type="text"
                      placeholder="请输入演示地址"
                      className="ipt8"
                      value={shpwUrl}
                      onChange={(e) => {
                        setshpwUrl(e.target.value);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        {versionId || id1 ? (
          <Demo />
        ) : (
          tab.map((item, index) => {
            return (
              <div className="footer_top" key={index}>
                <h1>{item}</h1>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default addProject;
