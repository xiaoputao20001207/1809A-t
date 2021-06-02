import React from "react"
import './questionHandle.less'

const status = ["全部","精品","认证","被屏蔽"]

// 待处理问答
const QuestionHandle:React.FC=()=>{
    return <div className="questionHandle">
       
        {/* 主体 */}
        <div className="box_content">
            {/*来源和状态 */}
            <div className="one">
                <div className="train_resource">
                    <div>来源: <span style={{padding:"2px 5px",background:"rgb(103,156,246)",color:"#fff"}}> 网站2021A班 </span></div>
                </div>
                <div className="resource_type">
                    <div>状态 : </div>
                    <div>
                        {
                            status.map((item,index)=>{
                                return <span key={index}>{item}</span>
                            })
                        }
                    </div>
                </div>
            </div>
            
            <div className="resource_con">
                123
            </div>
        </div>
    </div>
}
export default QuestionHandle