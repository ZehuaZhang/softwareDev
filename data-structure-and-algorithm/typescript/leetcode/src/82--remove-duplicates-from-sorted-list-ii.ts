/*
82. Remove Duplicates from Sorted List II

Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

 

Example 1:


Input: head = [1,2,3,3,4,4,5]
Output: [1,2,5]
Example 2:


Input: head = [1,1,1,2,3]
Output: [2,3]
 

Constraints:

The number of nodes in the list is in the range [0, 300].
-100 <= Node.val <= 100
The list is guaranteed to be sorted in ascending order.
*/

function deleteDuplicates(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head);
  let prev = dummy;

  for (; head; head = head.next) {
      if (head.next && head.next.val === head.val) {
          for (; head.next && head.next.val === head.val; head = head.next);
          prev.next = head.next;
      } else {
          prev = prev.next;
      }
  }

  return dummy.next;
};
