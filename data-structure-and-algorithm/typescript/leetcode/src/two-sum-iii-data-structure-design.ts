/**
 * Two Sum III - Data structure design
 *
 * Design and implement a TwoSum class. It should support the following operations:add and find.
 *
 * add - Add the number to an internal data structure.
 * find - Find if there exists any pair of numbers which sum is equal to the value.
 *
 * For example,
 * add(1); add(3); add(5);
 * find(4) -> true
 * find(7) -> false
 */

class TwoSum {
  countMap: Map<number, number>;
  constructor() {
    this.countMap = new Map<number, number>();
  }

  add(num: number) {
    this.countMap.set(num, (this.countMap.get(num) || 0) + 1);
  }

  find(sum: number): boolean {
    for (const num of this.countMap.keys()) {
      const num2 = sum - num;
      if (
        this.countMap.has(num2) &&
        (num2 !== num || this.countMap.get(num)! > 1)
      ) {
        return true;
      }
    }

    return false;
  }
}
