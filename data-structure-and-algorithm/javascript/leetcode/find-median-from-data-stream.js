/*
The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values.

For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.
 

Example 1:

Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
 

Constraints:

-105 <= num <= 105
There will be at least one element in the data structure before calling findMedian.
At most 5 * 104 calls will be made to addNum and findMedian.
 

Follow up:

If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
*/

class MedianFinder {
    constructor() {
        this.minHeap = new Heap(Infinity, (a, b) => a - b);;
        this.maxHeap = new Heap(Infinity, (a, b) => b - a);
    }

    addNum(num) {
        if (this.minHeap.isEmpty() || num > this.minHeap.top()) {
            this.minHeap.push(num);
            if (this.minHeap.size > this.maxHeap.size + 1) {
                this.maxHeap.push(this.minHeap.pop());
            }
        } else {
            this.maxHeap.push(num);
            if (this.maxHeap.size > this.minHeap.size) {
                this.minHeap.push(this.maxHeap.pop());
            }
        }
    }

    findMedian() {
        return this.minHeap.size === this.maxHeap.size ? 
            (this.maxHeap.top() + this.minHeap.top()) / 2 : this.minHeap.top();
    }
}

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