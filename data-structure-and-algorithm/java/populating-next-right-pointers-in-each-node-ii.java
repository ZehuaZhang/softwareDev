/**
 * Populating Next Right Pointers in Each Node II
 * 
 * Given a binary tree
 * 
 * struct TreeLinkNode {
 *   TreeLinkNode *left;
 *   TreeLinkNode *right;
 *   TreeLinkNode *next;
 * }
 * Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.
 * 
 * Initially, all next pointers are set to NULL.
 * 
 * Note:
 * 
 * You may only use constant extra space.
 * Recursive approach is fine, implicit stack space does not count as extra space for this problem.
 * Example:
 * 
 * Given the following binary tree,
 * 
 *      1
 *    /  \
 *   2    3
 *  / \    \
 * 4   5    7
 * After calling your function, the tree should look like:
 * 
 *      1 -> NULL
 *    /  \
 *   2 -> 3 -> NULL
 *  / \    \
 * 4-> 5 -> 7 -> NULL
 */

public class Solution {
    public void connect(TreeLinkNode root) {
        for (TreeLinkNode next = null; root != null; root = next) {
            for (TreeLinkNode curr = null; root = root.next; root = root.next) {
                if (next == null) {
                    next = root.left ? root.left : root.right;
                }

                if (root.left != null) {
                    if (curr != null) {
                        curr.next = root.left;
                    }
                    curr = root.left;
                }

                if (root.right != null) {
                    if (curr != null) {
                        curr.next = root.right;
                    }
                    curr = root.right;
                }
            }
        }
    }
}

public class TreeLinkNode {
    int val;
    TreeLinkNode left, right, next;
    TreeLinkNode(int x) { val = x; }
}