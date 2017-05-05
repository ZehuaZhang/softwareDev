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
    unordered_map<int, int> cnt;
    vector<string> result;
    int currTen = 0, mask = 0x7FFFFFF;
    // ASCII 3-lsb is different - A: 0100 0001　　C: 0100 0011　　G: 0100 0111　　T: 0101 0100
    for (int i = 0; i < s.size();) {
      currTen = ((currTen & mask) << 3) | (s[i++] & 7);
      if (i > 9 && ++cnt[currTen] == 2) {
        result.push_back(s.substr(i - 10, 10));
      }
    }
    return result;
  }
};