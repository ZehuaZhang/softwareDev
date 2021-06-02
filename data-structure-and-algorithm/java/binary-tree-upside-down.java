/**
 * Binary Tree Upside Down
 * 
 * Given a binary tree where all the right nodes are either leaf nodes with a sibling (a left node that shares the same parent node) or empty,
 * flip it upside down and turn it into a tree where the original right nodes turned into left leaf nodes. Return the new root.
 * 
 * For example:
 * 
 * Given a binary tree {1,2,3,4,5},
 * 
 *     1
 * 
 *    / \
 * 
 *   2   3
 * 
 *  / \
 * 
 * 4   5
 * 
 * return the root of the binary tree [4,5,2,#,#,3,1].
 * 
 *    4
 * 
 *   / \
 * 
 *  5   2
 * 
 *     / \
 * 
 *    3   1  
 */

public class Solution {
    public TreeNode upsideDownBinaryTree(TreeNode root) {
        TreeNode curr = root;
        TreeNode prev = null;
        TreeNode prevRight = null;
        while (curr != null) {
            TreeNode next = curr.left;
            curr.left = prevRight;
            prevRight = curr.right;
            curr.right = prev;

            prev = curr;
            curr = next;
        }
    }
}

public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}