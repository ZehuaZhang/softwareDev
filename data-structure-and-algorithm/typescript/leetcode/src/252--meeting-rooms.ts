/*
252. Meeting Rooms

Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), determine if a person could attend all meetings.

Example 1:

Input: [[0,30],[5,10],[15,20]]
Output: false
Example 2:

Input: [[7,10],[2,4]]
Output: true
NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.
*/

function canAttendMeetings(intervals: number[][]): boolean {
  intervals.sort(([s1], [s2]) => s1 - s2);
  for (let i = 1; i < intervals.length; ++i) {
    const [s] = intervals[i];
    const [_, e] = intervals[i - 1];
    if (s < e) {
      return false;
    }
  }
  return true;
}
