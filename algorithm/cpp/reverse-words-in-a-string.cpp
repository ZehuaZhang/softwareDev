// 151. Reverse Words in a String
// Difficulty: Medium

// Given an input string, reverse the string word by word.

// For example,
// Given s = "the sky is blue",
// return "blue is sky the".

// Clarification:
// What constitutes a word?
// A sequence of non-space characters constitutes a word.
// Could the input string contain leading or trailing spaces?
// Yes. However, your reversed string should not contain leading or trailing spaces.
// How about multiple spaces between two words?
// Reduce them to a single space in the reversed string.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  void reverseWords(string& s) {
    reverse(s.begin(), s.end());

    size_t begin = 0, end = 0, len = 0;
    while ((begin = s.find_first_not_of(" ", end)) != string::npos) {
      if ((end = s.find(" ", begin)) == string::npos) {
        end = s.length();
      }
      reverse(s.begin() + begin, s.begin() + end);
      move(s.begin() + begin, s.begin() + end, s.begin() + len);
      len += end - begin;
      s[len++] = ' ';
    }
    s.resize(len ? len - 1 : 0);
  }
}

// Time:  O(n)
// Space: O(1)

class Solution2 {
public:
  void reverseWords(string& s) {
    reverse(s.begin(), s.end());

    istringstream ss(s);
    string word;
    ostringstream os;

    while (ss >> word) {
      reverse(word.begin(), word.end());
      os << word << " ";
    }
    s = os.str();
    s.pop_back();
  }
};
