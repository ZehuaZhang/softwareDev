/*
You are given the array nums consisting of n positive integers. You computed the sum of all non-empty continuous subarrays from the array and then sorted them in non-decreasing order, creating a new array of n * (n + 1) / 2 numbers.

Return the sum of the numbers from index left to index right (indexed from 1), inclusive, in the new array. Since the answer can be a huge number return it modulo 109 + 7.

 

Example 1:

Input: nums = [1,2,3,4], n = 4, left = 1, right = 5
Output: 13 
Explanation: All subarray sums are 1, 3, 6, 10, 2, 5, 9, 3, 7, 4. After sorting them in non-decreasing order we have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 1 to ri = 5 is 1 + 2 + 3 + 3 + 4 = 13. 
Example 2:

Input: nums = [1,2,3,4], n = 4, left = 3, right = 4
Output: 6
Explanation: The given array is the same as example 1. We have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 3 to ri = 4 is 3 + 3 = 6.
Example 3:

Input: nums = [1,2,3,4], n = 4, left = 1, right = 10
Output: 50
 

Constraints:

n == nums.length
1 <= nums.length <= 1000
1 <= nums[i] <= 100
1 <= left <= right <= n * (n + 1) / 2
*/

function rangeSum(nums, n, left, right) {
    const mod = Math.pow(10, 9) + 7;
    const q = new Heap(([s1], [s2]) => s1 < s2)
    for (let i = 0; i < nums.length; ++i) {
        q.push([nums[i], i + 1])
    }
    let result = 0
    for (let i = 1; i <= right; ++i) {
        let [sum, index] = q.pop();
        if (i >= left) {
            result = (result + sum) % mod;
        }
        if (index < n) {
            sum += nums[index++];
            q.push([sum, index]);
        }
    }
    return result;
};

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