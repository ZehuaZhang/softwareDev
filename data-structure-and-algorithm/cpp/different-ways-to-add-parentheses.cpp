// 241. Different Ways to Add Parentheses
// Difficulty: Medium

// Given a string of numbers and operators, 
// return all possible results from computing all the different possible ways to group numbers and operators. 
// The valid operators are +, - and *.

// Example 1
// Input: "2-1-1".

// ((2-1)-1) = 0
// (2-(1-1)) = 2
// Output: [0, 2]


// Example 2
// Input: "2*3-4*5"

// (2*(3-(4*5))) = -34
// ((2*3)-(4*5)) = -14
// ((2*(3-4))*5) = -10
// (2*((3-4)*5)) = -10
// (((2*3)-4)*5) = 10
// Output: [-34, -14, -10, -10, 10]

// Time:  O(n * (C(2n, n) - C(2n, n - 1))), this is at most
// Space: O(n * (C(2n, n) - C(2n, n - 1)))

class Solution {
public:
  vector<int> diffWaysToCompute(string input) {
    const int n = input.length();
    vector<vector<vector<int>>> lookup(n + 1, vector<vector<int>>(n + 1));
    return diffWaysToCompute(input, 0, input.length(), lookup);
  }

private:
  vector<int> diffWaysToCompute(const string& input, const int start, const int end, vector<vector<vector<int>>>& lookup) {
    if (!lookup[start][end].empty()) {
      return lookup[start][end];
    }
    vector<int> result;
    for (int i = start; i < end; ++i) {
      if (string("+-*").find(input[i]) != string::npos) {
        for (auto left : diffWaysToCompute(input, start, i, lookup)) {
          for (auto right : diffWaysToCompute(input, i + 1, end, lookup)) {
            switch (input[i]) {
              case '+' : result.emplace_back(left + right); break;
              case '-' : result.emplace_back(left - right); break;
              case '*' : result.emplace_back(left * right); break;
            }
          }
        }
      }
    }
    if (result.empty()) {
      result.emplace_back(stoi(input.substr(start, end - start)));
    }
    return lookup[start][end] = result;
  }
};