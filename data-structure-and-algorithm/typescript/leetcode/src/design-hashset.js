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

class MyHashSet {
    constructor() {
        this.chunkSize = 1;
        this.loadFactor = 0.7;
        this.size = 0;
        this.nodes = Array(this.chunkSize).fill(null);
    }

    hash(key) {
        return key % this.nodes.length;
    }

    add(key) {
        const h = this.hash(key);
        const node = new BinarySearchTreeNode(key);
        if (!this.nodes[h]) {
            this.nodes[h] = node;
        } else {
            this.nodes[h].add(node);
        }
        ++this.size;
        if (this.size > this.loadFactor * this.nodes.length) {
            this.rehash();
        }
    }

    remove(key) {
        const h = this.hash(key);
        if (this.nodes[h]) {
            this.nodes[h] = this.nodes[h].remove(key);
            --this.size;
        }
    }

    contains(key) {
        return this.has(key);
    }

    has(key) {
        const h = this.hash(key);
        if (this.nodes[h]) {
            return this.nodes[h].has(key);
        }
        return false;
    }

    rehash() {
        const prev = this.nodes;
        this.nodes = Array(this.nodes.length * 2);
        for (const root of prev) {
            if (root) {
                for (const node of root.toArray()) {
                    this.add(node.data);
                }
            }
        }
    }
}

class BinarySearchTreeNode {
    constructor(data) {
        this.data = data;
        this.right = null;
        this.left = null;
    }

    add(node) {
        if (node.data > this.data) {
            if (this.right === null) {
                this.right = node;
            } else {
                this.right.add(node);
            }
        } else if (node.data < this.data) {
            if (this.left === null) {
                this.left = node;
            } else {
                this.left.add(node);
            }
        }
    }

    toArray() {
        const array = [];
        dfs(this, array);
        return array;

        function dfs(node, array) {
            if (node === null) {
                return;
            } 
            array.push(node);
            dfs(node.left);
            dfs(node.right);
        }
    }

    has(data) {
        if (this.data === data) {
            return true;
        } 
        if (this.data > data) {
            return this.left ? this.left.has(data) : false;
        } 
        return this.right ? this.right.has(data) : false;
    }

    remove(data) {
        if (this.data === data) {
            if (!this.right && !this.left) {
                return null;
            }
            if (!this.right || !this.left) {
                return this.left ? this.left : this.right;
            }
            this.data = this.left.max().data;
            this.left.remove(this.data);
        } else if (this.data > data) {
            this.left = this.left ? this.left.remove(data) : null;
        } else {
            this.right = this.right ? this.right.remove(data) : null;
        }
        return this;
    }

    max() {
        let curr = this;
        for (; curr.right; curr = curr.right);
        return curr; 
    }
}