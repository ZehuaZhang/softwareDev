// Merge K Sorted Arrays

vector<int> mergeKArrays(vector<vector<int>>sorted) {
  vector<int> result;
  pririty_queue<int, vector<int>, less<int>> minHeap;

  for (int i = 0; i < sorted.size(); i++) {
    if (!sorted[i].empty()) {
      minHeap.push(make_tuple(sorted[i][0], i, 0));
    }
  }
  
  while (!minHeap.empty()) {
    int e, i, j;
    tie(e, i , j) = minHeap.top(); minHeap.pop();

    result.push_back(e);
    
    if (j + 1 < sorted[i].size()) {
      minHeap.push(make_tuple(sorted[i][j + 1], i, j + 1));
    }
  }
  return result;
}