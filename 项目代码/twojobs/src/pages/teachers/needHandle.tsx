import React,{FC, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import style from './needHandle.less'
import { Table, Tag, Space,  Form, Input, Select } from 'antd';
import { DownOutlined,AudioOutlined } from '@ant-design/icons';
import useStore from '@/context/useStore';

const { Search } = Input;
const { Option } = Select;

// const dataSource = [
//     {
//       key: '1',
//       name: '胡彦斌',
//       age: 32,
//       address: '西湖区湖底公园1号',
//     },
//     {
//       key: '2',
//       name: '胡彦祖',
//       age: 42,
//       address: '西湖区湖底公园1号',
//     },
//   ];
  
  const columns = [
    {
      title: '待办事项',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '类型',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '发起人',
      dataIndex: 'address',
      key: 'address',
    },
    {
        title: '发起时间',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '操作',
        dataIndex: 'address',
        key: 'address',
    },
  ];

const NeedHandle:FC = ()=>{
    //引入store里的事件
    let {need} = useStore()

    //定义表格数组
    const [dataSource,SetDataSource] = useState()

    //刚进页面渲染表格
    useEffect(() => {
        need.getAll()
    //    SetDataSource(result)
    }, [])

    //下拉框选择班级事件
    function handleChange(value:string) {
        console.log(`selected ${value}`);
    }

    //点击放大镜搜索事件---》表格
    function onSearch(value:string){
        console.log(value);
        
    }

    return <div className={style.box}>
         <div className={style.showall}>
                <div className={style.needdel}>
                    <div className={style.needel_top}>
                            <div>
                                <Select placeholder='请选择班级' style={{ width: 120 }} onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                </Select>
                            </div>
                    </div>
                    <div className={style.needel_up}>
                        <div className={style.up_left}>
                                <img src="http://111.203.59.61:8060/static/img/need_all.f33d257f.svg" alt=""/>
                                <dl>
                                    <dt><b>0
                                        {/* {dataSource.length} */}
                                        </b>
                                    </dt>
                                    <dd>全部</dd>
                                </dl>
                        </div>
                        <div className={style.up_right}>
                                <img src="http://111.203.59.61:8060/static/img/question.dd523812.svg" alt=""/>
                                <dl>
                                    <dt><b>0</b></dt>
                                    <dd>问答</dd>
                                </dl>
                        </div>
                    </div>
                </div>
                <div className={style.needtable}>
                    <div className={style.needtable_head}>
                        <div className={style.head_inp}>
                            <Search placeholder="input search text" onSearch={onSearch} style={{ width: '200px' }} />
                        </div>
                    </div>
                    <div className={style.needtable_body}>
                        <Table dataSource={dataSource} columns={columns} />;
                    </div>
                </div>
         </div>
    </div>
}
export default observer(NeedHandle)