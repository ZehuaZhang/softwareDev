/*
Implement the RandomizedCollection class:

RandomizedCollection() Initializes the RandomizedCollection object.
bool insert(int val) Inserts an item val into the multiset if not present. Returns true if the item was not present, false otherwise.
bool remove(int val) Removes an item val from the multiset if present. Returns true if the item was present, false otherwise. Note that if val has multiple occurrences in the multiset, we only remove one of them.
int getRandom() Returns a random element from the current multiset of elements (it's guaranteed that at least one element exists when this method is called). The probability of each element being returned is linearly related to the number of same values the multiset contains.
You must implement the functions of the class such that each function works in average O(1) time complexity.



Example 1:

Input
["RandomizedCollection", "insert", "insert", "insert", "getRandom", "remove", "getRandom"]
[[], [1], [1], [2], [], [1], []]
Output
[null, true, false, true, 2, true, 1]

Explanation
RandomizedCollection randomizedCollection = new RandomizedCollection();
randomizedCollection.insert(1);   // return True. Inserts 1 to the collection. Returns true as the collection did not contain 1.
randomizedCollection.insert(1);   // return False. Inserts another 1 to the collection. Returns false as the collection contained 1. Collection now contains [1,1].
randomizedCollection.insert(2);   // return True. Inserts 2 to the collection, returns true. Collection now contains [1,1,2].
randomizedCollection.getRandom(); // getRandom should return 1 with the probability 2/3, and returns 2 with the probability 1/3.
randomizedCollection.remove(1);   // return True. Removes 1 from the collection, returns true. Collection now contains [1,2].
randomizedCollection.getRandom(); // getRandom should return 1 and 2 both equally likely.


Constraints:

-231 <= val <= 231 - 1
At most 2 * 105  calls will be made to insert, remove, and getRandom.
There will be at least one element in the data structure when getRandom is called.
*/

class RandomizedCollection {
  list: number[];
  indexSetMap: Map<number, Set<number>>;
  constructor() {
    this.list = [];
    this.indexSetMap = new Map();
  }

  insert(num: number): boolean {
    this.list.push(num);
    if (!this.indexSetMap.has(num)) {
      this.indexSetMap.set(num, new Set<number>());
    }
    this.indexSetMap.get(num)!.add(this.list.length - 1);

    return this.indexSetMap.get(num)!.size === 1;
  }

  remove(num: number): boolean {
    if (!this.indexSetMap.has(num)) {
      return false;
    }

    const indexSet = this.indexSetMap.get(num)!;
    const index = indexSet.values().next().value;
    indexSet.delete(index);

    this.swap(this.list, index, this.list.length - 1);

    if (index !== this.list.length - 1) {
      const swapIndexSet = this.indexSetMap.get(this.list[index])!;
      swapIndexSet.delete(this.list.length - 1);
      swapIndexSet.add(index);
    }

    if (indexSet.size === 0) {
      this.indexSetMap.delete(num);
    }
    this.list.pop();

    return true;
  }

  getRandom() {
    const randomIndex = Math.trunc(Math.random() * this.list.length);
    return this.list[randomIndex];
  }

  swap(list: number[], i: number, j: number): void {
    const temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }
}
