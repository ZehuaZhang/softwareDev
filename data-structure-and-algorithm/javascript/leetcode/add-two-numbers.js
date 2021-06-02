// 2. Add Two Numbers

// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example:

// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    const dummy = new ListNode(0)
    let carry = 0
    let curr = dummy
    while (l1 || l2 || carry) {
        const value1 = l1 ? l1.val : 0
        const value2 = l2 ? l2.val : 0
        const sum = value1 + value2 + carry
        carry = Math.trunc(sum / 10)
        curr.next = new ListNode(sum % 10)
        curr = curr.next
        l1 = l1 ? l1.next : null
        l2 = l2 ? l2.next : null
    }
    return dummy.next
};