// 460. LFU Cach
// Difficulty: Hard

// Design and implement a data structure for Least Frequently Used (LFU) cache.
// It should support the following operations: get and put.

// get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
// put(key, value) - Set or insert the value if the key is not already present.
// When the cache reaches its capacity, it should invalidate the least frequently used item before inserting a new item.
// For the purpose of this problem, when there is a tie (i.e., two or more keys that have the same frequency),
// the least recently used key would be evicted.

// Follow up:
// Could you do both operations in O(1) time complexity?

// Example:

// LFUCache cache = new LFUCache( 2 /* capacity */ );

// cache.put(1, 1);
// cache.put(2, 2);
// cache.get(1);       // returns 1
// cache.put(3, 3);    // evicts key 2
// cache.get(2);       // returns -1 (not found)
// cache.get(3);       // returns 3.
// cache.put(4, 4);    // evicts key 1.
// cache.get(1);       // returns -1 (not found)
// cache.get(3);       // returns 3
// cache.get(4);       // returns 4

// Time:  O(1), per operation.
// Space: O(k), k is the capacity of cache.

#include <list>

class LFUCache {
public:
    // @param capacity, an integer
  LFUCache(int capacity) : _capacity(capacity) {
  }

  int get(int key) {
    if (_idx.count(key) && _capacity) {
      const auto value = _idx[key]->value;
      update(key, value);
      return value;
    }
    return -1;
  }

  void set(int key, int value) {
    if (!_capacity) {
      return;
    }
    // If cache is full while inserting, remove the last one.
    if (!_idx.count(key) && _list.size() == _capacity) {
      _idx.erase(_list.front().key); _list.pop_front();
    }
    update(key, value);
  }

private:
  struct node {
    node(int k, int v, int f) : key(k), value(v), freq(f) {}
    int key;
    int value;
    int freq;
  };

  list<node> _list;
  unordered_map<int, list<node>::iterator> _idx;
  int _capacity;

  // Update (key, iterator of (key, value)) pair
  void update(int key, int value) {
    int freq = 0;
    auto it = _list.begin();
    if (_idx.count(key)) {
      freq = _idx[key]->freq;
      it = next(_idx[key]);
      _list.erase(_idx[key]);
    }
    ++freq;
    while (it != _list.end() && freq >= it->freq) {
      ++it;
    }
    _idx[key] = _list.emplace(it, node(key, value, freq));
  }
};


/**
 * Your LFUCache object will be instantiated and called as such:
 * LFUCache obj = new LFUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.set(key,value);
 */