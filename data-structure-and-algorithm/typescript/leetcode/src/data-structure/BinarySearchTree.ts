import {Data, Nullable} from '../util/object';
import {BinaryTree, TreeNode} from './BinaryTree';

export class BinarySearchTree extends BinaryTree {
  add(node: TreeNode): TreeNode {
    if (!this.root) {
      return (this.root = node);
    }

    let curr = this.root;
    while (curr) {
      if (node.data < curr.data) {
        if (curr.left) {
          curr = curr.left;
        } else {
          curr.left = node;
          break;
        }
      } else {
        if (curr.right) {
          curr = curr.right;
        } else {
          curr.right = node;
          break;
        }
      }
    }

    return node;
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
