/*
86. Partition List

Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

You should preserve the original relative order of the nodes in each of the two partitions.

 

Example 1:


Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]
Example 2:

Input: head = [2,1], x = 2
Output: [1,2]
 

Constraints:

The number of nodes in the list is in the range [0, 200].
-100 <= Node.val <= 100
-200 <= x <= 200
*/

function partition(head: ListNode | null, x: number): ListNode | null {
  const dummy = new ListNode(0, head);
  const dummy2 = new ListNode(0);
  let n = dummy2;

  for (let p = dummy; p.next; ) {
    if (p.next.val < x) {
      n.next = p.next;
      n = p.next;
      p.next = p.next.next;
    } else {
      n.next = null;
      p = p.next;
    }
  }

  n.next = dummy.next;
  return dummy2.next;
}
