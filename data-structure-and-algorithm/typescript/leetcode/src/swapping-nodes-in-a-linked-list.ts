/*
You are given the head of a linked list, and an integer k.

Return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).



Example 1:


Input: head = [1,2,3,4,5], k = 2
Output: [1,4,3,2,5]
Example 2:

Input: head = [7,9,6,6,7,8,3,0,9,5], k = 5
Output: [7,9,6,6,8,7,3,0,9,5]
Example 3:

Input: head = [1], k = 1
Output: [1]
Example 4:

Input: head = [1,2], k = 1
Output: [2,1]
Example 5:

Input: head = [1,2,3], k = 2
Output: [1,2,3]


Constraints:

The number of nodes in the list is n.
1 <= k <= n <= 105
0 <= Node.val <= 100
*/

import {ListNode} from './data-structure/LinkedList';
import {Nullable} from './util/object';

function swapNodes(
  head: Nullable<ListNode<number>>,
  kth: number
): Nullable<ListNode<number>> {
  let [node1, node2]: Nullable<ListNode<number>>[] = [null, null];
  for (let curr = head; curr; curr = curr.next) {
    node2 = node2 ? node2.next : null;
    if (--kth === 0) {
      node1 = curr;
      node2 = head;
    }
  }
  const data = node1!.data;
  node1!.data = node2!.data;
  node2!.data = data;
  return head;
}
