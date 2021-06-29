/*
Given an m x n integer matrix heightMap representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.

 

Example 1:


Input: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
Output: 4
Explanation: After the rain, water is trapped between the blocks.
We have two small pounds 1 and 3 units trapped.
The total volume of water trapped is 4.
Example 2:


Input: heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]
Output: 10
 

Constraints:

m == heightMap.length
n == heightMap[i].length
1 <= m, n <= 200
0 <= heightMap[i][j] <= 2 * 104
*/

function trapRainWater(height) {
    if (height.length === 0) {
        return 0;
    }
    const q = new Heap(Infinity, (a, b) => a[2] - b[2]);
    const visited = Array(height.length).fill(0).map(() => Array(height[0].length).fill(false));

    for (let i = 0; i < height.length; ++i) {
        for (const [left, right] of [[i, 0], [i, height[0].length - 1]]) {
            q.push([left, right, height[left][right]]);
            visited[left][right] = true;
        }
    }

    for (let j = 1; j < height[0].length - 1; ++j) {
        for (const [left, right] of [[0, j], [height.length - 1, j]]) {
            q.push([left, right, height[left][right]]);
            visited[left][right] = true;
        }
    }

    let result = 0;
    while(!q.isEmpty()) {
        const [x, y, h] = q.pop();
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < height.length && ny >= 0 && ny < height[0].length && !visited[nx][ny]) {
                result += Math.max(0, h - height[nx][ny]);
                q.push([nx, ny, Math.max(height[nx][ny], h)]);
                visited[nx][ny] = true;
            }
        }
    }
    return result;
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