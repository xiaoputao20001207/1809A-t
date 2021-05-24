// 买卖股票的最佳时机 II
//给定一个数组 prices ，其中 prices[i] 是一支给定股票第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
// 作者：力扣 (LeetCode)
// 链接：https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2zsx1/


// function Prific(price) {
//     let total = 0;
//     for (let i = 0; i < price.length-1; i++) {
//         total += Math.max(price[i + 1] - price[i], 0)
//     }
//     return total;
// }
// console.log(Prific([8,5,1,5,4,3,5]));

//3的倍数

// function three(n) {
//     if (n % 3 === 0) {
//         return true
//     } else {
//         return false;
//     }
// }
// console.log(three(1));

//3,5,15
// function FFB(n) {
//     let res = [];
//     for (let i = 1; i <= n; i++) {
//         if (i % 15 === 0) {
//             res.push("FizzBuzz")
//         } else if (i % 5 === 0) {
//             res.push("Buzz")
//         } else if (i % 3 === 0) {
//             res.push("Fizz")
//         } else {
//             res.push(`${i}`)
//         }
//     }
//     return res;
// }
// console.log(FFB(15));