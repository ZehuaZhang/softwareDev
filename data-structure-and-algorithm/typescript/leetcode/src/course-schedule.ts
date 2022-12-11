/*
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.



Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take.
To take course 1 you should have finished course 0. So it is possible.
Example 2:

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take.
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.


Constraints:

1 <= numCourses <= 105
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
All the pairs prerequisites[i] are unique.
*/

import {Queue} from './data-structure/Queue';

function canFinish(count: number, reqList: number[][]): boolean {
  const graph: number[][] = [...Array(count)].map(() => []);
  const inDegree: number[] = Array(count).fill(0);
  for (const [adv, org] of reqList) {
    graph[org].push(adv);
    ++inDegree[adv];
  }
  const queue = new Queue();
  inDegree.forEach((degree, index) => {
    if (degree === 0) {
      queue.push(index);
    }
  });

  let result = 0;
  while (!queue.isEmpty()) {
    const org = queue.pop();
    ++result;
    for (const adv of graph[org]) {
      if (--inDegree[adv] === 0) {
        queue.push(adv);
      }
    }
  }

  return result === count;
}
