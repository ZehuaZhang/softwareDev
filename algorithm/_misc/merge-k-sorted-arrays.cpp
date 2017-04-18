// Merge K Sorted Arrays

class Solution {
public:
  vector<int> mergeKArrays(vector<vector<int>>sorted) {
    vector<int> result;
    pririty_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<tuple<int, int, int>>> minHeap;

    for (int i = 0; i < sorted.size(); ++i) {
      if (!sorted[i].empty()) {
        minHeap.emplace(sorted[i][0], i, 0);
      }
    }

    while (!minHeap.empty()) {
      int e, i, j;
      tie(e, i, j) = minHeap.top(); minHeap.pop();

      result.push_back(e);

      if (j + 1 < sorted[i].size()) {
        minHeap.emplace(sorted[i][j + 1], i, j + 1);
      }
    }
    return result;
  }
};