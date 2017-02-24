// 203. Remove Linked List Elements
// Difficulty: Easy

// Remove all elements from a linked list of integers that have value val.

// Example
// Given: 1 --> 2 --> 6 --> 3 --> 4 --> 5 --> 6, val = 6
// Return: 1 --> 2 --> 3 --> 4 --> 5

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    ListNode* removeElements(ListNode* head, int val) {
        ListNode dummy{0};
        dummy.next = head;
        
        for (ListNode *prev = &dummy, *cur = head; cur; cur = cur->next) {
            if (cur->val == val) {
                prev->next = cur->next;
                delete cur;
            } else {
                prev = cur;
            }
        }
        return dummy.next;
    }
};
