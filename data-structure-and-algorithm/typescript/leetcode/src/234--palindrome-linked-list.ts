/*
234. Palindrome Linked List

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

function isPalindrome(head: ListNode | null): boolean {
  let slow  = head;
  let fast = head;
  for (; fast && fast.next; slow = slow.next, fast = fast.next.next);
  if (fast) {
      slow = slow.next;
  }

  let head2 = reverse(slow);

  for (; head2; head = head.next, head2 = head2.next) {
      if (head.val !== head2.val) {
          return false;
      }
  }

  return true;

  function reverse(node: ListNode | null) {
      let prev = null;
      while (node) {
          const next = node.next;
          node.next = prev;
          prev = node;
          node = next;
      }
      return prev;
  }
};
