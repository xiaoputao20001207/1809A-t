import useStore from '@/context/useStore';
import {SendOutlined,SaveOutlined} from '@ant-design/icons'
import {Button,Form,Input,Select,Slider} from 'antd'
import { observer } from 'mobx-react-lite';
import './addPostSkill.less'

const AddPostSkill:React.FC =() =>{
    let {skill} = useStore();

    return <div className="addPostSkill">
        <section className="box_one">
            <h3>添加岗位</h3>
            <div>
                <Button className="back">返回</Button>
                <Button icon={<SendOutlined />} className="add">提交审核</Button>
            </div>
        </section>

        <section>
            <div className="one">
                <h3>基本信息</h3>
                <Button type="text" icon={<SaveOutlined />}>保存</Button>
            </div>
            
            <Form className="two">
                <div>
                    <Form.Item label="岗位名称" name="" rules={[{required:true,message:'请输入岗位名称'}]}>
                    <Input/>
                    </Form.Item>
                    <Form.Item label="专业" name="" rules={[{required:true,message:'请选择专业'}]}>
                        <Select className="checkbox_one">{
                            skill.skillLabel.map(item=>{
                                return <Select.Option value={item.id}>{item.name}</Select.Option>
                            })
                            }</Select>
                    </Form.Item>
                    <Form.Item label="版本号 V" name="" rules={[{required:true,message:'请输入版本号'}]}>
                        <Input type="number"/>
                    </Form.Item>
                    <Form.Item label="作者" name="" className="name">
                        <span>郭老师</span>
                    </Form.Item>
                </div>
                
                
                <Form.Item label="薪酬范围" name="" rules={[{required:true,message:'请输入薪酬范围'}]}>
                    <Slider marks={marks} included={false} defaultValue={37} />
                </Form.Item>
                <Form.Item label="岗位描述" name="" rules={[{required:true,message:'请输入岗位描述'}]}>
                    <span>郭老师</span>
                </Form.Item>
                <Form.Item label="岗位任务" name="" rules={[{required:true,message:'请输入岗位任务'}]}>
                    <span>郭老师</span>
                </Form.Item>

            </Form>
        </section>
    </div>
}
export default observer(AddPostSkill);