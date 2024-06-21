/*
323. Number of Connected Components in an Undirected Graph

Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to find the number of connected components in an undirected graph.

Example 1:

Input: n = 5 and edges = [[0, 1], [1, 2], [3, 4]]

     0          3
     |          |
     1 --- 2    4

Output: 2
Example 2:

Input: n = 5 and edges = [[0, 1], [1, 2], [2, 3], [3, 4]]

     0           4
     |           |
     1 --- 2 --- 3

Output:  1
Note:
You can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.
*/

function countComponents(count: number, edges: number[][]): number {
  const parentList = [...Array(count)].map((_, i) => i);
  let rslt = count;
  for (const [src, dst] of edges) {
    const x = find(src);
    const y = find(dst);

    if (x !== y) {
      union(x, y);
      --rslt;
    }
  }
  return rslt;

  function find(node: number): number {
    while (parentList[node] !== node) {
      node = parentList[node];
    }
    return node;
  }

  function union(x: number, y: number): void {
    const xParent = find(x);
    const yParent = find(y);
    parentList[xParent] = yParent;
  }
}
