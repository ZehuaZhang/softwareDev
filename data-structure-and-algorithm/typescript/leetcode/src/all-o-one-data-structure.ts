/**
Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.

Implement the AllOne class:

AllOne() Initializes the object of the data structure.
inc(String key) Increments the count of the string key by 1. If key does not exist in the data structure, insert it with count 1.
dec(String key) Decrements the count of the string key by 1. If the count of key is 0 after the decrement, remove it from the data structure. It is guaranteed that key exists in the data structure before the decrement.
getMaxKey() Returns one of the keySet with the maximal count. If no element exists, return an empty string "".
getMinKey() Returns one of the keySet with the minimum count. If no element exists, return an empty string "".


Example 1:

Input
["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
[[], ["hello"], ["hello"], [], [], ["leet"], [], []]
Output
[null, null, null, "hello", "hello", null, "hello", "leet"]

Explanation
AllOne allOne = new AllOne();
allOne.inc("hello");
allOne.inc("hello");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "hello"
allOne.inc("leet");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "leet"


Constraints:

1 <= key.length <= 10
key consists of lowercase English letters.
It is guaranteed that for each call to dec, key is existing in the data structure.
At most 5 * 104 calls will be made to inc, dec, getMaxKey, and getMinKey.
*/

import {Data} from './util/object';
import {
  DoublyLinkedList,
  DoublyLinkedListNode,
} from './data-structure/DoublyLinkedList';
import {timingSafeEqual} from 'crypto';

class AllOne {
  bucketList: DoublyLinkedList;
  keyBucketMap: Map<string, DoublyLinkedListNode>;
  constructor() {
    this.bucketList = new DoublyLinkedList();
    this.keyBucketMap = new Map<string, DoublyLinkedListNode>();
  }

  inc(key: string): void {
    console.log('\ninc');
    if (!this.keyBucketMap.has(key)) {
      const bucket = new Bucket(0, key);
      const node = this.bucketList.prepend(bucket)!;
      this.keyBucketMap.set(key, node);
    }

    const curr = this.keyBucketMap.get(key)!;
    let next = curr.next;
    if (next === null || next.data.data > curr.data.data + 1) {
      const bucket = new Bucket(curr.data.data + 1);
      next = this.bucketList.insert(curr, bucket)!;
    }

    next.data.keySet.add(key);
    this.keyBucketMap.set(key, next);

    console.log('insert');
    this.bucketList.printLog();

    this.remove(key, curr);

    console.log('remove');
    this.bucketList.printLog();
  }

  dec(key: string): void {
    console.log('\ndec');
    if (!this.keyBucketMap.has(key)) {
      return;
    }

    const curr = this.keyBucketMap.get(key)!;
    let prev = curr.prev;
    if (curr.data.data > 1) {
      if (prev === null || prev.data.data < curr.data.data - 1) {
        const bucket = new Bucket(curr.data.data - 1);
        prev = this.bucketList.insert(prev, bucket)!;
      }

      prev.data.keySet.add(key);
      this.keyBucketMap.set(key, prev);

      console.log('insert');
      this.bucketList.printLog();
    } else {
      this.keyBucketMap.delete(key);
    }

    this.remove(key, curr);

    console.log('remove');
    this.bucketList.printLog();
  }

  getMaxKey() {
    return this.bucketList.length
      ? this.bucketList.tail!.data.keySet[Symbol.iterator]().next().value
      : '';
  }

  getMinKey() {
    return this.bucketList.length
      ? this.bucketList.head!.data.keySet[Symbol.iterator]().next().value
      : '';
  }

  remove(key: string, node: DoublyLinkedListNode) {
    node.data.keySet.delete(key);
    if (node.data.keySet.size === 0) {
      this.bucketList.remove(node);
    }
  }
}

class Bucket {
  data: Data;
  keySet: Set<string>;
  constructor(data: Data, ...keyList: string[]) {
    this.data = data;
    this.keySet = new Set([...keyList]);
  }
}

const allOne = new AllOne();
allOne.inc('a');
allOne.inc('a');
allOne.inc('a');
allOne.inc('b');
allOne.dec('b');
allOne.inc('b');
allOne.dec('b');
console.log(allOne.getMaxKey());
console.log(allOne.getMinKey());
