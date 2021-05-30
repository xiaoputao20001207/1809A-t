import { makeAutoObservable } from "mobx"
import { questionDetailList, questionAnserItem } from "@/utils/interface"
import { getquestionDetailList } from '@/service/index'
class questionDetail {
    constructor() {
        makeAutoObservable(this)
    }
    //查看全部状态
    showAllindex:string|number=""
    //状态栏切换active标记
    curIndex = ""
    //默认每页显示条数
    pageSize = 8
    //默认页码
    pageNum = 1
    //最大数据
    total = 0
    //搜索标题
    title = ""
    //仅看教师认证
    authentication: string | number = ""
    //仅看精品
    quality: string | number = ""
    //提问框显示开关
    flag=false
    //数据列表
    questionDetailList: questionAnserItem[] = []
    //数据请求接口
    async getquestionDetailList(params: questionDetailList) {
        let res = await getquestionDetailList(params)
        if (res.rows) {
            this.total = res.total
            this.questionDetailList = res.rows
        }
    }
    //更改状态栏切换
    setcurIndex(type: string) {
        this.curIndex = type
    }
    //页码切换
    setpageNum(e: number) {
        this.pageNum = e
    }
    //变换全部答案 没写出来
    change(supportUpB: boolean, index: number) {
       this.showAllindex=index
        console.log(this.showAllindex);
        
    }
    //仅看教室认证状态更改
    setauthentication(e: boolean) {
        e ? this.authentication = 1 : this.authentication = ""
    }
    //搜索标题更改
    setSearchTitle(title: string) {
        this.title = title
    }
    //仅看精品更改
    setMyquality(e: boolean) {
        e ? this.quality = 1 : this.quality = ""
    }
    //提问框显示开关
    changeFlag(){
        this.flag=true
    }
    handleOk = () => {
        this.flag=false
      };
    
     handleCancel = () => {
        this.flag=false;
      };
}

export default new questionDetail