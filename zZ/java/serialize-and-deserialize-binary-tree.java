/**
 * Serialize and Deserialize Binary Tree
 * 
 * Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer,
 * or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
 * 
 * Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.
 * You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.
 * 
 * For example, you may serialize the following tree
 * 
 *     1
 *    / \
 *   2   3
 *      / \
 *     4   5
 * as "[1,2,3,null,null,4,5]", just the same as how LeetCode OJ serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.
 * 
 * Note: Do not use class member/global/static variables to store states. Your serialize and deserialize algorithms should be stateless.
 */

public class Codec {
    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        StringBuilder stringBuilder = new StringBuilder();
        serializeHelper(root, stringBuiler);
        return stringBuilder.toString().trim();
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        int[] index = new int[0];
        return deserializeHelper(data.replace(" ", "").toCharArray(), index);
    }
    
    private void serializeHelper(TreeNode root, StringBuilder stringBuilder) {
        if (root == null) {
            stringBuilder.append("# ");
        } else {
            stringBuilder.append(root.val)
                .append(" ");
            serializeHelper(root.left, stringBuilder);
            serializeHelper(root.right, stringBuilder);
        }
    }

    private TreeNode deserializeHelper(char[] dataCharArray, int[] index) {
        if (dataCharArray[index[0]] == '#') {
            return null;
        }
        TreeNode node = new TreeNode();
        node.val = Integer.parseInt(new String(dataCharArray[index[0]]));

        index[0] += 1;
        node.left = deserializeHelper(dataCharArray, index);
        index[0] += 1;
        node.right = deserializeHelper(dataCharArray, index);

        return node;
    }
}

public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode() {
        val = 0;
        left = null;
        right = null;
    }
}