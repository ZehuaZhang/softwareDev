// 273. Integer to English Words
// Difficulty: Hard

// Convert a non-negative integer to its english words representation. Given input is guaranteed to be less than 2^31 - 1.

// For example,
// 123 -> "One Hundred Twenty Three"
// 12345 -> "Twelve Thousand Three Hundred Forty Five"
// 1234567 -> "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"

// Hint:
// Did you see a pattern in dividing the number into chunk of words? For example, 123 and 123000.
// Group the number by thousands (3 digits). You can write a helper function that takes a number 
// less than 1000 and convert just that chunk to words.
// There are many edge cases. What are some good test cases? 
// Does your code work with input such as 0? Or 1000010? (middle chunk is zero and should not be printed out)

// Time:  O(logn), n is the value of the integer
// Space: O(1)

class Solution {
public:
  string numberToWords(int num) {
    if (!num) {
      return "Zero";
    }
    unordered_map<int, string> lookup = { {1, "One"}, {2, "Two"}, {3, "Three"},
                                          {4, "Four"}, {5, "Five"}, {6, "Six"},
                                          {7, "Seven"}, {8, "Eight"}, {9, "Nine"},

                                          {10, "Ten"}, {11, "Eleven"}, {12, "Twelve"},
                                          {13, "Thirteen"}, {14, "Fourteen"}, {15, "Fifteen"},
                                          {16, "Sixteen"}, {17, "Seventeen"}, {18, "Eighteen"},
                                          {19, "Nineteen"},

                                          {20, "Twenty"}, {30, "Thirty"}, {40, "Forty"},
                                          {50, "Fifty"}, {60, "Sixty"}, {70, "Seventy"},
                                          {80, "Eighty"}, {90, "Ninety"}};
    const vector<string> unit{"", "Thousand", "Million", "Billion"};

    vector<string> res;
    for (int i = 0; num; ++i, num /= 1000) {
      if (num % 1000) {
        res.emplace_back(threeDigits(num % 1000, lookup, unit[i]));
      }
    }
    reverse(res.begin(), res.end());
    return join(res, " ");
  }

private:
  string join(const vector<string>& strings, const string& delimiter) {
    ostringstream joinString;
    copy(strings.begin(), strings.end(), ostream_iterator<string>(joinString, delimiter.c_str()));
    return joinString.str().pop_back();
  }

  string threeDigits(int num, unordered_map<int, string>& lookup, const string& unit) {
    vector<string> res;
    if (num / 100) {
      res.emplace_back(lookup[num / 100] + " " + "Hundred");
    }
    if (num %= 100) {
      if (lookup.find(num) != lookup.end()) {
        res.emplace_back(lookup[num]);
      } else {
        res.emplace_back(lookup[(num / 10) * 10] + " " + lookup[num % 10]);
      }
    }
    if (!unit.empty()) {
      res.emplace_back(unit);
    }
    return join(res, " ");
  }
};
