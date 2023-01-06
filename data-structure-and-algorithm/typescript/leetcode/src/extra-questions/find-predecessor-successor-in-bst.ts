/*
Find Predecessor and Successor in BST
*/

import {ParentTreeNode, TreeNode} from '../data-structure/BinaryTree';
import {Nullable} from '../util/object';

// from root
function findPredSuccFromRoot(
  root: Nullable<TreeNode<number>>,
  node: TreeNode<number>
): Nullable<TreeNode<number>>[] {
  let [pred, succ]: Nullable<TreeNode<number>>[] = [null, null];
  let curr = root;
  while (curr && curr.data != node.data) {
    if (curr.data > node.data) {
      succ = curr;
      curr = curr.left;
    } else {
      pred = curr;
      curr = curr.right;
    }
  }
  if (curr && curr.data === node.data) {
    if (curr.left) {
      pred = curr.left;
      while (pred.right) {
        pred = pred.right;
      }
    }
    if (curr.right) {
      succ = curr.right;
      while (succ.left) {
        succ = succ.left;
      }
    }
  }
  return [pred, succ];
}

function findPredSuccFromParent(
  node: ParentTreeNode<number>
): Nullable<ParentTreeNode<number>>[] {
  let [pred, succ]: Nullable<ParentTreeNode<number>>[] = [null, null];
  if (node === null) {
    return [pred, succ];
  }

  if (node.left) {
    pred = node.left;
    while (pred.right) {
      pred = pred.right;
    }
  } else {
    pred = node.parent;
    for (
      let curr = node;
      pred && pred.left === curr;
      curr = pred, pred = pred.parent
    );
  }

  if (node.right) {
    succ = node.right;
    while (succ.left) {
      succ = succ.left;
    }
  } else {
    succ = node.parent;
    for (
      let curr = node;
      succ && succ.right === curr;
      curr = succ, succ = succ.parent
    );
  }
  return [pred, succ];
}
