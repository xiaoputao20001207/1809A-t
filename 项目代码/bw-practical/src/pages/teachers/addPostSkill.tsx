import React, { useEffect } from "react"
import useStore from "@/context/useStore"
import {observer} from "mobx-react-lite"
import { Button , Form,Input,Select,Slider} from 'antd';
import { SendOutlined } from '@ant-design/icons';
import {IRouteComponentProps } from 'umi'
import { ISkillAddItem } from "@/utils/interface";



const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const AddPOstSkill:React.FC<IRouteComponentProps>=({history,location})=>{
    let {skill} = useStore()
    // console.log(JSON.stringify(params))
    let stationVersionId = location.query.stationVersionId
    // console.log(stationVersionId)
    //表单实例化  
    const [form] = Form.useForm();
    const { Option } = Select;


    // useEffect(() => {
    //     if (stationVersionId){
    //         skill.getSkillDetail(stationVersionId);
    //     }
    // }, [stationVersionId])

    //保存数据
    useEffect(() => {
        // let {majorId,name,stationVersion} = skill.skillAddItem
        // let {describes,salaryList,stationTask} = skill.skillAddItem.stationLevelList[0]
        //表单提交
        form.setFieldsValue({...skill.skillAddItem,...skill.skillAddItem.stationLevelList[0]});
    }, [skill.skillAddItem])

   async  function addpostSkill(res: ISkillAddItem){
         /**
          * majorId: "P0002"
            name: "色氛围"
            stationLevelList[0].describes: "弟弟"
            stationLevelList[0].salaryList: (2) [20818, 35869]
            stationLevelList[0].stationTask: "递四方速递"
            stationVersion: 1
            userName: "郭老师"
          */
        let{ stationVersionId} =await skill.addpostSkill(res);
        console.log(stationVersionId)
        history.replace(`/teachers/addPostSkill?stationVersionId=${stationVersionId}&see=false`)
    }

    return (
        <div className='addhead'>
            <section>
                <h3>添加岗位能力</h3>
                <div>
                    <Button>返回</Button>
                    <Button type="primary" icon={<SendOutlined/>}>提交审核</Button>
                </div>
            </section>
            <div className="baseletter">
                <h3>基本信息</h3>
                <Form
                    form={form}
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={addpostSkill}
                    >
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                    <Form.Item
                        label="岗位名称"
                        name="name"
                        rules={[{ required: true, message: '请输入你的岗位名称' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="majorId" label="专业" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            {
                                skill.selectStationLabel.map(item=>{
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="版本号 V" name="stationVersion" rules={[{required: true, message:"请输入版本号"}]}>
                        <Input type="number"/>
                    </Form.Item>
                    <Form.Item
                        label="作者"
                        name="userName"
                        >
                        <span>郭老师</span>
                    </Form.Item>
                    
                    <Form.Item label="薪酬范围" name="stationLevelList[0].salaryList" rules={[{required: true, message:"请输入薪酬范围"}]}>
                        {/* <Slider range marks={marks} /> */}
                        <Slider range min={0} max={50000} />
                    </Form.Item>
                    <Form.Item label="岗位描述" name="stationLevelList[0].describes" rules={[{required: true, message:"请输入岗位描述"}]}>
                        <Input type="textarea" placeholder="请输入岗位描述"></Input>
                    </Form.Item>
                    <Form.Item label="岗位任务" name="stationLevelList[0].stationTask" >
                        <Input type="textarea" placeholder="请输入岗位任务"></Input>
                    </Form.Item>

                    
                </Form>
            </div>
        </div>
    )
}
export default observer(AddPOstSkill)