// 331. Verify Preorder Serialization of a Binary Tree
// Difficulty: Medium

// One way to serialize a binary tree is to use pre-order traversal. When we encounter a non-null node, we record the node value.
// If it is a null node, we record using a sentinel value such as #.

//      _9_
//     /   \
//    3     2
//   / \   / \
//  4   1  #  6
// / \ / \   / \
// # # # #   # #
// For example, the above binary tree can be serialized to the string "9,3,4,#,#,1,#,#,2,#,6,#,#", where # represents a null node.

// Given a string of comma separated values, verify whether it is a correct preorder traversal serialization of a binary tree.
// Find an algorithm without reconstructing the tree.

// Each comma separated value in the string must be either an integer or a character '#' representing null pointer.

// You may assume that the input format is always valid, for example it could never contain two consecutive commas such as "1,,3".

// Example 1:
// "9,3,4,#,#,1,#,#,2,#,6,#,#"
// Return true

// Example 2:
// "1,#"
// Return false

// Example 3:
// "9,#,#,1"
// Return false

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  bool isValidSerialization(string preorder) {
    istringstream in(preorder);
    vector<string> tokens;
    string token;
    while (getline(in, token, ',')) {
      tokens.push_back(token);
    }

    int parents = 0;
    for (int i = 0; i < tokens.size() - 1; ++i) {
      // for full tree, leaves are always one more than parent nodes
      if (tokens[i] != "#") {
        ++parents;
      } else if (parents-- == 0) {   // preorder, root is before leaf
        return false;
      }
    }
    // by this point - one leaf left, parents should match to leaves
    return parents == 0 && tokens.back() == "#";   // last one must be "#", leaf
  }
};
