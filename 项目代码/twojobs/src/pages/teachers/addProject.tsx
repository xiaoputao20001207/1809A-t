import React, { useState } from 'react';
import style from './addProject.less';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import {
  SendOutlined,
  SaveOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import useStore from '@/context/useStore';
import { ISkilldairn ,Addpro} from '@/utils/interface';
import { observer } from 'mobx-react-lite';
const { TextArea } = Input;

const AddProject: React.FC = () => {
  //上传
  // const Demo = () => {
  //   const [fileList, setFileList] = useState([
  //     {
  //       uid: '-1',
  //       name: 'image.png',
  //       status: 'done',
  //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //     },
  //   ]);

  //   const onChange = ({ fileList: newFileList }) => {
  //     setFileList(newFileList);
  //   };

  //   const onPreview = async (file:any) => {
  //     let src = file.url;
  //     if (!src) {
  //       src = await new Promise(resolve => {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file.originFileObj);
  //         reader.onload = () => resolve(reader.result);
  //       });
  //     }
  //     const image = new Image();
  //     image.src = src;
  //     const imgWindow = window.open(src);
  //     imgWindow.document.write(image.outerHTML);
  //   };
  //下拉菜单
  let [form] = Form.useForm();
  //引入usestore
  const { proSkill, skill } = useStore();
  //实训类型
  const dairn = ['全部', '生产实训', '教学实训', '专业群实训'];
  //添加项目
  async function addProject(value:Addpro) {
    let versionId =await proSkill.addProject(value);
    console.log(versionId);
    
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
          <Form className={style.antform} onFinish={addProject}>
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
                    rules={[{ required: true }]}
                    className={style.f1}
                  >
                    <Input placeholder="请输入项目名称" />
                  </Form.Item>
                  {/* 版本 */}
                  <Form.Item
                    name="version"
                    label="版本 V"
                    rules={[{ required: true }]}
                    className={style.f2}
                  >
                    <Input />
                  </Form.Item>
                </div>
                {/* 简介 */}
                <Form.Item label="" name="description">
                  <TextArea placeholder="请输入项目简介" className={style.f3} />
                </Form.Item>
                <div className={style.fcl2}>
                  {/* 专业 */}
                  <Form.Item
                    name="trade"
                    label="专业"
                    rules={[{ required: true }]}
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
                    rules={[{ required: true }]}
                    className={style.f5}
                  >
                    <Select placeholder="请选择行业">
                      {proSkill.toplist1.map((item) => {
                        return (
                          <Select.Option key={item.id} value={item.id}>
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
                    rules={[{ required: true }]}
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
                    rules={[{ required: true }]}
                    className={style.f7}
                  >
                    <Input type="number" />
                    <span>天</span>
                  </Form.Item>
                </div>
                <div className={style.fcl4}>
                  {/* 技能点 */}
                  <Form.Item
                    name="note"
                    label="技能点"
                    rules={[{ required: true }]}
                  >
                    <span>技能点由知识点内容生成</span>
                  </Form.Item>
                </div>
              </div>
              <div className={style.fcr}>
                {/* 上传 */}
                <Form.Item label="封面" name="pictureUrl">
                  <input type="file" />
                  {/* <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop> */}
                </Form.Item>
                {/* 演示地址 */}
                <Form.Item
                  name="showUrl"
                  label="演示地址"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="请输入演示地址" />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        <div className={style.foot}>
          111
        </div>
      </div>
    </div>
  );
};
export default observer(AddProject);
