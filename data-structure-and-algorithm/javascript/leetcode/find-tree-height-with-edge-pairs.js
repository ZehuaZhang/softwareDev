function findTreeHeightWithEdgePairs(pairs) {
    const set = new Set();
    const parents = {}
    pairs.forEach(([x, y]) => {
        set.add(x);
        set.add(y);
        parents[y] = x; 
    });
    const n = set.size;
    const depth = Array(size).fill(0);
    for (const i = 0; i < n; ++i) {
        findDepth(parents, i, depth);
    }

    let max = 0;
    depth.forEach(d => {
        max = Math.max(d, max);
    });
    return max;
}

function findDepth(parents, i, depth) {
    if (depth[i] !== 0) {
        return;
    }
    if (!parents.hasOwnProperty(i)) {
        depth[i] = 1;
        return;
    }
    if (depth[parents[i]] === 0) {
        findDepth(parents, parents[i], depth);
    }
    depth[i] = depth[parents[i]] + 1;
}