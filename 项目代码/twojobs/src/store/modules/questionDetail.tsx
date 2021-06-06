import { makeAutoObservable ,runInAction} from "mobx"
import { questionDetailList, questionAnserItem, commitParams } from "@/utils/question"
import { getquestionDetailList ,getprojectlist, commit} from '@/service/index'
import {message} from "antd"
interface defauList{
    name:string|null,
    value:string
}
class questionDetail {
    constructor() {
        makeAutoObservable(this)
    }
    // labels: []
    // questionContent: "MK文档"
    // questionTitle: "标题"
    // text1: "类型的公司"
    // text2: "岗位"
    // type: 1
    //查看全部状态
    showAllindex:string|number=""
    //状态栏切换active标记
    curIndex = ""
    //标签数组
    labels:Array<string>=[]
    //标签值
    labelsvalue=""
    //第一栏选中字段
    curpro="0"
    //默认每页显示条数
    pageSize = 8
    //实训的第二栏参数
    list:defauList[]=[]
    //实训第三栏参数
    list2:defauList[]=[]
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
    //变换全部答案 
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
     handleCancel = () => {
        this.flag=false;
      };
      //第一栏改变 获取第二栏数据
    async  changeclass(v:string){
        console.log(v);
        
        this.curpro=v
        let res=  await getprojectlist()
            this.list=res.data
      }
     async changeclasstwo(){
        let res= await getprojectlist()
        this.list2=res.data
        
      }
      //添加标签的值
      changelabelsvalue(e:React.ChangeEvent<HTMLInputElement>){
     
        this.labelsvalue=e.target.value
      }
      error = () => {
        message.error('最多只能添加5个标签');
      };
      //添加标签
      addtext(e:React.KeyboardEvent<HTMLInputElement>){   
        if(e.key=="Enter"){
            if(e.preventDefault){
                e.preventDefault();
              }
              if(this.labels.length<5){
                this.labels.unshift(this.labelsvalue)
                this.labelsvalue=""                  
            }else{
                this.error()
            }
        }
      } 
      //删除标签
      deletelabes(i:number){
         this.labels=this.labels.filter((item,index)=>{
             return index!=i
         })
      }
      //发布
     async commit (e:commitParams){
        let lab=[...this.labels]
        let params={...e,labels:lab}
        let  res= await commit(params)
        
        if(res.code==200){
            this.labels=[]
            this.flag=false;
            return true
        }
      }
}

export default new questionDetail