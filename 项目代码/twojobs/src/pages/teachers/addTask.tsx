import { Button,Form ,Input} from 'antd';
import './addTask.less';
import {SaveOutlined} from "@ant-design/icons"
import { IRouteComponentProps } from 'umi';
import { observer } from 'mobx-react-lite';
import addTasks from '@/store/modules/addTasks';
// import addTask from '@/store/modules/addTask';
interface IaddTaskItem{
    assessmentStandard: string
    proVersionId: string
    proid: string
    steptCount:string
    subjectTime: number
    taskName: string
}
const AddTask: React.FC<IRouteComponentProps> = ({history, location}) => {
    //获取id
    let proVersionId=location.query.versionId as string;
    let proid=location.query.proId as string;
    //定义类型
    //添加任务
     async function addTask(value:IaddTaskItem){
         addTasks.AddTaskItem(value)
     }
  return (
    <div className="task">
      <div className="task_top">
        <h2>添加任务</h2>
        <Button
          onClick={() => {
            history.go(-1);
          }}
        >
          返回
        </Button>
      </div>
      <div className="task_main">
      <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={addTask}
    >   
        <div>  
         <Button icon={<SaveOutlined />}  type="link" block className='btn' htmlType='submit'>保存</Button>
        </div>
          {/*  */}
        <Form.Item
          name="taskName"
          label="任务名称"
          rules={[{ required: true, message: 'Please input your taskName!' }]}
        >
          <Input />
        </Form.Item>
        {/* // */}
        <Form.Item
          name="assessmentStandard"
          label="考核标准"
          rules={[{ required: true, message: 'Please input your assessmentStandard!' }]}
        >
          <Input />
        </Form.Item>
        {/*  */}
        <Form.Item
          name="subjectTime"
          label="推荐工期"
          rules={[{ required: true, message: 'Please input your subjectTime!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="steptCount"
          label="步骤数量"
        >
            <span>步骤数量由添加任务步骤个数自动生成</span>
        </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default observer(AddTask);
