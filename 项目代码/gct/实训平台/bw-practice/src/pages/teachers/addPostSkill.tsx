import useStore from '@/context/useStore';
import { ISkillAddItem } from '@/utils/interface';
import {SendOutlined,SaveOutlined} from '@ant-design/icons'
import {Button,Form,Input,Select,Slider} from 'antd'
import { observer } from 'mobx-react-lite';
import './addPostSkill.less'
import {IRouteComponentProps} from 'umi'

const marks=[0,50000]

const AddPostSkill:React.FC<IRouteComponentProps> =({history,location,match}) =>{
    console.log("location-------",location);
    // 从url参数中获取stationVersionId
    let stationVersionId = location.query.stationVersionId;
    
    // 从仓库的skill模块
    let {skill} = useStore();

    // 创建表单实例
    const [form] = Form.useForm();

    useEffect(() => {
        if(stationVersionId){
            skill.getSkillDetail(stationVersionId)
        }
    }, [stationVersionId])

    async function addPostSkill(res:ISkillAddItem){
        console.log(res,'res....');
        let stationVersionId = await skill.addPostSkill(res)
        history.replace(`/teacher/addPostSkill?stationVersionId=${stationVersionId}&see=false`)
        debugger;
        
    }

    return <div className="addPostSkill_box">
                 {/* 添加岗位 */}
                <section className="box_one">
                    <h3>添加岗位能力</h3>
                    <div>
                        <Button className="back">返回</Button>
                        <Button type="primary" icon={<SendOutlined />} className="add">提交审核</Button>
                    </div>
                </section>

                {/* 基本信息 */}
                <section className="addPostSkill_main">
                    
                    {/* 输入信息 */}
                    {/* key : 重新创建   setFieldsValue也可以 */}
                    <Form key={JSON.stringify(skill.skillAddItem)} initialValues={{...skill.skillAddItem,...skill.skillAddItem.stationLevelList[0]}} onFinish={addPostSkill}>

                        {/* 基本信息 */}
                        <div className="basic">
                            <h3>基本信息</h3>
                            <Button type="text" icon={<SaveOutlined />} htmlType="submit">保存</Button>
                        </div>

                        {/* 岗位名称 */}
                        <div className="job_title">
                            <Form.Item label="岗位名称" name="name" rules={[{required:true,message:'请输入岗位名称'}]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="专业" name="majorId" rules={[{required:true,message:'请选择专业'}]}>
                                <Select className="checkbox_one">{
                                    skill.skillLabel.map(item=>{
                                        return <Select.Option value={item.id}>{item.name}</Select.Option>
                                    })
                                    }</Select>
                            </Form.Item>

                            <Form.Item label="版本号 V" name="stationVersion" rules={[{required:true,message:'请输入版本号'}]}>
                                <Input type="number"/>
                            </Form.Item>

                            <Form.Item label="作者" name="userName" className="name">
                                <span>郭老师</span>
                            </Form.Item>
                        </div>
                        
                        {/* 薪资 */}
                        <div className="form_detail">
                            <Form.Item label="薪酬范围" name="salaryList" rules={[{required:true,message:'请输入薪酬范围'}]}>
                            <Slider range min={0} max={50000} />
                            </Form.Item>
                            <Form.Item label="岗位描述" name="describes" rules={[{required:true,message:'请输入岗位描述'}]}>
                            <Input type="textarea" placeholder="请输入岗位描述"></Input>
                            </Form.Item>
                            <Form.Item label="岗位任务" name="stationTask" rules={[{required:true,message:'请输入岗位任务'}]}>
                            <Input type="textarea" placeholder="请输入岗位任务"></Input>
                            </Form.Item>
                        </div>
                </Form>
            </section>
        </div>
}
export default observer(AddPostSkill);