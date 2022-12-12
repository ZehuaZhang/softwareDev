/*
1202. Smallest String With Swaps
Medium
3.2K
109
Companies
You are given a string s, and an array of pairs of indices in the string pairs where pairs[i] = [a, b] indicates 2 indices(0-indexed) of the string.

You can swap the characters at any pair of indices in the given pairs any number of times.

Return the lexicographically smallest string that s can be changed to after using the swaps.



Example 1:

Input: s = "dcab", pairs = [[0,3],[1,2]]
Output: "bacd"
Explaination:
Swap s[0] and s[3], s = "bcad"
Swap s[1] and s[2], s = "bacd"
Example 2:

Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
Output: "abcd"
Explaination:
Swap s[0] and s[3], s = "bcad"
Swap s[0] and s[2], s = "acbd"
Swap s[1] and s[2], s = "abcd"
Example 3:

Input: s = "cba", pairs = [[0,1],[1,2]]
Output: "abc"
Explaination:
Swap s[0] and s[1], s = "bca"
Swap s[1] and s[2], s = "bac"
Swap s[0] and s[1], s = "abc"


Constraints:

1 <= s.length <= 10^5
0 <= pairs.length <= 10^5
0 <= pairs[i][0], pairs[i][1] < s.length
s only contains lower case English letters.
*/

function smallestStringWithSwaps(string: string, edgeList: number[][]): string {
  const result: string[] = string.split('');
  const rootList = [...Array(string.length)].map((_, i) => i);
  for (const [src, dest] of edgeList) {
    const x = find(src, rootList);
    const y = find(dest, rootList);

    if (x !== y) {
      union(x, y, rootList);
    }
  }

  const rootListMap = new Map<number, number[]>();
  rootList.forEach((node, i) => {
    const root = find(node, rootList);
    if (!rootListMap.has(root)) {
      rootListMap.set(root, []);
    }
    rootListMap.get(root)!.push(i);
  });

  for (const rootList of rootListMap.values()) {
    const letterList = rootList.map(i => result[i]).sort();
    rootList.forEach((i, index) => (result[i] = letterList[index]));
  }

  return result.join('');

  function find(x: number, rootList: number[]): number {
    while (x !== rootList[x]) {
      x = rootList[x];
    }
    return x;
  }

  function union(x: number, y: number, rootList: number[]): void {
    x = find(x, rootList);
    y = find(y, rootList);
    rootList[x] = y;
  }
}
