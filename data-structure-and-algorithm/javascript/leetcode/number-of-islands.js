function numIslands(grid) {
    const [m, n] = [grid.length, grid[0].length];
    const visited = Array(length).fill(0).map(() => Array(width).fill(false));
    let count = 0;
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid[i][j] === '1' && !visited[i][j]) {
                numIslandsDFS(grid, visited, i, j, m, n);
                ++count;
            }
        }
    }
    return count;
}

function numIslandsDFS(grid, visited, x, y, m, n) {
    if (x < 0 || x >= m || y < 0 || y >=n || grid[x][y] !== '1' || visited[x][y]) {
        return;
    }
    visited[x][y] = true;
    numIslandsDFS(grid, visited, x - 1, y, m, n);
    numIslandsDFS(grid, visited, x + 1, y, m, n);
    numIslandsDFS(grid, visited, x, y - 1, m, n);
    numIslandsDFS(grid, visited, x, y + 1, m, n);
}