/*
Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.



Example 1:


Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]
Example 2:

Input: head = [], val = 1
Output: []
Example 3:

Input: head = [7,7,7,7], val = 7
Output: []


Constraints:

The number of nodes in the list is in the range [0, 104].
1 <= Node.val <= 50
0 <= val <= 50
*/

import {ListNode} from './data-structure/LinkedList';
import {Nullable} from './util/object';

function removeElements(
  head: Nullable<ListNode<number>>,
  data: number
): Nullable<ListNode<number>> {
  const dummy = new ListNode(NaN);
  dummy.next = head;
  for (let curr = head, prev = dummy; curr; curr = curr.next) {
    if (curr.data === data) {
      prev.next = curr.next;
    } else {
      prev = prev.next!;
    }
  }
  return dummy.next;
}

function removeElements_dfs(
  head: Nullable<ListNode<number>>,
  data: number
): Nullable<ListNode<number>> {
  if (head === null) {
    return null;
  }
  head.next = removeElements(head.next, data);
  return head.data === data ? head.next : head;
}
