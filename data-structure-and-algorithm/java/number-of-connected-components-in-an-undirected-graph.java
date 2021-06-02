/**
 * Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes),
 * write a function to find the number of connected components in an undirected graph.
 * 
 * Example 1:
 * 
 *      0          3
 * 
 *      |          |
 * 
 *      1 --- 2    4
 * 
 * Given n = 5 and edges = [[0, 1], [1, 2], [3, 4]], return 2.
 * 
 * Example 2:
 * 
 *      0           4
 * 
 *      |           |
 * 
 *      1 --- 2 --- 3
 * 
 * Given n = 5 and edges = [[0, 1], [1, 2], [2, 3], [3, 4]], return 1.
 * 
 * Note:
 * You can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.
 */

public class Solution {
    public int countComponents(int n, int[][] edges) {
        int[] parents = new int[n];

        for (int i = 0; i < n; ++i) {
            parents[i] = i;
        }

        int count = n;

        for (int[] edge : edges) {
            int x = find(edge[0], parents);
            int y = find(edge[1], parents);

            if (x != y) {
                union(parents, x, y);
                --count;
            }
        }

        return count;
    }

    private int find(int i, int[] parents) {
        while (i != parents[i]) {
            i = parents[i];
        }
        return i;
    }

    private void union(int[] parents, int x, int y) {
        int xRoot = find(x, parents);
        int yRoot = find(y, parents);

        parents[Math.min(xRoot, yRoot)] = Math.max(xRoot, yRoot);
    }
}
