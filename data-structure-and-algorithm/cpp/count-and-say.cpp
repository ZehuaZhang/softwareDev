// 38. Count and Say
// Difficulty: Easy

// The count-and-say sequence is the sequence of integers beginning as follows:
// 1, 11, 21, 1211, 111221, ...

// 1 is read off as "one 1" or 11.
// 11 is read off as "two 1s" or 21.
// 21 is read off as "one 2, then one 1" or 1211.
// Given an integer n, generate the nth sequence.

// Note: The sequence of integers will be represented as a string.

// Time:  O(n * 2^n)
// Space: O(2^n)

class Solution {
public:
  string countAndSay(int n) {
    string seq("1");
    while (--n) {
      stringstream seqStream;
      for (auto i = seq.begin(); i != seq.end();) {
        auto j = find_if(i, seq.end(), bind1st(not_equal_to<char>(), *i));
        seqStream << distance(i, j) << *i;
        i = j;
      }
      seq = seqStream.str();
    }
    return seq;
  }
};