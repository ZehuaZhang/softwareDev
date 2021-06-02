/**
 * Binary Search Tree Iterator
 * 
 * Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.
 * 
 * Calling next() will return the next smallest number in the BST.
 * 
 * Note: next() and hasNext() should run in average O(1) time and uses O(h) memory, where h is the height of the tree.
 */

import java.util.Stack;

public class BSTIterator {
    public BSTIterator(TreeNode root) {
        while (root != null) {
            stack.push(root);
            root = root.left;
        }
    }

    public boolean hasNext() {
        return !stack.isEmpty();
    }

    public int next() {
        TreeNode curr = stack.pop();
        TreeNode node = curr.right;
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
        return curr.val;
    }

    private Stack<TreeNode> stack = new Stack<>();
}

public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) {
        val = x;
    }
}