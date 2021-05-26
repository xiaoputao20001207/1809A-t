import React,{ FC, useState } from "react";
import style from './skilldesciption.less'
import {PlusOutlined, SearchOutlined} from '@ant-design/icons'
import useStore from "@/context/useStore";
import { Tree } from 'antd';
import Editor from 'for-editor'

interface StationId{
    stationVersionId:string
}

const Skilldescription:FC<StationId> = (props)=>{
    let {description} = useStore()
    //let [list,setList] = useState()
    let [value,setValue] = useState()
    async function addDescriptstion(){
        let list = await description.initSkill(props.stationVersionId)
        console.log(description.skillDetail,list);
        //setList(list)
    }
    return <div className={style.box}>
                <div className={style.left}>
                    <div className={style.left_top}>
                        <div className={style.left_top_icon}>
                            <SearchOutlined />
                            <PlusOutlined onClick={e=>addDescriptstion()}/>
                        </div>
                    </div>
                    <div>
                        
                        <Tree
                            // autoExpandParent={true}
                            // treeData={description.skillDetail}
                            
                        // onExpand={a:'123'}
                        // expandedKeys={expandedKeys}
                        // autoExpandParent={autoExpandParent}
                        // onCheck={onCheck}
                        // checkedKeys={checkedKeys}
                        // onSelect={onSelect}
                        // selectedKeys={selectedKeys}
                        // treeData={treeData}
                        />
                          
                    </div>
                </div>
                <div className={style.right}>
                    <Editor value={value} onChange={(value:any) => setValue(value)} />
                </div>
    </div>
}
export default Skilldescription