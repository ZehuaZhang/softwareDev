/**
 * Partition List
 * 
 * Given a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.
 * 
 * You should preserve the original relative order of the nodes in each of the two partitions.
 * 
 * For example,
 * Given 1->4->3->2->5->2 and x = 3,
 * return 1->2->2->4->3->5.
 */
 
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */

public class Soltution {
    public ListNode partition(ListNode head, int x) {
        ListNode dummy1 = new ListNode(0);
        ListNode dummy2 = new ListNode(0);
        ListNode prev1 = dummy1;
        ListNode prev2= dummy2;
        while (head != null) {
            if (head.val < x) {
                prev1.next = head;
                prev1 = prev1.next;
            } else {
                prev2.next = head;
                prev2 = prev2.next;
            }
            head = head.next;
        }

        prev2.next = null;
        prev1.next = dummy2.next;
        return dummy1.next;
    }
}

public class Solution {
    public ListNode partition(ListNode head, int x) {
        ListNode dummy1 = new ListNode(0);
        ListNode dummy2 = new ListNode(0);
        ListNode prev1 = dummy1, prev2 = dummy2;
        ListNode cur = head;
        while (cur != null) {
            if (cur.val < x) {
                prev1.next = cur;
                prev1 = prev1.next;
            } else {
                prev2.next = cur;
                prev2 = prev2.next;
            }
            cur = cur.next;
        }
        prev2.next = null;
        prev1.next = dummy2.next;
        return dummy1.next;
    }
}
