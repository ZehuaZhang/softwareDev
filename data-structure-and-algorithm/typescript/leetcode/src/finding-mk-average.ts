class MKAverage {
  constructor(m, k) {
    this.m = m;
    this.k = k;
    this.sum = 0;
    this.left = new Heap((a, b) => a > b);
    this.mid = new Heap((a, b) => a < b);
    this.right = new Heap((a, b) => a < b);
    this.q = [];
  }

  addElement(num) {
    // add new num
    if (this.q.length < this.m) {
      this.mid.push(num);
    }
    this.q.push(num);
    if (this.q.length === this.m) {
      for (let i = 0; i < this.k; ++i) {
        this.left.push(this.mid.pop());
      }
      for (let i = 0; i < this.k; ++i) {
        this.right.push(this.mid.popMax());
      }
      this.sum += this.mid.sum;
    } else if (this.q.length > this.m) {
      if (num < this.left.top()) {
        this.left.push(num);
        const value = this.left.pop();
        this.mid.push(value);
        this.sum += value;
      } else if (num > this.right.top()) {
        this.right.push(num);
        const value = this.right.pop();
        this.mid.push(value);
        this.sum += value;
      } else {
        this.mid.push(num);
        this.sum += num;
      }

      // remove old num
      const value = this.q.shift();
      if (this.mid.has(value)) {
        this.mid.remove(value);
        this.sum -= value;
      } else if (this.right.has(value)) {
        this.right.remove(value);
      } else {
        this.left.remove(value);
      }

      // balance three heaps
      if (this.left.size < this.k) {
        const value = this.mid.pop();
        this.left.push(value);
        this.sum -= value;
      } else if (this.right.size < this.k) {
        const value = this.mid.popMax();
        this.right.push(value);
        this.sum -= value;
      }
    }
  }

  calculateMKAverage() {
    return this.q.length === this.m
      ? Math.trunc(this.sum / (this.m - 2 * this.k))
      : -1;
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
