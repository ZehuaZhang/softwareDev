/*
Design a HashSet without using any built-in hash table libraries.

Implement MyHashSet class:

void add(key) Inserts the value key into the HashSet.
bool contains(key) Returns whether the value key exists in the HashSet or not.
void remove(key) Removes the value key in the HashSet. If key does not exist in the HashSet, do nothing.


Example 1:

Input
["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
[[], [1], [2], [1], [3], [2], [2], [2], [2]]
Output
[null, null, null, true, false, null, true, null, false]

Explanation
MyHashSet myHashSet = new MyHashSet();
myHashSet.add(1);      // set = [1]
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(1); // return True
myHashSet.contains(3); // return False, (not found)
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(2); // return True
myHashSet.remove(2);   // set = [1]
myHashSet.contains(2); // return False, (already removed)


Constraints:

0 <= key <= 106
At most 104 calls will be made to add, remove, and contains.
*/

import {BinarySearchTree} from './data-structure/BinarySearchTree';
import {TreeNode} from './data-structure/BinaryTree';

class MyHashSet {
  chunkSize: number;
  loadFactor: number;
  count: number;
  nodeList: BinarySearchTree[];
  constructor(chunkSize = 1, loadFactor = 0.7) {
    this.chunkSize = chunkSize;
    this.loadFactor = loadFactor;
    this.count = 0;
    this.nodeList = Array(this.chunkSize).fill(new BinarySearchTree());
  }

  hash(key: number): number {
    return key % this.nodeList.length;
  }

  add(key: number): void {
    const hash = this.hash(key);
    const node = new TreeNode(key);
    this.nodeList[hash].add(node);
    ++this.count;
    if (this.count > this.loadFactor * this.nodeList.length) {
      this.rehash();
    }
  }

  remove(key: number): void {
    const hash = this.hash(key);
    if (this.nodeList[hash]) {
      this.nodeList[hash].remove(key);
      --this.count;
    }
  }

  contains(key: number): boolean {
    const hash = this.hash(key);
    return this.nodeList[hash].has(key);
  }

  rehash() {
    const prevList = this.nodeList;
    this.nodeList = Array(this.nodeList.length * 2).fill(
      new BinarySearchTree()
    );
    for (const tree of prevList) {
      for (const node of tree.toArrayPreOrder()) {
        this.add(node.data);
      }
    }
  }
}
