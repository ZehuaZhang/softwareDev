// 110. Balanced Binary Tree
// Difficulty: Easy

// Given a binary tree, determine if it is height-balanced.

// For this problem, a height-balanced binary tree is defined as a binary tree 
// in which the depth of the two subtrees of every node never differ by more than 1.

// Time:  O(n)
// Space: O(h)

public class Solution {
    public boolean isBalanced(TreeNode root) {
        Map<TreeNode, Integer> heightMap = new HashMap<>();
        heightMap.put(null, 0);
        
        Stack<TreeNode> stk = new Stack<>();
        TreeNode cur = root;
        int left = 0, right = 0;
        while (true) {
            while (cur != null) {
                stk.push(cur);
                cur = cur.left;
            }
            while (!stk.isEmpty() && (stk.peek().right == null || stk.peek().right == cur)) {
                cur = stk.pop();
                left = heightMap.get(cur.left);
                right = heightMap.get(cur.right);
                if (Math.abs(left - right) > 1) {
                    return false;
                }
                heightMap.put(cur, 1 + Math.max(left, right));
            }
            if (stk.isEmpty()) {
                break;
            }
            cur = stk.peek().right;
        }
        return true;
    }
}
