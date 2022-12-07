/*
Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where each path's sum equals targetSum.

A leaf is a node with no children.

 

Example 1:


Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: [[5,4,11,2],[5,8,4,5]]
Example 2:


Input: root = [1,2,3], targetSum = 5
Output: []
Example 3:

Input: root = [1,2], targetSum = 0
Output: []
*/

function pathSum(root, sum) {
    const result = [];
    const path = [];
    dfs(root, sum, path, result);
    return result;
}

function dfs(node, sum, path, result){
    if (!node) {
        return;
    }
    if (!node.left && !node.right && node.val === sum) {
        result.push([...path, node.val]);
        return;
    }
    path.push(node.val);
    dfs(node.left, sum - node.val, path, result);
    dfs(node.right, sum - node.val, path, result);
    path.pop();
}