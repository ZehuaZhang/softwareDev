116. Populating Next Right Pointers in Each Node
Difficulty: Medium

Given a binary tree

    struct TreeLinkNode {
      TreeLinkNode *left;
      TreeLinkNode *right;
      TreeLinkNode *next;
    }
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.

Note:

You may only use constant extra space.
You may assume that it is a perfect binary tree (ie, all leaves are at the same level, and every parent has two children).
For example,
Given the following perfect binary tree,
         1
       /  \
      2    3
     / \  / \
    4  5  6  7
After calling your function, the tree should look like:
         1 -> NULL
       /  \
      2 -> 3 -> NULL
     / \  / \
    4->5->6->7 -> NULL

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    void connect(TreeLinkNode *root) {
        while (root) {
            TreeLinkNode* next = nullptr; // the first node of next level
            for (TreeLinkNode* prev = nullptr; root; root = root->next) {
                if (!next) {
                    next = root->left ? root->left : root->right;
                }
                if (root->left) {
                    if (prev) {
                        prev->next = root->left;
                    }
                    prev = root->left;
                }
                if (root->right) {
                    if (prev) {
                        prev->next = root->right;
                    }
                    prev = root->right;
                }
            }
            root = next; // turn to next level
        }
    }
};

// Time:  O(n)
// Space: O(h)

class Solution {
public:
    void connect(TreeLinkNode *root) {
        connect(root, NULL);
    }
private:
    void connect(TreeLinkNode *root, TreeLinkNode *sibling) {
        if (root == nullptr) {
            return;
        } else {
            root->next = sibling;
        }
        connect(root->left, root->right);
        if (sibling) {
            connect(root->right, sibling->left);
        } else {
          connect(root->right, nullptr);
        }
    }
};