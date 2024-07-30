/*
288. Unique Word Abbreviation


An abbreviation of a word follows the form <first letter><number><last letter>. Below are some examples of word abbreviations:

a) it                      --> it    (no abbreviation)

     1
b) d|o|g                   --> d1g

              1    1  1
     1---5----0----5--8
c) i|nternationalizatio|n  --> i18n

              1
     1---5----0
d) l|ocalizatio|n          --> l10n
Assume you have a dictionary and given a word, find whether its abbreviation is unique in the dictionary. A word's abbreviation is unique if no other word from the dictionary has the same abbreviation.

Example:

false
true
false
true
*/

class ValidWordAbbreviation {
  map: Map<string, Set<string>>;
  constructor(words: string[]) {
    this.map = new Map();
    for (const w of words) {
      const a = this.abbr(w);
      if (!this.map.has(a)) {
        this.map.set(a, new Set());
      }
      this.map.get(a).add(w);
    }
  }

  isUnique(word: string): boolean {
    const a = this.abbr(word);
    return (
      !this.map.has(a) ||
      (this.map.get(a).size === 1 && this.map.get(a).has(word))
    );
  }

  abbr(w: string) {
    if (w.length <= 2) {
      return w;
    }
    return w[0] + (w.length - 2) + w[w.length - 1];
  }
}
