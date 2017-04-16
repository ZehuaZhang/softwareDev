// 432. All O`one Data Structure
// Difficulty: Hard

// Implement a data structure supporting the following operations:

// Inc(Key) - Inserts a new key with value 1. Or increments an existing key by 1. Key is guaranteed to be a non-empty string.
// Dec(Key) - If Key's value is 1, remove it from the data structure. Otherwise decrements an existing key by 1. 
//            If the key does not exist, this function does nothing. Key is guaranteed to be a non-empty string.
// GetMaxKey() - Returns one of the keys with maximal value. If no element exists, return an empty string "".
// GetMinKey() - Returns one of the keys with minimal value. If no element exists, return an empty string "".
// Challenge: Perform all these in O(1) time complexity.

// Time:  O(1), per operation
// Space: O(k)

class AllOne {
public:
  /** Initialize your data structure here. */
  AllOne() {
  }

  /** Inserts a new key <Key> with value 1. Or increments an existing key by 1. */
  void inc(string key) {
    if (!_idx.count(key)) {
      _idx[key] = _buckets.insert(_buckets.begin(), {0, {key}});
    }

    auto bucket = _idx[key], next = next(bucket);
    if (next == _buckets.end() || next->value > bucket->value + 1) {
      next = _buckets.insert(next, {bucket->value + 1, {}});
    }
    next->keys.insert(key);
    _idx[key] = next;

    bucket->keys.erase(key);
    if (bucket->keys.empty()) {
      _buckets.erase(bucket);
    }
  }

  /** Decrements an existing key by 1. If Key's value is 1, remove it from the data structure. */
  void dec(string key) {
    if (!_idx.count(key)) {
      return;
    }

    auto bucket = _idx[key], prev = prev(bucket);
    _idx.erase(key);
    if (bucket->value > 1) {
      if (bucket == _buckets.begin() || prev->value < bucket->value - 1) {
        prev = _buckets.insert(bucket, {bucket->value - 1, {}});
      }
      prev->keys.insert(key);
      _idx[key] = prev;
    }

    bucket->keys.erase(key);
    if (bucket->keys.empty()) {
      _buckets.erase(bucket);
    }
  }

  /** Returns one of the keys with maximal value. */
  string getMaxKey() {
    return _buckets.empty() ? "" : *(_buckets.rbegin()->keys.begin());
  }

  /** Returns one of the keys with Minimal value. */
  string getMinKey() {
    return _buckets.empty() ? "" : *(_buckets.begin()->keys.begin());
  }

private:
  struct Bucket {
    int value;
    unordered_set<string> keys;
  };
  list<Bucket> _buckets;
  unordered_map<string, list<Bucket>::iterator> _idx;
};

/**
 * Your AllOne object will be instantiated and called as such:
 * AllOne obj = new AllOne();
 * obj.inc(key);
 * obj.dec(key);
 * string param_3 = obj.getMaxKey();
 * string param_4 = obj.getMinKey();
 */