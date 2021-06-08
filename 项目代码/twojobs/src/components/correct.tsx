import { useState } from '_@types_react@17.0.9@@types/react';
import {Modal,Input,Table} from 'antd'
import style from '../pages/teachers/answerDetailManage.less';
import {SearchOutlined} from '@ant-design/icons';
import useStore from '@/context/useStore';



// 类型列表
const allData=[
    {text:'全部',type:''},
    {text:'实训',type:'0'},
    {text:'答辩',type:'4'},
    {text:'面试',type:'1'},
    {text:'工作',type:'2'},
    {text:'其他',type:'3'},
]
const columns = [
    { title: '问题名称', dataIndex: 'questionTitle'},
    { title: '类型', dataIndex: 'typeName'},
    { title: '发起人', dataIndex: 'author'},
    { title: '发起时间', dataIndex: 'createTime'},
    { title: '来源', dataIndex: 'source'},
    ];
const {answerDetail} = useStore();
const [ResponsevisbleTyps,setResponsevisbleTyps]=useState<string>('1')
const [visible, setVisible] = useState(false);
//输入框发送
const [inpInterViews,setinpInterViews]=useState('')
 //输入框onchang
 const [inpTitles,setinpTitles]=useState('');
function showModal(){
    setVisible(true);//开启弹框
};
const Correct:React.FC = ()=> {
   return <div>
       {/* 点击出现弹框 */}
       <Modal title="选择其它有“正确答案”的类似问题"
               centered visible={visible}
               onOk={() => setVisible(false)}
               onCancel={() => setVisible(false)}
               width={1200}>
            <div className={style.ResponseInput}>
                <Input placeholder="搜索问题" 
                        suffix={<SearchOutlined 
                        onClick={()=>setinpInterViews(inpTitles)}/>}
                        value={inpTitles}
                        onChange={e=>{
                            setinpTitles(e.target.value)
                        }}
                        style={{marginLeft:350}} 
                        onKeyDown={e=>{
                            if(e.keyCode == 13){
                                setinpInterViews(inpTitles)
                            }
                        }}/>
            </div>
            <div className={style.answerResponse}>
                <b>类型:</b>
                {
                    allData.map((item,index)=>{
                    return <span key={index+'tt'} 
                                 className={item.type==ResponsevisbleTyps?style.activ:''} 
                                 onClick={()=>{
                                    setResponsevisbleTyps(item.type)      
                                 }}>{item.text}</span>
                    })
                }
            </div>
            {/* 表格 */}
            <Table dataSource={answerDetail.ResponsevisbleTableList} columns={columns} style={{width:"1100px"}}/>
      </Modal>
   </div>

}
export default Correct
