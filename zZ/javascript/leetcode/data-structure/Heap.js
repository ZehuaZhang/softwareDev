class Heap{
    constructor(capacity, compare) {
        this.dataList = [];
        this.compare = compare;
        this.indexMap = {}
        this.capacity = capacity;
    }
      
    count() {
        return this.dataList.length;
    }

    isEmpty() {
        return this.count() === 0;
    }

    isFull() {
        return this.count() === this.capacity;
    }

    swap(index1, index2) {
        const temp = this.dataList[index1];
        this.dataList[index1] = this.dataList[index2];
        this.dataList[index2] = temp;
        this.updateIndexMap(index1, this.dataList[index1]);
        this.updateIndexMap(index2, this.dataList[index2]);
        return this;
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

    push(data) {
        if (this.isFull()) {
            throw new Error("insert: heap overflow");
        }
        this.dataList.push(data);
        let index = this.count() - 1;
        this.updateIndexMap(index, data);
        while (index !== 0 && this.shouldSwap(index, parent(index))) {
            this.swap(index, parent(index));
            index = parent(index);
        }
        return this;
    }
      
    peek() {
        if (this.isEmpty()) {
            throw new Error("peek: heap underflow");
        }
        return this.dataList[0];
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("pop: heap underflow");
        }

        this.removeFromIndexMap[this.dataList[0]];
        if (this.count() === 1) {
            return this.dataList.pop();
        } 
        const data = this.dataList[0];
        this.dataList[0] = this.dataList.pop();
        this.updateIndexMap(0, this.dataList[0]);
        this.heapify(0);
        return data;
    }

    change(data) {
        let index = this.getIndexFromIndexMap(data);
        while (index !== 0) {
            this.swap(index, parent(index));
            index = parent(index);
        }
        this.dataList[0] = data;
        this.updateIndexMap(0, this.dataList[0]);
        this.heapify(0);
        return this;
    }
      
    heapify(index) {
        const leftIndex = this.left(index);
        const rightIndex = this.right(index);
        let swapIndex = index;

        if (leftIndex < this.count() && this.shouldSwap(leftIndex, swapIndex)) {
            swapIndex = leftIndex;
        }

        if (rightIndex < this.count() && this.shouldSwap(rightIndex, swapIndex)) {
            swapIndex = rightIndex;
        }
                  
        if (swapIndex !== index) {
            this.swap(index, swapIndex);
            this.heapify(swapIndex);
        }
    }

    shouldSwap(index1, index2) {
        return this.compare(this.dataList[index1], this.dataList[index2]) < 0;
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