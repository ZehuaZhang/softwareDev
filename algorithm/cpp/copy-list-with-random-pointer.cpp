// 138. Copy List with Random Pointer
// Difficulty: Hard

// A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.

// Return a deep copy of the list.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    RandomListNode *copyRandomList(RandomListNode *head) {
        // Insert the copied node after the original one.
        for (RandomListNode *curr = head; curr; curr = curr->next->next) {
            RandomListNode *node = new RandomListNode(curr->label);
            node->next = curr->next;
            curr->next = node;
        }

        // Update random node.
        for (RandomListNode *curr = head; curr; curr = curr->next->next) {
            if (curr->random) {
                curr->next->random = curr->random->next;
            }
        }

        // Seperate the copied nodes from original ones.
        RandomListNode dummy(0);
        for (RandomListNode *curr = head, *copyCurr = &dummy;
             curr;
             copyCurr = copyCurr->next, curr = curr->next) {
            copyCurr->next = curr->next;
            curr->next = curr->next->next;
        }

        return dummy.next;
    }
};
