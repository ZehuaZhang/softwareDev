class Heap {
    constructor(compare) {
        this.store = [];
        this.compare = compare;
        this.index = {};
    }
    
    top() {
        return this.store[0];
    }
    
    get size() {
        return this.store.length;
    }
    
    isEmpty() {
        return this.size === 0;
    }

    has(value) {
        return Boolean(this.index[value] && this.index[value].size)
    }
    
    push(value) {
        this.store.push(value);
        const i = this.store.length - 1;
        if (!this.index[value]) this.index[value] = new Set([i]);
        else this.index[value].add(i)
        this.heapifyUp(i);
    }
    
    remove(value) {
        const i = this.index[value].values().next().value;
        this.index[value].delete(i);
        if (i === this.store.length - 1) return this.store.pop();
        this.store[i] = this.store.pop()
        this.index[this.store[i]].delete(this.store.length);
        this.index[this.store[i]].add(i);
        this.heapifyDown(this.heapifyUp(i));
    }

    popMax() {
        const max = Math.max(...this.store);
        this.remove(max);
        return max;
    }

    get sum() {
        return this.store.reduce((p, c) => p + c, 0);
    }
    
    pop() {
        const value = this.store[0];
        this.index[value].delete(0);
        if (this.store.length < 2) return this.store.pop();
        this.store[0] = this.store.pop();
        this.index[this.store[0]].delete(this.store.length);
        this.index[this.store[0]].add(0);
        this.heapifyDown(0);
        return value;
    }
    
    heapifyDown(parent) {
        const childs = [1,2].map((n) => parent * 2 + n).filter((n) => n < this.store.length);
        let child = childs[0];
        if (childs[1] && this.compare(this.store[childs[1]], this.store[child])) {
            child = childs[1];
        }
        if (child && this.compare(this.store[child], this.store[parent])) {
            const childVal = this.store[child];
            const parentVal = this.store[parent];
            this.store[child] = parentVal;
            this.store[parent] = childVal;
            this.index[childVal].delete(child);
            this.index[childVal].add(parent);
            this.index[parentVal].delete(parent);
            this.index[parentVal].add(child);
            return this.heapifyDown(child);
        }
        return parent;
    }
    
    heapifyUp(child) {
        const parent = Math.floor((child - 1) / 2);
        if (child && this.compare(this.store[child], this.store[parent])) {
            const childVal = this.store[child];
            const parentVal = this.store[parent];
            this.store[child] = parentVal;
            this.store[parent] = childVal;
            this.index[childVal].delete(child);
            this.index[childVal].add(parent);
            this.index[parentVal].delete(parent);
            this.index[parentVal].add(child);
            return this.heapifyUp(parent);
        }
        return child;
    }
}