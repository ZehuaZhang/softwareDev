// 379. Design Phone Directory
// Difficulty : Medium 

// Design a Phone Directory which supports the following operations:

// get: Provide a number which is not assigned to anyone.
// check: Check if a number is available or not.
// release: Recycle or release a number.
// Example:

// Init a phone directory containing a total of 3 numbers: 0, 1, and 2.
// PhoneDirectory directory = new PhoneDirectory(3);

// It can return any available phone number. Here we assume it returns 0.
// directory.get();

// Assume it returns 1.
// directory.get();

// The number 2 is available, so return true.
// directory.check(2);

// It returns 2, the only number that is left.
// directory.get();

// The number 2 is no longer available, so return false.
// directory.check(2);

// Release number 2 back to the pool.
// directory.release(2);

// Number 2 is available again, return true.
// directory.check(2);

/**
 * Your PhoneDirectory object will be instantiated and called as such:
 * PhoneDirectory obj = new PhoneDirectory(maxNumbers);
 * int param_1 = obj.get();
 * bool param_2 = obj.check(number);
 * obj.release(number);
 */

// init:     Time: O(n), Space: O(n)
// get:      Time: O(1), Space: O(1)
// check:    Time: O(1), Space: O(1)
// release:  Time: O(1), Space: O(1)

 class PhoneDirectory {
 public:
  /** Initialize your data structure here
      @param maxNumbers - The maximum numbers that can be stored in the phone directory. */
  PhoneDirectory(int maxNumbers) : _curr{0}, _numbers(maxNumbers), _used(maxNumbers) {  // Time: O(n), Space: O(n)
    iota(_numbers.begin(), _numbers.end(), 0);
  }

  /** Provide a number which is not assigned to anyone.
      @return - Return an available number. Return -1 if none is available. */
  int get() {  // Time: O(1), Space: O(1)
    if (_curr == _numbers.size()) {
      return -1;
    }
    const auto number = _numbers[_curr++];
    _used[number] = true;
    return number;
  }

  /** Check if a number is available or not. */
  bool check(int number) {  // Time: O(1), Space: O(1)
    if (number < 0 || number >= _numbers.size()) {
      return false;
    }
    return !_used[number];
  }

  /** Recycle or release a number. */
  void release(int number) {  // Time: O(1), Space: O(1)
    if (number < 0 || number >= _numbers.size() || !_used[number]) {
      return;
    }
    _used[number] = false;
    _numbers[--_curr] = number;
  }

private:
  int _curr;
  vector<int> _numbers;
  vector<bool> _used;
};