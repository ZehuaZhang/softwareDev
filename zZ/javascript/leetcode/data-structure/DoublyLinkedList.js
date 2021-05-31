import { LinkedListNode } from './LinkedListNode';

export class DoublyLinkedList {
    constructor(...dataList) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        if (dataList) {

        }
    }
}

const funA = (...a) => {
    console.log('a', a)
}

funA()