import {Nullable} from '../util/object';
import {Queue} from './Queue';

export class BinaryTree<T> {
  root: Nullable<TreeNode<T>> = null;
  constructor(...dataList: T[]) {
    this.root = this.fromArray(dataList);
  }

  fromArray(dataList: Nullable<T>[]): Nullable<TreeNode<T>> {
    if (dataList.length === 0 || dataList[0] === null) {
      return null;
    }
    const root = new TreeNode(dataList[0]);
    const queue = new Queue<TreeNode<T>>();
    queue.push(root);
    for (let i = 1; i < dataList.length; ) {
      const node = queue.pop();
      let data = dataList[i++];
      if (data !== null) {
        node.left = new TreeNode(data);
        queue.push(node.left);
      }
      data = i < dataList.length ? dataList[i++] : null;
      if (data !== null) {
        node.right = new TreeNode(data);
        queue.push(node.right);
      }
    }
    return root;
  }

  toArray(): Nullable<T>[] {
    const dataList = [];
    const queue = new Queue<Nullable<TreeNode<T>>>();
    if (this.root) {
      queue.push(this.root);
    }

    while (!queue.isEmpty()) {
      let {size} = queue;
      let hasLeaf = false;
      for (; size; --size) {
        const node = queue.pop();
        if (node) {
          dataList.push(node.data);
          if (!hasLeaf || node.left) {
            queue.push(node.left);
            hasLeaf ||= node.left !== null;
          }
          if (!hasLeaf || node.right) {
            queue.push(node.right);
            hasLeaf ||= node.right !== null;
          }
        } else {
          dataList.push(null);
        }
      }
      if (!hasLeaf) {
        break;
      }
    }

    return dataList;
  }

  toArrayInOrder(): T[] {
    const array: T[] = [];
    toArrayInOrderDfs(this.root);
    return array;

    function toArrayInOrderDfs(node: Nullable<TreeNode<T>>): void {
      if (node === null) {
        return;
      }
      toArrayInOrderDfs(node.left);
      array.push(node.data);
      toArrayInOrderDfs(node.right);
    }
  }

  toArrayPreOrder(): T[] {
    const array: T[] = [];
    toArrayPreOrderDfs(this.root);
    return array;

    function toArrayPreOrderDfs(node: Nullable<TreeNode<T>>): void {
      if (node === null) {
        return;
      }
      array.push(node.data);
      toArrayPreOrderDfs(node.left);
      toArrayPreOrderDfs(node.right);
    }
  }

  toArrayPostOrder(): T[] {
    const array: T[] = [];
    toArrayPostOrderDfs(this.root);
    return array;

    function toArrayPostOrderDfs(node: Nullable<TreeNode<T>>): void {
      if (node === null) {
        return;
      }
      toArrayPostOrderDfs(node.left);
      toArrayPostOrderDfs(node.right);
      array.push(node.data);
    }
  }

  toArrayList(): Nullable<T>[][] {
    const dataList: Nullable<T>[][] = [];
    const queue = new Queue<Nullable<TreeNode<T>>>();
    if (this.root) {
      queue.push(this.root);
    }

    while (!queue.isEmpty()) {
      let {size} = queue;
      let hasLeaf = false;
      const level = dataList.length;
      dataList.push([]);
      for (; size; --size) {
        const node = queue.pop();
        if (node) {
          dataList[level].push(node.data);
          if (node.left) {
            queue.push(node.left);
            hasLeaf ||= node.left !== null;
          } else {
            queue.push(null);
          }
          if (node.right) {
            queue.push(node.right);
            hasLeaf ||= node.right !== null;
          } else {
            queue.push(null);
          }
        } else {
          dataList[level].push(null);
          queue.push(null);
          queue.push(null);
        }
      }
      if (!hasLeaf) {
        break;
      }
    }

    return dataList;
  }

  print(): void {
    console.log(this.toArray());
  }

  printInOrder(): void {
    console.log(this.toArrayInOrder());
  }

  printPreOrder(): void {
    console.log(this.toArrayPreOrder());
  }

  printPostOrder(): void {
    console.log(this.toArrayPostOrder());
  }

  printLevel(): void {
    const arrayList = this.toArrayList();
    for (const array of arrayList) {
      console.log(array);
    }
  }
}

export class TreeNode<T> {
  data: T;
  left: Nullable<TreeNode<T>>;
  right: Nullable<TreeNode<T>>;
  constructor(
    data: T,
    left: Nullable<TreeNode<T>> = null,
    right: Nullable<TreeNode<T>> = null
  ) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
