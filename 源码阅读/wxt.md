## 吴晓桐
- 6.9
   - [Node.js eventloop + 线程池源码分析（建议精读）](https://juejin.cn/post/6951303053739819038)
- 6.8
   - [「React进阶」漫谈React异步组件前世与今生](https://juejin.cn/post/6970845778713509919)
   - ​[前端项目负责人在项目初期需要做什么](https://juejin.cn/post/6968874442554343455)
- 6.7
  - [React Hooks源码浅析](https://zhuanlan.zhihu.com/p/68842478)
  - ​[react生命周期，hooks对应的生命周期？](https://www.cnblogs.com/cxyqts/p/14401737.html?ivk_sa=1024320u))
- 6.6
  - [React Hooks源码浅析](https://zhuanlan.zhihu.com/p/68842478)
  - ​[react生命周期，hooks对应的生命周期？](https://www.cnblogs.com/cxyqts/p/14401737.html?ivk_sa=1024320u)

- 6.5
  - [vue源码解读--生命周期](https://www.jianshu.com/p/4748048ed02b)
  - [React源码分析4 — React生命周期详解](https://blog.csdn.net/u013510838/article/details/58070092)

- 6.4
  - [官方揭秘！你的颜色是这样算出来的…… ](https://juejin.cn/post/6968344281786351629)
   - [可视化搭建工具技术探索之表单](https://juejin.cn/post/6965336033395212302)
   - [iconfont 支持全新的彩色字体图标](https://juejin.cn/post/6960108736966819848)
- 6.3
   - [用 ObjectComponent 重新定义 React 组件](https://juejin.cn/post/6969536778927603725)
   - [Android 原生webview传递header前端H5如何接收](https://juejin.cn/post/6965336033395212302)
   - [生产环境js错误收集及定位源码位置](https://juejin.cn/post/6960108736966819848)
- 6.2
   - [ MindSpore 人脸识别](https://juejin.cn/post/6965741051646574628)
   - [Android 原生webview传递header前端H5如何接收](https://juejin.cn/post/6965336033395212302)
   - [用5个示例理解 CSS 变量](https://juejin.cn/post/6966387853483835429)
- 6.1
  - [生产环境js错误收集及定位源码位置](https://juejin.cn/post/6960108736966819848)
  - [Node.js eventloop + 线程池源码分析（建议精读）](https://juejin.cn/post/6951303053739819038)
- 5.31
   - [assign](https://www.lodashjs.com/docs/lodash.assign)
   - [_.create(prototype, [properties])](https://www.lodashjs.com/docs/lodash.create)
   - [bind](https://www.lodashjs.com/docs/lodash.bind)
- 5.30
    - [React源码中如何实现受控组件](https://zhuanlan.zhihu.com/p/267008933)
    - ​[useState源码浅析](https://blog.csdn.net/weixin_33786077/article/details/91466681)
- 5.29
    - [有效的括号](https://leetcode-cn.com/problems/valid-parentheses/solution/valid-parentheses-fu-zhu-zhan-fa-by-jin407891080/)
    - [组数总和](https://leetcode-cn.com/problems/combination-sum/solution/zu-he-zong-he-by-leetcode-solution/)
- 5.28
   - [Vue 源码解读（5）—— 全局 API目标](https://juejin.cn/post/6952643167715852319)
- 5.27
   - [indexOf](https://www.lodashjs.com/docs/lodash.indexOf)
   - [裁剪数组](https://www.lodashjs.com/docs/lodash.slice)
   - [移除array中对应的元素](https://www.lodashjs.com/docs/lodash.pullAt)
- 5.26
   - [ MindSpore 人脸识别](https://juejin.cn/post/6965741051646574628)
   - [Android 原生webview传递header前端H5如何接收](https://juejin.cn/post/6965336033395212302)
   - [用5个示例理解 CSS 变量](https://juejin.cn/post/6966387853483835429)
- 5.25
   - [assign](https://www.lodashjs.com/docs/lodash.assign)
   - [_.create(prototype, [properties])](https://www.lodashjs.com/docs/lodash.create)
   - [bind](https://www.lodashjs.com/docs/lodash.bind)
- 5.24
  - [React 组件性能优化最佳实践](https://juejin.cn/post/6965747225154732069)
   - [大道理小聪明系列 - Redux + Hooks 工程实践一则](https://juejin.cn/post/6965732983781195807)
- 5.23
    - 手写apply
    ```js
    Function.prototype.myApply = function(context) {
        if (typeof this !== 'function') {
        throw new TypeError('Error')
        }
        context = context || window
        context.fn = this
        let result
        // ॒ቘ݇හ޾ call ํڦ܄
        if (arguments[1]) {
        result = context.fn(...arguments[1])
        } else {
        result = context.fn()
        }
        delete context.fn
        return result
    }
    ```
- 5.22
    - 手写bind
    ```js
    Function.prototype.myBind = function (context) {
        if (typeof this !== 'function') {
        throw new TypeError('Error')
        }
        const _this = this
        const args = [...arguments].slice(1)
        // ᬬࢧӞӻڍහ
        return function F() {
        // ࢩԅᬬࢧԧӞӻڍහ҅౯ժݢզ new F()҅ಅզᵱᥝڣෙ
        if (this instanceof F) {
        return new _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
        }
    }   
    ```
- 5.21
  - 类继承
    ```js 
    class Parent {
        constructor(value){
            this.val = value
            console.log(constructor);
        }
        getValue(){
            console.log(this.val);
        }
    } 
    class Child extends Parent {
    constructor(value){
        super(value)
        this.val = value
    }}
    let child = new Child(1)
    child.getValue()
    child instanceof Parent
    ```
- 5.20.
    - 删除排序数组中的重复项 
        - public int removeDuplicates(int[] A) {
                int count = 0;//重复的数字个数
                for (int right = 1; right < A.length; right++) {
                    if (A[right] == A[right - 1]) {
                        //如果有重复的，count要加1
                        count++;
                    } else {
                        //如果没有重复，后面的就往前挪
                        A[right - count] = A[right];
                    }
                }
                //数组的长度减去重复的个数
                return A.length - count;
            }
    
    - 旋转数组
        - 输入: nums = [1,2,3,4,5,6,7], k = 3输出: [5,6,7,1,2,3,4] 解释:向右旋转 1 步: [7,1,2,3,4,5,6]向右旋转 2 步: [6,7,1,2,3,4,5]向右旋转 3 步: [5,6,7,1,2,3,4]
    
        
    - 只出现一次的数字
        - 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素
        - class Solution {public:
            int singleNumber(vector<int>& nums) {
                // a ^ b ^ a = a ^ a ^ b = 0 ^ b = b
                int result = nums[0];
                for (int i = 1; i < nums.size(); ++i) {
                    result = result ^ nums[i];
                }
                return result;
            }};
  
    
