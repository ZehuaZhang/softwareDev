/**
 * Binary Tree Postorder Traversal
 * 
 * Given a binary tree, return the postorder traversal of its nodes' values.
 * 
 * For example:
 * Given binary tree {1,#,2,3},
 *    1
 *     \
 *      2
 *     /
 *    3
 * return [3,2,1].
 * 
 * Note: Recursive solution is trivial, could you do it iteratively?
 */

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode curr = root;

        do {
            while (curr.left != null) {
                stack.push(curr);
                curr = curr.left;
            }

            TreeNode prev = null;
            while (!stack.isEmpty()) {
                curr = stack.pop();

                if (prev == curr.right) {
                    result.add(curr.val);
                    prev = curr;
                } else {
                    stack.push(curr);
                    curr = curr.right;
                    break;
                }

            }
        } while (!stack.isEmpty());

        return result;
    }
}

public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }