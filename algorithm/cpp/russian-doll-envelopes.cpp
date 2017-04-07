// 354. Russian Doll Envelopes
// Difficulty: Hard

// You have a number of envelopes with widths and heights given as a pair of integers (w, h). 
// One envelope can fit into another if and only if both the width and 
// height of one envelope is greater than the width and height of the other envelope.

// What is the maximum number of envelopes can you Russian doll? (put one inside other)

// Example:
// Given envelopes = [[5,4],[6,4],[6,7],[2,3]],
// the maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).

// Time:  O(nlogn + nlogk) = O(nlogn), k is the length of the result.
// Space: O(1)

class Solution {
public:
  int maxEnvelopes(vector<pair<int, int>>& envelopes) {
    vector<int> result;

    sort(envelopes.begin(), envelopes.end(), 
      [](const pair<int, int>& a, const pair<int, int>& b) {
        if (a.first == b.first) {
          return a.second > b.second;
        }
        return a.first < b.first;
      });

    for (auto envelope : envelopes) {
      int height = envelope.second;
      auto it = lower_bound(result.begin(), result.end(), height);
      if (it == result.end()) {
        result.emplace_back(height);
      } else {
        *it = target;
      }
    }

    return result.size();
  }
};
