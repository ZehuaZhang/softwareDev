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
  abbrWordSetMap: Map<string, Set<string>>;
  constructor(wordList: string[]) {
    this.abbrWordSetMap = new Map<string, Set<string>>();
    for (const word of wordList) {
      const abbr = this.getAbbreviation(word);
      if (!this.abbrWordSetMap.has(abbr)) {
        this.abbrWordSetMap.set(abbr, new Set());
      }
      this.abbrWordSetMap.get(abbr)!.add(word);
    }
  }

  isUnique(word: string): boolean {
    const abbr = this.getAbbreviation(word);
    return (
      !this.abbrWordSetMap.has(abbr) ||
      (this.abbrWordSetMap.get(abbr)!.size === 1 &&
        this.abbrWordSetMap.get(abbr)!.has(word))
    );
  }

  getAbbreviation(word: string): string {
    if (word.length <= 2) {
      return word;
    }
    return word[0] + (word.length - 2).toString() + word[word.length - 1];
  }
}
