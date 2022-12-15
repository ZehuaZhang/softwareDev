/*
Given the head of a singly linked list, return true if it is a palindrome.



Example 1:


Input: head = [1,2,2,1]
Output: true
Example 2:


Input: head = [1,2]
Output: false


Constraints:

The number of nodes in the list is in the range [1, 105].
0 <= Node.val <= 9


Follow up: Could you do it in O(n) time and O(1) space?
*/

import {ListNode} from './data-structure/LinkedList';
import {Nullable} from './util/object';

function isPalindrome(head: Nullable<ListNode<number>>): boolean {
  let [slow, fast]: Nullable<ListNode<number>>[] = [head, head];
  for (; fast && fast.next; slow = slow!.next, fast = fast.next.next);
  if (fast) {
    slow = slow!.next;
  }
  slow = reverse(slow);
  for (; slow && head!.data === slow.data; head = head!.next, slow = slow.next);
  return slow === null;

  function reverse(
    node: Nullable<ListNode<number>>
  ): Nullable<ListNode<number>> {
    let prev = null;
    for (; node; ) {
      const next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return prev;
  }
}
