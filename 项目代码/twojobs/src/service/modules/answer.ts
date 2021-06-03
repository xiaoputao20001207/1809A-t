import {request} from 'umi'
// 提问者信息
export let getAnswerDetail = (answerId:string)=>{
    return request(`/sypt/answer/${answerId}`)
}
// 回答列表
export let getAnswerList = (answerId:string)=>{
    return request(`/sypt/reply/answerList`,{
        params:{
            answerId
        }
    })
}
// 我的回答数
export let getReply = ()=>{
    return request('/sypt/answer/reply')
}
// 获得我得信息
export let getInfo = ()=>{
    return request('/getInfo')
}
// 填写回答后点击提交按钮
export let IaddReply = (answerId:string,questionValue:string)=>{
    return request('/sypt/answer/reply',{
        method:'post',
        data:{
            answerId,
            questionValue
        }
    })
}
// 点击收藏按钮
export let addCollection = (answerId:string)=>{
    return request('/sypt/collection/add',{
        params:{
            answerId    
        }
    })
}
// 点击 取消收藏按钮
export let deleteCollection = (answerId:string)=>{
    return request('/sypt/collection/delete',{
        method:'delete',
        params:{
            answerId    
        }
    })
}