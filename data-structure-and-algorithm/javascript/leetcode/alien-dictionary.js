/**
 * 
 * @param { string[] } words 
 * @returns { string }
 */
function alienOrder(words) {
    const baseCode = 'a'.charCodeAt(0);
    const set = new Set();
    words.forEach(word => {
        for (const char of word) {
            set.add(char);
        }
    });
    const inDegree = Array(26).fill(0);
    const graph = Array(26).fill(0).map(() => Set());
    for (const i = 0; i < words.length - 1; ++i) {
        for (const j = 0; j < Math.min(words[i].length, words[i + 1].length); ++j) {
            const prev = words[i][j].charCodeAt(0) - baseCode;
            const curr = words[i + 1][j].charCodeAt(0) - baseCode;
            if (prev !== curr) {
                graph[prev].add(curr);
                ++inDegree[curr];
                break;
            }
        }
    }

    const queue = new Queue();
    inDegree.forEach((degree, index) => {
        if (degree === 0) {
            queue.push(index);
        }
    });

    const result = [];
    while (!queue.isEmpty()) {
        const code = queue.pop();
        result.push(String.fromCharCode(code + baseCode));
        for (const next of graph[char].values()) {
            if (--inDegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    return set.length === result.length ? result.join("") : "";
}