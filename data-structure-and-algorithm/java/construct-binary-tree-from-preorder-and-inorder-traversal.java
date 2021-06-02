/**
 * Construct Binary Tree from Preorder and Inorder Traversal
 * 
 * Given preorder and inorder traversal of a tree, construct the binary tree.
 * 
 * Note:
 * You may assume that duplicates do not exist in the tree.
 */

import java.util.Arrays;

public class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return buildTreeHelper(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
    }

    private TreeNode buildTreeHelper(int[] preorder, int preorderLeft, int preorderRight, int[] inorder, int inorderLeft, int inorderRight) {
        if (preorderLeft > preorderRight || inorderLeft > inorderRight) {
            return null;
        }

        int rootValue = preorder[preorderLeft];
        TreeNode root = new TreeNode(rootValue);
        
        int inorderRootIndex = inorderLeft;
        for (; inorderRootIndex <= inorderRight && inorder[inorderRootIndex] != rootValue; ++inorderRootIndex);
        int leftTreeNodeCount = inorderRootIndex - inorderLeft;
        
        root.left = buildTreeHelper(preorder, preorderLeft + 1, preorderLeft + leftTreeNodeCount, inorder, inorderLeft, inorderRootIndex - 1);
        root.right = buildTreeHelper(preorder, preorderLeft + leftTreeNodeCount + 1, preorderRight, inorder, inorderRootIndex + 1, inorderRight);

        return root;
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