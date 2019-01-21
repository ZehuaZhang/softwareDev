/**
 * Binary Tree Level Order Traversal II 
 * 
 * Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).
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
 * return its bottom-up level order traversal as:
 * 
 * [
 *   [15,7],
 *   [9,20],
 *   [3]
 * ]
 */

import java.util.ArrayList;
import java.util.Collections;

public class Solution {
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        List<List<Integer>> result = new ArrayList<List<Integer>>();
        levelOrderBottomHelper(root, 0, result);
        Collections.reverse(result);
        return result;
    }

    private void levelOrderBottomHelper(TreeNode root, int level, List<List<Integer>> result) {
        if (root == null) {
            return;
        }

        if (result.size() == level) {
            result.add(new ArrayList<Ingeger>());
        }
        result.get(level).add(root.val);

        levelOrderBottomHelper(root.left, level + 1, result);
        levelOrderBottomHelper(root.right, level + 1, result);
    }
}

public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}