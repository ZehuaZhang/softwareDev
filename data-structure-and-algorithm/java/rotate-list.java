/**
 * Rotate List
 * 
 * Given a list, rotate the list to the right by k places, where k is non-negative.
 * 
 * For example:
 * Given 1->2->3->4->5->NULL and k = 2,
 * return 4->5->1->2->3->NULL.
 */

public class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null) {
            return head;
        }

        ListNode curr = head;
        int length = 1;
        while (curr.next != null) {
            ++length;
            curr = curr.next;
        }

        curr.next = head;

        k = length - k % length;
        for (int i = 0; i < k; ++i) {
            curr = curr.next;
        }

        head = curr.next;
        curr.next = null;

        return head;
    }
}

public class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
    }
}