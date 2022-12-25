import {ParentTreeNode, TreeNode} from '../data-structure/BinaryTree';
import {Nullable} from '../util/object';

function inorderSuccessorIterative(
  root: Nullable<TreeNode<number>>,
  node: TreeNode<number>
): Nullable<TreeNode<number>> {
  let succ = null;
  for (let curr = root; curr; ) {
    if (curr.data > node.data) {
      succ = curr;
      curr = curr.left;
    } else {
      curr = curr.right;
    }
  }
  return succ;
}

function inorderPredecessorIterative(
  root: Nullable<TreeNode<number>>,
  node: TreeNode<number>
): Nullable<TreeNode<number>> {
  let pred = null;
  for (let curr = root; curr; ) {
    if (curr.data >= node.data) {
      curr = curr.left;
    } else {
      pred = curr;
      curr = curr.right;
    }
  }
  return pred;
}

function inorderSuccessorRecursive(
  root: Nullable<TreeNode<number>>,
  node: TreeNode<number>
): Nullable<TreeNode<number>> {
  if (root === null) {
    return null;
  }
  if (root.data > node.data) {
    const succ = inorderSuccessorRecursive(root.left, node);
    return succ ?? root;
  }
  return inorderSuccessorRecursive(root.right, node);
}

function inorderPredecessorRecursive(
  root: Nullable<TreeNode<number>>,
  node: TreeNode<number>
): Nullable<TreeNode<number>> {
  if (root === null) {
    return null;
  }
  if (root.data >= node.data) {
    return inorderPredecessorRecursive(root.left, node);
  }
  const pred = inorderPredecessorRecursive(root.right, node);
  return pred ?? root;
}

function inorderSuccessorParent(node: ParentTreeNode<number>) {
  if (node.right !== null) {
    for (node = node.right; node.left; node = node.left);
    return node;
  }
  for (; node.parent && node === node.parent.right; node = node.parent);
  return node.parent;
}

function inorderPredecessorParent(node: ParentTreeNode<number>) {
  if (node.left !== null) {
    for (node = node.left; node.right; node = node.right);
    return node;
  }
  for (; node.parent && node === node.parent.left; node = node.parent);
  return node.parent;
}
