/**
 * Merge Intervals
 * 
 * Given a collection of intervals, merge all overlapping intervals.
 * 
 * For example,
 * Given [1,3],[2,6],[8,10],[15,18],
 * return [1,6],[8,10],[15,18].
 */

public class Solution {
    private static class MyComparator implements Comparator<Interval> {
        @Override
        public int compare(Interval interval1, Interval interval2) {
            return interval1.start - interval2.start;
        }
    }

    public List<Intervval> merge(List<Interval> intervals) {
        if (intervals == null) {
            throw new NullPointerException();
        }

        List<Interval> result = new ArrayList<Interval>();
        Collections.sort(intervals, new MyComparator());

        Iterator<Interval> iterator = intervals.iterator();
        Interval prev;
        if (iterator.hasNext()) {
            prev = iterator.next();
            result.add(prev);
        }

        while (iterator.hasNext()) {
            Interval curr = iterator.next(); 
            if (prev.end < curr.start) {
                result.add(curr);
                prev = curr;
            } else {
                prev.end = Math.max(prev.end, curr.end);
            }
        }
        
        return result;
    }
}

public class Interval {
    int start;
    int end;
    Interval() {
        start = 0;
        end = 0;
    }
    Interval(int start, int end) {
        this.start = start;
        this.end = end;
    }
}