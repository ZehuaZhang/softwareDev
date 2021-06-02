import java.util.Stack;

/**
 * Recover Binary Search Tree
 * 
 * Two elements of a binary search tree (BST) are swapped by mistake.
 * 
 * Recover the tree without changing its structure.
 * 
 * Example 1:
 * 
 * Input: [1,3,null,null,2]
 * 
 *    1
 *   /
 *  3
 *   \
 *    2
 * 
 * Output: [3,1,null,null,2]
 * 
 *    3
 *   /
 *  1
 *   \
 *    2
 * Example 2:
 * 
 * Input: [3,1,4,null,null,2]
 * 
 *   3
 *  / \
 * 1   4
 *    /
 *   2
 * 
 * Output: [2,1,4,null,null,3]
 * 
 *   2
 *  / \
 * 1   4
 *    /
 *   3
 * 
 * Follow up:
 * 
 * A solution using O(n) space is pretty straight forward.
 * Could you devise a constant space solution?
 */

public class Solution {
    public void recoverTree(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode swapNode1 = null, swapNode2 = null;
        
        TreeNode curr = root;
        TreeNode prev = null;

        while (!stack.isEmpty() || curr != null) {
            if (curr != null) {
                stack.push(curr);
                curr = curr.left;
            } else {
                curr = stack.pop();
                if (prev != null && curr.val < prev.val) {
                    if (swapNode1 == null) {
                        swapNode1 = prev;
                    }
                    swapNode2 = curr;
                }
                prev = curr;
                curr = curr.right;
            }
        }

        int swapValue = swapNode1.val;
        swapNode1.val = swapNode2.val;
        swapNode2.val = swapValue;
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