/*
Given a binary search tree, return a balanced binary search tree with the same node values.

A binary search tree is balanced if and only if the depth of the two subtrees of every node never differ by more than 1.

If there is more than one answer, return any of them.

 

Example 1:



Input: root = [1,null,2,null,3,null,4,null,null]
Output: [2,1,3,null,null,null,4]
Explanation: This is not the only correct answer, [3,1,4,null,2,null,null] is also correct.
 

Constraints:

The number of nodes in the tree is between 1 and 10^4.
The tree nodes will have distinct values between 1 and 10^5.
*/

function balanceBST(root) {
    const array = [];
    toArray(root, array);
    return toTree(0, array.length - 1, array);
}

function toArray(node, array) {
    if (!node) {
        return;
    }
    toArray(node.left, array)
    array.push(node);
    toArray(node.right, array)
}

function toTree(left, right, array) {
    if (left > right) {
        return null;
    }
    const mid = left + Math.trunc((right - left) / 2);
    const node = array[mid];
    node.left = toTree(left, mid - 1, array);
    node.right = toTree(mid + 1, right, array);
    return node;
}