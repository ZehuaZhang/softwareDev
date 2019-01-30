/**
 * Binary Tree Right Side View 
 * 
 * Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.
 * 
 * For example:
 * Given the following binary tree,
 * 
 *    1            <---
 *  /   \
 * 2     3         <---
 *  \     \
 *   5     4       <---
 *  
 * 
 * You should return [1, 3, 4].
 */

import java.util.ArrayList;
import java.util.Queue;

public class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        Queue<TreeNode> queue = new Queue<>();
        if (root != null) {
            queue.offer(root);
        }

        List<Integer> result = new ArrayList<>();
        while (!queue.isEmpty()) {
            for (int size = queue.size(); size != 0; --size) {
                TreeNode node = queue.poll();
                if (size == 1) {
                    result.add(node.val);
                }
                if (node.left) {
                    queue.offer(node.left);
                }
                if (node.right) {
                    queue.offer(node.right);
                }
            }
        }

        return result;
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