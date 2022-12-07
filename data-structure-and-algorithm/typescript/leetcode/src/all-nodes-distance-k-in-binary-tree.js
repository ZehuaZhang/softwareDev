/*
We are given a binary tree (with root node root), a target node, and an integer value k.

Return a list of the values of all nodes that have a distance k from the target node.  The answer can be returned in any order.

 

Example 1:

Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2

Output: [7,4,1]

Explanation: 
The nodes that are a distance 2 from the target node (with value 5)
have values 7, 4, and 1.



Note that the inputs "root" and "target" are actually TreeNodes.
The descriptions of the inputs above are just serializations of these objects.
 

Note:

The given tree is non-empty.
Each node in the tree has unique values 0 <= node.val <= 500.
The target node is a node in the tree.
0 <= k <= 1000.
*/

function distanceK(root, target, k) {
    const map = new Map();
    const result = [];
    find(root, target, map);
    search(root, k, map, 0, result);
    return result;
}

function find(node, target, map) {
    if (!node) {
        return;
    }
    if (node === target) {
        map.set(node, 0);
        return;
    }
    find(node.left, target, map);
    if (map.has(node.left)) {
        map.set(node, map.get(node.left) + 1);
        return;
    }
    find(node.right, target, map);
    if (map.has(node.right)) {
        map.set(node, map.get(node.right) + 1);
        return;
    }
}

function search(node, k, map, curr, result) {
    if (!node) {
        return;
    }
    if (map.has(node)) {
        curr = map.get(node)
    }
    if (curr === k) {
        result.push(node.val)
    }
    search(node.left, k, map, curr + 1, result)
    search(node.right, k, map, curr + 1, result)
}