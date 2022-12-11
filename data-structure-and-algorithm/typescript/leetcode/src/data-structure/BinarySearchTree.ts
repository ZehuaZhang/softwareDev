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

  get(data: Data): Nullable<TreeNode> {
    let node = this.root;
    while (node) {
      if (node.data === data) {
        return node;
      }

      node = node.data < data ? node.right : node.left;
    }

    return null;
  }

  has(data: Data) {
    return Boolean(this.get(data));
  }

  remove(data: Data): Nullable<TreeNode> {
    const removeDFS = (node: Nullable<TreeNode>): Nullable<TreeNode> => {
      if (node === null) {
        return null;
      }

      if (node.data > data) {
        node.left = removeDFS(node.left);
      } else if (node.data < data) {
        node.right = removeDFS(node.right);
      } else {
        if (!node.right || !node.left) {
          node = node.left ? node.left : node.right;
        } else {
          node.data = this.max(node.left)!.data;
          node.left = removeDFS(node.left);
        }
      }
      return node;
    };

    return removeDFS(this.root);
  }

  min(node = this.root): Nullable<TreeNode> {
    for (; node && node.left; node = node.left);
    return node;
  }

  max(node = this.root): Nullable<TreeNode> {
    for (; node && node.right; node = node.right);
    return node;
  }
}
