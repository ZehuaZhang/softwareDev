function isDirectedGraphCyclicDFS(graph) {
    const { nodes, adjacentMap } = graph;
    const visited = new Set();
    const inLoop = new Set();

    for (const node of nodes) {
        if (!visited.has(node)) {
            if (isDirectedGraphCyclicDFSHelper(node, adjacentMap, visited, inLoop)) {
                return true;
            }
        }    
    }

    return false;
}

function isDirectedGraphCyclicDFSHelper(node, adjacentMap, visited, inLoop) {
    visited.add(node);
    inLoop.add(node);

    for (const [destination, weight] of adjacentMap.get(node)) {
        if (!visited.has(destination)) {
            if (isDirectedGraphCyclicDFSHelper(destination, adjacentMap, visited, inLoop)) {
                return true;
            }
        } else if (inLoop.has(node)) {
            return true;
        }
    }

    inLoop.delete(node);
    return false;
}

function isDirectedGraphCyclicBFS(graph) {
    const {nodes, nodeCount, adjacentMap} = graph;
    const inDegree = new Map();
    for (const node of nodes) {
        inDegree.set(node, 0);
    }

    for (const node of nodes) {
        for (const [destination, _] of adjacentMap.get(node)) {
            inDegree.set(destination, inDegree.get(destination) + 1);
        }
    }

    const queue = new Queue();
    for (const node of nodes) {
        if (inDegree.get(node) === 0) {
            queue.push(node);
        }
    }

    let count = 0;
    const topologyOrder = [];
    while (!queue.isEmpty()) {
        const node = queue.pop();
        topologyOrder.push(node);

        for (const [destination, _] of adjacentMap.get(node)) {
            inDegree.set(destination, inDegree.get(destination) - 1);
            if (inDegree.get(destination) === 0) {
                queue.push(destination);
            }
        }

        ++count;
    }
    return count !== nodeCount;
}

function isUndirectedGraphCyclicDFS(graph) {
    const {nodes, adjacentMap} = graph;
    const visited = new Set();

    for (const node of nodes) {
        if (!visited.has(node)) {
            if (isUndirectedGraphCyclicDFSHelper(node, adjacentMap, visited, null)) {
                return true;
            }
        }
    }
    return false;
}

function isUndirectedGraphCyclicDFSHelper(node, adjacentMap, visited, parent) {
    visited.add(node);

    for (const [destination, _] of adjacentMap.get(node)) {
        if (!visited.has(destination)) {
            if (isUndirectedGraphCyclicDFSHelper(destination, adjacentMap, visited, node)) {
                return true;
            }
        } else if (destination !== parent) {
            return true;
        }
    }
    return false;
}

function isUndirectedGraphCyclicBFS(graph) {
    const {nodes, adjacentMap} = graph;
    const visited = new Set();

    for (const node of nodes) {
        if (!visited.has(node)) {
            if (isUndirectedGraphCyclicBFSHelper(node, adjacentMap, visited)) {
                return true;
            }
        }
    }
    return false;
}

function isUndirectedGraphCyclicBFSHelper(node, adjacentMap, visited) {
    visited.add(node);

    const queue = new Queue();
    const parent = new Map();
    queue.push(node);
    
    while(!queue.isEmpty()) {
        const curr = queue.pop();
        for (const [destination, _] of adjacentMap.get(curr)) {
            if (!visited.has(destination)) {        
                queue.push(destination);
                visited.add(destination);
                parent.set(destination, curr);
            } else if (parent.get(curr) !== destination) {
                return true;
            }
        }
    }

    return false;
}