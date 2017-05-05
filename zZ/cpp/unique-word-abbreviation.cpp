// 288. Unique Word Abbreviation
// Difficulty : Easy 

// An abbreviation of a word follows the form <first letter><number><last letter>.
// Below are some examples of word abbreviations:

// a) it                      --> it    (no abbreviation)

//      1
// b) d|o|g                   --> d1g

//               1    1  1
//      1---5----0----5--8
// c) i|nternationalizatio|n  --> i18n

//               1
//      1---5----0
// d) l|ocalizatio|n          --> l10n

// Assume you have a dictionary and given a word, find whether its abbreviation is unique in the dictionary.
// A word abbreviation is unique if no other word from the dictionary has the same abbreviation.

// Example: 

// Given dictionary = [ "deer", "door", "cake", "card" ]

// isUnique("dear") -> false
// isUnique("cart") -> true
// isUnique("cane") -> false
// isUnique("make") -> true

// Time:  ctor:   O(n), n is number of words in the dictionary. 
//        lookup: O(1)
// Space: O(k), k is number of unique words.

// Your ValidWordAbbr object will be instantiated and called as such:
// ValidWordAbbr vwa(dictionary);
// vwa.isUnique("hello");
// vwa.isUnique("anotherWord");

class ValidWordAbbr {
public:
  ValidWordAbbr(vector<string>& dictionary) {
    for (auto word : dictionary) {
      string abbr = word.front() + to_string(word.length()) + word.back();
      _lookup[abbr].emplace(word);
    }
  } 

  bool isUnique(string word) {
    string abbr = word.front() + to_string(word.length()) + word.back();
    return !_lookup.count(abbr) || _lookup[abbr].count(word) == _lookup[abbr].size();
  }

private:
  unordered_map<string, unordered_set<string>> _lookup;
};
