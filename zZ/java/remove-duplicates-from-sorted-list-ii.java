/**
 * Remove Duplicates from Sorted List II
 * 
 * Given a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.
 * 
 * Example 1:
 * 
 * Input: 1->2->3->3->4->4->5
 * Output: 1->2->5
 * Example 2:
 * 
 * Input: 1->1->1->2->3
 * Output: 2->3
 */

public class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode dummy = new ListNode(0);
        
        for (ListNode prev = dummy; head != null;) {
            if (head.next != null && head.val == head.next.val) {
                int value = head.val;
                while (head != null && head.val == value) {
                    head = head.next;
                }
                prev.next = head;
            } else {
                prev.next = head;
                prev = head;
                head = head.next;
            }
        }

        return dummy.next;
    }

    private class ListNode {
        int val;
        ListNode next;
        ListNode(int x) {
            val = x;
        }
    }
}
