import React, { useEffect, useState } from 'react'
import './addDefence.less'
import { Input, Button, Select, DatePicker, Space, Table, message, Tooltip,Form } from 'antd'
import useStore from '@/context/useStore'
import { Link ,RouteComponentProps} from 'react-router-dom'
import moment from '_antd@4.16.1@antd/node_modules/moment'
const { Option } = Select;
const { RangePicker } = DatePicker;
const columns = [
  {
    title: '姓名',
    dataIndex: 'username',
  },
  {
    title: '5.10项目测试',
    dataIndex: '',
  },
];
let addDefence:React.FC<RouteComponentProps> = ({history}) => {
  let { skill, defence } = useStore()
  console.log(defence.ClasssPlanTree.label)

  //答辩地址
  let [address, setaddress] = useState('')
  //答辩名称
  let [defenName, setdefenName] = useState('')
  //开始时间
  let [startTime, setstartTime] = useState('')
  //结束时间
  let [endTime, setendTime] = useState('')
  //专业筛选
  let [skillItem, setskillItem] = useState('')
  //班级筛选
  let [classItem, setclassItem] = useState('')
  //编辑 保存
  let [flag, setflag] = useState(false)
  //select
  function handleChange1(value: string) {

    setskillItem(value)

    console.log(`selected ${value}`, 111111111111111111111111111);
  }
  function handleChange2(value: string) {

    setclassItem(value)

    console.log(`selected ${value}`, 111111111111111111111111111);
  }
  //日期输入
  function onChange(value: any, dateString: any) {
  
    console.log('开始时间: ', dateString[0]), setstartTime(dateString[0]+':00');
    console.log('结束时间: ', dateString[1]), setendTime(dateString[1]+':00');
  }
  let params = {
    classplan: ["9", "5ed06135b3a14f7dbf2de9d288869280"],
    time: ["2021-06-14 00:00:00", "2021-06-16 23:59:59"],
    defenceAdress: "gegege",
    defenceAuthorName: "郭老师",
    defenceClassId: '9',
    defenceCreateTime: "2021-06-14 00:00:00",
    defenceEndTime: "2021-06-18 23:59:59",
    defenceId: "",
    defenceMajorId: "P0002",
    defencePlanId: "",
    defenceScore: "",
    degenceName: "sdadf ",
    majorList: "",

  }
  //获取详情数据
  async function Detaillist(){
    let {query} = history.location as any
    let id = query.defenceId
 
    if(location.href !='http://localhost:8000/teachers/addDefence'){
          await   defence.getDefenceDetial(id)
          await   setflag(!flag)   
         
     }
  }

  //专业数据    
   useEffect(() => {
    skill.Gettoplist()
    defence.getClasssPlanTree()
    Detaillist()
   
  }, []);
  // 保存数据
  useEffect(() => {
    let classid = '9'
    let classPlanid = classItem
    params = {
     ...params, defenceAdress: address, degenceName: defenName, defencePlanId: classItem, defenceMajorId: skillItem,
      defenceCreateTime: startTime, defenceEndTime: endTime
    }
    console.log(classItem, address, defenName, skillItem, startTime, endTime, 'ffffffffffffffffff')
    if (flag) {
      defence.getclassTeam(classid = '9', classPlanid)
      defence.savedefence(params)
    }

  }, [flag, classItem, address, defenName, skillItem, startTime, endTime]);
  const success1 = () => {
    message.success({
      content: '提交成功',
      className: 'custom-class',
      style: {
      
        fontSize:'18px'
      },
    });
  };
  //保存成功
  const success = () => {

    if (!flag) {
      message.success('保存答辩信息成功');
    }
  };
    async function changeFlag(){
     await success()
     await setflag(!flag)
    }
  return <div className='addDefence'>

    <div className='top'>&emsp;&emsp;  答辩 / 发起答辩</div>
    <div className="list">
      <div className='commen'>
        <div id='save'><Link to="/teachers/defence"><Button>返回</Button></Link>
          <Button type="link" key='1' onClick={() => { changeFlag()}}>{flag ? '编辑' : '保存'}</Button>
          <Button type="primary" className ='push' onClick={() => { defence.defenceInfo() ,success1() }}>提交</Button></div>

        <br />
        <br />
        <hr />
        <div>答辩名称<Input className='inp'
          disabled ={flag?true:false}
          placeholder={flag? defence.detailList.degenceName:'请输入答辩时间'}

          value={defenName}
          onChange={(e) => { setdefenName(e.target.value) }}
          name='denfenName' />
            专业 &emsp;

          <Select 
             placeholder={flag? defence.detailList.majorName:'请选择专业'}
            disabled={flag} style={{ width: 200 }} onChange={handleChange1}>
            {
              skill.toplist.map((item) => {
                return <Option value={item.id}>{item.name}</Option>
              })
            }
          </Select>
        </div>
        <div>答辩时间  &emsp;
        <Space direction="vertical" size={12}>
            <RangePicker
              placeholder={flag?[defence.detailList.defenceCreateTime,defence.detailList.defenceEndTime ]
                :['2021-06-01 20:20','2021-6-1 20:20']}
              disabled={flag}
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
            />
          </Space>
        </div>
        <div>班级计划  &emsp; 
        <Select style={{ width: 200 }} onChange={handleChange2}
           disabled={flag}
           placeholder={flag? `${defence.detailList.className}/${defence.detailList.planName}`:'请选择专业'}
         >
          {
            defence.ClasssPlanTree.children && defence.ClasssPlanTree.children.map(item => {
              return <Option key={item.value} value={item.value}>{item.label}</Option>
            })
          }
        </Select>
          &emsp;
          答辩地址<Input className='inp' name='denfenAddress'
          placeholder ={flag?defence.detailList.defenceAdress:""}
            disabled={flag}
            value={address}
            onChange={(e) => { setaddress(e.target.value) }} />
        </div>
         <div>发起人:{defence.detailList.defenceAuthorName||'郭老师'}</div>
      </div>
    </div>
    {
      flag ? <div className='table'>
        {
          defence.classTeam.list && defence.classTeam.list.map(item => {
            return <div className="commen">
              <h3>{item.groupname}</h3>
              <div><span>成员{item.members}名</span> | <span>任务{item.finished}个</span> | <span>时长52天</span></div>
              <Table rowKey='beginTime' columns={columns} pagination={false} dataSource={item.stuList} onChange={onChange} />
            </div>
          })
        }
      </div> : null
    }
  </div>
}
export default addDefence;