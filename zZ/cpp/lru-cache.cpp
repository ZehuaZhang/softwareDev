// 146. LRU Cache
// Difficulty: Hard

// Design and implement a data structure for Least Recently Used (LRU) cache. 
// It should support the following operations: get and set.

// get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
// set(key, value) - Set or insert the value if the key is not already present. 
// When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

// Time:  O(1), per operation.
// Space: O(k), k is the capacity of cache.

#include <list>

class LRUCache {
public:
  LRUCache(int capacity) : _capacity(capacity) {
  }

  int get(int key) {
    if (_idx.count(key)) {
      _list.splice(_list.begin(), _list, _idx[key]);
      _idx[key] = _list.begin();
      return _idx[key]->second;
    } 
    return -1;
  }

  void set(int key, int value) {
    if (_idx.count(key)) {
      _list.splice(_list.begin(), _list, _idx[key]);
      _idx[key] = _list.begin();
      _idx[key]->second = value;
    } else {
      if (_capacity == _list.size()) {
        _idx.erase(_list.back().first);
        _list.pop_back();
      }
      _list.push_front({key, value});
      _idx[key] = _list.begin();
    }
  }

private:
  list<pair<int, int>> _list; // key, value
  unordered_map<int, list<pair<int, int>>::iterator> _idx; // key, list iterator
  int _capacity;
};
