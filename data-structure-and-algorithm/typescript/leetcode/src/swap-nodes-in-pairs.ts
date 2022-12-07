// 24. Swap Nodes in Pairs

// Given a linked list, swap every two adjacent nodes and return its head.

// You may not modify the values in the list's nodes, only nodes itself may be changed.

// Example:

// Given 1->2->3->4, you should return the list as 2->1->4->3.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function swapPairs(head) {
  const dummy = new ListNode();
  dummy.next = head;
  for (
    let prev = dummy, curr = head;
    curr && curr.next;
    prev = curr, curr = curr.next

    const next = curr.next;
    prev.next = curr.next;
    curr.next = next.next;
    next.next = curr;
  }
  return dummy.next;
}