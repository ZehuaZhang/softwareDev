// 362. Design Hit Counter
// Difficulty : Medium 

// Design a hit counter which counts the number of hits received in the past 5 minutes.

// Each function accepts a timestamp parameter (in seconds granularity) 
// and you may assume that calls are being made to the system in chronological order 
// (ie, the timestamp is monotonically increasing). You may assume that the earliest timestamp starts at 1.

// It is possible that several hits arrive roughly at the same time.

// Example:
// HitCounter counter = new HitCounter();

// hit at timestamp 1.
// counter.hit(1);

// hit at timestamp 2.
// counter.hit(2);

// hit at timestamp 3.
// counter.hit(3);

// get hits at timestamp 4, should return 3.
// counter.getHits(4);

// hit at timestamp 300.
// counter.hit(300);

// get hits at timestamp 300, should return 4.
// counter.getHits(300);

// get hits at timestamp 301, should return 3.
// counter.getHits(301); 
// Follow up:
// What if the number of hits per second could be very large? Does your design scale?

/**
 * Your HitCounter object will be instantiated and called as such:
 * HitCounter obj = new HitCounter();
 * obj.hit(timestamp);
 * int param_2 = obj.getHits(timestamp);
 */

// Time:  O(1), amortized
// Space: O(k), k is the count of seconds.

class HitCounter {
public:
  /** Initialize your data structure here. */
  HitCounter() : _count(0) {
  }

  /** Record a hit.
      @param timestamp - The current timestamp (in seconds granularity). */
  void hit(int timestamp) {
    getHits(timestamp);
    if (!_dq.empty() && _dq.back().first == timestamp) {
      ++_dq.back().second;
    } else {
      _dq.emplace_back(timestamp, 1);
    }
    ++_count;
  }

  /** Return the number of hits in the past 5 minutes.
      @param timestamp - The current timestamp (in seconds granularity). */
  int getHits(int timestamp) {
    while (!_dq.empty() && _dq.front().first <= timestamp - _k) {
      _count -= _dq.front().second; _dq.pop_front();
    }
    return _count;
  }

private:
  const int _k = 300;
  int _count;
  deque<pair<int, int>> _dq;
};