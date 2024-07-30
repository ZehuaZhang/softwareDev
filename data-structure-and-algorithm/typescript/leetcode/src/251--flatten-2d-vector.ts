/*
251. Flatten 2D Vector

Design and implement an iterator to flatten a 2d vector. It should support the following operations: next and hasNext.



Example:

Vector2D iterator = new Vector2D([[1,2],[3],[4]]);

iterator.next(); // return 1
iterator.next(); // return 2
iterator.next(); // return 3
iterator.hasNext(); // return true
iterator.hasNext(); // return true
iterator.next(); // return 4
iterator.hasNext(); // return false


Notes:

Please remember to RESET your class variables declared in Vector2D, as static/class variables are persisted across multiple test cases. Please see here for more details.
You may assume that next() call will always be valid, that is, there will be at least a next element in the 2d vector when next() is called.


Follow up:

As an added challenge, try to code it using only iterators in C++ or iterators in Java.
*/

class Vector2D {
  i: number;
  j: number;
  arr: number[][];
  constructor(array: number[][]) {
    this.i = 0;
    this.j = 0;
    this.arr = array;
    this.adjust();
  }

  next(): number {
    const val = this.arr[this.i][this.j++];
    this.adjust();
    return val;
  }

  hasNext(): boolean {
    return this.i !== this.arr.length;
  }

  adjust(): void {
    for (
      ;
      this.i !== this.arr.length && this.j === this.arr[this.i].length;
      ++this.i, this.j = 0
    );
  }
}
