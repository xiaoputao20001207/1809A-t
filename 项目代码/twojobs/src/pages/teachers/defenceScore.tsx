import React,{} from 'react'
import './defenceScore.less'
import useStore from '@/context/useStore'
import {Button} from 'antd'
import { IRouteComponentProps,history} from 'umi'
let defenceScore: React.FC<IRouteComponentProps> = ({location}) => {
  let { defence }  = useStore()
    return <div className='defenceScore'>
        <div className='top'>&emsp;&emsp;  答辩 / 答辩评分</div>
           <div className="list">
             <div className='commen'>
                <b>发起答辩</b><Button onClick ={()=>{history.replace('/teachers/defence')}}>返回</Button>
                 <hr/>
                 <div><b>答辩名称</b> <i>{defence.detailList.degenceName}</i> <b>专业</b> <i>{defence.detailList.majorName}</i> </div>
                 <div><b>班级/计划</b> <i>{defence.detailList.className}</i>
                 <b>答辩时间</b> <i>{defence.detailList.defenceCreateTime}至 {defence.detailList.defenceEndTime}</i></div>
                 <div><b>答辩地址</b><i> {defence.detailList.defenceAdress}</i> <b>评分人</b> 郭老师 </div>
             </div>
           </div>
        </div>
}
export default defenceScore;