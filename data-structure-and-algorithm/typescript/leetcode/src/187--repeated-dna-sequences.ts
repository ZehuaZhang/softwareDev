/*
187. Repeated DNA Sequences

All DNA is composed of a series of nucleotides abbreviated as A, C, G, and T, for example: “ACGAATTCCG”. When studying DNA, it is sometimes useful to identify repeated sequences within the DNA.

Write a function to find all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.

Example:

Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"

Output: ["AAAAACCCCC", "CCCCCAAAAA"]
*/

function findRepeatedDnaSequences(s: string): string[] {
  const set = new Set<string>();
  const rslt = new Set<string>();
  for (let i = 0; i + 9 < s.length; ++i) {
    const seq = s.substring(i, i + 10);
    if (set.has(seq)) {
      rslt.add(seq);
    } else {
      set.add(seq);
    }
  }

  return [...rslt];
}
