class DoublyLinkedList {
    constructor(...dataList) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        if (dataList) {
            this.fromArray(dataList)
        }
    }

    fromArray(dataList) {
        dataList.forEach(data => this.append(data));
        return this;
    }

    toArray() {
        const dataList = [];
        for (let curr = this.head; curr; curr = curr.next) {
            dataList.push(curr.value);
        }
        return dataList;
    }

    append(data) {
        
    }
}

class DoublyLinkedListNode {
    constructor(value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}