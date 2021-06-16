/**
 * 
 * @param { ListNode } l1 
 * @param { ListNode } l2 
 * @returns 
 */
function addTwoNumbers(l1, l2) {
    const s1 = new Stack(), s2 = new Stack();
    for (const curr = l1; curr; curr = curr.next) {
        s1.push(curr);
    }
    for (const curr = l2; curr; curr = curr.next) {
        s2.push(curr);
    }

    let carry = 0;
    let prev = null, head = null;
    while(!s1.isEmpty() || !s2.isEmpty()) {
        const a = s1.isEmpty() ? 0 : s1.pop();
        const b = s2.isEmpty() ? 0 : s2.pop();
        const sum = a + b + carry;
        carry = Math.trunc(sum / 10);
        head = new ListNode(sum % 10, prev);
        prev = head;
    }

    if (carry === 1) {
        head = new ListNode(carry, prev);
    }
    return head;
}

class ListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}