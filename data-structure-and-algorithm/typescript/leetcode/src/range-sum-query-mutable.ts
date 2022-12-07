/*
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
  constructor(nums) {
    this.nums = Array(nums.length + 1).fill(0);
    this.bits = Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; ++i) {
      this.update(i, nums[i]);
    }
  }

  update(i, value) {
    const diff = value - this.nums[i + 1];
    for (let j = i + 1; j < this.bits.length; j += j & -j) {
      this.bits[j] += diff;
    }
    this.nums[i + 1] = value;
  }

  sumRange(i, j) {
    return this.getSum(j + 1) - this.getSum(i);
  }

  getSum(i) {
    let result = 0;
    for (let j = i; j > 0; j -= j & -j) {
      result += this.bits[j];
    }
    return result;
  }
}
