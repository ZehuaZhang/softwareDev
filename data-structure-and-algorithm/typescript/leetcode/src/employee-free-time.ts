/*
We are given a list schedule of employees, which represents the working time for each employee.

Each employee has a list of non-overlapping Intervals, and these intervals are in sorted order.

Return the list of finite intervals representing common, positive-length free time for all employees, also in sorted order.

Example 1:

Input: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
Output: [[3,4]]
Explanation:
There are a total of three employees, and all common
free time intervals would be [-inf, 1], [3, 4], [10, inf].
We discard any intervals that contain inf as they aren't finite.


Example 2:

Input: schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]
Output: [[5,6],[7,9]]


(Even though we are representing Intervals in the form [x, y], the objects inside are Intervals, not lists or arrays. For example, schedule[0][0].start = 1, schedule[0][0].end = 2, and schedule[0][0][0] is not defined.)

Also, we wouldn't include intervals like [5, 5] in our answer, as they have zero length.

Note:

schedule and schedule[i] are lists with lengths in range [1, 50].
0 <= schedule[i].start < schedule[i].end <= 10^8.
*/

function employeeFreeTime(scheduleList: number[][][]): number[][] {
  const result: number[][] = [];
  const list: number[][] = [];
  for (const schedule of scheduleList) {
    list.push(...schedule);
  }
  list.sort(([s1], [s2]) => s1 - s2);
  let curr = list[0];
  for (const interval of list) {
    const [s, e] = curr;
    const [s1, e1] = interval;
    if (e < s1) {
      result.push([e, s1]);
      curr = interval;
    } else {
      curr = e < e1 ? interval : curr;
    }
  }
  return result;
}
