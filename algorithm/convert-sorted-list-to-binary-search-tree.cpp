109. Convert Sorted List to Binary Search Tree
Difficulty: Medium

Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.

// Time:  O(n)
// Space: O(h)

class Solution {
public:
    TreeNode* sortedListToBST(ListNode* head) {
        if (!head) {
            return NULL;
        }
        if (!head->next) {
            return new TreeNode(head->val); 
        }
        ListNode *slow = head;
        ListNode *fast = head;
        ListNode *prev = slow;
        while (fast && fast->next) {
            prev = slow;
            slow = slow->next;
            fast = fast->next->next;
        }
        prev->next = nullptr;
        TreeNode *node = new TreeNode(slow->val);
        node->left = sortedListToBST(head);
        node->right = sortedListToBST(slow->next);
        return node;
    }
};