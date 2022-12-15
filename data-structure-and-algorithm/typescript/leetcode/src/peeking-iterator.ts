/*
Design an iterator that supports the peek operation on a list in addition to the hasNext and the next operations.

Implement the PeekingIterator class:

PeekingIterator(int[] nums) Initializes the object with the given integer array nums.
int next() Returns the next element in the array and moves the pointer to the next element.
bool hasNext() Returns true if there are still elements in the array.
int peek() Returns the next element in the array without moving the pointer.


Example 1:

Input
["PeekingIterator", "next", "peek", "next", "next", "hasNext"]
[[[1, 2, 3]], [], [], [], [], []]
Output
[null, 1, 2, 2, 3, false]

Explanation
PeekingIterator peekingIterator = new PeekingIterator([1, 2, 3]); // [1,2,3]
peekingIterator.next();    // return 1, the pointer moves to the next element [1,2,3].
peekingIterator.peek();    // return 2, the pointer does not move [1,2,3].
peekingIterator.next();    // return 2, the pointer moves to the next element [1,2,3]
peekingIterator.next();    // return 3, the pointer moves to the next element [1,2,3]
peekingIterator.hasNext(); // return False


Constraints:

1 <= nums.length <= 1000
1 <= nums[i] <= 1000
All the calls to next and peek are valid.
At most 1000 calls will be made to next, hasNext, and peek.


Follow up: How would you extend your design to be generic and work with all types, not just integer?
*/

import {Nullable} from './util/object';

class PeekingIterator<T> {
  iterator: DataIterator<T>;
  data: Nullable<T>;
  hasPeeked: boolean;
  constructor(iterator: DataIterator<T>) {
    this.iterator = iterator;
    this.data = null;
    this.hasPeeked = false;
  }

  peek(): T {
    if (!this.hasPeeked) {
      this.data = this.iterator.next();
      this.hasPeeked = true;
    }
    return this.data!;
  }

  hasNext(): boolean {
    return this.hasPeeked || this.iterator.hasNext();
  }

  next(): T {
    if (this.hasPeeked) {
      this.hasPeeked = false;
      return this.data!;
    }

    return this.iterator.next();
  }
}

interface DataIterator<T> {
  hasNext: () => boolean;
  next: () => T;
}
