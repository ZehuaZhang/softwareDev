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
    ListNode dummy{0, head};

    for (ListNode* prev = &dummy, *cur = head; cur;) {
      if (cur->val == val) {
        ListNode* toDelete = cur;
        cur = cur->next;
        prev->next = cur;
        delete toDelete;
      } else {
        prev = cur;
        cur = cur->next;
      }
    }
    return dummy.next;
  }
};
