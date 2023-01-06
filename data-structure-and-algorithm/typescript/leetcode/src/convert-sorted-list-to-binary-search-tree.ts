/*
109. Convert Sorted List to Binary Search Tree

Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.

Time:  O(n)
Space: O(h)
*/

import {TreeNode} from './data-structure/BinaryTree';
import {ListNode} from './data-structure/LinkedList';
import {Nullable} from './util/object';

function sortedListToBST(
  head: Nullable<ListNode<number>>
): Nullable<TreeNode<number>> {
  if (head === null) {
    return null;
  }
  if (head.next === null) {
    return new TreeNode(head.data);
  }
  let slow = head;
  let fast = head;
  let prev = slow;
  while (fast && fast.next) {
    prev = slow;
    slow = slow.next!;
    fast = fast.next.next!;
  }
  prev.next = null;
  const node = new TreeNode(slow.data);
  node.left = sortedListToBST(head);
  node.right = sortedListToBST(slow.next);
  return node;
}
