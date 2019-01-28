/**
 * Insertion Sort List
 * 
 * Sort a linked list using insertion sort.
 * 
 * 
 * A graphical example of insertion sort. The partial sorted list (black) initially contains only the first element in the list.
 * With each iteration one element (red) is removed from the input data and inserted in-place into the sorted list
 *  
 * 
 * Algorithm of Insertion Sort:
 * 
 * Insertion sort iterates, consuming one input element each repetition, and growing a sorted output list.
 * At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there.
 * It repeats until no input elements remain.
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
    public ListNode insertionSortList(ListNode head) {
        ListNode dummy = new ListNode(Integer.MIN_VALUE);

        for (ListNode curr = head; curr != null;) {
            ListNode position = null;
            for (ListNode prev = dummy; prev != null && prev.val <= curr.val; prev = prev.next) {
                position = prev;
            }
            ListNode next = curr.next;
            curr.next = position.next;
            position.next = curr;
            curr = next;
        }

        return dummy.next;
    }
}

public class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}