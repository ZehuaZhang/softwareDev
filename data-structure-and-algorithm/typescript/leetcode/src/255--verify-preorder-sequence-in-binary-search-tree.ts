/*
255. Verify Preorder Sequence in Binary Search Tree

Given an array of numbers, verify whether it is the correct preorder traversal sequence of a binary search tree.

You may assume each number in the sequence is unique.

Follow up:
Could you do it using only constant space complexity?
*/

function verifyPreorder(preorder: number[]) {
  let low = Infinity;
  let i = -1;
  for (const a of preorder) {
    if (a < low) {
      return false;
    }
    while (i >= 0 && a > preorder[i]) {
      low = preorder[i--];
    }
    preorder[++i] = a;
  }
  return true;
}
