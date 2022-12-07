/*
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.



Example 1:


Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]
Example 2:

Input: root = []
Output: []
Example 3:

Input: root = [1]
Output: [1]
Example 4:

Input: root = [1,2]
Output: [1,2]


Constraints:

The number of nodes in the tree is in the range [0, 104].
-1000 <= Node.val <= 1000
*/

const serialize = function (root) {
  const result = [];
  serializeDFS(root, result);
  return result.join(' ');
};

function serializeDFS(node, result) {
  if (node === null) {
    result.push('#');
  } else {
    result.push(node.val);
    serializeDFS(node.left, result);
    serializeDFS(node.right, result);
  }
}

const deserialize = function (data) {
  list = data.split(' ');
  const iter = list.values();
  return deserializeDFS(iter);
};

function deserializeDFS(iter) {
  const {value, done} = iter.next();
  if (done || value === '#') {
    return null;
  }

  const node = new TreeNode(value);
  node.left = deserializeDFS(iter);
  node.right = deserializeDFS(iter);
  return node;
}
