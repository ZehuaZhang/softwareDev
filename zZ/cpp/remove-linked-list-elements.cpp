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

    for (ListNode* prev = &dummy; head;) {
      if (head->val == val) {
        ListNode* toDelete = head;
        head = head->next;
        prev->next = head;
        delete toDelete;
      } else {
        prev = head;
        head = head->next;
      }
    }
    return dummy.next;
  }
};
