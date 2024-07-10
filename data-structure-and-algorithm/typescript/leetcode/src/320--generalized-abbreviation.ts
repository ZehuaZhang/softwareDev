/*
320. Generalized Abbreviation

Write a function to generate the generalized abbreviations of a word. 

Note: The order of the output does not matter.

Example:

Input: "word"
Output:
["word", "1ord", "w1rd", "wo1d", "wor1", "2rd", "w2d", "wo2", "1o1d", "1or1", "w1r1", "1o2", "2r1", "3d", "w3", "4"]
*/

function generateAbbreviations(word: string) {
  const n = word.length;
  const rslt: string[] = [];
  rslt.push(n ? String(word.length) : '');
  for (let i = 0; i < n; ++i) {
    for (const a of generateAbbreviations(word.substring(i + 1))) {
      const l = i ? String(i) : '';
      const w = word.substring(i, i + 1);
      rslt.push(l + w + a);
    }
  }

  return rslt;
}