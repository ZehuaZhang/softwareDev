/*
Given a binary tree, you need to find the length of Longest Consecutive Path in Binary Tree.

Especially, this path can be either increasing or decreasing. For example, [1,2,3,4] and [4,3,2,1] are both considered valid, but the path [1,2,4,3] is not valid. On the other hand, the path can be in the child-Parent-child order, where not necessarily be parent-child order.

Example 1:

Input:
        1
       / \
      2   3
Output: 2
Explanation: The longest consecutive path is [1, 2] or [2, 1].
 

Example 2:

Input:
        2
       / \
      1   3
Output: 3
Explanation: The longest consecutive path is [1, 2, 3] or [3, 2, 1].
 

Note: All the values of tree nodes are in the range of [-1e7, 1e7].
*/

function longestConsecutive(root) {
    if (root === null) {
        return 0;
    }
    const result = dfs(root, 1) + dfs(root, -1) + 1;
    return Math.max(result, longestConsecutive(root.left), longestConsecutive(root.right));
}

function dfs(node, diff) {
    if (node === null) {
        return 0;
    }
    let left = 0, right = 0;
    if (node.left && node.val - node.left.val === diff) {
        left = 1 + dfs(node.left, diff)
    }
    if (node.right && node.val - node.right.val === diff) {
        right = 1 + dfs(node.right, diff);
    }
    return Math.max(left, right);
}