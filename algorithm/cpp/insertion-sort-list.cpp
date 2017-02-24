// 147. Insertion Sort List
// Difficulty: Medium

// Sort a linked list using insertion sort.

// Time:  O(n^2)
// Space: O(1)

class Solution {
public:
    ListNode *insertionSortList(ListNode *head) {
        ListNode dummy(INT_MIN);

        for (ListNode *curr = head; curr;) {
            ListNode *position = nullptr;
            for (ListNode *prev = &dummy; prev && prev->val <= curr->val; prev = prev->next) {
                position = prev;
            }
            ListNode *next = curr->next;
            curr->next = position->next;
            position->next = curr;
            curr = next;
        }

        return dummy.next;
    }
};
