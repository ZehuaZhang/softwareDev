// Binary Search Tree and Sorted Double Linked List


// Sorted Double Linked List to Binary Tree
class Solution {
public:
  DoubleListNode* sortedDoubleList2BST(DoubleListNode* head) {
    int count = 0;
    for (DoubleListNode* curr = head; curr; curr = curr->next) {
      ++count;
    }
    return sortedDoubleList2BST(head, count);
  }

private:
  DoubleListNode* sortedDoubleList2BST(DoubleListNode*& head, int n) {
    if (n <= 0) {
      return nullptr;
    }
    DoubleListNode* left = sortedDoubleList2BST(head, n / 2);

    DoubleListNode* root = head;
    root->prev = left;

    head = head->next;
    root->next = sortedDoubleList2BST(head, n - n / 2 - 1);

    return root;
  }
};

// Binary Tree to Sorted Double Linked List
class Solution {
public:
  void BST2sortedDoubleList(TreeNode* root, TreeNode*& head) {
    TreeNode* prev = nullptr;
    BST2sortedDoubleList(root, head, prev)
  }

private:
  void BST2sortedDoubleList(TreeNode* root, TreeNode*& head, TreeNode*& prev) {
    if (!root) {
      return;
    }
    BST2sortedDoubleList(root.left, head, prev);

    if (prev == nullptr) {
      head = root;
    } else {
      root.left = prev;
      prev.right = root;
    }
    prev = root;

    BST2sortedDoubleList(root.right, head, prev);
  }
};
  