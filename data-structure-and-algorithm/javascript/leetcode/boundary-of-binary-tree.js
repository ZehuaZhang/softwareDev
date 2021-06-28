/*
Given a binary tree, return the values of its boundary in anti-clockwise direction starting from root. Boundary includes left boundary, leaves, and right boundary in order without duplicate nodes.

Left boundary is defined as the path from root to the left-most node. Right boundary is defined as the path from root to the right-most node. If the root doesn't have left subtree or right subtree, then the root itself is left boundary or right boundary. Note this definition only applies to the input binary tree, and not applies to any subtrees.

The left-most node is defined as a leaf node you could reach when you always firstly travel to the left subtree if exists. If not, travel to the right subtree. Repeat until you reach a leaf node.

The right-most node is also defined by the same way with left and right exchanged.

Example 1

Input:
  1
   \
    2
   / \
  3   4

Ouput:
[1, 3, 4, 2]

Explanation:
The root doesn't have left subtree, so the root itself is left boundary.
The leaves are node 3 and 4.
The right boundary are node 1,2,4. Note the anti-clockwise direction means you should output reversed right boundary.
So order them in anti-clockwise without duplicates and we have [1,3,4,2].
 

Example 2

Input:
    ____1_____
   /          \
  2            3
 / \          / 
4   5        6   
   / \      / \
  7   8    9  10  
       
Ouput:
[1,2,4,7,8,9,10,6,3]

Explanation:
The left boundary are node 1,2,4. (4 is the left-most node according to definition)
The leaves are node 4,7,8,9,10.
The right boundary are node 1,3,6,10. (10 is the right-most node).
So order them in anti-clockwise without duplicate nodes we have [1,2,4,7,8,9,10,6,3].
*/

class Tree {
    static toArray(root) {
        const list = [];
        toArrayDFS(root, list);
        return list;

        function toArrayDFS(node, list) {
            if (node === null) {
                list.push("#");
                return;
            }

            list.push(node.val);
            toArrayDFS(node.left, list);
            toArrayDFS(node.right, list);
        }
    }

    static fromArray(list) {
        const iter = list.values();
        return fromArrayDFS(iter);

        function fromArrayDFS(iter) {
            const { value, done } = iter.next();
            if (done || value === "#") {
                return null;
            }
            const node = new TreeNode(value);
            node.left = fromArrayDFS(iter);
            node.right = fromArrayDFS(iter);
            return node;
        }
    }

    static print(node) {
        const list = [];
        console.log(printDFS(node, list));

        function printDFS(node, list) {
            if (node === null) {
                return;
            }
            list.push(node.val);
            printDFS(node.left, list);
            printDFS(node.right, list);
        }
    }
}

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function boundaryOfBinaryTree(root) {
    if (root === null) {
        return [];
    }
    const result = [root.val];
    dfs(root.left, true, false, result);
    dfs(root.right, false, true, result);
    return result;
}

function dfs(node, isLeft, isRight, result) {
    if (node === null) {
        return;
    }

    if (node.left === null && node.right === null) {
        result.push(node.val);
        return;
    }

    if (isLeft) {
        result.push(node.val);
    }

    dfs(node.left, isLeft && node.left !== null, isRight && node.right === null, result)
    dfs(node.right, isLeft && node.left === null, isRight && node.right !== null, result)

    if (isRight) {
        result.push(node.val);
    }
}

const list = [1, 2, 4, "#", 5, 7, "#", "#", 8, "#", "#", 3, 6, 9, "#", "#", 10, "#", "#", '#'];
const root = Tree.fromArray(list);
Tree.print(root);
console.log(boundaryOfBinaryTree(root))

