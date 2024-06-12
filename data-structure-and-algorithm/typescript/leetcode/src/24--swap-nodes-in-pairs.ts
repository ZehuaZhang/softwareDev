/*
24. Swap Nodes in Pairs

Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

 

Example 1:


Input: head = [1,2,3,4]
Output: [2,1,4,3]
Example 2:

Input: head = []
Output: []
Example 3:

Input: head = [1]
Output: [1]
 

Constraints:

The number of nodes in the list is in the range [0, 100].
0 <= Node.val <= 100
*/

function swapPairs(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  dummy.next = head;

  for (
    let prev = dummy, curr = head;
    curr && curr.next;
    prev = curr, curr = curr.next
  ) {
    const next = curr.next;
    prev.next = next;
    curr.next = next.next;
    next.next = curr;
  }

  return dummy.next;
}
