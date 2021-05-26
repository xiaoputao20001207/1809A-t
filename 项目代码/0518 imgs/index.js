// function Parent(value){
//     this.val = value
// }
// //添加原型 
// Parent.prototype.getValue = function(){
//     console.log(this.val)//1
// }
// function Child(value){
//     Parent.call(this,value)//第二个参数可以传入任意类型
// }
// //实例化
// Child.prototype =  new Parent()
// const child = new Child(1)
// child.getValue()
// console.log(child instanceof Parent) // true

//call 方法的使用  A.call( B,x,y )：就是把A的函数放到B中运行，x 和 y 是A方法的参数。
/**
 * 1.定义一个父级函数
 * 2.添加他的原型方法
 * 3.定义子级函数
 * 4.改变子级this指向
 */
 

