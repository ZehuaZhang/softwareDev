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

class Solution {
public:
  int countComponents(int n, vector<pair<int, int>>& edges) {
    vector<int> connected(n);
    iota(connected.begin(), connected.end(), 0);
    int count = n;
    for (auto edge : edges) {
      int x = find(edge.first, connected);
      int y = find(edge.second, connected);

      if (x != y) {
        union(connected, x, y);
        --count;
      }
    }
    return count;
  }

private:
  int find(int node, vector<int>& set) {
    while (set[node] != node) {
      node = find(set[node], set);
    }
    return node;
  }
  
  void union(vector<int>& set, int x, int y) {
    int xRoot = find(x, set);
    int yRoot = find(y, set);
    set[min(x, y)] = max(x, y);
  }
};
