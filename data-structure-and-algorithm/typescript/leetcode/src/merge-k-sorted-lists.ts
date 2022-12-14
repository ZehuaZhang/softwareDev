/*
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.



Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []


Constraints:

k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4
lists[i] is sorted in ascending order.
The sum of lists[i].length won't exceed 10^4.
*/

import {ListNode} from './data-structure/LinkedList';
import {Nullable} from './util/object';

function mergeKList(lists: ListNode<number>[]): Nullable<ListNode<number>> {
  return mergeKListDFS(lists, 0, lists.length - 1);

  function mergeKListDFS(
    lists: ListNode<number>[],
    left: number,
    right: number
  ): Nullable<ListNode<number>> {
    if (left > right) {
      return null;
    }

    if (left === right) {
      return lists[left];
    }

    const mid = (left + right) >> 1;
    const lList = mergeKListDFS(lists, left, mid);
    const rList = mergeKListDFS(lists, mid + 1, right);

    return merge2List(lList, rList);
  }

  function merge2List(
    left: Nullable<ListNode<number>>,
    right: Nullable<ListNode<number>>
  ): Nullable<ListNode<number>> {
    const dummy = new ListNode(-1);
    let curr = dummy;

    while (left && right) {
      if (left.data <= right.data) {
        curr.next = left;
        left = left.next;
      } else {
        curr.next = right;
        right = right.next;
      }
      curr = curr.next;
    }

    curr.next = left ? left : right;
    return dummy.next;
  }
}
