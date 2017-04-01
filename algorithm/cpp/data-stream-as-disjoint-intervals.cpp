// 352. Data Stream as Disjoint Intervals
// Difficulty: Hard

// Given a data stream input of non-negative integers a1, a2, ..., an, ..., summarize the numbers seen so far as a list of disjoint intervals.

// For example, suppose the integers from the data stream are 1, 3, 7, 2, 6, ..., then the summary will be:

// [1, 1]
// [1, 1], [3, 3]
// [1, 1], [3, 3], [7, 7]
// [1, 3], [7, 7]
// [1, 3], [6, 7]
// Follow up:
// What if there are lots of merges and the number of disjoint intervals are small compared to the data stream size?

// Time:  addNum: O(logn), getIntervals: O(n), n is the number of disjoint intervals.
// Space: O(n)

/**
 * Definition for an interval.
 * struct Interval {
 *     int start;
 *     int end;
 *     Interval() : start(0), end(0) {}
 *     Interval(int s, int e) : start(s), end(e) {}
 * };
 */
// Using set.
class SummaryRanges {
public:
  /** Initialize your data structure here. */
  SummaryRanges() { 
  }

  void addNum(int val) {
    auto it = _intervals.upper_bound(Interval(val, val));
    int start = val, end = val;
    if (it != _intervals.begin() && prev(it)->end + 1 >= start) {
      --it;
    }
    while (it != _intervals.end() && end + 1 >= it->start) {
      start = min(start, it->start);
      end = max(end, it->end);
      it = _intervals.erase(it);
    }
    _intervals.insert(it, Interval(start, end));
  }

  vector<Interval> getIntervals() {
    return {_intervals.cbegin(), _intervals.cend()};
  }

private:
  struct Compare {
    bool operator() (const Interval& a, const Interval& b) {
      return a.start < b.start;
    }
  };
  set<Interval, Compare> _intervals;
};

/**
 * Your SummaryRanges object will be instantiated and called as such:
 * SummaryRanges obj = new SummaryRanges();
 * obj.addNum(val);
 * vector<Interval> param_2 = obj.getIntervals();
 */
 
