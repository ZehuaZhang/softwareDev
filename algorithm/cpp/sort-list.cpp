// 148. Sort List
// Difficulty: Medium

// Sort a linked list in O(n log n) time using constant space complexity.

// Time:  O(nlogn)
// Space: O(logn)

class Solution {
public:
  ListNode* sortList(ListNode* head) {
    if (!head || !head->next) {
      return head;
    }

    ListNode* slow = head, *fast = head;
    while (fast->next && fast->next->next) {
      slow = slow->next;
      fast = fast->next->next;
    }
    
    ListNode* head2 = slow->next;
    slow->next = nullptr;

    return mergeTwoLists(sortList(head), sortList(head2));
  }

private:
  ListNode* mergeTwoLists(ListNode *l1, ListNode *l2) {
    ListNode dummy{0};
    ListNode* curr = &dummy;

    while (l1 && l2) {
      if (l1->val <= l2->val) {
        curr->next = l1;
        l1 = l1->next;
      } else {
        curr->next = l2;
        l2 = l2->next;
      }
      curr = curr->next;
    }
    curr->next = l1 ? l1 : l2;

    return dummy.next;
  }
};
