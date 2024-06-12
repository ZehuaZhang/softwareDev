/*
97. Interleaving String

Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.

An interleaving of two strings s and t is a configuration where s and t are divided into n and m 
substrings
 respectively, such that:

s = s1 + s2 + ... + sn
t = t1 + t2 + ... + tm
|n - m| <= 1
The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
Note: a + b is the concatenation of strings a and b.

 

Example 1:


Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Explanation: One way to obtain s3 is:
Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
Since s3 can be obtained by interleaving s1 and s2, we return true.
Example 2:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.
Example 3:

Input: s1 = "", s2 = "", s3 = ""
Output: true
 

Constraints:

0 <= s1.length, s2.length <= 100
0 <= s3.length <= 200
s1, s2, and s3 consist of lowercase English letters.
 

Follow up: Could you solve it using only O(s2.length) additional memory space?
*/

function isInterleave(s1: string, s2: string, s3: string): boolean {
  const [l1, l2, l3] = [s1.length, s2.length, s3.length];
  if (l1 + l2 !== l3) {
    return false;
  }

  const visited = [...Array(l1 + 1)].map(() => Array(l2 + 1).fill(false));
  const q: [number, number][] = [[0, 0]];

  while (q.length) {
    const [a, b] = q.shift();
    if (a === l1 && b === l2) {
      return true;
    }
    if (visited[a][b]) {
      continue;
    }
    if (a < l1 && s1[a] === s3[a + b]) {
      q.push([a + 1, b]);
    }
    if (b < l2 && s2[b] === s3[a + b]) {
      q.push([a, b + 1]);
    }
    visited[a][b] = true;
  }
  return false;
}
