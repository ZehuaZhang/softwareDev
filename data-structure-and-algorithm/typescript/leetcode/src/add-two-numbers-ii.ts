/**
You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.



Example 1:


Input: l1 = [7,2,4,3], l2 = [5,6,4]
Output: [7,8,0,7]
Example 2:

Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [8,0,7]
Example 3:

Input: l1 = [0], l2 = [0]
Output: [0]


Constraints:

The number of nodes in each linked list is in the range [1, 100].
0 <= Node.val <= 9
It is guaranteed that the list represents a number that does not have leading zeros.


Follow up: Could you solve it without reversing the input lists?
*/

import {ListNode} from './data-structure/LinkedList';
import {Stack} from './data-structure/Stack';
import {Nullable} from './util/object';

function addTwoNumbers(
  l1: Nullable<ListNode>,
  l2: Nullable<ListNode>
): Nullable<ListNode> {
  const s1 = new Stack();
  const s2 = new Stack();
  for (let curr = l1; curr; curr = curr.next) {
    s1.push(curr.data);
  }
  for (let curr = l2; curr; curr = curr.next) {
    s2.push(curr.data);
  }

  let carry = 0;
  let prev = null;
  let head = null;
  while (!s1.isEmpty() || !s2.isEmpty() || carry) {
    const a = s1.isEmpty() ? 0 : s1.pop();
    const b = s2.isEmpty() ? 0 : s2.pop();
    const sum = a + b + carry;
    carry = Math.trunc(sum / 10);
    head = new ListNode(sum % 10, prev);
    prev = head;
  }

  return head;
}
