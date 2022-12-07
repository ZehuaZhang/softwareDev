/*
Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Implement KthLargest class:

KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
int add(int val) Returns the element representing the kth largest element in the stream.


Example 1:

Input
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output
[null, 4, 5, 5, 8, 8]

Explanation
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8


Constraints:

1 <= k <= 104
0 <= nums.length <= 104
-104 <= nums[i] <= 104
-104 <= val <= 104
At most 104 calls will be made to add.
It is guaranteed that there will be at least k elements in the array when you search for the kth element.
*/

class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.heap = new Heap((a, b) => a < b);
    for (const n of nums) {
      this.heap.push(n);
      if (this.heap.size > this.k) {
        this.heap.pop();
      }
    }
  }

  add(num) {
    this.heap.push(num);
    if (this.heap.size > this.k) {
      this.heap.pop();
    }
    return this.heap.top();
  }
}

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
    return Boolean(this.index[value] && this.index[value].size);
  }

  push(value) {
    this.store.push(value);
    const i = this.store.length - 1;
    if (!this.index[value]) this.index[value] = new Set([i]);
    else this.index[value].add(i);
    this.heapifyUp(i);
  }

  remove(value) {
    const i = this.index[value].values().next().value;
    this.index[value].delete(i);
    if (i === this.store.length - 1) return this.store.pop();
    this.store[i] = this.store.pop();
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
    const childs = [1, 2]
      .map(n => parent * 2 + n)
      .filter(n => n < this.store.length);
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
