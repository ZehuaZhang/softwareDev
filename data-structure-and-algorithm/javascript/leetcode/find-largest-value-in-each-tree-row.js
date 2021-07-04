/*

Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).

 

 

Example 1:


Input: root = [1,3,2,5,3,null,9]
Output: [1,3,9]
Example 2:

Input: root = [1,2,3]
Output: [1,3]
Example 3:

Input: root = [1]
Output: [1]
Example 4:

Input: root = [1,null,2]
Output: [1,2]
Example 5:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree will be in the range [0, 104].
-231 <= Node.val <= 231 - 1
*/

function largestValues(root) {
    const result = [];
    dfs(root, 0, result);
    return result;
}
function dfs(node, level, result) {
    if (!node) {
        return;
    }
    if (level === result.length) {
        result.push(node.val);
    } else {
        result[level] = Math.max(result[level], node.val);
    }
    dfs(node.left, level + 1, result);
    dfs(node.right, level + 1, result);
}
