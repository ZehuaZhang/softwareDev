import {Graph, GraphNode} from '../data-structure/Graph';
import {Queue} from '../data-structure/Queue';
import {Nullable} from '../util/object';

function isDirectedGraphCyclicDFS(graph: Graph<number, number>): boolean {
  const {nodeSet, adjacentMap} = graph;
  const visitedSet = new Set<GraphNode<number>>();
  const inLoopSet = new Set<GraphNode<number>>();

  for (const node of nodeSet) {
    if (!visitedSet.has(node)) {
      if (isDirectedGraphCyclicDFSHelper(node)) {
        return true;
      }
    }
  }

  return false;

  function isDirectedGraphCyclicDFSHelper(node: GraphNode<number>): boolean {
    visitedSet.add(node);
    inLoopSet.add(node);

    for (const [destination] of adjacentMap.get(node)!) {
      if (!visitedSet.has(destination)) {
        if (isDirectedGraphCyclicDFSHelper(destination)) {
          return true;
        }
      } else if (inLoopSet.has(destination)) {
        return true;
      }
    }

    inLoopSet.delete(node);
    return false;
  }
}

function isDirectedGraphCyclicBFS(graph: Graph<number, number>): boolean {
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

  let count = 0;
  const topologyOrder: GraphNode<number>[] = [];
  while (!queue.isEmpty()) {
    const node = queue.pop();
    topologyOrder.push(node);

    for (const [destination] of adjacentMap.get(node)!) {
      inDegree.set(destination, inDegree.get(destination)! - 1);
      if (inDegree.get(destination) === 0) {
        queue.push(destination);
      }
    }

    ++count;
  }
  return count !== nodeCount;
}

function isUndirectedGraphCyclicDFS(graph: Graph<number, number>): boolean {
  const {nodeSet, adjacentMap} = graph;
  const visitedSet = new Set<GraphNode<number>>();

  for (const node of nodeSet) {
    if (!visitedSet.has(node)) {
      if (isUndirectedGraphCyclicDFSHelper(node, null)) {
        return true;
      }
    }
  }
  return false;

  function isUndirectedGraphCyclicDFSHelper(
    node: GraphNode<number>,
    parent: Nullable<GraphNode<number>>
  ): boolean {
    visitedSet.add(node);

    for (const [destination] of adjacentMap.get(node)!) {
      if (!visitedSet.has(destination)) {
        if (isUndirectedGraphCyclicDFSHelper(destination, node)) {
          return true;
        }
      } else if (destination !== parent) {
        return true;
      }
    }
    return false;
  }
}

function isUndirectedGraphCyclicBFS(graph: Graph<number, number>): boolean {
  const {nodeSet, adjacentMap} = graph;
  const visitedSet = new Set();

  for (const node of nodeSet) {
    if (!visitedSet.has(node)) {
      if (isUndirectedGraphCyclicBFSHelper(node)) {
        return true;
      }
    }
  }
  return false;

  function isUndirectedGraphCyclicBFSHelper(node: GraphNode<number>): boolean {
    const queue = new Queue<GraphNode<number>>();
    const parent = new Map<GraphNode<number>, GraphNode<number>>();
    queue.push(node);
    visitedSet.add(node);

    while (!queue.isEmpty()) {
      const curr = queue.pop();
      for (const [destination] of adjacentMap.get(curr)!) {
        if (!visitedSet.has(destination)) {
          queue.push(destination);
          visitedSet.add(destination);
          parent.set(destination, curr);
        } else if (parent.get(curr) !== destination) {
          return true;
        }
      }
    }

    return false;
  }
}
