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
            ListNode* prevHead = prev->next;
            prev->next = next;
            curr->next = next->next;
            next->next = prevHead;
        }

        return dummy.next;
    }
};