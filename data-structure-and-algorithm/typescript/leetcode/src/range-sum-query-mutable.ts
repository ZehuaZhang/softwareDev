/*
307. Range Sum Query - Mutable

Given an integer array nums, handle multiple queries of the following types:

Update the value of an element in nums.
Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
void update(int index, int val) Updates the value of nums[index] to be val.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).


Example 1:

Input
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
Output
[null, 9, null, 8]

Explanation
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
numArray.update(1, 2);   // nums = [1, 2, 5]
numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8


Constraints:

1 <= nums.length <= 3 * 104
-100 <= nums[i] <= 100
0 <= index < nums.length
-100 <= val <= 100
0 <= left <= right < nums.length
At most 3 * 104 calls will be made to update and sumRange.
*/

class NumArray {
  numList: number[];
  bitList: number[];
  constructor(numList: number[]) {
    this.numList = Array(numList.length + 1).fill(0);
    this.bitList = Array(numList.length + 1).fill(0);
    for (let i = 0; i < numList.length; ++i) {
      this.update(i, numList[i]);
    }
  }

  update(i: number, data: number): void {
    const diff = data - this.numList[i + 1];
    for (let j = i + 1; j < this.bitList.length; j += this.leastBit(j)) {
      this.bitList[j] += diff;
    }
    this.numList[i + 1] = data;
  }

  sumRange(i: number, j: number): number {
    return this.getSum(j) - this.getSum(i - 1);
  }

  getSum(i: number): number {
    let result = 0;
    for (let j = i + 1; j > 0; j -= this.leastBit(j)) {
      result += this.bitList[j];
    }
    return result;
  }

  leastBit(j: number): number {
    return j & -j;
  }
}
