// 141. Linked List Cycle
// Difficulty: Easy

// Given a linked list, determine if it has a cycle in it.

// Follow up:
// Can you solve it without using extra space?

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *slow = head, *fast = head;

        while (fast && fast->next) {
            slow = slow->next, fast = fast->next->next;
            if (slow == fast) {  // There is a cycle.
                return true;
            }
        }
        return false;  // No cycle.
    }
};
