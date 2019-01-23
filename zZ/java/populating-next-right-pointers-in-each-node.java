/**
 * Populating Next Right Pointers in Each Node
 * 
 * Given a binary tree
 * 
 *     struct TreeLinkNode {
 *       TreeLinkNode *left;
 *       TreeLinkNode *right;
 *       TreeLinkNode *next;
 *     }
 *  
 * 
 * Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.
 * 
 * Initially, all next pointers are set to NULL.
 * 
 * Note:
 * 
 * You may only use constant extra space.
 * You may assume that it is a perfect binary tree (ie, all leaves are at the same level, and every parent has two children).
 *  
 * 
 * For example,
 * Given the following perfect binary tree,
 * 
 *          1
 *        /  \
 *       2    3
 *      / \  / \
 *     4  5  6  7
 *  
 * 
 * After calling your function, the tree should look like:
 * 
 *          1 -> NULL
 *        /  \
 *       2 -> 3 -> NULL
 *      / \  / \
 *     4->5->6->7 -> NULL
 */

import java.util.LinkedList;
import java.util.Queue;

public class Solution1 {
    public void connect(TreeLinkNode root) {
        for (TreeLinkNode next = null; root != null; root = next) {
            for (TreeLinkNode curr = null; root != null; root = root.next) {
                if (next == null) {
                    next = root.left != null ? root.left : root.right;
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

public class Solution2 {
    public void connect(TreeLinkNode root) {
        if (root == null) {
            return;
        }

        Queue<TreeLinkNode> queue = new LinkedList<TreeLinkNode>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; ++i) {
                TreeLinkNode curr = queue.poll();
                if (i < size - 1) {
                    curr.next = queue.peek();
                } else {
                    curr.next = null;
                }

                if (curr.left) {
                    queue.offer(curr.left);
                }
                if (curr.right) {
                    queue.offer(curr.right);
                }
            }
        }
    }
}

public class TreeLinkNode {
    int val;
    TreeLinkNode left, right, next;
    TreeLinkNode(int x) {
        val = x;
    }
}