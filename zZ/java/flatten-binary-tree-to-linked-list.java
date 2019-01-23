/**
 * Flatten Binary Tree to Linked List
 * 
 * Given a binary tree, flatten it to a linked list in-place.
 * 
 * For example,
 * Given
 * 
 *          1
 *         / \
 *        2   5
 *       / \   \
 *      3   4   6
 *  
 * 
 * The flattened tree should look like:
 * 
 *    1
 *     \
 *      2
 *       \
 *        3
 *         \
 *          4
 *           \
 *            5
 *             \
 *              6
 * click to show hints.
 * 
 * Hints:
 * If you notice carefully in the flattened tree, each node's right child points to the next node of a pre-order traversal
 */

import java.util.Stack;

public class Solution {
    public void flatten(TreeNode root) {
        Stack<TreeNode> stack = new Stack<TreeNode>();

        if (root == null) {
            stack.push(root);
        }

        while (!stack.isEmpty()) {
            TreeNode curr = stack.pop();
            if (curr.left != null) {
                TreeNode leftTree = curr.left;
                while (leftTree.right) {
                    leftTree = leftTree.right;
                }
                leftTree.right = curr.right;
                curr.right = curr.left;
                curr.left = null;
            }
            if (curr.right != null) {
                stack.push(curr.right);
            }
        }
    }
}

public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}