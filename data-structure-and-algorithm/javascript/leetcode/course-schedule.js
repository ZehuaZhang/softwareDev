function canFinish(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(0).map(() => Array(0));
    const inDegree = Array(numCourses).fill(0);
    for (const pre of prerequisites) {
        graph[pre[1]].push(pre[0]);
        ++inDegree[pre[0]]
    }
    const queue = new Queue();
    inDegree.forEach((degree, index) => {
        if (degree === 0) {
            queue.push(index);
        }
    });

    let count = 0;
    while (!queue.isEmpty()) {
        const node = queue.pop();
        ++count;
        for (let dest of graph[node]) {
            if (--inDegree[dest] === 0) {
                queue.push(dest)
            }
        }
    }

    return count === numCourses;
}