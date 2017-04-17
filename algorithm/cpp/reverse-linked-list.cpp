// 206. Reverse Linked List
// Difficulty: Easy

// Reverse a singly linked list.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    while (head) {
      ListNode* next = head->next;
      head->next = prev;
      prev = head;
      head = next;
    }
    return prev;
  }
};
