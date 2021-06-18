/**
Given an Android 3x3 key lock screen and two integers m and n, where 1 ≤ m ≤ n ≤ 9, count the total number of unlock patterns of the Android lock screen, which consist of minimum of m keys and maximum n keys.

 

Rules for a valid pattern:

Each pattern must connect at least m keys and at most n keys.
All the keys must be distinct.
If the line connecting two consecutive keys in the pattern passes through any other keys, the other keys must have previously selected in the pattern. No jumps through non selected key is allowed.
The order of keys used matters.
 



 

Explanation:

| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 | 8 | 9 |
Invalid move: 4 - 1 - 3 - 6
Line 1 - 3 passes through key 2 which had not been selected in the pattern.

Invalid move: 4 - 1 - 9 - 2
Line 1 - 9 passes through key 5 which had not been selected in the pattern.

Valid move: 2 - 4 - 1 - 3 - 6
Line 1 - 3 is valid because it passes through key 2, which had been selected in the pattern

Valid move: 6 - 5 - 4 - 1 - 9 - 2
Line 1 - 9 is valid because it passes through key 5, which had been selected in the pattern.

 

Example:

Input: m = 1, n = 1
Output: 9
*/

/**
 * 
 * @param { number } m 
 * @param { number } n 
 * @returns { number }
 */
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