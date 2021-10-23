// https://leetcode-cn.com/problems/binary-tree-level-order-traversal/

// ## 二叉树层序遍历 ii

// 限定语言：Python、C++、Java、Go、Javascript、Python 3

// 给定一个二叉树，返回该二叉树由底层到顶层的层序遍历，（从左向右，从叶子节点到根节点，一层一层的遍历）

// 例如：

// 给定的二叉树是{3,9,20,#,#,15,7},

// `  3   / \  9 20   / \   15  7 `该二叉树由底层到顶层层序遍历的结果是

// ```
// [[15,7],[9,20],[3]]
// ```

// 示例1

// ## 输入

// ```
// {1,#,2}
// ```

// ## 输出

// ```
// [[2],[1]]
// ```


/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

 var levelOrder = function(root) {
  if (!root) return []
  const ret = [] // 最后结果
  const q = [] // 每一层的临时结果
  q.push(root)
  while(q.length > 0) {
      ret.push([])
      const curLevelNum = q.length
      console.log(`ret`, ret)
      for (let i = 0; i < curLevelNum; i++) {
          console.log(`q`, q)
          const temp = q.shift() // 从队列头拿
          if (!temp.val) console.log(`temp`, temp)
          ret[ret.length - 1].push(temp.val)
          if (temp.left) q.push(temp.left)
          if (temp.right) q.push(temp.right)
          console.log(`q2`, q)
      }
  }
  return ret
};
