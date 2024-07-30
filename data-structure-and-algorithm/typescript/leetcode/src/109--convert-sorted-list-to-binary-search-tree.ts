/*
109. Convert Sorted List to Binary Search Tree

Given the head of a singly linked list where elements are sorted in ascending order, convert it to a 
height-balanced
 binary search tree.

 

Example 1:


Input: head = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: One possible answer is [0,-3,9,-10,null,5], which represents the shown height balanced BST.
Example 2:

Input: head = []
Output: []
 

Constraints:

The number of nodes in head is in the range [0, 2 * 104].
-105 <= Node.val <= 105
*/

function sortedListToBST(head: ListNode | null): TreeNode | null {
  if (!head) {
    return null;
  }

  if (!head.next) {
    return new TreeNode(head.val);
  }

  let slow = head;
  let fast = head;
  let prev = head;

  for (; fast && fast.next; fast = fast.next.next, slow = slow.next) {
    prev = slow;
  }
  prev.next = null;

  const node = new TreeNode(slow.val);
  node.left = sortedListToBST(head);
  node.right = sortedListToBST(slow.next);

  return node;
}
