import {Graph, GraphNode} from '../data-structure/Graph';
import {Queue} from '../data-structure/Queue';
import {Stack} from '../data-structure/Stack';

function topologicalSortDFS(graph: Graph<number, number>): GraphNode<number>[] {
  const {nodeSet, adjacentMap} = graph;
  const stack = new Stack<GraphNode<number>>();
  const visited = new Set<GraphNode<number>>();

  for (const node of nodeSet) {
    if (!visited.has(node)) {
      topologicalSortDFSHelper(node);
    }
  }

  return stack.toArray();

  function topologicalSortDFSHelper(node: GraphNode<number>): void {
    visited.add(node);

    for (const [destination] of adjacentMap.get(node)!) {
      if (!visited.has(destination)) {
        topologicalSortDFSHelper(node);
      }
    }

    stack.push(node);
  }
}

function topologicalSortBFS(graph: Graph<number, number>): GraphNode<number>[] {
  const {nodeSet, nodeCount, adjacentMap} = graph;
  const inDegree = new Map<GraphNode<number>, number>();

  for (const node of nodeSet) {
    inDegree.set(node, 0);
  }

  for (const node of nodeSet) {
    for (const [destination] of adjacentMap.get(node)!) {
      inDegree.set(destination, inDegree.get(destination)! + 1);
    }
  }

  const queue = new Queue<GraphNode<number>>();
  for (const node of nodeSet) {
    if (inDegree.get(node) === 0) {
      queue.push(node);
    }
  }

  const topologyOrder = [];
  let count = 0;
  while (!queue.isEmpty()) {
    const node = queue.pop();
    topologyOrder.push(node);
    ++count;

    for (const [destination] of adjacentMap.get(node)!) {
      inDegree.set(destination, inDegree.get(destination)! - 1);
      if (inDegree.get(destination) === 0) {
        queue.push(destination);
      }
    }
  }

  if (count !== nodeCount) {
    throw new Error('topology sort failed: cycle in graph detected');
  }

  return topologyOrder;
}
