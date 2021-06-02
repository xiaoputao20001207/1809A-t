import { getRecordRangking } from '@/service/modules/rankList'
import { RankClassInfo, RecordRanking } from '@/utils/interview'
import {makeAutoObservable} from 'mobx'

//放置 面试记录管理的数据以及请求
class RankList{
    constructor(){
        makeAutoObservable(this)
    }
    classInfo:RankClassInfo[] = []

}
export default new RankList