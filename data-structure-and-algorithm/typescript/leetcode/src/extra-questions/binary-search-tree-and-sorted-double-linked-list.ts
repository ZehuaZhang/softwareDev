/*
Binary Search Tree and Sorted Double Linked List
*/

import {PerformanceObserver} from 'perf_hooks';
import {TreeNode} from '../data-structure/BinaryTree';
import {DoubleListNode} from '../data-structure/DoublyLinkedList';
import {Nullable} from '../util/object';

function sortedDoubleList2BST(
  head: Nullable<DoubleListNode<number>>
): Nullable<DoubleListNode<number>> {
  let cnt = 0;
  for (let curr = head; curr; curr = curr.next) {
    ++cnt;
  }
  return sortedDoubleList2BSTDfs(cnt);

  function sortedDoubleList2BSTDfs(
    size: number
  ): Nullable<DoubleListNode<number>> {
    if (size <= 0) {
      return null;
    }

    const left = sortedDoubleList2BSTDfs(Math.trunc(size / 2));
    const node = head!;
    head = head!.next;
    node.prev = left;
    node.next = sortedDoubleList2BSTDfs(size - Math.trunc(size / 2) - 1);

    return node;
  }
}

function BST2sortedDoubleList(
  root: Nullable<TreeNode<number>>
): Nullable<TreeNode<number>> {
  if (root === null) {
    return null;
  }
  let prev: Nullable<TreeNode<number>> = null;
  let head: Nullable<TreeNode<number>> = null;

  BST2sortedDoubleListDfs(root);

  prev!.right = head;
  head!.left = prev;

  return head;

  function BST2sortedDoubleListDfs(node: Nullable<TreeNode<number>>): void {
    if (node === null) {
      return;
    }
    BST2sortedDoubleListDfs(node.left);

    if (head === null) {
      head = node;
    } else {
      node.left = prev;
      prev!.right = node;
    }
    prev = node;

    BST2sortedDoubleListDfs(node.right);
  }
}
