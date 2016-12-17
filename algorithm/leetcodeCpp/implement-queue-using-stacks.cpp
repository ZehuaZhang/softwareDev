232. Implement Queue using Stacks
Difficulty: Easy

Implement the following operations of a queue using stacks.

push(x) -- Push element x to the back of queue.
pop() -- Removes the element from in front of queue.
peek() -- Get the front element.
empty() -- Return whether the queue is empty.
Notes:
You must use only standard operations of a stack -- which means only push to top, peek/pop from top, size, and is empty operations are valid.
Depending on your language, stack may not be supported natively. You may simulate a stack by using a list or deque (double-ended queue), 
as long as you use only standard operations of a stack.
You may assume that all operations are valid (for example, no pop or peek operations will be called on an empty queue).

// Time:  O(1), amortized
// Space: O(n)

class Queue {
public:
    // Push element x to the back of queue.
    void push(int x) {
        _in.emplace(x);
    }

    // Removes the element from in front of queue.
    void pop(void) {
        peek();
        _out.pop();
    }

    // Get the front element.
    int peek(void) {
        if (_out.empty()) {
          // Transfers the elements from _in to _out.
          while (!_in.empty()) {
            _out.emplace(_in.top());
            _in.pop();
          }
        }
        return _out.top();
    }

    // Return whether the queue is empty.
    bool empty(void) {
        return _in.empty() && _out.empty();
    }

 private:
  stack<int> _in, _out;
};
