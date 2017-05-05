// 323. Number of Connected Components in an Undirected Graph
// Difficulty : Medium

// Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes),
// write a function to find the number of connected components in an undirected graph.

// Example 1:

//      0          3

//      |          |

//      1 --- 2    4

// Given n = 5 and edges = [[0, 1], [1, 2], [3, 4]], return 2.

// Example 2:

//      0           4

//      |           |

//      1 --- 2 --- 3

// Given n = 5 and edges = [[0, 1], [1, 2], [2, 3], [3, 4]], return 1.

// Note:
// You can assume that no duplicate edges will appear in edges. Since all edges are undirected,
// [0, 1] is the same as [1, 0] and thus will not appear together in edges.

// Time:  O(nlog*n) ~= O(n), n is the length of the positions
// Space: O(n)

#import <Foundation/Foundation.h>

int find(int node, int* set) {
  if (set[node] != node) {
    set[node] = find(set[node], set);
  }
  return set[node];
}

void combine(int* set, int x, int y) {
  int xRoot = find(x, set);
  int yRoot = find(y, set);
  set[MIN(xRoot, yRoot)] = MAX(xRoot, yRoot);
}

int countComponents(int n, NSArray* edges) {
  int connected[n];
  for (int i = 0; i < n; i++) {
    connected[i] = i;
  }
  int count = n;
  for (id edge in edges) {
    int x = find([edge[0] intValue], connected);
    int y = find([edge[1] intValue], connected);
    
    if (x != y) {
      combine(connected, x, y);
      --count;
    }
  }
  return count;
}

