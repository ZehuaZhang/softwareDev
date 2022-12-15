/*
If the depth of a tree is smaller than 5, then this tree can be represented by a list of three-digits integers.

For each integer in this list:

The hundreds digit represents the depth D of this node, 1 <= D <= 4.
The tens digit represents the position P of this node in the level it belongs to, 1 <= P <= 8. The position is the same as that in a full binary tree.
The units digit represents the value V of this node, 0 <= V <= 9.


Given a list of ascending three-digits integers representing a binary tree with the depth smaller than 5, you need to return the sum of all paths from the root towards the leaves.

Example 1:

Input: [113, 215, 221]
Output: 12
Explanation:
The tree that the list represents is:
    3
   / \
  5   1

The path sum is (3 + 5) + (3 + 1) = 12.


Example 2:

Input: [113, 221]
Output: 4
Explanation:
The tree that the list represents is:
    3
     \
      1

The path sum is (3 + 1) = 4.
*/

function pathSum(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  const levelPosDataMap = new Map<number, number>();
  for (const num of nums) {
    levelPosDataMap.set(Math.trunc(num / 10), num % 10);
  }
  let result = 0;
  pathSumDfs(Math.trunc(nums[0] / 10), 0);
  return result;

  function pathSumDfs(levelPos: number, path: number): void {
    const level = Math.trunc(levelPos / 10);
    const pos = levelPos % 10;
    const left = (level + 1) * 10 + 2 * pos - 1;
    const right = left + 1;
    path += levelPosDataMap.get(levelPos)!;
    if (!levelPosDataMap.has(left) && !levelPosDataMap.has(right)) {
      result += path;
      return;
    }
    if (levelPosDataMap.has(left)) {
      pathSumDfs(left, path);
    }
    if (levelPosDataMap.has(right)) {
      pathSumDfs(right, path);
    }
  }
}
