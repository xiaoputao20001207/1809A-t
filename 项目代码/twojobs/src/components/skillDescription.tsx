import React,{ FC, useEffect, useState } from "react";
import style from './skilldesciption.less';
import {PlusOutlined, SearchOutlined, MinusOutlined, FormOutlined} from '@ant-design/icons';
import useStore from "@/context/useStore";
import { Tree } from 'antd';
import Editor from 'for-editor';
import {observer} from 'mobx-react-lite';

interface StationId{
    stationVersionId:string,
}

const Skilldescription:FC<StationId> = (props)=>{
    let {description} = useStore()

    let [value,setValue] = useState()

    let [flag,setFlag] = useState(false)//控制修改时显示输入框还是文字
    const [currentSkillId, setCurrentSkillId] = useState('');

    useEffect(() => {
       if(currentSkillId){
        description.getStationSkillDetail(currentSkillId)
       }
    //    console.log(flag,currentSkillId);
       
    }, [flag])
    
    //添加第一项
    function addDescriptstion(){
        description.initSkill(props.stationVersionId)

         console.log(description.skillList,'---19')
    }

    //添加每一项
    function addSubmit(parentId:string){
        let stationVersionId = props.stationVersionId
        description.addSubmitItem(stationVersionId,parentId)
    }
    
    //删除某一项
    function deleteSubmit(skillId:string){
        description.delSubmitItem(skillId)
    }
    return <div className={style.box}>
                <div className={style.left}>
                    <div className={style.left_top}>
                        <div className={style.left_top_icon}>
                            <SearchOutlined />
                            <PlusOutlined 
                            onClick={e=>addDescriptstion()}
                            />
                        </div>
                    </div>
                    <div>
                        
                        {
                            description.skillList.length?<Tree
                            autoExpandParent={true}
                            treeData={description.skillList}
                            titleRender={(nodeData:any)=>{
                                return <p id='item' onClick={e=>setCurrentSkillId(nodeData.id)}>
                                        {
                                            flag && currentSkillId===nodeData.id?
                                            <input type="text" 
                                                value={description.skillDetail.skillName} 
                                                style={{background:"pink"}}
                                                onKeyDown={e=>{
                                                if(e.keyCode === 13){
                                                    description.changeValueItem()
                                                    setFlag(false);
                                                }
                                            }}
                                            onChange={e=>description.modifySKillDetail({skillName: e.target.value})}
                                            />:
                                            <span>{nodeData.label}</span>
                                        }
                                        <span style={{marginLeft:'20px'}}>
                                            <PlusOutlined  onClick={e=>{
                                                addSubmit(nodeData.id)
                                            }}/>
                                            <FormOutlined onClick={e=>{
                                                setFlag(true)
                                            }}/>
                                            <MinusOutlined onClick={e=>{
                                                deleteSubmit(nodeData.id)
                                            }}/>
                                        </span>
                                </p>
                            }}
                        />:<div style={{margin:'0 auto',width:'60px',marginTop:'40px'}}>暂无数据</div>
                        }
                          
                    </div>
                </div>
                <div className={style.right}>
                    <Editor value={value} onChange={(value:any) => setValue(value)} />
                </div>
    </div>
}
export default observer(Skilldescription)