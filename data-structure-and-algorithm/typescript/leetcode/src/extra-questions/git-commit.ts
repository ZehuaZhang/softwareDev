import {Queue} from '../data-structure/Queue';
import {Nullable} from '../util/object';

function findAllCommits(node: GitNode): GitNode[] {
  const result: GitNode[] = [];
  const queue = new Queue<GitNode>();
  const visited = new Set<GitNode>();

  queue.push(node);
  visited.add(node);
  while (!queue.isEmpty()) {
    const curr = queue.pop();
    result.push(curr);

    for (const parent of curr.parents) {
      if (!visited.has(parent)) {
        queue.push(parent);
        visited.add(parent);
      }
    }
  }
  return result;
}

function findLatestCommonCommit(
  node1: GitNode,
  node2: GitNode
): Nullable<GitNode> {
  if (!node1 || !node2) {
    return null;
  }

  const queue1 = new Queue<GitNode>();
  const queue2 = new Queue<GitNode>();

  const visited1 = new Set<GitNode>();
  const visited2 = new Set<GitNode>();

  queue1.push(node1);
  visited1.add(node1);
  queue2.push(node2);
  visited2.add(node2);

  while (!queue1.isEmpty() && !queue2.isEmpty()) {
    for (let {size} = queue1; size; --size) {
      const curr = queue1.pop();

      if (visited2.has(curr)) {
        return curr;
      }

      for (const parent of curr.parents) {
        if (!visited1.has(parent)) {
          queue1.push(parent);
          visited1.add(parent);
        }
      }
    }

    for (let {size} = queue2; size; --size) {
      const curr = queue2.pop();

      if (visited1.has(curr)) {
        return curr;
      }

      for (const parent of curr.parents) {
        if (!visited2.has(parent)) {
          queue2.push(parent);
          visited2.add(parent);
        }
      }
    }
  }

  return null;
}

class GitNode {
  id: number;
  parents: GitNode[];
  constructor(id: number) {
    this.id = id;
    this.parents = [];
  }
}
