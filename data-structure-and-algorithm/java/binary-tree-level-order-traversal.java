/**
 * Binary Tree Level Order Traversal 
 * 
 * Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).
 * 
 * For example:
 * Given binary tree {3,9,20,#,#,15,7},
 * 
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 *  
 * 
 * return its level order traversal as:
 * 
 * [
 *   [3],
 *   [9,20],
 *   [15,7]
 * ]
 */

import java.util.ArrayList;

public class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<List<Integer>>();
        levelOrderHelper(root, 0, result);
        return result;
    }

    private void levelOrderHelper(TreeNode node, int level, List<List<Integer>> result) {
        if (node == null) {
            return;
        }

        if (result.size() == level) {
            result.add(new ArrayList<Integer>());
        }

        result.get(level).add(node.val);
        
        if (node.left != null) {
            levelOrderHelper(node.left, level + 1, result);
        }
        if (node.right != null) {
            levelOrderHelper(node.right, level + 1, result);
        }
    }
}
