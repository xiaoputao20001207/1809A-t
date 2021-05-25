import React, { useEffect, useState } from 'react';
import { Table, Input, Button } from 'antd';
import {Link} from 'umi';
import { ISkillLabel, ISkillListItem, ISkillListQuery } from '@/utils/interface';
import { getSkillLabel, getSkillList } from '@/services';
import classNames from 'classnames';
import { EyeOutlined, RollbackOutlined, FormOutlined, DeleteOutlined, DeliveredProcedureOutlined, SearchOutlined } from '@ant-design/icons';


import styles from './postSkill.less'

const status = ['全部', '草稿', '已发布', '待审核', '已驳回'];
const columns = [
    {
        title: '岗位名称',
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
    }, {
        title: '状态',
        render: (row: ISkillListItem) => <span className={styles[`status${row.status}`]}>{status[Number(row.status)]}</span>,
    }, {
        title: '操作',
        render: (row: ISkillListItem) => {
            if (row.status === '3') {
                return <div className={styles.action}>
                    <EyeOutlined style={{ color: '#679cf6' }} />
                    <RollbackOutlined style={{ color: '#679cf6' }} />
                </div>
            } else if (row.status === '1') {
                return <div className={styles.action}>
                    <FormOutlined style={{ color: '#679cf6' }} />
                    <DeliveredProcedureOutlined style={{ color: '#679cf6' }} />
                    <DeleteOutlined style={{ color: '#679cf6' }} />
                </div>
            }
        }
    }
];
const PostSkill: React.FC = props => {
    let [skillLabel, setSkillLabel] = useState<ISkillLabel[]>([])
    let [curSkill, setCurSkill] = useState('');
    let [isMyInfo, setMyInfo] = useState(false);
    let [curStatus, setCurStatus] = useState(0);
    let [title, setTitle] = useState('');
    let [searchTitle, setSearchTitle] = useState('');
    let [dataSource, setDataSource] = useState<ISkillListItem[]>([]);
    let queryParams:ISkillListQuery = { isAsc: 'desc', searchTitle: '', pageNum: 1, pageSize: 10, isMyInfo: false };

    // 发起请求获取专业标签
    useEffect(() => {
        getSkillLabel().then(res => {
            if (res.code == 200) {
                setSkillLabel(res.data);
            }
        })
    }, [])

    // 发起请求获取项目列表
    useEffect(() => {
        // 拼接下参数
        if (curStatus) {
            queryParams = { ...queryParams, isMyInfo, searchTitle, majorId: curSkill, status: curStatus }
        } else {
            queryParams = { ...queryParams, isMyInfo, searchTitle, majorId: curSkill, status: '' as unknown as number }
        }
        // debugger;
        getSkillList(queryParams).then(res => {
            if (res.code == 200) {
                setDataSource(res.rows);
            }

        })
    }, [curSkill, curStatus, isMyInfo, searchTitle]);

    return <div>
        <section>
            <section>
                <span>专业：</span>
                <ul className={styles.statusList}>{
                    [{ id: '', name: '全部' }, ...skillLabel].map(item => {
                        return <span className={item.id === curSkill ? classNames(styles.span, styles.active) : styles.span} onClick={e => setCurSkill(item.id)} key={item.id}>{item.name}</span>
                    })
                }</ul>
            </section>
            <section>
                <span>状态：</span>
                <ul className="statusList">{
                    status.map((item, index) => {
                        return <span className={index === curStatus ? classNames(styles.span, styles.active) : styles.span} onClick={e => setCurStatus(index)} key={item}>{item}</span>
                    })
                }</ul>
            </section>
        </section>

        <section>
            <input type="checkbox" checked={isMyInfo} onChange={e=>setMyInfo(e.target.checked)}/>只看我的
            <Input placeholder="搜索岗位" suffix={<SearchOutlined onClick={()=>setSearchTitle(title)}/>} value={title} onChange={e=>setTitle(e.target.value)} onKeyDown={e=>{
                if (e.keyCode === 13){
                    setSearchTitle(title)
                }
            }}/>
            <Link to="/teachers/addPostSkill?see=false">
                <Button type="primary">+添加岗位</Button>
            </Link>
        </section>
        <Table rowKey="stationId" dataSource={dataSource} columns={columns}></Table>
    </div>
}

export default PostSkill;