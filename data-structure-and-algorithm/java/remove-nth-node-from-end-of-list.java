/**
 * Remove Nth Node From End of List
 *  
 * Given a linked list, remove the nth node from the end of list and return its head.
 * 
 * For example,
 * 
 *    Given linked list: 1->2->3->4->5, and n = 2.
 * 
 *    After removing the second node from the end, the linked list becomes 1->2->3->5.
 * 
 * Note:
 * Given n will always be valid.
 * Try to do this in one pass.
 */

/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */

public class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode fp = head;
        for (int i = 0; i < n; ++i) {
            fp = fp.next;
        }
        if (fp == null) return head.next;
        ListNode sp = head;
        while (fp.next != null) {
            fp = fp.next;
            sp = sp.next;
        }
        sp.next = sp.next.next;
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

public class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        if (head == null) {
            throw new NullPointerException();
        }

        ListNode forwardPointer = head;
        for (int i = 0; i < n; ++i) {
            forwardPointer = forwardPointer.next;
        }
        if (forwardPointer == null) {
            return head.next;
        }

        ListNode precedingNodeToDeletePointer = head;
        while (forwardPointer != null) {
            forwardPointer = forwardPointer.next;
            precedingNodeToDeletePointer = precedingNodeToDeletePointer.next;
        }

        precedingNodeToDeletePointer.next = precedingNodeToDeletePointer.next.next;
        return head;
    }
}
