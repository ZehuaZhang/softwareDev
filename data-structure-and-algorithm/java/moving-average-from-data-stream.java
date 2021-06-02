/**
 * Moving Average from Data Stream
 * 
 * Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.
 * 
 * For example,
 * MovingAverage m = new MovingAverage(3);
 * m.next(1) = 1
 * m.next(10) = (1 + 10) / 2
 * m.next(3) = (1 + 10 + 3) / 3
 * m.next(5) = (10 + 3 + 5) / 3
 */

import java.util.LinkedList;
import java.util.Queue;

public class MovingAverage {
    MovingAverage(int size) {
        this.size = size;
        sum = 0;
        queue = new LinkedList<>();
    }

    public double next(int x) {
        if (queue.size() == size) {
           sum -= queue.poll(); 
        }

        sum += x;
        queue.offer(x);

        return sum / queue.size();
    }

    private Queue<Integer> queue;
    private int size;
    private double sum;
}