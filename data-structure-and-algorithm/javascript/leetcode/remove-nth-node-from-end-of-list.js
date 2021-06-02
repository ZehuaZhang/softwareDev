// 19. Remove Nth Node From End of List

// Given a linked list, remove the n-th node from the end of list and return its head.

// Example:

// Given linked list: 1->2->3->4->5, and n = 2.

// After removing the second node from the end, the linked list becomes 1->2->3->5.
// Note:

// Given n will always be valid.

// Follow up:

// Could you do this in one pass?

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    if (!isListNode(head) || !isNumber(n)) {
        throw "invalid input value"
    }
    
    const dummy = new ListNode(0)
    dummy.next = head
    
    let fast = dummy
    while (n >= 0) {
        fast = fast.next
        --n
    }
    
    let prev = dummy
    while (!isNullOrUndefined(fast)) {
        fast = fast.next
        prev = prev.next
    }
    
    prev.next= prev.next.next
    
    return dummy.next
};

function isNullOrUndefined(item) {
    return (
        item === undefined ||
        item === null
    )
}

function isListNode(item) {
    return item instanceof ListNode
}

function isNumber(item) {
    return typeof item === 'number'
}