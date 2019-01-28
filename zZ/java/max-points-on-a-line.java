/**
 * Max Points on a Line
 * 
 * Given n points on a 2D plane, find the maximum number of points that lie on the same straight line.
 */

import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int maxPoints(Point[] points) {
        if (points == null) {
            throw new NullPointerException();
        }

        int result = 0;
        for (int i = 0; i < points.length; ++i) {
            int duplicate = 1;
            Map<Double, Integer> slopePointCount = new HashMap<>();
            for (int j = i + 1; j < points.length; ++j) {
                if (points[i].x == points[j].x && points[i].y == points[j].y) {
                    ++duplicate;
                } else if (points[i].x == points[j].x) {
                    slopePointCount.put(Double.MAX_VALUE, slopePointCount.getOrDefault(Double.MAX_VALUE, 0) + 1);
                } else {
                    double slope = (double)(points[i].y - points[j].y) / (points[i].x - points[j].x);
                    slopePointCount.put(slope, slopePointCount.getOrDefault(slope, 0) + 1);
                }
            }
            result = Math.max(result, duplicate);
            for (Map.Entry<Double, Integer> entry : slopePointCount.entrySet()) {
                result = Math.max(result, entry.getValue() + duplicate);
            }
        }

        return result;
    }
}

public class Point {
    int x;
    int y;
    
    Point() {
        x = 0;
        y = 0;
    }

    Point(int a, int b) {
        x = a;
        y = b;
    }
}