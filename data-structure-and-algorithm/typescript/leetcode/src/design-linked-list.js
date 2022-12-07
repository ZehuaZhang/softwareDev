class MyLinkedList {
    constructor() {
        this.list = new List();
    }

    get(index) {
        const node = this.list.get(index);
        if (node) {
            return node.value;
        }
        return -1;
    }

    addAtHead(value) {
        this.list.prepend(value);
    }

    addAtTail(value) {
        this.list.append(value);
    }

    addAtIndex(index, value) {
        if (index >= 0 && index <= this.list.length) {
            this.list.insertAt(index);
        }
    }

    deleteAtIndex(index) {
        if (index >= 0 && index < this.list.length) {
            this.list.removeAt(index);
        }
    }
}

class List {
    constructor(...dataList) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        if (dataList) {
            this.fromArray(dataList);
        }
    }

    prepend(data) {
        const node = new Node(data, this.head);
        this.head = node;
        if (!this.tail) {
            this.tail = node; 
        }
        ++this.length;
        return this;
    }

    append(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        ++this.length;
        return this;
    }

    reverse() {
        let curr = this.head;
        let prev = null;
        let next = null;

        while (curr) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        this.tail = this.head;
        this.head = prev;
        
        return this;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }

        let current = this.head;
        for (let i = 0; i < index; ++i) {
            current = current.next;
        }
        return current;
    }

    insert(node, data) {
        if (node === null) {
            this.prepend(data);
            return this;
        }

        const next = node.next;
        node.next = new Node(data, next);
        if (node === tail) {
            tail = node.next;
        }
        return this;
    }

    insertAt(index, data) {
        if (index < 0 || index > this.length) {
            throw new Error("insert: out of bounds");
        }

        const prev = this.get(index - 1);
        if (prev) {
            const node = new Node(data, prev.next)
            prev.next = node;
            if (prev === this.tail) {
                this.tail = node;
            }
        } else {
            this.prepend(data);
        }
        ++this.length;
        return this;
    }

    removeAt(index) {
        if (index < 0 || index >= this.length) {
            throw new Error("remove: out of bounds");
        }
        
        const prev = this.get(index - 1);
        if (prev) {
            prev.next = prev.next.next;
            if (index === this.length - 1) {
                this.tail = prev;
            }
        } else {
            this.head = this.head.next;
            if (this.length === 1) {
                this.tail = this.head;
            }
        }
        --this.length;
        return this;
    }

    fromArray(dataList) {
        dataList.forEach(data => {
            this.append(data);
        })
        return this;
    }

    toArray() {
        const dataList = [];
        for (let node = this.head; node; node = node.next) {
            dataList.push(node.value);
        }
        return dataList;
    }

    print() {
        const output = this.toArray().join(" -> ");
        console.log(output);
    }
}

class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}