/*
Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 2000].
-100 <= Node.val <= 100
*/

function zigzagLevelOrder(root) {
    class Queue {
        constructor() {
            this.arr = [];    
        }
    
        get size() {
            return this.arr.length;
        }
    
        isEmpty() {
            return this.size === 0;
        }
    
        top() {
            return this.arr[this.arr.length - 1];
        }
    
        pop() {
            return this.arr.pop();
        }
    
        push(val) {
            this.arr.unshift(val);
        }
    }
    
    let isLeft = true;
    const result = [];
    const q = new Queue();
    
    if (root !== null) {
        q.push(root);
    }
    while (!q.isEmpty()) {
        const { size } = q;
        result.push(new Array(size).fill(0));
        for (let i = 0; i < size; ++i) {
            const node = q.pop();
            const idx = isLeft ? i : size - 1 - i
            result[result.length - 1][idx] = node.val;
            if (node.left) {
                q.push(node.left);
            }
            if (node.right) {
                q.push(node.right);
            }
        }
        isLeft = !isLeft;
    }
    return result;    
}