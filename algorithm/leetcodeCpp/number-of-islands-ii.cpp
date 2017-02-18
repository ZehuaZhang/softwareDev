// 305. Number of Islands II
// Difficulty : Hard

// A 2d grid map of m rows and n columns is initially filled with water. We may perform an addLand operation 
// which turns the water at position (row, col) into a land. Given a list of positions to operate, 
// count the number of islands after each addLand operation. An island is surrounded by water and is formed 
// by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

// Example:

// Given m = 3, n = 3, positions = [[0,0], [0,1], [1,2], [2,1]].
// Initially, the 2d grid grid is filled with water. (Assume 0 represents water and 1 represents land).

// 0 0 0
// 0 0 0
// 0 0 0
// Operation #1: addLand(0, 0) turns the water at grid[0][0] into a land.

// 1 0 0
// 0 0 0   Number of islands = 1
// 0 0 0
// Operation #2: addLand(0, 1) turns the water at grid[0][1] into a land.

// 1 1 0
// 0 0 0   Number of islands = 1
// 0 0 0
// Operation #3: addLand(1, 2) turns the water at grid[1][2] into a land.

// 1 1 0
// 0 0 1   Number of islands = 2
// 0 0 0
// Operation #4: addLand(2, 1) turns the water at grid[2][1] into a land.

// 1 1 0
// 0 0 1   Number of islands = 3
// 0 1 0
// We return the result as an array: [1, 1, 2, 3]

// Challenge:

// Can you do it in time complexity O(k log mn), where k is the length of the positions?

// Time:  O(klog*k) ~= O(k), k is the length of the positions
// Space: O(k)

// Using unordered_map.
class Solution {
public:
    vector<int> numIslands2(int m, int n, vector<pair<int, int>>& positions) {
        vector<int> numbers;
        int number = 0;
        unordered_map<int, int> islands; // (point in island, delegate point of island)

        for (auto position : positions) {
            islands[nodeId(position, n)] = nodeId(position, n); // make current delegate of its own island
            ++number;

            vector<pair<int, int>> directions{{0, -1}, {0, 1}, {-1, 0}, {1, 0}};

            for (auto direction : directions) {
                auto neighbor = make_pair(position.first + direction.first,
                                            position.second + direction.second);
                // neighbour is an island
                if (neighbor.first >= 0 && neighbor.first < m &&
                    neighbor.second >= 0 && neighbor.second < n &&
                    islands.count(nodeId(neighbor, n))) {   
                    // check current and neighbour is not considered same island
                    if (find(nodeId(position, n), islands) != find(nodeId(neighbor, n), islands)) {
                        // Merge two islands, amortised time: O(log*k) ~= O(1)
                        union(islands, nodeId(position, n), nodeId(neighbor, n));
                        --number;
                    }
                }
            }
            numbers.emplace_back(number);
        }

        return numbers;
    }

    int nodeId(pair<int, int> node, int n) {
        return node.first * n + node.second;
    }

    int find(int x, unordered_map<int, int> &set) {
       if (set[x] != x) {   // check who is the delegate of points in island, delegate of itself is itself
           set[x] = find(set[x], set);  // path compression.
       }
       return set[x];
    }

    void union(unordered_map<int, int> &set, const int x, const int y) {
        int xRoot = find(x, set), yRoot = find(y, set);
        set[min(xRoot, yRoot)] = max(xRoot, yRoot); // make bigger-value of nodeID the delegate of smaller
    }
};