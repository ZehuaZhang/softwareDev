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
  const rslt: string[] = [];
  rslt.push(word.length ? String(word.length) : '');
  for (let i = 0; i < word.length; ++i) {
    for (const a of generateAbbreviations(word.substring(i + 1))) {
      const left = i > 0 ? String(i) : '';
      rslt.push(left + word.substring(i, i + 1) + a);
    }
  }
  return rslt;
}
