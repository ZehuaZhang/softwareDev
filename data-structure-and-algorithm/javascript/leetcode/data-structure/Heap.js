class Heap {
    constructor(capacity, compare) {
        this.dataList = [];
        this.compare = compare;
        this.indexMap = {}
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

    push(data) {
        if (this.isFull()) {
            throw new Error("insert: heap overflow");
        }
        this.dataList.push(data);
        let index = this.size - 1;
        this.updateIndexMap(index, data);
        while (index !== 0 && this.shouldSwap(index, this.parent(index))) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
        return this;
    }
      
    top() {
        if (this.isEmpty()) {
            throw new Error("top: heap underflow");
        }
        return this.dataList[0];
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("pop: heap underflow");
        }

        this.removeFromIndexMap[this.dataList[0]];
        if (this.size === 1) {
            return this.dataList.pop();
        } 
        const data = this.dataList[0];
        this.dataList[0] = this.dataList.pop();
        this.updateIndexMap(0, this.dataList[0]);
        this.heapify(0);
        return data;
    }

    change(prev, curr) {
        let index = this.getIndexFromIndexMap(prev);
        while (index !== 0) {
            this.swap(index, parent(index));
            index = parent(index);
        }
        this.dataList[0] = curr;
        this.updateIndexMap(0, this.dataList[0]);
        this.heapify(0);
        return this;
    }

    has(data) {
        return this.indexMap.hasOwnProperty(this.uid(data))
    }

    fromArray(...dataList) {
        if (dataList.length > this.capacity) {
            throw new Error("fromArray: heap overflow");
        }
        this.dataList = [...dataList];
        this.dataList.forEach((data, index) => {
            this.updateIndexMap(index, data);
        });
        for (let i = Math.trunc(dataList.length / 2) - 1; i >= 0; --i) {
            this.heapify(i);
        }
        return this;
    }

    swap(index1, index2) {
        const temp = this.dataList[index1];
        this.dataList[index1] = this.dataList[index2];
        this.dataList[index2] = temp;
        this.updateIndexMap(index1, this.dataList[index1]);
        this.updateIndexMap(index2, this.dataList[index2]);
        return this;
    }

    shouldSwap(index1, index2) {
        return this.compare(this.dataList[index1], this.dataList[index2]) < 0;
    }
    
    parent(index) {
        return Math.trunc((index - 1) / 2);
    }

    left(index) {
        return index * 2 + 1;
    }

    right(index) {
        return index * 2 + 2;
    }
      
    heapify(index) {
        const leftIndex = this.left(index);
        const rightIndex = this.right(index);
        let swapIndex = index;

        if (leftIndex < this.size && this.shouldSwap(leftIndex, swapIndex)) {
            swapIndex = leftIndex;
        }

        if (rightIndex < this.size && this.shouldSwap(rightIndex, swapIndex)) {
            swapIndex = rightIndex;
        }
                  
        if (swapIndex !== index) {
            this.swap(index, swapIndex);
            this.heapify(swapIndex);
        }
    }   

    uid(data) {
        return JSON.stringify(data, null, 2)
    }

    updateIndexMap(index, data) {
        const uid = this.uid(data);
        this.indexMap[uid] = index;
        return this;
    }

    removeFromIndexMap(data) {
        const uid = this.uid(data);
        delete this.indexMap[uid];
        return this;
    }

    getIndexFromIndexMap(data) {
        const uid = this.uid(data);
        const index = this.indexMap[uid];
        return index;
    }
}