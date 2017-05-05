// 255. Verify Preorder Sequence in Binary Search Tree
// Difficulty : Medium

// Given an array of numbers, verify whether it is the correct preorder traversal sequence of a binary search tree.

// You may assume each number in the sequence is unique.

// Follow up:
// Could you do it using only constant space complexity?

// Time:  O(n)
// Space: O(h)
class Solution2 {
public:
  bool verifyPreorder(vector<int>& preorder) {
    int low = INT_MIN;
    stack<int> path;
    for (auto& p : preorder) {
      if (p < low) {
        return false;
      }
      while (!path.empty() && p > path.top()) {
        low = path.top(); path.pop();
      }
      path.emplace(p);
    }
    return true;
  }
};
