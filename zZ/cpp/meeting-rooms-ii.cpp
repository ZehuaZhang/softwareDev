// 253. Meeting Rooms II
// Difficulty : Medium

// Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), 
// find the minimum number of conference rooms required.

// For example,
// Given [[0, 30],[5, 10],[15, 20]],
// return 2.

// Time:  O(nlogn)
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
 class Solution {
 public:
  int minMeetingRooms(vector<Interval>& intervals) {
    vector<int> starts, ends;
    for (auto interval : intervals) {
      starts.emplace_back(interval.start);
      ends.emplace_back(interval.end);
    }
    sort(starts.begin(), starts.end());
    sort(ends.begin(), ends.end());

    int minRooms = 0, cntRooms = 0;
    for (int s = 0, e = 0; s < starts.size();) {
      if (starts[s] < ends[e]) {
        minRooms = max(minRooms, ++cntRooms);
        ++s;
      } else {
        --cntRooms;
        ++e;
      }
    }
    return minRooms;
  }
};
