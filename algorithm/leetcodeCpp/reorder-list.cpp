143. Reorder List
Difficulty: Medium

Given a singly linked list L: L0→L1→…→Ln-1→Ln,
reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

You must do this in-place without altering the nodes values.

For example,
Given {1,2,3,4}, reorder it to {1,4,2,3}.

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
    void reorderList(ListNode *head) {
        if (!head) {
            return;
        }

        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }

        // Split into two lists.
        ListNode *head2 = slow->next;
        slow->next = nullptr;

        merge(head, reverse(head2));
    }

private:
    ListNode *reverse(ListNode *head) {
        ListNode *prev = nullptr;

        while (head) {
            ListNode *next = head->next;
            head->next = prev;
            prev = head;
            head = next;
        }

        return prev;
    }

    ListNode *merge(ListNode *list1, ListNode *list2) {
        ListNode dummy{0};
        ListNode *curr = &dummy;

        while (list1 && list2) {
            ListNode *next = list1->next;

            curr->next = list1;
            curr = curr->next;
            curr->next = list2;
            curr = curr->next;

            list1 = next;
            list2 = list2->next;
        }

        if (list1) {
            curr->next = list1;
        }

        return dummy.next;
    }
};
