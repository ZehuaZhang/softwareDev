// 333. Largest BST Subtree
// Difficulty : Medium 

// Given a binary tree, find the largest subtree which is a Binary Search Tree (BST), 
// where largest means subtree with largest number of nodes in it.

// Note:
// A subtree must include all of its descendants.
// Heres an example:

//     10
//     / \
//    5  15
//   / \   \ 
//  1   8   7
// The Largest BST Subtree in this case is the highlighted one. 
// The return value is the subtree size, which is 3.

// Hint:
// You can recursively use algorithm similar to 98. Validate Binary Search Tree at each node of the tree, 
// which will result in O(nlogn) time complexity.

// Follow up:
// Can you figure out ways to solve it with O(n) time complexity?

// Time:  O(n)
// Space: O(h)

class Solution {
public:
  int largestBSTSubtree(TreeNode* root) {
    if (!root) {
      return 0;
    }

    int maxSize = 1;
    largestBSTSubtreeHelper(root, maxSize);
    return maxSize;
  }

private:
  tuple<int, int, int> largestBSTSubtreeHelper(TreeNode* root, int& maxSize) {
    if (!root->left && !root->right) {
      return make_tuple(1, root->val, root->val);
    }

    int leftSize = 0, leftMin = root->val, leftMax = root->val;
    if (root->left) {
      tie(leftSize, leftMin, leftMax) = largestBSTSubtreeHelper(root->left, maxSize);
    }

    int rightSize = 0, rightMin = root->val, rightMax = root->val;
    if (root->right) {
      tie(rightSize, rightMin, rightMax) = largestBSTSubtreeHelper(root->right, maxSize);
    }

    int size = 0;
    if ((!root->left || leftSize > 0) && (!root->right || rightSize > 0) &&
        leftMax <= root->val && root->val <= rightMin) {
      size = 1 + leftSize + rightSize;
      maxSize = max(maxSize, size);
    }
    return make_tuple(size, leftMin, rightMax);
  }
};
