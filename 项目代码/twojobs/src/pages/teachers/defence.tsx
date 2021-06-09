import React,{useEffect,useState} from 'react'
import {observer} from 'mobx-react-lite'
import useStore from '@/context/useStore'
import './defence.less'
import {Table,Input,Button,Tooltip,message,Pagination } from 'antd'
import {defenceTable} from '@/utils/interface'
import { NavLink,RouteChildrenProps} from 'react-router-dom'
import {history} from 'umi'
const { Search } = Input;
let status = ['全部','未开始','进行中','已结束']

import {EditOutlined,DeleteOutlined,DiffOutlined,BulbOutlined,PlusOutlined} from '@ant-design/icons'
import defence from '@/store/modules/defence'
import { changeOwnPage } from '@/service'
const success = () => {
  message.success({
    content: '删除成功',
    className: 'del',
    style: {
   
      fontSize:'18px'
    },
  });
};

 //表头数据
   
  const columns = [
    {
      title: '名称',
      dataIndex: 'degenceName',
      
    },
    {
      title: '专业',
      dataIndex: 'majorName',
    
    },
    {
      title: '班级/计划',
      render:(row:defenceTable)=>{
          return <div>
             <div>{row.className}</div>
             <div>{row.planName}</div>
          </div>
     }

    },
     {
        title: '发起人',
        dataIndex: 'defenceAuthorName',
  
      },
      {
        title: '开始/截止时间',
      
        render:(row:defenceTable)=>{
            return <div>
               <div>{row.defenceCreateTime}</div>
               <div>{row.defenceEndTime}</div>
            </div>
       }
      },
      {
        title: '状态',
      
        render:(row:defenceTable)=>{
             if(new Date().getTime()>new Date(row.defenceEndTime).getTime()){
                 return <div>已结束</div>
             }else  if(new Date().getTime()<new Date(row.defenceCreateTime).getTime()){
                return <div className ='nobegin'>未开始</div>
             }else{
                return <div className ='begin'>进行中</div>
             }
       }
      },
      {
        title: '操作',
        
        render:(row:defenceTable)=>{
            if(row.defenceStatus===1){
             return  <div className ='iconDefen'>
                <Tooltip placement="bottom" title='编辑'><EditOutlined 
                 onClick ={()=>{history.push(`/teachers/addDefence?defenceId=${row.defenceId}&see=false`) }}
                /></Tooltip>
                 &emsp; 
                  <Tooltip placement="bottom" title='删除'>
                      <DeleteOutlined 
                        onClick ={()=>{ 
                          let del = confirm('确定删除吗')
                          if(del){
                           defence.delteDefen(row.defenceId)
                           success()
                           
                        }}}/>
                  </Tooltip>
                </div>
            }else if(row.defenceStatus===2){
                return  <div className ='iconDefen'>
                    <Tooltip placement="bottom" title='去答辩'>
                       <DiffOutlined onClick ={()=>{goDetail(row.defenceId) }}         
                       />
                   </Tooltip>  &emsp;
                   <Tooltip placement="bottom" title='查看评分'> 
                      < BulbOutlined  onClick ={()=>{gohistortyDetail(row.defenceId) }}  />
                  </Tooltip> </div> 
            }else{
                return  <div className ='iconDefen'><DiffOutlined onClick ={()=>{goDetail(row.defenceId) }} /> &emsp;</div>
            }
       }
      },
  ];
  //跳详情
    async function goDetail(defenceId:string){
      await defence.getDefenceDetial(defenceId)
      await history.push(`/teachers/defenceScore?defenceId=${defenceId}&see=false`)
   }
   //跳评分
   async function gohistortyDetail(defenceId:string){
    await defence.getDefenceDetial(defenceId)
    await history.push(`/teachers/scoreHistory?defenceId=${defenceId}&see=false`)
 }
  interface Iprops extends RouteChildrenProps {

  }

let defenceConment:React.FC<Iprops> =() =>{
   let {defence,skill} = useStore()
    //页码数
    let [page,setpage] = useState(0)
    // 条数
    //专业
    let [ skillIndex,setskillIndex] = useState('')
    //状态
    let [ searchTitle,setsearchTitle] = useState('')
     //搜索
    let [ statusIndex,setstatusIndex] = useState(0)
   console.log(skill.toplist)
   const onSearch = (value:string )=> setsearchTitle(value)
   console.log(searchTitle)
   let ldefenceMjorId=skillIndex 
   let  defenceStatus=statusIndex
   //获取专业数据
   useEffect(() => {
      
     defence.getDefenceList('','' as unknown as number,'',1,10)
     skill.Gettoplist()

 }, []);


    //获取数据
    useEffect(() => {
        console.log(page)
         defence.getDefenceList( ldefenceMjorId,defenceStatus ,searchTitle,page ,10 )
         skill.Gettoplist()

    }, [skillIndex,statusIndex,searchTitle,page]);
  function onChange(page:number,pageSize:number|undefined):void{
    
     setpage(page)
  }
    return <div className = 'defence'>
         <div className="list">
             <div className = 'commen'>
                <div className="skill">
                  <b>专业</b>:
                  {
                    [{name:"全部",id:''},...skill.toplist].map((item,index)=>{
                        return <span key={index} className ={item.id ==skillIndex?'active':''}
                         onClick ={()=>{ setskillIndex(item.id)}}>{item.name}</span>
                    }) 
                  }
                </div>
                <div className="status">
                <b>状态</b>:
                 {
                  status.map((item,index)=>{
                      return <span key={index}
                      className ={statusIndex ==index?'active':''}
                       onClick ={()=>{ setstatusIndex(index)}}
                      >{item}</span>
                  })
                 }
                </div>
             </div>
         </div>

         <div className="table">
         <div className ='search'> <Search className='inp' placeholder="搜索班级/名称/计划" onSearch={onSearch} enterButton />
          <NavLink to='/teachers/addDefence'> <Button className='defenceBtn'  ><PlusOutlined /> 发起答辩</Button></NavLink></div>
         <Table rowKey ='defenceId' dataSource={defence.DefenceList} columns={columns} pagination ={false} />;
         <Pagination className ='page' total={defence.page}  onChange={onChange} />
         </div>
    </div>
}
export default observer(defenceConment);

function pageSize(page: any, pageSize: any) {
  throw new Error('Function not implemented.')
}
