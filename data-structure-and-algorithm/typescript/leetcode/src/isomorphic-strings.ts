/*
205. Isomorphic Strings
Difficulty: Easy

Given two strings s and t, determine if they are isomorphic.

Two strings are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters.
No two characters may map to the same character but a character may map to itself.

For example,
Given "egg", "add", return true.

Given "foo", "bar", return false.

Given "paper", "title", return true.

Note:
You may assume both s and t have the same length.

Time:  O(n)
Space: O(1)
*/

function isIsomorphic(input1: string, input2: string): boolean {
  const mapping12List = Array(256).fill(0);
  const mapping21List = Array(256).fill(0);
  for (let i = 0; i < input1.length; ++i) {
    const code1 = input1[i].charCodeAt(0);
    const code2 = input2[i].charCodeAt(0);
    if (mapping12List[code1] === 0 && mapping21List[code2] === 0) {
      mapping12List[code1] = code2;
      mapping21List[code2] = code1;
    } else if (mapping12List[code1] !== code2) {
      return false;
    }
  }
  return input1.length === input2.length;
}
