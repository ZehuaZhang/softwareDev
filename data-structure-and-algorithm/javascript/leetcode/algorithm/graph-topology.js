function topologicalSortDFS(graph) {
    const {nodes, adjacentMap} = graph;
    const stack = new Stack();
    const visited = new Set();

    for (const node of nodes) {
        if (!visited.has(node)) {
            topologicalSortDFSHelper(node, adjacentMap, visited, stack)
        }
    }

    return stack.toArray();
}

function topologicalSortDFSHelper(node, adjacentMap, visited, stack) {
    visited.add(node);

    for (const [destination, _] of adjacentMap.get(node)) {
        if (!visited.has(destination)) {
            topologicalSortDFSHelper(node, adjacentMap, visited, stack);
        }
    }

    stack.push(node);
}

function topologicalSortBFS(graph) {
    const {nodes, adjacentMap} = graph;
    const inDegree = {};

    for (const node of nodes) {
        inDegree[node] = 0;
    }

    for (const node of nodes) {
        for (const [destination, _] of adjacentMap.get(node)) {
            ++inDegree[destination];
        }
    }

    const queue = new Queue();
    for (const node of nodes) {
        if (inDegree[node] === 0) {
            queue.push(node)
        }
    }

    const topologyOrder = [];
    const count = 0;
    while (!queue.isEmpty()) {
        const node = queue.pop();
        topologyOrder.push(node);
        ++count;

        for (const [destination, _] of adjacentMap.get(node)) {
            if (--inDegree[destination] === 0) {
                queue.push(destination);
            }
        }
    }

    if (count !== nodeCount) {
        throw new Error("topology sort failed: cycle in graph detected")
    }

    return topologyOrder;
}