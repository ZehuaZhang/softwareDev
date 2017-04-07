// 25. Reverse Nodes in k-Group
// Difficulty: Hard

// Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

// If the number of nodes is not a multiple of k then left-out nodes in the end should remain as it is.

// You may not alter the values in the nodes, only nodes itself may be changed.

// Only constant memory is allowed.

// For example,
// Given this linked list: 1->2->3->4->5

// For k = 2, you should return: 2->1->4->3->5

// For k = 3, you should return: 3->2->1->4->5

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
 class Solution {
 public:
  ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode dummy{0};
    dummy.next = head;
    ListNode* currDummy = &dummy;
    int len = 0;

    for (ListNode* curr = head, *nextCurr = curr->next; curr; curr = nextCurr, nextCurr = curr->next) {
      len = (len + 1) % k;

      if (len == 0) {
        ListNode* nextDummy = currDummy->next;

        for (ListNode* first = currDummy->next, *nextFirst = first->next; nextFirst != curr->next;) {
          first->next = nextFirst->next;
          nextFirst->next = currDummy->next;
          currDummy->next = nextFirst;
          nextFirst = first->next;
        }
        currDummy = nextDummy;
      }
    }
    return dummy.next;
  }
}