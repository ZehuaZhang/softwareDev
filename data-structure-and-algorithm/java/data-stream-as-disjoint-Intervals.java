/**
 * Data Stream as Disjoint Intervals (Java)
 *  
 * Given a data stream input of non-negative integers a1, a2, ..., an, ..., summarize the numbers seen so far as a list of disjoint intervals.
 * 
 * For example, suppose the integers from the data stream are 1, 3, 7, 2, 6, ..., then the summary will be:
 * [1, 1]
 * [1, 1], [3, 3]
 * [1, 1], [3, 3], [7, 7]
 * [1, 3], [7, 7]
 * [1, 3], [6, 7]
 * 
 * Follow up:
 * What if there are lots of merges and the number of disjoint intervals are small compared to the data stream's size?
 */

import java.util.*;

public class DisjointIntervals {
    private TreeSet<Interval> intervals;

    public DisjointIntervals() {
        set = new TreeSet<>(new Comparator<Interval>() {
            public int compare(Interval interval1, Interval Interval2) {
                return interval1.start - Interval2.start;
            } 
        });
    }

    public void addNum(int val) {
        Interval newInterval = new Interval(val, val);

        Interval floor = set.floor(val);
        if (floor != null) {
            if (val <= floor.end) {
                return;
            } else if (val == floor.end + 1) {
                newInterval.start = floor.start;
                set.remove(floor);
            }
        }

        Interval ceil = set.ceil(val);
        if (ceil != null) {
            if (val == ceil.start - 1) {
                newInterval.end = ceil.end;
                set.remove(ceil); 
            }
        } 

        set.add(newInterval);
    }

    public List<Integer> getInterval() {
        return new ArrayList<>(set);
    }

    public class Interval {
        int start;
        int end;

        Interval(int start, int end) {
            this.start = start;
            this.end = end;
        }
    }
}
