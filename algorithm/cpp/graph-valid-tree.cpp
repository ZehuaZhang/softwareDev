// 261. Graph Valid Tree
// Difficulty : Medium 

// Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), 
// write a function to check whether these edges make up a valid tree.

// For example:
// Given n = 5 and edges = [[0, 1], [0, 2], [0, 3], [1, 4]], return true.

// Given n = 5 and edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]], return false.

// Hint:
// Given n = 5 and edges = [[0, 1], [1, 2], [3, 4]], what should your return? Is this case a valid tree?
// According to the definition of tree on Wikipedia: “a tree is an undirected graph 
// in which any two vertices are connected by exactly one path. 
// In other words, any connected graph without simple cycles is a tree.”
// Note: you can assume that no duplicate edges will appear in edges. 
// Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.

// Time:  O(|V| + |E|)
// Space: O(|V| + |E|)
// Union Find
class Solution {
public:
  bool validTree(int n, vector<pair<int, int>>& edges) {
    vector<int> roots(n, -1);
    for (auto edge : edges) {
      int x = find(roots, edge.first), y = find(roots, edge.second);
      if (x == y) {
        return false;
      }
      roots[x] = y;
    }
    return edges.size() == n - 1;
  }
private:
  int find(vector<int> &roots, int i) {
    while (roots[i] != -1) {
      i = roots[i];
    }
    return i;
  }
};