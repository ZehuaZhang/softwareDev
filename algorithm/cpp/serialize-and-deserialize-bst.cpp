// 449. Serialize and Deserialize BST
// Difficulty: Medium

// Serialization is the process of converting a data structure or object into a sequence of bits
// so that it can be stored in a file or memory buffer
//  or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

// Design an algorithm to serialize and deserialize a binary search tree.
// There is no restriction on how your serialization/deserialization algorithm should work.
// You just need to ensure that a binary search tree can be serialized to a string
// and this string can be deserialized to the original tree structure.

// The encoded string should be as compact as possible.

// Note: Do not use class member/global/static variables to store states.
// Your serialize and deserialize algorithms should be stateless.

// Time:  O(n)
// Space: O(h)

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
 class Codec {
 public:

  // Encodes a tree to a single string.
  string serialize(TreeNode* root) {
    string data;
    serializeHelper(root, data);
    return data;
  }

  // Decodes your encoded data to tree.
  TreeNode* deserialize(string data) {
    int i = 0;
    return deserializeHelper(numeric_limits<int>::min(), numeric_limits<int>::max(), data, i);
  }


private:
  void serializeHelper(TreeNode* node, string& data) {
    if (node) {
      data += to_string(node->val) + " ";
      serializeHelper(node->left, data);
      serializeHelper(node->right, data);
    }
  }

  TreeNode* deserializeHelper(int minVal, int maxVal, const string& data, int& i) {
    if (i == data.length()) {
      return nullptr;
    }
    int j = data.find(' ', i);
    auto val = stoi(data.substr(i, j - i));
    if (minVal < val && val < maxVal) {
      auto node = new TreeNode(val);
      i = j + 1;
      node->left = deserializeHelper(minVal, val, data, i);
      node->right = deserializeHelper(val, maxVal, data, i);
      return node;
    } 
    return nullptr;
  }
};

// Your Codec object will be instantiated and called as such:
// Codec codec;
// codec.deserialize(codec.serialize(root));