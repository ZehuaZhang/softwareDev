/**
 * Given a tree, try to implement it using other data strutures to reduce the overhead
 */

import java.util.*;

public class Solution {
    public int[] compressDenseBinaryTreeToArray(TreeNode root) {
        int height = getHeight(root);
        
        if (height == 0) {
            return new int[0];
        }

        int[] result = new int[Math.pow(2, height) - 1];

        Queue<Pair> queue = new LinkedList<>();
        queue.offer(new Pair(0, root));

        while (!queue.isEmpty()) {
            Pair currPair = queue.poll();

            TreeNode currNode = currPair.secondChild;
            int currIndex = currPair.firstChild;

            result[currIndex] = currNode.val;

            if (curr.left != null) {
                queue.offer(new Pair(currIndex * 2 + 1, curr.left));
            }

            if (curr.right != null) {
                queue.offer(new Pair(currIndex * 2 + 2, curr.right));
            }
        }

        return result;
    }

    public Map<Integer, Integer> pressSparseBinaryTreeToArray(TreeNode root) {
        Map<Integer, Integer> result = new HashMap<>();

        if (root == null) {
            return result;
        }

        Queue<Pair> queue = new LinkedList<>();
        queue.offer(new Pair(0, root));

        while (!queue.isEmpty()) {
            Pair currPair = queue.poll();

            TreeNode currNode = currPair.secondChild;
            int currIndex = currPair.firstChild;
            
            result.put(currIndex, currNode.val);

            if (curr.left != null) {
                queue.offer(new Pair(currIndex * 2 + 1, curr.left));
            }

            if (curr.right != null) {
                queue.offer(new Pair(currIndex * 2 + 2, curr.right));
            }
        }

        return result;
    }

    private int getHeight(TreeNode node) {
        if (node == null) {
            return 0;
        }

        int left = getHeight(node.left);
        int right= getHeight(node.right);

        return Math.max(left, right) + 1;
    }

    public class TreeNode {
        int val;
        TreeNode left, right;

        public TreeNode (int val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }

    public class Pair {
        int firstChild;
        TreeNode secondChild;
        public Pair (int firstChild, TreeNode secondChild) {
            this.firstChild = firstChild;
            this.secondChild = secondChild;
        }
    }
}
