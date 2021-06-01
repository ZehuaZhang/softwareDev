class Queue {
    constructor(size) {
        this.dataLinkedList = new LinkedList();
        this.size = size;
    }

    count() {
        return this.dataLinkedList.length
    }

    isEmpty() {
        return this.count() === 0;
    }

    isFull() {
        return this.count() === this.size;
    }

    enQueue(data) {
        if (this.isFull()) {
            throw new Error("enQueue: queue overflow");
        }
        this.dataLinkedList.append(data);
        return this;
    }

    deQueue() {
        if (this.isEmpty()) {
            throw new Error("deQueue: queue underflow");
        }
        const index = this.count() - 1
        const data = this.dataLinkedList.get(index);
        this.dataLinkedList.remove(index);
        return data;
    }

    front() {
        if (this.isEmpty()) {
            throw new Error("front: queue underflow");
        }
        return this.dataLinkedList.get(0);
    }

    back() {
        if (this.isEmpty()) {
            throw new Error("front: queue underflow");
        }
        return this.dataLinkedList.get(this.count() - 1);
    }

    fromArray(dataList) {
        dataList.forEach(data => {
            this.enQueue(data);
        });
        return this;
    }

    toArray() {
        return this.dataLinkedList.toArray();
    }

    print() {
        this.dataLinkedList.print();
        return this;
    }
}