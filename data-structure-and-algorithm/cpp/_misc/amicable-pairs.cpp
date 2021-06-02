// Find Amacible Pairs.

// The pair of numbers 220 and 284 have the curious property that each "contains" the other.
// In what way?  In the sense that the sum of the proper positive divisors of each, sum to the other.
// For 220	1+2+4+5+10+11+20+22+44+55+110 = 284
// For 284	1+2+4+71+142 = 220
// Such pairs of numbers are called amicable numbers
// (amicable means friendly--but there is a different set of number actually called friendly number.).
// Find all pairs of amacible numbers, within 1 to n

class Solution {
public:
  vector<pair<int, int>> amaciblePair(int n) {
    vector<pair<int, int>> result;
    unordered_set<int> visited;
    for (int i = 1; i <= n; ++i) {
      if (!visited.count(i)) {
        int sumOfDiv = divisorSum(i);
        if (sumOfDiv <= n) {
          result.emplace_back(i, sumOfDiv);
          visited.insert(sumOfDiv);
        }
      }
    }
    return result;
  }

private:
  int divisorSum(int num) {
    int sum = 0;
    for (int i = 1; i <= sqrt(num); ++i) {
      if (num % i == 0) {
        sum += i;
        if (i != num / i) {
          sum += num / i;
        }
      }
    }
    return sum;
  }
};
