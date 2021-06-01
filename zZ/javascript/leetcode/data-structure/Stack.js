class Stack {
    constructor(size = Number.MAX_SAFE_INTEGER) {
        this.dataList = [];
        this.size = size;
    }

    count() {
        return this.dataList.length;
    }

    isEmpty() {
        return this.count() === 0;
    }

    isFull() {
        return this.count() === this.size;
    }

    push(data) {
        if (this.isFull()) {
            throw new Error("push: stack overflow");
        }
        this.dataList.push(data);
        return this;
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
        return this.dataList[this.count() - 1];
    }

    clear() {
        this.container = [];
    }

    fromArray(dataList) {
        dataList.forEach(data => {
            this.push(data);
        });
        return this;
    }

    toArray() {
        return [...this.container];
    }    

    print() {
        const output = this.container.join(" -> ");
        console.log(output);
        return this;
    }
}