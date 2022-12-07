/**
Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.

Implement the AllOne class:

AllOne() Initializes the object of the data structure.
inc(String key) Increments the count of the string key by 1. If key does not exist in the data structure, insert it with count 1.
dec(String key) Decrements the count of the string key by 1. If the count of key is 0 after the decrement, remove it from the data structure. It is guaranteed that key exists in the data structure before the decrement.
getMaxKey() Returns one of the keys with the maximal count. If no element exists, return an empty string "".
getMinKey() Returns one of the keys with the minimum count. If no element exists, return an empty string "".


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

class AllOne {
  constructor() {
    this.head = new Bucket(-Infinity);
    this.tail = new Bucket(Infinity);
    this.head.next = this.tail;
    this.head.prev = this.head;
    this.keyBucket = new Map();
  }

  inc(key) {
    if (!this.keyBucket.has(key)) {
      const bucket = new Bucket(0, key);
      this.insert(bucket, this.head);
      this.keyBucket.set(key, bucket);
    }

    const curr = this.keyBucket.get(key);
    let next = curr.next;
    if (next === null || next.value > curr.value + 1) {
      next = new Bucket(curr.value + 1);
      this.insert(curr, next);
    }
    next.keys.add(key);
    this.keyBucket.set(key, next);

    this.remove(key, curr);
  }

  dec(key) {
    if (!this.keyBucket.has(key)) {
      return;
    }

    const curr = this.keyBucket.get(key);
    let prev = curr.prev;
    if (curr.value > 1) {
      if (prev === null || prev.value < curr.value - 1) {
        prev = new Bucket(curr.value - 1);
        this.insert(curr.prev, prev);
      }
      prev.keys.add(key);
      this.keyBucket.set(key, prev);
    }

    this.remove(key, curr);
  }

  getMaxKey() {
    return this.tail.prev === this.head
      ? ''
      : this.tail.keys[Symbol.iterator]().next().value;
  }

  getMinKey() {
    return this.head.next === this.tail
      ? ''
      : this.head.keys[Symbol.iterator]().next().value;
  }

  insert(prev, curr) {
    curr.next = prev.next;
    curr.prev = prev;
    prev.next.prev = curr;
    prev.next = curr;
  }

  remove(key, curr) {
    curr.keys.delete(key);
    if (curr.keys.size === 0) {
      curr.prev.next = curr.next;
      curr.next.prev = curr.prev;
    }
  }
}

class Bucket {
  constructor(value, ...keyList) {
    this.value = value;
    this.keys = new Set([...keyList]);
    this.prev = null;
    this.next = null;
  }
}
