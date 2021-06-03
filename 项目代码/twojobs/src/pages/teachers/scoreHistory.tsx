import React,{} from 'react'
import './scoreHistory.less'
import useStore from '@/context/useStore'
import {Button} from 'antd'
import { IRouteComponentProps,history} from 'umi'
import {Table} from 'antd'
import defence from '@/store/modules/defence'
const dataSource = [
    {
 
      name: '郭老师',
      num: 0,
      time: '2021-6-1',
     
    },
   
  ];
  
  const columns = [
    {
      title: '评分人',
      dataIndex: 'name',
    
    },
    {
      title: '评分任务数',
      dataIndex: 'num',
    
    },
    {
      title: '最后评分时间',
      dataIndex: 'time',
    
    },
    {
        title: '操作',
      
        render :()=>{
            return <span className ='look' onClick ={()=>{console.log(1) , history.push(`/teachers/defenceScore?defenceId=${defence.detailList.defenceId}&see=false`)}}>查看</span>
        }
      },
  ];
  
let scoreHistory:React.FC =()=>{
    let { defence }  = useStore()
    return <div className='defenceScore'>
        <div className='top'>&emsp;&emsp;  答辩 / 答辩评分</div>
           <div className="list">
             <div className='commen'>
                <b>{defence.detailList.degenceName}</b><Button onClick ={()=>{history.replace('/teachers/defence')}}>返回</Button>
                 <hr/>
                 <div><b>答辩名称</b> <i>{defence.detailList.degenceName}</i> <b>专业</b> <i>{defence.detailList.majorName}</i> </div>
                 <div><b>班级/计划</b> <i>{defence.detailList.className}</i>
                 <b>答辩时间</b> <i>{defence.detailList.defenceCreateTime}至 {defence.detailList.defenceEndTime}</i></div>
                 <div><b>答辩地址</b><i> {defence.detailList.defenceAdress}</i> <b>评分人</b> 郭老师 </div>
             </div>
           </div>
           <div className="list">
             <div className='commen'>
             <Table  rowKey='1' dataSource={dataSource} columns={columns} />;
             </div>
           </div>
        </div>
}
export default scoreHistory;