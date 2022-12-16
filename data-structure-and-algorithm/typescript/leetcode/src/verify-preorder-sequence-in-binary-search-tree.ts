/*
255. Verify Preorder Sequence in Binary Search Tree
Difficulty : Medium

Given an array of numbers, verify whether it is the correct preorder traversal sequence of a binary search tree.

You may assume each number in the sequence is unique.

Follow up:
Could you do it using only constant space complexity?
*/

import {Stack} from './data-structure/Stack';

function verifyPreorder(preorder: number[]): boolean {
  let low = -Infinity;
  const stack = new Stack<number>();
  for (const node of preorder) {
    if (node < low) {
      return false;
    }
    while (!stack.isEmpty() && node >= stack.peek()) {
      // node is in right subtree
      // pop left subtree & root, use it as a lower bound because
      // we shouldn't come across a smaller number anymore.
      low = stack.pop();
    }
    stack.push(node);
  }
  return true;
}
