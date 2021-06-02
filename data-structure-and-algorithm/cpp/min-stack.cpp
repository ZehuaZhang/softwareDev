// 155. Min Stack
// Difficulty: Easy

// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

// push(x) -- Push element x onto stack.
// pop() -- Removes the element on top of the stack.
// top() -- Get the top element.
// getMin() -- Retrieve the minimum element in the stack.

// Example:
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin();   --> Returns -3.
// minStack.pop();
// minStack.top();      --> Returns 0.
// minStack.getMin();   --> Returns -2.

// Time:  O(n)
// Space: O(1)

class MinStack {
public:
  void push(int x) {
    if (_diff.empty()) {
      _diff.emplace(0);
      _stackMin = x;
    } else {
      _diff.emplace(static_cast<int64_t>(x) - _stackMin); // compare with previous min
      _stackMin = min(_stackMin, x); // Update min.
    }
  }

  void pop() {
    if (_diff.top() < 0) {
      _stackMin -= _diff.top(); // Restore previous min.
    }
    _diff.pop();
  }

  int top() {
    if (_diff.top() > 0) {
      return _stackMin + _diff.top();
    }
    return _stackMin;
  }

  int getMin() {
    return _stackMin;
  }

private:
  stack<int64_t> _diff;
  int _stackMin;
};