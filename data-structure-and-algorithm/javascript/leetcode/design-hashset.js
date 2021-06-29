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

    contains(data) {
        if (this.data === data) {
            return true;
        } else if (this.data > data) {
            return this.left ? this.left.contains(data) : false;
        } else {
            return this.right ? this.right.contains(data) : false;
        }
    }

    remove(data) {
        if (this.data === data) {
            
        }
    }
}

class Queue {

}