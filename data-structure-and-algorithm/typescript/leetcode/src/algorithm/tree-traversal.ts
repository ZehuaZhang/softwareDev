import {TreeNode} from '../data-structure/BinaryTree';
import {Queue} from '../data-structure/Queue';
import {Stack} from '../data-structure/Stack';
import {Nullable} from '../util/object';

function preorderTraversal(root: Nullable<TreeNode<number>>): number[] {
  const stack = new Stack<TreeNode<number>>();
  if (root !== null) {
    stack.push(root);
  }

  const result: number[] = [];
  while (!stack.isEmpty()) {
    const node = stack.pop();
    result.push(node.data);

    if (node.right) {
      stack.push(node.right);
    }

    if (node.left) {
      stack.push(node.left);
    }
  }

  return result;
}

function inorderTraversal(root: Nullable<TreeNode<number>>): number[] {
  const stack = new Stack<TreeNode<number>>();
  const result: number[] = [];
  let node = root;

  while (!stack.isEmpty() || node) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      node = stack.pop();
      result.push(node.data);
      node = node.right;
    }
  }

  return result;
}

function postorderTraversal(root: Nullable<TreeNode<number>>): number[] {
  const stack = new Stack<TreeNode<number>>();
  const result: number[] = [];
  let node = root;

  while (!stack.isEmpty() || node) {
    if (node) {
      stack.push(node);
      result.push(node.data);
      node = node.right;
    } else {
      node = stack.pop().left;
    }
  }
  return result.reverse();
}

function preorderMorris(root: Nullable<TreeNode<number>>): number[] {
  const result: number[] = [];
  if (root === null) {
    return result;
  }

  for (let curr: Nullable<TreeNode<number>> = root; curr; ) {
    if (curr.left) {
      let node: TreeNode<number> = curr.left;
      for (; node.right && node.right !== curr; node = node.right);
      if (node.right) {
        node.right = null;
        curr = curr.right;
      } else {
        node.right = curr;
        result.push(curr.data);
        curr = curr.left;
      }
    } else {
      result.push(curr.data);
      curr = curr.right;
    }
  }
  return result;
}

function inorderMorris(root: Nullable<TreeNode<number>>): number[] {
  const result: number[] = [];
  if (root === null) {
    return result;
  }

  for (let curr: Nullable<TreeNode<number>> = root; curr; ) {
    if (curr.left) {
      let node: TreeNode<number> = curr.left;
      for (; node.right && node.right !== curr; node = node.right);
      if (node.right) {
        node.right = null;
        result.push(curr.data);
        curr = curr.right;
      } else {
        node.right = curr;
        curr = curr.left;
      }
    } else {
      result.push(curr.data);
      curr = curr.right;
    }
  }
  return result;
}

function postorderMorris(root: Nullable<TreeNode<number>>): number[] {
  const queue = new Queue<number>();
  if (root === null) {
    return queue.toArray();
  }

  for (let curr: Nullable<TreeNode<number>> = root; curr; ) {
    if (curr.right) {
      let node: TreeNode<number> = curr.right;
      for (; node.left && node.left !== curr; node = node.left);
      if (node.left) {
        node.left = null;
        curr = curr.left;
      } else {
        node.left = curr;
        queue.push(curr.data);
        curr = curr.right;
      }
    } else {
      queue.pushFront(curr.data);
      curr = curr.left;
    }
  }
  return queue.toArray();
}
