// 83. Remove Duplicates from Sorted List
// Difficulty: Easy

// Given a sorted linked list, delete all duplicates such that each element appear only once.

// For example,
// Given 1->1->2, return 1->2.
// Given 1->1->2->3->3, return 1->2->3.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* curr = head;
        while (curr) {
            ListNode* next = curr->next;
            if (next && next->val == curr->val) {
                curr->next = next->next;
                delete next;
            } else {
                curr = curr->next;
            }
        }
        return head; 
    }
};
