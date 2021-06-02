// 295. Find Median from Data Stream
// Difficulty: Hard

// Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value.
// So the median is the mean of the two middle value.

// Examples: 
// [2,3,4] , the median is 3

// [2,3], the median is (2 + 3) / 2 = 2.5

// Design a data structure that supports the following two operations:

// void addNum(int num) - Add a integer number from the data stream to the data structure.
// double findMedian() - Return the median of all elements so far.
// For example:

// add(1)
// add(2)
// findMedian() -> 1.5
// add(3) 
// findMedian() -> 2


// Time:  O(nlogn) for total n addNums, O(logn) per addNum, O(1) per findMedian.
// Space: O(n), total space

// Heap solution.
class MedianFinder {
public:
  // Adds a number into the data structure.
  void addNum(int num) {
    // Balance smaller half and larger half.
    if (_minHeap.empty() || num > _minHeap.top()) {
      _minHeap.emplace(num);
      if (_minHeap.size() > _maxHeap.size() + 1) {
        _maxHeap.emplace(_minHeap.top()); _minHeap.pop();
      }
    } else {
      _maxHeap.emplace(num);
      if (_maxHeap.size() > _minHeap.size()) {
        _minHeap.emplace(_maxHeap.top()); _maxHeap.pop();
      }
    }
  }

  // Returns the median of current data stream
  double findMedian() {
    return _minHeap.size() == _maxHeap.size() ? (_maxHeap.top() + _minHeap.top()) / 2.0 : _minHeap.top();
  }

private:
  // _minHeap stores the larger half seen so far.
  priority_queue<int, vector<int>, greater<int>> _minHeap;
  // _maxHeap stores the smaller half seen so far.
  priority_queue<int, vector<int>, less<int>> _maxHeap;
};

// Your MedianFinder object will be instantiated and called as such:
// MedianFinder mf;
// mf.addNum(1);
// mf.findMedian();
