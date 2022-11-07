"use strict";
// 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
//  
// 示例 1：
// 输入：nums1 = [1,3], nums2 = [2]
// 输出：2.00000
// 解释：合并数组 = [1,2,3] ，中位数 2
// 示例 2：
// 输入：nums1 = [1,2], nums2 = [3,4]
// 输出：2.50000
// 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
// 示例 3：
// 输入：nums1 = [0,0], nums2 = [0,0]
// 输出：0.00000
// 示例 4：
// 输入：nums1 = [], nums2 = [1]
// 输出：1.00000
// 示例 5：
// 输入：nums1 = [2], nums2 = []
// 输出：2.00000
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/median-of-two-sorted-arrays
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function isArray(arr) {
    return Array.isArray(arr);
}
function findMedianSortedArrays(nums1, nums2) {
    if (!isArray(nums1) || !isArray(nums2)) {
        return -1;
    }
    const num3 = nums1.concat(nums2).sort((a, b) => a - b);
    if (num3.length % 2 === 0) {
        // 偶数
        const lenHalf = num3.length / 2;
        return (num3[lenHalf - 1] + num3[lenHalf]) / 2;
    }
    else {
        // 奇数
        const lenHalf = Math.floor(num3.length / 2);
        return num3[lenHalf];
    }
}
;
findMedianSortedArrays([1, 2], [3, 4]);
