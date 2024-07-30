/*
249. Group Shifted Strings

Given a string, we can "shift" each of its letter to its successive letter, for example: "abc" -> "bcd". We can keep "shifting" which forms the sequence:

"abc" -> "bcd" -> ... -> "xyz"
Given a list of strings which contains only lowercase alphabets, group all strings that belong to the same shifting sequence.

Example:

Input: ["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"],
Output:
[
  ["abc","bcd","xyz"],
  ["az","ba"],
  ["acef"],
  ["a","z"]
]
*/

function groupStrings(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  const code = "a".charCodeAt(0);
  for (const s of strs) {
    const hash = [...s]
      .map(
        (c) =>
          String.fromCharCode((c.charCodeAt(0) - s.charCodeAt(0) + 26) % 26) +
          code
      )
      .join("");
    if (!map.has(hash)) {
      map.set(hash, []);
    }
    map.get(hash).push(s);
  }

  return [...map.values()].map((ss) => ss.sort());
}
