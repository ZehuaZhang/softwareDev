export class Stack {
    private dataList: any[];
    private capacity: number;

    constructor(capacity = Number.MAX_SAFE_INTEGER) {
        this.dataList = [];
        this.capacity = capacity;
    }

    get size() {
        return this.dataList.length;
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.capacity;
    }

    push(data: any) {
        if (this.isFull()) {
            throw new Error("push: stack overflow");
        }
        this.dataList.push(data);
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("pop: stack underflow");
        }
        return this.dataList.pop();
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("peek: stack underflow");
        }
        return this.dataList[this.size - 1];
    }

    clear() {
        this.dataList = [];
    }

    fromArray(list: any[]) {
        list.forEach(element => {
            this.push(element);
        });
        return this;
    }

    toArray() {
        return [...this.dataList];
    }

    print() {
        const output = this.dataList.join(" -> ");
        console.log(output);
        return this;
    }
}