function numberOfPatterns(m, n) {
    const skipover = Array(10).fill(0).map(() => Array(10).fill(0));
    skipover[1][3] = skipover[3][1] = 2;
    skipover[1][7] = skipover[7][1] = 4;
    skipover[3][9] = skipover[9][3] = 6;
    skipover[7][9] = skipover[9][7] = 8;
    skipover[1][9] = skipover[9][1] = skipover[2][8] = skipover[8][2] = skipover[3][7] = skipover[7][3] = skipover[4][6] = skipover[6][4] = 5;
    const visited = Array(10).fill(false);
    let result = 0;
    for (const i = m; i <= n; ++i) {
        result += numberOfPatternsDFS(visited, skipover, i - 1, 1) * 4;
        result += numberOfPatternsDFS(visited, skipover, i - 1, 2) * 4;
        result += numberOfPatternsDFS(visited, skipover, i - 1, 5);
    }
    return result;
}

function numberOfPatternsDFS(visited, skipover, remains, curr) {
    if (remains === 0) {
        return 1;
    } else if (remains < 0) {
        return 0;
    }

    visited[curr] = true;
    let result = 0;
    for (const next = 1; next <= 9; ++next) {
        if (!visited[i] && (!skipover[curr][next] || visited[skipover[curr][next]])) {
            result += numberOfPatternsDFS(visited, skipover, remains - 1, next);
        }
    }
    visited[curr] = false;
    return result;
}