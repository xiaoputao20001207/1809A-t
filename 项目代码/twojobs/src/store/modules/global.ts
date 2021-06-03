import {makeAutoObservable} from 'mobx'

class Global{
    constructor(){
        makeAutoObservable(this)
    }
    
    isLoading:boolean = true

    showLoading(){
        this.isLoading = true
    }

    hideLoading(){
        this.isLoading = false
    }
}
export default new Global