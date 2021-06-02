// 82. Remove Duplicates from Sorted List II
// Difficulty: Medium

// Given a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.

// For example,
// Given 1->2->3->3->4->4->5, return 1->2->5.
// Given 1->1->1->2->3, return 2->3.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  ListNode* deleteDuplicates(ListNode* head) {
    ListNode dummy{0};
    for (ListNode* prev = &dummy; head;) {
      if (head->next && head->next->val == head->val) {
        auto val = head->val;
        while (head && head->val == val) {
          ListNode* toDelete = head;
          head = head->next;
          delete toDelete;
        }
        prev->next = head;
      } else {
        prev->next = head;
        prev = head;
        head = head->next;
      }
    }
    return dummy.next;
  }
};
