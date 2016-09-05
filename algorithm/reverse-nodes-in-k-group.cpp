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
        auto curr = head, curr_dummy = &dummy;
        int len = 0;

        while (curr) {
            auto next_curr = curr->next;
            len = (len + 1) % k;

            if (len == 0) {
                auto next_dummy = curr_dummy->next;
                reverse(&curr_dummy, curr->next);
                curr_dummy = next_dummy;
            }
            curr = next_curr;
        }
        return dummy.next;
    }

    void reverse(ListNode **begin, const ListNode *end) {
        ListNode *first = (*begin)->next;
        ListNode *curr = first->next;

        while (curr != end) {
            first->next = curr->next;
            curr->next = (*begin)->next;
            (*begin)->next = curr;
            curr = first->next;
        }
    }
};

 if (k < 2 || head == nullptr || head->next == nullptr) {
            return head;
        }
        ListNode dummy(0);
        dummy.next = head;
        ListNode *prevEnd = &dummy;
        ListNode *curr = head;
        while (ListNode *currEnd = curr) {
            for (int i = 1; i < k && currEnd; i++) {
                currEnd = currEnd->next;
            }
            if (currEnd == nullptr) {
                break;
            }
            ListNode *next = currEnd->next;
            ListNode *prev = nullptr;
            while (curr != next) {
                ListNode *nextCurr = curr->next;
                if (prev == nullptr) {
                    prevEnd->next = currEnd;
                    prevEnd = curr;
                    curr->next = next;
                } else {
                    curr->next = prev;
                }
                prev = curr;
                curr = nextCurr;
            }
        }
        return dummy.next;
    }
