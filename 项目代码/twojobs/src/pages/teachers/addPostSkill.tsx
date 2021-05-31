import React,{ FC, useEffect } from "react";
import style from './addpost.less'
import {Button, Form, Input, Select, Slider, Empty, message} from 'antd'
import {SendOutlined, SaveOutlined} from '@ant-design/icons'
import './addpost.css'
import useStore from "@/context/useStore";
import {observer} from 'mobx-react-lite'
import { ISkillAddItem } from "@/utils/interface";
import {IRouteComponentProps} from 'umi'
import Skillscrpition from '@/components/skillDescription'//引入子组件

const AddPostSkill:FC<IRouteComponentProps> = ({history,location})=>{
    
    let {skill} = useStore()
    //获取地址栏id判断是不是详情页
    let stationVersionId = location.query.stationVersionId as string
    //表单实例
    let [form] = Form.useForm()

    useEffect(() => {
        
        //第一种方法
        // let {majorId, name, stationVersion} = skill.skillAddItem;
        // let {describes, salaryList, stationTask} = skill.skillAddItem.stationLevelList[0];
        // form.setFieldsValue({
        //     majorId, name, stationVersion, describes, salaryList, stationTask
        // })
        //第二种方法
        form.setFieldsValue({
            ...skill.skillAddItem, ...skill.skillAddItem.stationLevelList[0]
        })
    }, [skill.skillAddItem])

    useEffect(() => {
       if(stationVersionId){
           skill.getSkillDetail(stationVersionId)
       }
    }, [stationVersionId])

    //岗位添加函数
    async function addPostSkill(value:ISkillAddItem){
        let stationVersionId = await skill.addPostSkill(value)
        // if(!stationVersionId){
        //    message.success('保存成功',1)
        // }
        
        history.replace(`/teachers/addPostSkill?stationVersionId=${stationVersionId}&see=false`)
    }

    return <div>
                <p className={style.jobs}><span>岗位</span>/岗位管理</p>
                <div className={style.nav}>
                    <h2> <span className="icon" data-v-262311c4></span> 填加岗位能力 </h2>
                    <div>
                        <Button onClick={e=>history.push('/teachers/postSkill')}>返回</Button>
                        <Button type="primary" icon={<SendOutlined/>}>提交审核</Button>
                    </div>
                </div>
                <div className={style.context}>
                    <Form form={form} key={JSON.stringify(skill.skillAddItem)} initialValues={{...skill.skillAddItem,...skill.skillAddItem.stationLevelList[0]}} onFinish={addPostSkill}>
                        <div className={style.context_top}>
                            <h2><span className="icon" data-v-262311c4></span>基本信息</h2>
                                <Button icon={<SaveOutlined />}  type="link" block className='btn' htmlType='submit'>
                                    {stationVersionId?'编辑':'保存'}
                                </Button>
                        </div>
                    
                        <div className={style.context_top_two}>
                            <Form.Item label='岗位名称' name='name' rules={[{required:true,message:'请输入岗位名称'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label='专业' name='majorId' rules={[{required:true,message:'请选择专业'}]}>
                                <Select style={{width:"200px"}}>
                                    {
                                        skill.toplist.map(item=>{
                                            return <Select.Option key={item.id} value={item.id} >{item.name}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label='版本号 V' name='stationVersion' rules={[{required:true,message:'请输入版本号'}]}>
                                <Input type='number'/>
                            </Form.Item>
                            <Form.Item label='作者' name='userName'>
                                <span>郭老师</span>
                            </Form.Item>
                        </div>
                        <div className='box' style={{width:'95%',height:'542px',margin:"0 20px",border:'1px solid darkgrey',marginBottom:'10px'}}>
                            <Form.Item label="薪酬范围" name="salaryList" rules={[{required: true, message:"请输入薪酬范围"}]}>
                                    <Slider range min={0} max={50000} style={{marginTop:'80px'}}/>
                            </Form.Item>
                            <Form.Item label="岗位描述" name="describes" rules={[{required: true, message:"请输入岗位描述"}]}>
                                    <Input type="textarea" placeholder="请输入岗位描述"></Input>
                            </Form.Item>
                            <Form.Item label="岗位任务" name="stationTask" >
                                    <Input type="textarea" placeholder="请输入岗位任务"></Input>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                <div className={style.bottom}>
                    {
                        stationVersionId?
                        <Skillscrpition stationVersionId={stationVersionId}></Skillscrpition>:
                        <Empty description={
                            <h2>完善岗位的基本信息并点击 "保存" 才可解锁岗位能力内容</h2>
                        }/>
                    }
                </div>
            </div>
}
export default observer(AddPostSkill)