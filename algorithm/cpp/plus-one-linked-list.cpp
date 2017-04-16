// 369. Plus One Linked List
// Difficulty : Medium

// Given a non-negative number represented as a singly linked list of digits, plus one to the number.

// The digits are stored such that the most significant digit is at the head of the list.

// Example:
// Input:
// 1->2->3

// Output:
// 1->2->4

// Time:  O(n)
// Space: O(1)

// Two pointers solution.
class Solution {
public:
  ListNode* plusOne(ListNode* head) {
    if (!head) {
      return nullptr;
    }
    ListNode dummy{0};
    dummy.next = head;

    ListNode* left = &dummy, *right = head;
    for (; right->next; right = right->next) {
      if (right->val != 9) {
        left = right;
      }
    }

    if (right->val != 9) {
      ++right->val;
    } else {
      ++left->val;
      for (right = left->next; right; right = right->next) {
        right->val = 0;
      }
    }
    return dummy->val ? &dummy : dummy.next;
  }
};