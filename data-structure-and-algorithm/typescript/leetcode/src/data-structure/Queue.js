class Queue {
    constructor(capacity) {
        this.dataLinkedList = new LinkedList();
        this.capacity = capacity;
    }

    count() {
        return this.dataLinkedList.length
    }

    isEmpty() {
        return this.count() === 0;
    }

    isFull() {
        return this.count() === this.capacity;
    }

    push(data) {
        if (this.isFull()) {
            throw new Error("push: queue overflow");
        }
        this.dataLinkedList.append(data);
        return this;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("pop: queue underflow");
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