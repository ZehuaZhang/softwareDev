// 346. Moving Average from Data Stream
// Difficulty : Easy 

// Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

// For example,
// MovingAverage m = new MovingAverage(3);
// m.next(1) = 1
// m.next(10) = (1 + 10) / 2
// m.next(3) = (1 + 10 + 3) / 3
// m.next(5) = (10 + 3 + 5) / 3

/**
 * Your MovingAverage object will be instantiated and called as such:
 * MovingAverage obj = new MovingAverage(size);
 * double param_1 = obj.next(val);
 */

// Time:  O(1)
// Space: O(w)

class MovingAverage {
public:
    /** Initialize your data structure here. */
    MovingAverage(int size) : _size(size), _sum(0) {
    }
    
    double next(int val) {
        if (_q.size() == _size) {
            _sum -= _q.front();
            _q.pop();
        }
        _q.emplace(val);
        _sum += val;
        return 1.0 * _sum / _q.size();
    }

private:
    int _size;
    int _sum;
    queue<int> _q;
};