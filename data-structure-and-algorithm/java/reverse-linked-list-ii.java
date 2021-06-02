/**
 * Reverse Linked List II
 * 
 * Reverse a linked list from position m to n. Do it in one-pass.
 * 
 * Note: 1 ≤ m ≤ n ≤ length of list.
 * 
 * Example:
 * 
 * Input: 1->2->3->4->5->NULL, m = 2, n = 4
 * Output: 1->4->3->2->5->NULL
 */

public class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
    }
}

public class Solution {
    public ListNode reverseBetween(ListNode head, int m, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;

        for (int i = 0 ; i < m - 1; ++i) {
            prev = prev.next;
        }

        ListNode curr = prev.next;
        for (int i = m; i < n; ++i) {
            ListNode next = curr.next;
            curr.next = next.next;
            next.next = curr;
            prev.next = next;
        }

        return dummy.next;
    }
}
