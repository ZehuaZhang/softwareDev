/*
143. Reorder List

You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln
Reorder the list to be on the following form:

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
You may not modify the values in the list's nodes. Only nodes themselves may be changed.

 

Example 1:


Input: head = [1,2,3,4]
Output: [1,4,2,3]
Example 2:


Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]
 

Constraints:

The number of nodes in the list is in the range [1, 5 * 104].
1 <= Node.val <= 1000
*/

function reorderList(head: ListNode | null): void {
  if (head === null) {
    return;
  }

  let slow = head,
    fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let p = null,
    c = slow.next;
  while (c) {
    const next = c.next;
    c.next = p;
    p = c;
    c = next;
  }
  slow.next = null;

  let h1 = head,
    h2 = p;
  while (h2) {
    const next = h1.next;
    h1.next = h2;
    h1 = h2;
    h2 = next;
  }
}
