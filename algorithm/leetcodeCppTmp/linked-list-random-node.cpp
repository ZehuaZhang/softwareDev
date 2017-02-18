// 382. Linked List Random Node
// Difficulty: Medium

// Given a singly linked list, return a random node value from the linked list. 
// Each node must have the same probability of being chosen.

// Follow up:
// What if the linked list is extremely large and its length is unknown to you? 
// Could you solve this efficiently without using extra space?

// Example:

// Init a singly linked list [1,2,3].
// ListNode head = new ListNode(1);
// head.next = new ListNode(2);
// head.next.next = new ListNode(3);
// Solution solution = new Solution(head);

// getRandom() should return either 1, 2, or 3 randomly. Each element should have equal probability of returning.
// solution.getRandom();

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(head);
 * int param_1 = obj.getRandom();
 */

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    /** @param head The linked list's head. Note that the head is guanranteed to be not null, so it contains at least one node. */
    Solution(ListNode* head) : _head(head) {
        
    }
    
    /** Returns a random node's value. */
    int getRandom() {
        auto random = _head->val;
        auto n = 1;
        for (auto curr = _head->next; curr; curr = curr->next) {
            if (rand() % ++n == 0) {
                random = curr->val;
            }
        }
        return random;
    }

private:
    ListNode *_head;
};