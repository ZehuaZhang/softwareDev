/*
Design a HashMap without using any built-in hash table libraries.

Implement the MyHashMap class:

MyHashMap() initializes the object with an empty map.
void put(int key, int value) inserts a (key, value) pair into the HashMap. If the key already exists in the map, update the corresponding value.
int get(int key) returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
void remove(key) removes the key and its corresponding value if the map contains the mapping for the key.


Example 1:

Input
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
Output
[null, null, null, 1, -1, null, 1, null, -1]

Explanation
MyHashMap myHashMap = new MyHashMap();
myHashMap.put(1, 1); // The map is now [[1,1]]
myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]


Constraints:

0 <= key, value <= 106
At most 104 calls will be made to put, get, and remove.
*/

import {Nullable} from './util/object';

class MyHashMap {
  chunkSize: number;
  nodeList: MyHashMapNode[];
  constructor(chunkSize = 10000) {
    this.chunkSize = chunkSize;
    this.nodeList = Array(this.chunkSize).fill(new MyHashMapNode(NaN, NaN));
  }

  put(key: number, value: number): void {
    const prev = this.find(key);
    if (prev.next) {
      prev.next.value = value;
    } else {
      prev.next = new MyHashMapNode(key, value);
    }
  }

  get(key: number): number {
    const prev = this.find(key);
    return prev.next ? prev.next.value : -1;
  }

  remove(key: number): void {
    const prev = this.find(key);
    if (prev.next) {
      prev.next = prev.next.next;
    }
  }

  find(key: number): MyHashMapNode {
    const index = key % this.nodeList.length;
    const head = this.nodeList[index];
    let prev: Nullable<MyHashMapNode> = null;
    for (
      let curr: Nullable<MyHashMapNode> = head;
      curr && curr.key !== key;
      curr = curr.next
    ) {
      prev = curr;
    }
    return prev!;
  }
}

class MyHashMapNode {
  key: number;
  value: number;
  next: Nullable<MyHashMapNode>;
  constructor(
    key: number,
    value: number,
    next: Nullable<MyHashMapNode> = null
  ) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}
