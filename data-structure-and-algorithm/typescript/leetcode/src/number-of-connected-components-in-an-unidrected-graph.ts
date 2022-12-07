function countComponents(n, edges) {
  const connected = Array(n).map((_, i) => i);
  let result = n;
  for (const [src, dest] of edges) {
    const x = find(src, connected);
    const y = find(dest, connected);

    if (x !== y) {
      union(x, y, connected);
      --result;
    }
  }
  return result;
}

function find(node, set) {
  while (node !== set[node]) {
    node = set[node];
  }
  return node;
}

function union(node1, node2, set) {
  const x = find(node1, set);
  const y = find(node2, set);
  set[Math.min(x, y)] = Math.max(x, y);
}
