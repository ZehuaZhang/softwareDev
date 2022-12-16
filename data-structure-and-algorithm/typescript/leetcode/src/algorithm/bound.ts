function findLess(nums: number[], target: number): number {
  let [left, right] = [0, nums.length - 1];
  while (left <= right) {
    const mid = left + Math.trunc((right - left) / 2);
    if (nums[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return right;
}

function findLessEqual(nums: number[], target: number): number {
  let [left, right] = [0, nums.length - 1];
  while (left <= right) {
    const mid = left + Math.trunc((right - left) / 2);
    if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return right;
}

function findGreaterEqual(nums: number[], target: number): number {
  let [left, right] = [0, nums.length - 1];
  while (left <= right) {
    const mid = left + Math.trunc((right - left) / 2);
    if (nums[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

function findGreater(nums: number[], target: number): number {
  let [left, right] = [0, nums.length - 1];
  while (left <= right) {
    const mid = left + Math.trunc((right - left) / 2);
    if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

export function findKth(
  nums: number[],
  kth: number,
  compare: (a: number, b: number) => number
): number {
  let [left, right] = [0, nums.length - 1];
  while (left <= right) {
    const randomIndex = left + Math.trunc(Math.random() * (right - left + 1));
    const partitionIndex = partition(nums, left, right, randomIndex);
    if (partitionIndex === kth - 1) {
      return nums[kth - 1];
    } else if (partitionIndex > kth - 1) {
      right = partitionIndex - 1;
    } else {
      left = partitionIndex + 1;
    }
  }
  return nums[left];

  function partition(
    items: number[],
    left: number,
    right: number,
    pivotIndex: number
  ): number {
    swap(items, right, pivotIndex);

    let nextPivotIndex = left;
    for (let index = left; index < right; ++index) {
      if (compare(nums[index], nums[right])) {
        swap(items, nextPivotIndex++, index);
      }
    }

    swap(items, nextPivotIndex, right);
    return nextPivotIndex;
  }

  function swap(items: number[], i: number, j: number): void {
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }
}

// test

// const nums = [1, 2, 3, 4, 4, 5, 6, 7];
// console.log(findLess(nums, 4));
// console.log(findLessEqual(nums, 4));
// console.log(findGreater(nums, 4));
// console.log(findGreaterEqual(nums, 4));
// console.log(findLess(nums, 5));
// console.log(findLessEqual(nums, 5));
// console.log(findGreater(nums, 5));
// console.log(findGreaterEqual(nums, 5));
