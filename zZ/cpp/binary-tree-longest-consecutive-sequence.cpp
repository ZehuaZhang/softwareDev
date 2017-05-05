// 298. Binary Tree Longest Consecutive Sequence
// Difficulty : Medium 

// Given a binary tree, find the length of the longest increasing consecutive sequence path.

// The path refers to any sequence of nodes from some starting node to any node in the tree along the parent-child connections. 
// The longest consecutive path need to be from parent to child (cannot be the reverse).

// For example,

//    1
//     \
//      3
//     / \
//    2   4
//         \
//          5
// Longest consecutive sequence path is 3-4-5, so return 3.

//    2
//     \
//      3
//     / 
//    2    
//   / 
//  1
// Longest consecutive sequence path is 2-3,not3-2-1, so return 2.

// Time:  O(n)
// Space: O(h)

class Solution {
public:
  int longestConsecutive(TreeNode* root) {
    int maxLen = 0;
    longestConsecutive(root, maxLen);
    return maxLen;
  }

private:
  int longestConsecutive(TreeNode* root, int& max_len) {
    if (!root) {
      return 0;
    }

    const int leftLen = longestConsecutive(root->left, maxLen);
    const int rightLen = longestConsecutive(root->right, maxLen);

    int currLen = 1;
    if (root->left && root->left->val == root->val + 1) {
      currLen = max(currLen, leftLen + 1);
    }
    if (root->right && root->right->val == root->val + 1) {
      currLen = max(currLen, rightLen + 1);
    }
    maxLen = max(maxLen, currLen);
    return currLen;
  }
};
