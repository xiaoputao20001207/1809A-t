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
- 5.20
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
- 5.19.1
  
    
