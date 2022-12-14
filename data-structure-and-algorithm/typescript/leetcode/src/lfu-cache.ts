/*
Design and implement a data structure for a Least Frequently Used (LFU) cache.

Implement the LFUCache class:

LFUCache(int capacity) Initializes the object with the capacity of the data structure.
int get(int key) Gets the value of the key if the key exists in the cache. Otherwise, returns -1.
void put(int key, int value) Update the value of the key if present, or inserts the key if not already present. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item. For this problem, when there is a tie (i.e., two or more keys with the same frequency), the least recently used key would be invalidated.
To determine the least frequently used key, a use counter is maintained for each key in the cache. The key with the smallest use counter is the least frequently used key.

When a key is first inserted into the cache, its use counter is set to 1 (due to the put operation). The use counter for a key in the cache is incremented either a get or put operation is called on it.

The functions get and put must each run in O(1) average time complexity.



Example 1:

Input
["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]

Explanation
// cnt(x) = the use counter for key x
// cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
LFUCache lfu = new LFUCache(2);
lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
lfu.get(1);      // return 1
                 // cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
                 // cache=[3,1], cnt(3)=1, cnt(1)=2
lfu.get(2);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
                 // cache=[4,3], cnt(4)=1, cnt(3)=2
lfu.get(1);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,4], cnt(4)=1, cnt(3)=3
lfu.get(4);      // return 4
                 // cache=[3,4], cnt(4)=2, cnt(3)=3


Constraints:

0 <= capacity <= 104
0 <= key <= 105
0 <= value <= 109
At most 2 * 105 calls will be made to get and put.
*/

import {
  DoublyLinkedList,
  DoubleListNode,
} from './data-structure/DoublyLinkedList';
import {Heap} from './data-structure/Heap';

class LfuNodeData {
  key: number;
  data: number;
  freq: number;
  constructor(key: number, data: number, freq = 0) {
    this.key = key;
    this.data = data;
    this.freq = freq;
  }
}

class LfuCache {
  capacity: number;
  size: number;
  freqHeap: Heap<number>;
  keyNodeMap: Map<number, DoubleListNode<LfuNodeData>>;
  freqNodeListMap: Map<number, DoublyLinkedList<LfuNodeData>>;
  constructor(capacity = Infinity) {
    this.capacity = capacity;
    if (this.capacity <= 0) {
      throw 'capacity should be positive';
    }
    this.size = 0;
    this.freqHeap = new Heap<number>((a, b) => a - b);
    this.keyNodeMap = new Map<number, DoubleListNode<LfuNodeData>>();
    this.freqNodeListMap = new Map<number, DoublyLinkedList<LfuNodeData>>();
  }

  get(key: number): number {
    if (!this.keyNodeMap.has(key)) {
      return -1;
    }
    const node = this.keyNodeMap.get(key)!;
    this.update(node);
    return node.data.data;
  }

  put(key: number, data: number): void {
    if (this.keyNodeMap.has(key)) {
      const node = this.keyNodeMap.get(key)!;
      node.data.data = data;
      this.update(node);
    } else {
      if (this.size === this.capacity) {
        const minFreq = this.freqHeap.peek();
        const node = this.freqNodeListMap.get(minFreq)!.tail!;
        this.remove(node);
      }
      const node = new DoubleListNode<LfuNodeData>(new LfuNodeData(key, data));
      this.update(node);
    }
  }

  update(node: DoubleListNode<LfuNodeData>): void {
    this.remove(node);
    ++node.data.freq;
    const {key, freq} = node.data;
    this.freqHeap.push(freq);
    if (!this.freqNodeListMap.has(freq)) {
      this.freqNodeListMap.set(freq, new DoublyLinkedList());
    }
    this.freqNodeListMap.get(freq)!.prependNode(node);
    this.keyNodeMap.set(key, node);
    ++this.size;
  }

  remove(node: DoubleListNode<LfuNodeData>) {
    const {key, freq} = node.data;
    if (this.keyNodeMap.has(key)) {
      this.keyNodeMap.delete(key);
      const list = this.freqNodeListMap.get(freq)!;
      list.remove(node);
      if (list.length === 0) {
        this.freqNodeListMap.delete(freq);
      }
      this.freqHeap.remove(freq);
      --this.size;
    }
  }
}

// test

const lfu = new LfuCache(2);

console.log(lfu.put(1, 1));
// return undefined
// cache=[1,_], cnt(1)=1

console.log(lfu.put(2, 2));
// return undefined
// cache=[2,1], cnt(2)=1, cnt(1)=1

console.log(lfu.get(1));
// return 1
// cache=[1,2], cnt(2)=1, cnt(1)=2

console.log(lfu.put(3, 3));
// return undefined
// 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
// cache=[3,1], cnt(3)=1, cnt(1)=2
console.log(lfu.get(2));
// return -1 (not found)

console.log(lfu.get(3));
// return 3
// cache=[3,1], cnt(3)=2, cnt(1)=2

console.log(lfu.put(4, 4));
// return undefined
// Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
// cache=[4,3], cnt(4)=1, cnt(3)=2

console.log(lfu.get(1));
// return -1 (not found)

console.log(lfu.get(3));
// return 3
// cache=[3,4], cnt(4)=1, cnt(3)=3

console.log(lfu.get(4));
// return 4
// cache=[3,4], cnt(4)=2, cnt(3)=3
