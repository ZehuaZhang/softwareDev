// 23. Merge k Sorted Lists
// Difficulty: Hard

// Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

// Time:  O(n * logk)
// Space: O(1)

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
 
// Time:  O(n * logk)
// Space: O(logk)
// Divide and Conquer solution.
class Solution2 {
public:
  ListNode *mergeKLists(vector<ListNode *> &lists) {
    return mergeKListsHelper(lists, 0, lists.size() - 1);
  }

private:
  ListNode *mergeKListsHelper(const vector<ListNode *> &lists, int begin, int end) {
    if (begin > end) {
      return nullptr;
    }
    if (begin == end) {
      return lists[begin];
    }
    return mergeTwoLists(mergeKListsHelper(lists, begin, (begin + end) / 2),
     mergeKListsHelper(lists, (begin + end) / 2 + 1, end));
  }

  ListNode *mergeTwoLists(ListNode *l1, ListNode *l2) {
    ListNode dummy{0};
    auto curr = &dummy;

    while (l1 && l2) {
      if (l1->val <= l2->val) {
        curr->next = l1;
        l1 = l1->next;
      } else {
        curr->next = l2;
        l2 = l2->next;
      }
      curr = curr->next;
    }
    curr->next = l1 ? l1 : l2;

    return dummy.next;
  }
};


// Time:  O(n * logk)
// Space: O(k)
// Heap solution.
class Solution3 {
public:
  ListNode* mergeKLists(vector<ListNode*>& lists) {
    ListNode dummy(0);
    auto *cur = &dummy;

    struct Compare {
      bool operator() (const ListNode *a, const ListNode *b) {
        return a->val > b->val;
      }
    };

  // Use min heap to keep the smallest node of each list, build heap O(k)
    priority_queue<ListNode *, vector<ListNode *>, Compare> minHeap;
    for (const auto& list : lists) {
      if (list) {
        minHeap.emplace(list);
      }
    }

  // extract min of k lists, n * logk + k
    while (!minHeap.empty()) {
      // Get min of k lists.
      auto node = minHeap.top();
      minHeap.pop();
      curr->next = node;
      curr = curr->next;
      if (node->next) {
        minHeap.emplace(node->next);
      }
    }
    return dummy.next;
  }
};


// Time:  O(n * logk)
// Space: O(logk)
// Merge two by two solution.
class Solution {
public:
  ListNode* mergeKLists(vector<ListNode*>& lists) {
    if (lists.empty()) {
      return NULL;
    }
    for (int n = lists.size(); n > 1; n = k) {
      int k = (n + 1) / 2;    // [start, (first middle)], [(last middle), last], if odd skip middle
      for (int i = 0; i < n / 2; ++i) {
        lists[i] = mergeTwoLists(lists[i], lists[i + k]);
      }
    }
    return lists[0];
  }

private:
  ListNode *mergeTwoLists(ListNode *l1, ListNode *l2) {
    ListNode dummy{0};
    auto curr = &dummy;

    while (l1 && l2) {
      if (l1->val <= l2->val) {
        curr->next = l1;
        l1 = l1->next;
      } else {
        curr->next = l2;
        l2 = l2->next;
      }
      curr = curr->next;
    }
    curr->next = l1 ? l1 : l2;

    return dummy.next;
  }
};
