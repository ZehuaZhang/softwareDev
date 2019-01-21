/**
 * Convert Sorted Array to Binary Search Tree
 * 
 * Given an array where elements are sorted in ascending order, convert it to a height balanced BST.
 */

public class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return sortedArrayToBSTHelper(nums, 0, nums.length - 1);
    }

    private sortedArrayToBSTHelper(int[] nums, int left, int right) {
        if (left > right) {
            return null;
        }

        int middle = left + (right - left) / 2;
        TreeNode root = new TreeNode(nums[middle]);
        root.left = sortedArrayToBSTHelper(nums, left, middle - 1);
        root.right = sortedArrayToBSTHelper(nums, middle + 1, right);

        return root;
    }
}

public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
