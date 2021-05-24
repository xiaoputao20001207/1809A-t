import React,{ FC, useEffect, useState } from 'react'
import {Gettoplist, GetListItem} from '@/service/index'
import {ISkillLabel, ISkillListQuery} from '@/utils/interface'
import './postSKill.css'
import { Table } from 'antd';

const columns = [
    {
      title: '姓岗位名称',
      dataIndex: 'name',
    },
    {
      title: '专业',
      dataIndex: 'majorName',
    },
    {
      title: '版本号',
      dataIndex: 'stationVersion',
    },
    {
        title: '技能数量',
        dataIndex: 'skillNum',
      },
      {
        title: '作者',
        dataIndex: 'userName',
      },
      {
        title: '发起时间',
        dataIndex: 'createTime',
      },

  ];

const status = ['全部','草稿','已发布','待审核','已驳回']
const Postskill:FC = (props)=>{

    //专业状态
    const [toplist, setList] = useState<ISkillLabel[]>([])
    
    // //头部每一项状态
    // const [topitem, settopitem] = useState<ISkillListQuery[]>([])

    //专业每一项高亮
    const [curStatus, setcurStatus] = useState('')

    //状态每一项高亮
    const [carStatus, setcarStatus] = useState(0)

    const [dataSource, setdataSource] = useState<ISkillListQuery[]>([])
    
    //头部发起请求
    useEffect(() => { 
        Gettoplist().then(res=>{
            if(res.code === 200){
                setList(res.data)
            }
        })
    }, [])

    //表格发起请求
    useEffect(()=>{
        let queryParams:ISkillListQuery = {} as ISkillListQuery
        if(carStatus){
            queryParams = {...queryParams,majorId:curStatus,status:carStatus}
        }else{
            queryParams = {...queryParams,majorId:curStatus,status:'' as unknown as number}
        }
        GetListItem(queryParams).then(res=>{
            if(res.code === 200){
                setdataSource(res.rows)
            }
        })
    },[curStatus,carStatus])
    return <div className='box'>

        <div className='topfather'>
                <div className="top">
                    <b>专业:</b>
                    <span>全部</span>
                    {
                        toplist.map(item=>{
                            return <span key={item.id} className={item.id===curStatus?'active':''} onClick={e=>setcurStatus(item.id)}>{item.name}</span>
                        })
                    }
            
            </div>
            <div className='topc'>
                    <b>状态:</b>
                    {
                        status.map((item,index)=>{
                            return <span key={index} className={index===carStatus?'active':''} onClick={e=>setcarStatus(index)}>{item}</span>
                        })
                    }
            </div>
        </div>
        
        <div className="tab">
            <Table dataSource={dataSource} columns={columns} rowKey="stationId">

            </Table>
        </div>
    </div>
}
export default Postskill