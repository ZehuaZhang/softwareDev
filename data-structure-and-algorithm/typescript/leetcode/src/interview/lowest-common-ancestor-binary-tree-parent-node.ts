import {ParentTreeNode} from '../data-structure/BinaryTree';
import {Nullable} from '../util/object';

function lcaHeight(
  node1: Nullable<ParentTreeNode<number>>,
  node2: Nullable<ParentTreeNode<number>>
): Nullable<ParentTreeNode<number>> {
  let height1 = getHeight(node1);
  let height2 = getHeight(node2);

  if (height2 > height1) {
    lcaHeight(node2, node1);
  }

  while (node2) {
    if (height1 === height2) {
      if (node1 === node2) {
        return node1;
      }
      node1 = node1!.parent;
      --height1;
    }
    node2 = node2.parent;
    --height2;
  }

  return node2;

  function getHeight(node: Nullable<ParentTreeNode<number>>): number {
    let height = 0;
    while (node !== null) {
      ++height;
      node = node.parent;
    }
    return height;
  }
}

function lcaSet(
  node1: Nullable<ParentTreeNode<number>>,
  node2: Nullable<ParentTreeNode<number>>
): Nullable<ParentTreeNode<number>> {
  const s1 = new Set<ParentTreeNode<number>>();
  while (node1) {
    s1.add(node1);
    node1 = node1.parent;
  }
  while (node2 && !s1.has(node2)) {
    node2 = node2.parent;
  }
  return node2;
}
