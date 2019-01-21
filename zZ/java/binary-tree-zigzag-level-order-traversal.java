/**
 * Binary Tree Zigzag Level Order Traversal
 * 
 * Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).
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
 * return its zigzag level order traversal as:
 * 
 * [
 *   [3],
 *   [20,9],
 *   [15,7]
 * ]
 * 
 * confused what "{1,#,2,3}" means? > read more on how binary tree is serialized on OJ.
 */

import java.util.ArrayList;
import java.util.Collections;

public class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<List<Integer>>();
        zigzagLevelOrderHelper(root, 0, result);

        boolean isLeftToRight = true;
        for (List<Integer> entry : result) {
            if (!isLeftToRight) {
                Collections.reverse(entry);
            }
            isLeftToRight = !isLeftToRight;
        }

        return result;
    }

    private void zigzagLevelOrderHelper(TreeNode node, int level, List<List<Integer>> result) {
        if (node == null) {
            return;
        }

        if (result.size() == level) {
            result.add(new ArrayList<Integer>());
        }
        result.get(level).add(node.val);

        if (node.left) {
            zigzagLevelOrderHelper(node.left, level + 1, result);
        }

        if (node.right) {
            zigzagLevelOrderHelper(node.right, level + 1, result);
        }
    }
}

public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) {
        val = x;
    }
}
