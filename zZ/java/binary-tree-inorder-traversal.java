/**
 * Binary Tree Inorder Traversal
 * 
 * Given a binary tree, return the inorder traversal of its nodes' values.
 * 
 * Example:
 * 
 * Input: [1,null,2,3]
 *    1
 *     \
 *      2
 *     /
 *    3
 * 
 * Output: [1,3,2]
 * Follow up: Recursive solution is trivial, could you do it iteratively?
 */

import java.util.ArrayList;
import java.util.Stack;

public class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode curr = root;
        List<Integer> result = new ArrayList<>();

        while (!stack.isEmpty() && curr != null) {
            if (curr != null) {
                stack.push(curr);
                curr = curr.left;
            } else {
                curr = stack.pop();
                result.add(curr.val);
                curr = curr.right;
            }
        }

        return result;
    }
}

private class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) {
        val = x;
    }
}
