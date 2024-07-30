/*
148. Sort List

Given the head of a linked list, return the list after sorting it in ascending order.

 

Example 1:


Input: head = [4,2,1,3]
Output: [1,2,3,4]
Example 2:


Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
Example 3:

Input: head = []
Output: []
 

Constraints:

The number of nodes in the list is in the range [0, 5 * 104].
-105 <= Node.val <= 105
 

Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?
*/

function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return head;
  }

  let slow = head;
  let fast = head;
  let prev = head;
  for (
    ;
    fast && fast.next;
    prev = slow, slow = slow.next, fast = fast.next.next
  );
  prev.next = null;

  return merge(sortList(head), sortList(slow));

  function merge(l1: ListNode | null, l2: ListNode | null) {
    const dummy = new ListNode(0);
    let curr = dummy;

    for (; l1 && l2; curr = curr.next) {
      if (l1.val < l2.val) {
        curr.next = l1;
        l1 = l1.next;
      } else {
        curr.next = l2;
        l2 = l2.next;
      }
    }

    curr.next = l1 ? l1 : l2;

    return dummy.next;
  }
}
