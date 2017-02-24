// 86. Partition List
// Difficulty: Medium

// Given a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

// You should preserve the original relative order of the nodes in each of the two partitions.

// For example,
// Given 1->4->3->2->5->2 and x = 3,
// return 1->2->2->4->3->5.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    ListNode *partition(ListNode *head, int x) {
        ListNode dummySmaller{0};
        ListNode dummyLarger{0};
        ListNode *smaller = &dummySmaller;
        ListNode *larger = &dummyLarger;

        while (head) {
            if (head->val < x) {
                smaller->next = head;
                smaller = smaller->next;
            } else {
                larger->next = head;
                larger = larger->next;
            }
            head = head->next;
        }
        smaller->next = dummyLarger.next;
        larger->next = nullptr;

        return dummySmaller.next;
    }
};
