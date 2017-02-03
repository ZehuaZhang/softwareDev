369. Plus One Linked List
Difficulty : Medium

Given a non-negative number represented as a singly linked list of digits, plus one to the number.

The digits are stored such that the most significant digit is at the head of the list.

Example:
Input:
1->2->3

Output:
1->2->4

// Time:  O(n)
// Space: O(1)

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
 // Two pointers solution.
class Solution {
public:
    ListNode* plusOne(ListNode* head) {
        if (!head) {
            return nullptr;
        }

        ListNode* dummy = new ListNode{0};
        dummy->next = head;

        ListNode* left = dummy, *right = head;
        while (right->next) {
            if (right->val != 9) {
                left = right;
            }
            right = right->next;
        }

        if (right->val != 9) {
            ++right->val;
        } else {
            ++left->val;
            right = left->next;
            while (right) {
                right->val = 0;
                right = right->next;
            }
        }

        if (dummy->val == 0) {
            delete dummy;
            return head;
        }

        return dummy;
    }
};