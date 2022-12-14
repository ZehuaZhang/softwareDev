/*
21. Merge Two Sorted Lists

Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

Example:

Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4
*/

import {ListNode} from './data-structure/LinkedList';
import {Nullable} from './util/object';

function mergeTwoLists(
  l1: Nullable<ListNode<number>>,
  l2: Nullable<ListNode<number>>
): Nullable<ListNode<number>> {
  const dummy = new ListNode(0);
  let curr = dummy;
  while (l1 && l2) {
    if (l1.data <= l2.data) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }
  curr.next = l1 ? l1 : l2;
  return dummy.next;
}
