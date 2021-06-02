/**
 * Binary Tree Maximum Path Sum 
 * 
 * Given a binary tree, find the maximum path sum.
 * 
 * The path may start and end at any node in the tree.
 * 
 * For example:
 * Given the below binary tree,
 * 
 *        1
 *       / \
 *      2   3
 *  
 * 
 * Return 6.
 */

public class Solution {
    private int result = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        maxPathSumHelper(root);
        return result;    
    }

    private int maxPathSumHelper(TreeNode node) {
        if (node == null) {
            return 0;
        }

        int left = Math.max(maxPathSumHelper(node.left), 0);
        int right = Math.max(maxPathSumHelper(node.right), 0);
        result = Math.max(result, left + right + node.val);
        return Math.max(left, right) + node.val;
    }
}

public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}