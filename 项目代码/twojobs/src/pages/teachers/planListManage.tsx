import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import  "./planListManage.less"
import { IplanList, IplanListItem } from '@/utils/interface';
import { observer } from 'mobx-react-lite';
import useStore from '@/context/useStore';
import {Link} from "umi"
const PlanListManage: React.FC = () => {
  const columns = [
    {
      title: '班级/计划',
      render: (row: IplanListItem) => {
        return (
          <div>
            <p>{row.className}</p>
            <p>{row.planname}</p>
          </div>
        );
      },
      align: 'center',
    },
    {
      title: '时间',
      render: (row: IplanListItem) => {
        return (
          <div style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{display:"flex",lineHeight:"20px"}}>距结束还剩:<h2>{row.surplusTime}</h2></div>
            <p>开始时间:{row.begintime}</p>
            <p>结束时间:{row.endtime}</p>
          </div>
        );
      },
        align:"center"
    },
    {
      title: '进度',
      render: (row: IplanListItem) => {
        if (row.countUncompleted !== 0) {
          return (
            <div>
              <h1 style={{ color: '#FFA841' }}>{row.countUncompleted}%</h1>
            </div>
          );
        } else {
          return (
            <div>
              <h1 style={{ color: '#cccccc' }}>{row.countUncompleted}%</h1>
            </div>
          );
        }
      },
        align:"center"
    },
    {
      title: '操作',
      render:(row:IplanListItem)=>{
          return<Link to={`/teachers/viewPlan?plan_id=${row.id}&class_id=${row.classid}`}>
          <EyeOutlined style={{ color: '#679cf6',fontSize:"18px" }}  />
          </Link>
      }
    },
  ];
  let { planList } = useStore();
  console.log(planList.planListItem);
  //计划管理
  let queryParams: IplanList = {
    classId: '',
    searchName: '',
    ifFinished: 1,
    pageNum: 1,
    pageSize: 10,
  };
  let [id,setid]=useState(1)
  //tab
  let tab=["未开始","进行中","已结束"]
//   一进页面获取数据
  useEffect(() => {
    // /sxpt/classPlan/getPlanListAll
    planList.GetplanList(`classId=&searchName=&ifFinished=${1}&pageNum=1&pageSize=10`);
  }, []);
//   获取未开始数据
  function GetplanList(index:number) {
      planList.GetplanList(`classId=&searchName=&ifFinished=${index}&pageNum=1&pageSize=10`)
  }
  return (
    <div className="plan">
      <div className="plan_main">
        <div className="plan_top">
          <div className="plan_tab">
               {
                   tab.map((item,index)=>{
                       return <span key={index} className={id===index?"active":""} onClick={()=>{
                           setid(index)
                           GetplanList(index)
                        }}>{item}</span>
                   })
               }
          </div>
        </div>
        <div className="plan_table">
          <Table
            dataSource={planList.planListItem}
            columns={columns}
            rowKey="id"
            // key={id}
          ></Table>
        </div>
      </div>
    </div>
  );
};

export default observer(PlanListManage);
