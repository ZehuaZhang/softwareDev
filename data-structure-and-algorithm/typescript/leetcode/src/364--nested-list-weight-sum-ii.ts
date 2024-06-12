/*
364. Nested List Weight Sum II

Given a nested list of integers, return the sum of all integers in the list weighted by their depth.

Each element is either an integer, or a list -- whose elements may also be integers or other lists.

Different from the previous question where weight is increasing from root to leaf, now the weight is defined from bottom up. i.e., the leaf level integers have weight 1, and the root level integers have the largest weight.

Example 1:

Input: [[1,1],2,[1,1]]
Output: 8
Explanation: Four 1's at depth 1, one 2 at depth 2.
Example 2:

Input: [1,[4,[6]]]
Output: 17
Explanation: One 1 at depth 3, one 4 at depth 2, and one 6 at depth 1; 1*3 + 4*2 + 6*1 = 17.
*/

function depthSumInverse(list: NestedInteger[]): number {
  const path: number[] = [];
  depthSumInverseDfs(list, 0);

  let result = 0;
  for (let i = path.length - 1; i >= 0; --i) {
    result += path[i] * (list.length - i);
  }
  return result;

  function depthSumInverseDfs(list: NestedInteger[], depth: number) {
    if (path.length === depth) {
      path.push(0);
    }
    for (const l of list) {
      if (l.isInteger()) {
        path[depth] += l.getInteger();
      } else {
        depthSumInverseDfs(l.getList(), depth + 1);
      }
    }
  }
}

interface NestedInteger {
  isInteger(): boolean;
  getInteger(): number;
  getList(): Array<NestedInteger>;
}
