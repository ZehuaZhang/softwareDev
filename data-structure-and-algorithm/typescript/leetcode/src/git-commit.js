function findAllCommits(node) {
    const result = [];
    const queue = new Queue();
    const visited = new Set();

    queue.push(node);
    visited.add(node);
    while (!queue.isEmpty()) {
        const curr = queue.pop();
        result.push(curr);

        for (const parent of curr.parents) {
            if (!visited.has(parent)) {
                queue.push(parent);
                visited.add(parent);
            }
        }
    }
    return result;
}

function findLatestCommonCommit(node1, node2) {
    if (!node1 || !node2) {
        return null;
    }

    const queue1 = new Queue();
    const queue2 = new Queue();

    const visited1 = new Set();
    const visited2 = new Set();

    queue1.add(node1);
    visited1.add(node1);
    queue2.add(node2);
    visited2.add(node2);

    while (!queue1.isEmpty() && !queue2.isEmpty()) {
        for (const size = queue1.count(); size > 0; --size) {
            const curr = queue1.pop();

            if (visited2.has(curr)) {
                return curr;
            }

            for (const parent of curr.parents) {
                if (!visited1.has(parent)) {
                    queue1.push(parent);
                    visited1.add(parent);
                }
            }
        }

        for (const size = queue2.count(); size > 0; --size) {
            const curr = queue2.pop();

            if (visited1.has(curr)) {
                return curr;
            }

            for (const parent of curr.parents) {
                if (!visited2.has(parent)) {
                    queue2.push(parent);
                    visited2.add(parent);
                }
            }
        }
    }
    
    return null;
}

class GitNode {
    constructor(id) {
        this.id = id;
        this.parents = [];
    }
}