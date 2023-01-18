/*
2246. Longest Path With Different Adjacent Characters
Hard

You are given a tree (i.e. a connected, undirected graph that has no cycles) rooted at node 0 consisting of n nodes numbered from 0 to n - 1. The tree is represented by a 0-indexed array parent of size n, where parent[i] is the parent of node i. Since node 0 is the root, parent[0] == -1.

You are also given a string s of length n, where s[i] is the character assigned to node i.

Return the length of the longest path in the tree such that no pair of adjacent nodes on the path have the same character assigned to them.



Example 1:


Input: parent = [-1,0,0,1,1,2], s = "abacbe"
Output: 3
Explanation: The longest path where each two adjacent nodes have different characters in the tree is the path: 0 -> 1 -> 3. The length of this path is 3, so 3 is returned.
It can be proven that there is no longer path that satisfies the conditions.
Example 2:


Input: parent = [-1,0,0,0], s = "aabc"
Output: 3
Explanation: The longest path where each two adjacent nodes have different characters is the path: 2 -> 0 -> 3. The length of this path is 3, so 3 is returned.


Constraints:

n == parent.length == s.length
1 <= n <= 105
0 <= parent[i] <= n - 1 for all i >= 1
parent[0] == -1
parent represents a valid tree.
s consists of only lowercase English letters.
*/

import {Queue} from './data-structure/Queue';

function longestPath(parentList: number[], input: string): number {
  const {length} = parentList;
  const childCntList = Array(length).fill(0);
  for (let node = 1; node < length; ++node) {
    ++childCntList[parentList[node]];
  }

  const queue = new Queue<number>();
  let result = 1;

  // store the length of longest and 2nd longest chain starting from a node
  const longestChainList = [...Array(length)].map(() => Array(2).fill(0));

  for (let node = 1; node < length; ++node) {
    if (childCntList[node] === 0) {
      longestChainList[node][0] = 1;
      queue.push(node);
    }
  }

  while (!queue.isEmpty()) {
    const node = queue.pop();
    const parent = parentList[node];
    const longestChain = longestChainList[node][0];
    if (input[node] !== input[parent]) {
      if (longestChain > longestChainList[parent][0]) {
        longestChainList[parent][1] = longestChainList[parent][0];
        longestChainList[parent][0] = longestChain;
      } else if (longestChain > longestChainList[parent][1]) {
        longestChainList[parent][1] = longestChain;
      }
    }

    result = Math.max(
      result,
      longestChainList[parent][0] + longestChainList[parent][1] + 1
    );
    --childCntList[parent];

    if (childCntList[parent] === 0 && parent !== 0) {
      ++longestChainList[parent][0];
      queue.push(parent);
    }
  }

  return result;
}
