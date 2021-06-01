import React, { useEffect, useState } from 'react'
import './addDefence.less'
import { Input, Button, Select, DatePicker, Space, Table, message, Tooltip } from 'antd'
import useStore from '@/context/useStore'
import { Link } from 'react-router-dom'
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

let addDefence = () => {
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
    console.log(dateString)
    console.log('开始时间: ', dateString[0]), setstartTime(dateString[0]);
    console.log('结束时间: ', dateString[1]), setendTime(dateString[1]);
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
  //专业数据    
  useEffect(() => {
    skill.Gettoplist()
    defence.getClasssPlanTree()
    console.log(defence.ClasssPlanTree.children)
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
  //保存成功
  const success = () => {

    if (!flag) {
      message.success('保存答辩信息成功');
    }
  };
  return <div className='addDefence'>

    <div className='top'>&emsp;&emsp;  答辩 / 发起答辩</div>
    <div className="list">
      <div className='commen'>
        <div id='save'><Link to="/teachers/defence"><Button>返回</Button></Link>
          <Button type="link" key='1' onClick={() => { setflag(!flag), success() }}>{flag ? '编辑' : '保存'}</Button>
          <Button type="primary" onClick={() => { defence.defenceInfo() }}>提交</Button></div>

        <br />
        <br />
        <hr />
        <div>答辩名称<Input className='inp'

          placeholder='请输入答辩时间'

          value={defenName}
          onChange={(e) => { setdefenName(e.target.value) }}
          name='denfenName' />
            专业 &emsp;
          <Select defaultValue="请选择专业"
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
              disabled={flag}
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
            />
          </Space>
        </div>
        <div>班级计划  &emsp; <Select style={{ width: 200 }} onChange={handleChange2}
          disabled={flag}
        >
          {
            defence.ClasssPlanTree.children && defence.ClasssPlanTree.children.map(item => {
              return <Option key={item.value} value={item.value}>{item.label}</Option>
            })
          }
        </Select>
          &emsp;
          答辩地址<Input className='inp' name='denfenAddress'
            disabled={flag}
            value={address}
            onChange={(e) => { setaddress(e.target.value) }} />
        </div>
        <div>发起人:郭老师</div>
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