// 92. Reverse Linked List II
// Difficulty: Medium

// Reverse a linked list from position m to n. Do it in-place and in one-pass.

// For example:
// Given 1->2->3->4->5->NULL, m = 2 and n = 4,

// return 1->4->3->2->5->NULL.

// Note:
// Given m, n satisfy the following condition:
// 1 ≤ m ≤ n ≤ length of list.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  ListNode* reverseBetween(ListNode* head, int m, int n) {
    ListNode dummy{0};
    dummy.next = head;
    ListNode* prev = &dummy;

    for (int i = 0; i < m - 1; ++i) {
      prev = prev->next;
    }

    ListNode* curr = prev->next;

    for (int i = m; i < n; ++i) {
      ListNode* next = curr->next;
      curr->next = next->next;
      next->next = prev->next;
      prev->next = next;
    }
    return dummy.next;
  }
};