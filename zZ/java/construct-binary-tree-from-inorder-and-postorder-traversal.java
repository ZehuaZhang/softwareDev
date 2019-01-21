/**
 * Construct Binary Tree from Inorder and Postorder Traversal 
 * 
 * Given inorder and postorder traversal of a tree, construct the binary tree.
 * 
 * Note:
 * You may assume that duplicates do not exist in the tree.
 */

public class Solution {
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        return buildTreeHelper(inorder, 0, inorder.length - 1, postorder, 0, postorder.length - 1); 
    }

    private TreeNode buildTreeHelper(int[] inorder, int inorderLeft, int inorderRight, int[] postorder, int postorderLeft, int postorderRight) {
        if (inorderLeft > inorderRight || postorderLeft > postorderRight) {
            return null;
        }

        int rootValue = postorder[postorderRight];
        TreeNode root = new TreeNode(rootValue);

        int inorderRootIndex = inorderLeft;
        for (; inorderRootIndex <= inorderRight && inorder[inorderRootIndex] != rootValue; ++inorderRootIndex);
        int leftTreeNodeCount = inorderRootIndex - inorderLeft;

        root.left = buildTreeHelper(inorder, inorderLeft, inorderRootIndex - 1, postorder, postorderLeft, postorderLeft + leftTreeNodeCount - 1);
        root.right = buildTreeHelper(inorder, inorderRootIndex + 1, inorderRight, postorder, postorderLeft + leftTreeNodeCount, postorderRight - 1);

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