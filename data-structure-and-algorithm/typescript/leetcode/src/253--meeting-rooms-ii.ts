/*
253. Meeting Rooms II

Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.

Example 1:

Input: [[0, 30],[5, 10],[15, 20]]
Output: 2
Example 2:

Input: [[7,10],[2,4]]
Output: 1
*/

function minMeetingRooms(intervals: number[][]): number {
  const sl: number[] = [];
  const el: number[] = [];

  for (const [s, e] of intervals) {
    sl.push(s);
    el.push(e);
  }

  sl.sort((a, b) => a - b);
  el.sort((a, b) => a - b);

  let rslt = 0;
  let i = 0;
  for (const s of sl) {
    const e = el[i];
    if (s < e) {
      ++rslt;
    } else {
      ++i;
    }
  }

  return rslt;
}
