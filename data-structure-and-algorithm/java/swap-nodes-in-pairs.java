/**
 * Swap Nodes in Pairs
 *  
 * Given a linked list, swap every two adjacent nodes and return its head.
 * 
 * Example:
 * 
 * Given 1->2->3->4, you should return the list as 2->1->4->3.
 * Note:
 * 
 * Your algorithm should use only constant extra space.
 * You may not modify the values in the list's nodes, only nodes itself may be changed.
 */

public class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
    }
}

public class Solution {
    public ListNode swapPairs(ListNode head) {
        ListNode precedingHeadPointer = new ListNode(0);
        precedingHeadPointer.next = head;

        ListNode prev = precedingHeadPointer;
        while (prev != null && 
            prev.next != null &&
            prev.next.next != null) {
            
            ListNode curr = prev.next;
            ListNode next = prev.next.next;
            curr.next = next.next;
            next.next = curr;
            prev.next = next;

            prev = prev.next.next;
        }

        return precedingHeadPointer.next;
    }
}