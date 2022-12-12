/*
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

function groupStrings(inputList: string[]): string[][] {
  const shiftSeqSetMap = new Map<string, Set<string>>();
  for (const input of inputList) {
    const hash = [...input]
      .map(char =>
        String.fromCharCode(
          ((char.charCodeAt(0) - input[0].charCodeAt(0) + 26) % 26) +
            'a'.charCodeAt(0)
        )
      )
      .join('');
    if (!shiftSeqSetMap.has(hash)) {
      shiftSeqSetMap.set(hash, new Set<string>());
    }
    shiftSeqSetMap.get(hash)!.add(input);
  }

  return [...shiftSeqSetMap.values()].map(set => [...set].sort());
}
