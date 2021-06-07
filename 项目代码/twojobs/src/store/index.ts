//引入子模块
import skill from './modules/skill'
import description from './modules/description'
import defence from './modules/defence'

//面试
import interview from './modules/interview'
import interviewManage from './modules/interviewManage'
import rankList from './modules/rankList'
import questionDetail from './modules/questionDetail'
import questionhandle from './modules/questionhandle'
import answerDetail from './modules/answerDetailManage'
import need from './modules/need'
import personcenter from './modules/personcenter'
import logins from './modules/logins'
import global from './modules/global'
import proSkill from './modules/proSkill'
import planList from "./modules/planList"
import plan from './modules/plan'
import view from './modules/view'
import addPlan from './modules/addPlan'
import user from './modules/user'
import { isComputedProp } from '_mobx@6.3.2@mobx'



export default{
    skill,
    description,
    interview,
    rankList,
    interviewManage,
    questionDetail,
    questionhandle,
    answerDetail,
    need,
    personcenter,
    logins,
    global,
    proSkill,
    planList,
    plan,
    view,
    addPlan,
    user,
    defence,
}