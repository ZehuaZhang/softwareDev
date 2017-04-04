// 341. Flatten Nested List Iterator
// Difficulty: Medium

// Given a nested list of integers, implement an iterator to flatten it.

// Each element is either an integer, or a list -- whose elements may also be integers or other lists.

// Example 1:
// Given the list [[1,1],2,[1,1]],

// By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,1,2,1,1].

// Example 2:
// Given the list [1,[4,[6]]],

// By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,4,6].

// Time:  O(n), n is the number of the integers.
// Space: O(h), h is the depth of the nested lists.

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *   public:
 *     // Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     bool isInteger() const;
 *
 *     // Return the single integer that this NestedInteger holds, if it holds a single integer
 *     // The result is undefined if this NestedInteger holds a nested list
 *     int getInteger() const;
 *
 *     // Return the nested list that this NestedInteger holds, if it holds a nested list
 *     // The result is undefined if this NestedInteger holds a single integer
 *     const vector<NestedInteger> &getList() const;
 * };
 */
 
// Using stack and iterator.
class NestedIterator {
public:
  NestedIterator(vector<NestedInteger> &nestedList) {
    _depth.emplace(nestedList.cbegin(), nestedList.cend());
  }

  int next() {
    return (_depth.top().first++)->getInteger();
  }
  
  bool hasNext() {
    while (!_depth.empty()) {
      auto cur = _depth.top();
      if (cur.first == cur.second) {
        _depth.pop();
      } else if (cur.first->isInteger()) {
        return true;
      } else {
        auto nestedList = (cur.first++)->getList();
        _depth.emplace(nestedList.cbegin(), nestedList.cend());
      }
    }
    return false;
  }

private:
  using it = vector<NestedInteger>::const_iterator;
  stack<pair<it, it>> _depth;
};

/**
 * Your NestedIterator object will be instantiated and called as such:
 * NestedIterator i(nestedList);
 * while (i.hasNext()) cout << i.next();
 */
 
