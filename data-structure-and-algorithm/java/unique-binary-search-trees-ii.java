/**
 * Unique Binary Search Trees II
 * 
 * Given n, generate all structurally unique BST's (binary search trees) that store values 1...n.
 * 
 * For example,
 * Given n = 3, your program should return all 5 unique BST's shown below.
 * 
 *    1         3     3      2      1
 *     \       /     /      / \      \
 *      3     2     1      1   3      2
 *     /     /       \                 \
 *    2     1         2                 3
 *  
 * 
 * confused what "{1,#,2,3}" means? > read more on how binary tree is serialized on OJ.
 * 
 * 
 * OJ's Binary Tree Serialization:
 * The serialization of a binary tree follows a level order traversal, where '#' signifies a path terminator where no node exists below.
 * 
 * Here's an example:
 * 
 *    1
 *   / \
 *  2   3
 *     /
 *    4
 *     \
 *      5
 * The above binary tree is serialized as "{1,2,3,#,#,4,#,#,5}".
 */

import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<TreeNode> generateTrees(int n) {
        if (n <= 0) {
            return new ArrayList<TreeNode>();
        }
        return generateTreesHelper(1, n);
    }

    private List<TreeNode> generateTreesHelper(int start, int end) {
        List<TreeNode> treeList = new ArrayList<>();
        if (start > end) {
            treeList.add(null);
            return treeList;
        }

        for (int i = start; i <= end; ++i) {
            for (int leftSubTree: generateTreesHelper(start, i - 1)) {
                for (int rightSubTree: generateTreesHelper(i + 1, end)) {
                    TreeNode root = new TreeNode(i);
                    root.left = leftSubTree;
                    root.right = rightSubTree;
                    treeList.add(root);
                }
            }
        }

        return treeList;
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