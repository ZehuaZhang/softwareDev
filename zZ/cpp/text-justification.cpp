// 68. Text Justification
// Difficulty: Hard

// Given an array of words and a length L, format the text such that each line has exactly L characters 
// and is fully (left and right) justified.

// You should pack your words in a greedy approach; that is, pack as many words as you can in each line.
// Pad extra spaces ' ' when necessary so that each line has exactly L characters.

// Extra spaces between words should be distributed as evenly as possible.
// If the number of spaces on a line do not divide evenly between words, 
// the empty slots on the left will be assigned more spaces than the slots on the right.

// For the last line of text, it should be left justified and no extra space is inserted between words.

// For example,
// words: ["This", "is", "an", "example", "of", "text", "justification."]
// L: 16.

// Return the formatted lines as:
// [
//    "This    is    an",
//    "example  of text",
//    "justification.  "
// ]

// Note: Each word is guaranteed not to exceed L in length.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  vector<string> fullJustify(vector<string>& words, int maxWidth) {
    vector<string> res;
    int begin = 0, len = 0;
    for (int i = 0; i < words.size(); ++i) {
      if (len + words[i].size() + (i - begin) > maxWidth) {
        res.emplace_back(connect(words, maxWidth, begin, i, len, false));
        begin = i;
        len = 0;
      }
      len += words[i].size();
    }
    // Last line.
    res.emplace_back(connect(words, maxWidth, begin, words.size(), len, true));
    return res;
  }

private:
  string connect(const vector<string>& words, int maxWidth, int begin, int end, int len, bool isLast) {
    string s;
    int n = end - begin;
    for (int i = 0; i < n; ++i) {
      s += words[begin + i];
      addSpaces(s, i, n - 1, maxWidth - len, isLast);
    }
    // For only one word in a line.
    if (s.size() < maxWidth) {
      s.append(maxWidth - s.size(), ' ');
    }
    return s;
  }

  void addSpaces(string& s, int i, int spaceCnt, int spaceWidth, bool isLast) {
    if (i < spaceCnt) {
      // For the last line of text, it should be left justified,
      // and no extra space is inserted between words.
      int spaces = isLast ? 1 : spaceWidth / spaceCnt + (i < spaceWidth % spaceCnt);
      s.append(spaces, ' ');
    }
  }
};
