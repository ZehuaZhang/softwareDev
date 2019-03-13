/**
 *  Number of Islands II
 * 
 * A 2d grid map of m rows and n columns is initially filled with water.
 * We may perform an addLand operation which turns the water at position (row, col) into a land.
 * Given a list of positions to operate, count the number of islands after each addLand operation.
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
 * You may assume all four edges of the grid are all surrounded by water.
 * 
 * Example:
 * 
 * Given m = 3, n = 3, positions = [[0,0], [0,1], [1,2], [2,1]].
 * Initially, the 2d grid grid is filled with water. (Assume 0 represents water and 1 represents land).
 * 
 * 0 0 0
 * 0 0 0
 * 0 0 0
 * Operation #1: addLand(0, 0) turns the water at grid[0][0] into a land.
 * 
 * 1 0 0
 * 0 0 0   Number of islands = 1
 * 0 0 0
 * Operation #2: addLand(0, 1) turns the water at grid[0][1] into a land.
 * 
 * 1 1 0
 * 0 0 0   Number of islands = 1
 * 0 0 0
 * Operation #3: addLand(1, 2) turns the water at grid[1][2] into a land.
 * 
 * 1 1 0
 * 0 0 1   Number of islands = 2
 * 0 0 0
 * Operation #4: addLand(2, 1) turns the water at grid[2][1] into a land.
 * 
 * 1 1 0
 * 0 0 1   Number of islands = 3
 * 0 1 0
 * We return the result as an array: [1, 1, 2, 3]
 * 
 * Challenge:
 * Can you do it in time complexity O(k log mn), where k is the length of the positions?
 */

import java.util.*;

public class Solution {
    public List<Integer> numIslands2(int m, int n, int[][] positions) {

        Map<Integer, Integer> parents = new HashMap<>();
        int count = 0;
        List<Integer> result = new ArrayList<>();

        for (int[] position : positions) {
            ++count;
            int id = getId(position, n);
            parents.put(id, id);

            for (int[] direction : new int[][]{{0, 1}, {0, -1}, {-1, 0}, {1, 0}}) {
                int[] neighbourPosition = new int[] { position[0] + direction[0], position[1] + direction[1] };
                int neighbourId = getId(neighbourPosition, n);
                if (0 <= neighbourPosition[0] && neighbourPosition[0] < m && 0 <= neighbourPosition[1] && neighbourPosition[1] < n && parents.containsKey(neighbourId)) {
                    if (find(id, parents) != find(neighbourId, parents)) {
                        union(parents, id, neighbourId);
                        --count;
                    }
                }
            }

            result.add(count);
        }

        return result;
    }

    private int getId(int[] node, int n) {
        return node[0] * n + node[1];
    }

    private int find(int i, Map<Integer, Integer> parents) {
        while (parents.get(i) != i) {
            i = parents.get(i);
        }
        return i;
    }

    private void union(Map<Integer, Integer> parents, int x, int y) {
        int xRoot = find(x, parents);
        int yRoot = find(y, parents);

        parents.put(Math.min(xRoot, yRoot), Math.max(xRoot, yRoot));
    }
}
