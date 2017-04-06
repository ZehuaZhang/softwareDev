// 187. Repeated DNA Sequences
// Difficulty: Medium

// All DNA is composed of a series of nucleotides abbreviated as A, C, G, and T, for example: "ACGAATTCCG". 
// When studying DNA, it is sometimes useful to identify repeated sequences within the DNA.

// Write a function to find all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.

// For example,

// Given s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT",

// Return:
// ["AAAAACCCCC", "CCCCCAAAAA"].

class Solution {
public:
  vector<string> findRepeatedDnaSequences(string s) {
    vector<string> result;
    if (s.size() <= 10) {
      return result;
    }

    int currTen = 0, i = 0;
    // ASCII 3-lsb is different - A: 0100 0001　　C: 0100 0011　　G: 0100 0111　　T: 0101 0100
    while (i < 9) {
      currTen = (currTen << 3) | (s[i++] & 7);
    }
    unordered_map<int, int> cnt;
    int mask = 0x7FFFFFF;
    while (i < s.size()) {
      currTen = ((currTen & mask) << 3) | (s[i++] & 7);
      if (++cnt[currTen] == 2) {
        result.push_back(s.substr(i - 10, 10));
      }
    }
    return result;
  }
};