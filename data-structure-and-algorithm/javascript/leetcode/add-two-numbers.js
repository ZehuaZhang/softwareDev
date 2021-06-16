/**
 * 
 * @param { ListNode } l1 
 * @param { ListNode } l2 
 * @returns { ListNode }
 */
function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);

    let carry = 0;
    for (const curr = dummy; l1 || l2 || carry; curr = curr.next) {
        const a = l1 ? l1.value : 0;
        const b = l2 ? l2.value : 0;
        const sum = a + b + carry;
        carry = Math.trunc(sum / 10);
        curr.next = new ListNode(sum % 10);

        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;
    }

    return dummy.next;
}

class ListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}