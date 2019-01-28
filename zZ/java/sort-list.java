/**
 * Sort List
 * 
 * Sort a linked list in O(n log n) time using constant space complexity.
 * 
 * Example 1:
 * 
 * Input: 4->2->1->3
 * Output: 1->2->3->4
 * Example 2:
 * 
 * Input: -1->5->3->4->0
 * Output: -1->0->3->4->5
 */

public class Solution {
    public ListNode sortList(ListNode head) {
       if (head == null) {
           return null;
       }

       ListNode slow = head, fast = head;
       while (fast.next != null & fast.next.next != null) {
           slow = slow.next;
           fast = fast.next.next;
       }

       ListNode head2 = slow.next;
       slow.next = null;

       return merge(sortList(head), sortList(head2));
    }

    private ListNode merge (ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;

        while (list1 != null && list2 != null){
            if (list1.val < list2.val) {
                curr.next = list1;
                list1 = list1.next;
            } else {
                curr.next = list2;
                list2 = list2.next;
            }
            curr = curr.next;
        }

        curr.next = list1 == null ? list2 : list1;

        return dummy.next;
    }
}

public class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}