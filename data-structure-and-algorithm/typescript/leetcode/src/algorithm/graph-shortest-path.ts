import {Graph, GraphNode} from '../data-structure/Graph';
import {Heap} from '../data-structure/Heap';
import {Nullable} from '../util/object';

function shortestNodesPathsFromSourceDijkstra(
  graph: Graph<number, number>,
  source: GraphNode<number>
) {
  const distance = new Map<GraphNode<number>, number>();
  const parent = new Map<GraphNode<number>, Nullable<GraphNode<number>>>();
  const {nodeSet, adjacentMap} = graph;
  for (const node of nodeSet) {
    distance.set(node, Infinity);
    parent.set(node, null);
  }
  distance.set(source, 0);

  const heap = new Heap<GraphNode<number>>(
    (a, b) => distance.get(a)! - distance.get(b)!
  );
  heap.push(source);

  const visited = new Set<GraphNode<number>>();

  while (!heap.isEmpty()) {
    const node = heap.pop();
    visited.add(node);

    for (const [destination, weight] of adjacentMap.get(node)!) {
      if (!visited.has(destination)) {
        const currDistance = distance.get(node)! + weight;
        if (currDistance < distance.get(destination)!) {
          distance.set(destination, currDistance);
          parent.set(destination, node);
          heap.heapify(destination);
        }
        if (!heap.has(destination)) {
          heap.push(destination);
        }
      }
    }
  }

  return {distance, parent};
}
