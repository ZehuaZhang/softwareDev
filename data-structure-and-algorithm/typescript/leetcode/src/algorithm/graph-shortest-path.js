function shortestNodesPathsFromSourceDijkstra(graph, source) {
  const distance = {};
  const parent = {};

  const {nodes, adjacentMap} = graph;
  for (const node of nodes) {
    distance[node] = Infinity;
    parent[node] = null;
  }
  distance[source] = 0;

  const queue = new PriorityQueue(
    Number.MAX_SAFE_INTEGER,
    (a, b) => a.distance - b.distance
  );
  queue.add({node: source, distance: 0});

  const visited = new Set();

  while (!queue.isEmpty()) {
    const {node} = queue.pop();
    visited.add(node);

    for (const [destination, weight] of adjacentMap.get(node)) {
      if (!visited.has(destination)) {
        const entry = {node: destination, distance: distance[destination]};
        const currDistance = distance[node] + weight;
        if (currDistance < distance[destination]) {
          distance[destination] = currDistance;

          if (queue.has(entry)) {
            queue.change(entry, {
              node: destination,
              distance: distance[destination],
            });
          }

          parent[destination] = node;
        }

        if (!queue.has(entry)) {
          queue.push({node: destination, distance: distance[destination]});
        }
      }
    }
  }

  return {distance, parent};
}
