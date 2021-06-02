// 61. Rotate List
// Difficulty: Medium

// Given a list, rotate the list to the right by k places, where k is non-negative.

// For example:
// Given 1->2->3->4->5->NULL and k = 2,
// return 4->5->1->2->3->NULL.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  ListNode* rotateRight(ListNode* head, int k) {
    if (!head) {
      return head;
    }

    int len = 1;
    ListNode* curr = head;
    while (curr->next) {
      ++len;
      curr = curr->next;
    }
    curr->next = head;

    k = len - k % len;
    for (int i = 0; i < k; ++i) {
      curr = curr->next;
    }

    head = curr->next;
    curr->next = nullptr;

    return head; 
  }
};
