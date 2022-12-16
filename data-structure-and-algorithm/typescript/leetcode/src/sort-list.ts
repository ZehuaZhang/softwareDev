/*
Given the head of a linked list, return the list after sorting it in ascending order.

Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?



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
*/

import {ListNode} from './data-structure/LinkedList';
import {Nullable} from './util/object';

function sortList(
  head: Nullable<ListNode<number>>
): Nullable<ListNode<number>> {
  if (head === null || head.next === null) {
    return head;
  }
  let [prev, slow, fast]: Nullable<ListNode<number>>[] = [null, head, head];

  for (; fast && fast.next; slow = slow!.next, fast = fast.next.next) {
    prev = slow;
  }

  if (fast) {
    prev = slow;
    slow = slow!.next;
  }

  prev!.next = null;
  return merge(sortList(head), sortList(slow));

  function merge(
    l1: Nullable<ListNode<number>>,
    l2: Nullable<ListNode<number>>
  ): Nullable<ListNode<number>> {
    const dummy = new ListNode(NaN);
    let prev = dummy;
    for (; l1 && l2; prev = prev.next) {
      if (l1.data < l2.data) {
        prev.next = l1;
        l1 = l1.next;
      } else {
        prev.next = l2;
        l2 = l2.next;
      }
    }
    prev.next = l1 ? l1 : l2;
    return dummy.next;
  }
}
