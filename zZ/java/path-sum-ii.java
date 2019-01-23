import java.util.ArrayList;
import java.util.List;

/**
 * Path Sum II
 * 
 * Given a binary tree and a sum, find all root-to-leaf paths where each path's sum equals the given sum.
 * 
 * For example:
 * Given the below binary tree and sum = 22,
 * 
 *               5
 *              / \
 *             4   8
 *            /   / \
 *           11  13  4
 *          /  \    / \
 *         7    2  5   1
 * return
 * 
 * [
 *    [5,4,11,2],
 *    [5,8,4,5]
 * ]
 */

public class Solution {
    public List<List<Integer>> pathSum(TreeNode root, int sum) {
        List<List<Integer>> result = new ArrayList<List<Integer>>();
        List<Integer> path = new ArrayList<Integer>();
        pathSumHelper(root, sum, path, result);
        return result;
    }

    private pathSumHelper(TreeNode root, int sum, List<Integer> path, List<List<Integer>> result) {
        if (root == null || root.val < sum) {
            return;
        }

        path.add(root.val);
        if (root.left == null && root.right == null && root.val == sum) {
            result.add(new ArrayList<Integer>(path));
        }

        pathSumHelper(root.left, sum - root.val);
        pathSumHelper(root.right, sum - root.val);
        path.remove(path.size() - 1);
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