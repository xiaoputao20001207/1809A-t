import React, { ChangeEvent, Component, FC, useEffect, useState } from 'react'
import {getSkillLabel,getStationVersionList} from "@/services"
import {ISkillLabel,IStationVersionList,ISkillListQuery} from "@/utils/interface"
import { Table ,Input,Button } from 'antd';
import "./post.css"

import { EyeOutlined ,RollbackOutlined,FormOutlined,DeliveredProcedureOutlined,DeleteOutlined} from '@ant-design/icons';
import "./post.css"
import styles from './postSkill.less'
import classNames from 'classnames';
interface Iprops{
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
}
const { Search } = Input;
const status = ['全部', '草稿', '已发布', '待审核', '已驳回'];
const columns = [
    {
      title: '岗位名称',
      dataIndex: 'name',
      align:'center',
    },
    {
      title: '专业',
      dataIndex: 'majorName',
      align:'center',
    },
    {
      title: '版本号',
      dataIndex: 'stationVersion',
      align:'center',
    },
    {
        title: '技能数量',
        dataIndex: 'skillNum',
      align:'center',

      },
      {
        title: '作者',
        dataIndex: 'userName',
        align:'center',
      },
      {
        title: '发起时间',
        dataIndex: 'createTime',
        align:'center',
      },
      {
        title: '状态',
        render: (row: IStationVersionList) => <span className={styles[`status${row.status}`]}>{status[Number(row.status)]}</span>,
        align:'center',
      },
      {
        title: '操作',
        align:'center',
        render:(row: IStationVersionList)=>{    
            if(row.status ==='3'){
                return  <div className={styles.action}>
                    <EyeOutlined style={{ color: '#679cf6' }}/>
                    <RollbackOutlined style={{ color: '#679cf6' }}/>
                </div>
            }else if(row.status ==='1'){
                return  <div className={styles.action}>
                    <FormOutlined style={{ color: '#679cf6' }}/>
                    <DeliveredProcedureOutlined style={{ color: '#679cf6' }}/>
                    <DeleteOutlined style={{ color: '#679cf6' }}/>
                </div>
            }else if(row.status =='2'){
                return <EyeOutlined style={{ color: '#679cf6' }}/>
            }
        }
      },
  ];
// sxpt/station/selectStationLabel 专业数据
// sxpt/station/selectStationVersionList  表格
const postSkill:FC=()=>{
        const [selectStationLabel,setselectStationLabel] = useState<ISkillLabel[]>([])//专业数据
        const [selectStationVersionList,setselectStationVersionList] = useState<ISkillListQuery>({ isAsc: 'desc', searchTitle: '', pageNum: 1, pageSize: 10, isMyInfo: false } as ISkillListQuery);//列表
        let [curSkill, setCurSkill] = useState('');
        let [curStatus, setCurStatus] = useState(0);
        let [dataSource, setDataSource] = useState<IStationVersionList[]>([]);
        const [isMyInfo,setIsMyInfo] = useState(false)//多选框选中状态
        const [searchTitle,setSearchTitle] = useState('')//多选框选中状态
        // isAsc: desc
        // pageNum: 1
        // pageSize: 10
        // searchTitle: 
        // majorId: 
        // status: 
        // isMyInfo: false
        //专业数据
        useEffect(()=>{
            getSkillLabel().then(res=>{
                setselectStationLabel(res.data)
            })
        },[])//相当于componentdidmount  执行一次 不传第二个参数无限执行

        //项目列表
    useEffect(() => {
        // 拼接下参数
        let queryParams: ISkillListQuery = {} as ISkillListQuery;
        if (curStatus) {
            queryParams = { ...queryParams, majorId: curSkill, status: curStatus ,isMyInfo,searchTitle}
        } else {
            queryParams = { ...queryParams, majorId: curSkill,isMyInfo, searchTitle,status: '' as unknown as number }
        }
        getStationVersionList(queryParams).then(res => {
            if (res.code == 200) {
                setDataSource(res.rows);
            }
        })
    },  [curSkill, curStatus,isMyInfo,searchTitle]);

    // 发起请求获取项目列表
      //搜索框
      const onSearch =( value:string) => {
        setSearchTitle(value)
    };
        return (
            <div className='post'>
                <div className="label">
                    <div className={styles.spans}>
                        <section>
                            <h3>专业：</h3>
                            <ul>
                            {
                                selectStationLabel?  [{ id: '', name: '全部' },...selectStationLabel].map(item=>{
                                    return <span key={item.id} className={curSkill==item.id?classNames(styles.item,styles.shine):styles.item} onClick={e => setCurSkill(item.id)}>{item.name}</span>
                                }):''
                            }</ul>
                        </section>
                        
                        <section>
                            <h3>状态：</h3>
                            <ul>{
                                status.map((item,index)=>{
                                    return <span key={item} className={curStatus==index?classNames(styles.item,styles.shine):styles.item} onClick={e => setCurStatus(index)}>{item}</span>
                                })
                            }</ul>
                        </section>
                    </div>

                    <div className={styles.mainlist}>
                         <div className={styles.search}>
                        <input type="checkbox" onChange={e=>{setIsMyInfo(e.target.checked)}}/>只看我的
                        <Search placeholder="输入内容" allowClear onSearch={onSearch} style={{ width: 200 }} />
                        <Button type="primary">添加岗位</Button>
                    </div>

                    <Table columns={columns} dataSource={dataSource} rowKey='1'/>
                    </div>
                </div>
            </div>
        )
}
export default postSkill