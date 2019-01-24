/**
 * Copy List with Random Pointer
 *  
 * A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.
 * 
 * Return a deep copy of the list.
 */

public class Solution {
    public RandomListNode copyRandomList(RandomListNode head) {
        for (RandomListNode curr = head; curr != null; curr = curr.next.next) {
            RandomListNode node = new RandomListNode(curr.label);
            node.next = curr.next;
            curr.next = node;
        }

        for (RandomListNode curr = head; curr != null; curr = curr.next.next) {
            if (curr.random) {
                curr.next.random = curr.random.next;
            }
        }

        RandomListNode dummy = new RandomListNode(0);
        for (RandomListNode curr = head, copiedCurr = dummy; curr != null; curr = curr.next, copiedCurr = copiedCurr.next) {
            copiedCurr.next = curr.next;
            curr.next = curr.next.next;
        }
        return dummy.next;
    }
}

class RandomListNode {
    int label;
    RandomListNode next, random;
    RandomListNode(int x) { this.label = x; }
};