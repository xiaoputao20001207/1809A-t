import React from 'react'
import { Button, Input, Table, Tag, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styles from './planList.less'
import useStore from "@/context/useStore";
const columns = [
    {
        title: '班级/计划',
        dataIndex: 'className',
        key: 'className',
    },
    {
        title: '时间',
        dataIndex: 'begintime',
        key: 'begintime',
    },
    {
        title: '进度',
        dataIndex: 'countUncompleted',
        key: 'countUncompleted',
    },
    {
        title: '操作',
        key: 'address',
    }
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const planList: React.FC = () => {
    const status = ['全部', '网站2021班']
    const navList = ['未开始', '进行中', '已结束']
    const {paln}=useStore()

    useEffect(()=>{
        //写到这里，没有传参数---------------------------------------------------
        plan.getPlanList()
    },[])

    return <div>
        <section><span>计划 / 计划</span></section>
        <section>
            班级：{
                status.map((item, index) => {
                    return <span key={index}>
                        {item}
                    </span>
                })
            }
        </section>
        <section>
            <p>
                {
                    navList.map((item, index) => {
                        return <span key={index}>
                            {item}
                        </span>
                    })
                }
                <Button>添加岗位</Button>
                <Input className={styles.searchInput} placeholder="搜索计划/项目/任务" suffix={<SearchOutlined />} />
            </p>
        </section>
        <section>
            <Table columns={columns} dataSource={data} />
        </section>
    </div>
}

export default planList