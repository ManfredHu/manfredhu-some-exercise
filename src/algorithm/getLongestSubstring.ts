// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

//  

// 示例 1:

// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:

// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:

// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
// 示例 4:

// 输入: s = ""
// 输出: 0
//  

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




// var lengthOfLongestSubstring = function(s) {
//   // 哈希集合，记录每个字符是否出现过
//   const occ = new Set();
//   const n = s.length;
//   // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
//   let rk = -1, ans = 0;
//   for (let i = 0; i < n; ++i) {
//       if (i != 0) {
//           // 左指针向右移动一格，移除一个字符
//           occ.delete(s.charAt(i - 1));
//       }
//       while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
//           // 不断地移动右指针
//           occ.add(s.charAt(rk + 1));
//           ++rk;
//       }
//       // 第 i 到 rk 个字符是一个极长的无重复字符子串
//       ans = Math.max(ans, rk - i + 1);
//   }
//   return ans;
// };

function lengthOfLongestSubstring(s: string): number {
  if (typeof s !== 'string') return 0
  const len = s.length;
  let left = 0, // 左指针
  tempLen = 0 // 当前round最长子串

  for (let i=0;i<len;i++) { // 外循环遍历字符串每个字符
      console.log(`i`, i)
      const uniq = new Set<string>() // 存储字符
      left = 0 // 重置一下
      while(left+i < len && !uniq.has(s.charAt(left+i))) { // 内循环窗口扩大往后找子串
          console.log(`find char`, s.charAt(left+i), left, i)
          uniq.add(s.charAt(left+i)) // 添加字符
          console.log(`uniq`, uniq)
          left++;
      }
      console.log(`uniq round end`, uniq)
      tempLen = Math.max(tempLen, uniq.size)
      console.log(`tempLen`, tempLen, left, i)
  }
  return tempLen
};
const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ abcdefghijklmnopqrstuvwxyzABCD"
console.log('last rst', lengthOfLongestSubstring(str))





















// var lengthOfLongestSubstring = function(s) {
//   // 哈希集合，记录每个字符是否出现过
//   const occ = new Set();
//   const n = s.length;
//   // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
//   let rk = -1, ans = 0;
//   for (let i = 0; i < n; ++i) {
//       if (i != 0) {
//           // 左指针向右移动一格，移除一个字符
//           occ.delete(s.charAt(i - 1));
//       }
//       while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
//           // 不断地移动右指针
//           occ.add(s.charAt(rk + 1));
//           ++rk;
//       }
//       // 第 i 到 rk 个字符是一个极长的无重复字符子串
//       ans = Math.max(ans, rk - i + 1);
//   }
//   return ans;
// };

// lengthOfLongestSubstring('abcabcbb')