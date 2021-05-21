- 5.20
    - useState
      - useState(变量,事件函数)
          - 状态钩子函数
    - useEffect
      - useEffect(()=>{
          return
        },[])
    
        - 中括号不写则会每次刷新都会执行
        - 只写一个中括号则执行一次
        - 如果中括号里有内容则内容改变时才触发
    
    - 函数事件
    - function 事件名(){}。
  
- 5.19
  - 创建仓库
  - 查看状态
  - 提交信息
    - 初始化：int
    - 新增:add
    - 更新：update
    - 修复：fix
    - 删除：remove
    - 完成：finish
  - 撤销
    - 软撤销：git reset --soft 
    - 应撤销：git reset hard
  - 分支
    - 创建分支
    - 切换分支
    - 删除分支
    - 合并分支
  - 提交
    - 先拉取远程分支
    - 在提交远程