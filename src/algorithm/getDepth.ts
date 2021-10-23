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

// function levelOrderBottom( root ) {
//   // write code here
//   const arr = []
//   if (root.left || root.right) {
//       root.left ?? arr.unshift((levelOrderBottom(root.left))
//       root.right ?? arr.unshift(levelOrderBottom(root.right))
//   } else {
//       arr.unshift([root])
//   }
//   return arr
// }