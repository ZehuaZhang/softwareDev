/*
164. Maximum Gap
Difficulty: Hard

Given an unsorted array, find the maximum difference between the successive elements in its sorted form.

Try to solve it in linear time/space.

Return 0 if the array contains less than 2 elements.

You may assume all elements in the array are non-negative integers and fit in the 32-bit signed integer range.

Time:  O(n)
Space: O(n)
*/

import {runTestCaseList} from './util/test';

class Bucket {
  max: number;
  min: number;
  constructor(max = -Infinity, min = Infinity) {
    this.max = max;
    this.min = min;
  }
}

function maximumGap(nums: number[]): number {
  const {length} = nums;
  if (length < 2) {
    return 0;
  }
  const max = Math.max(...nums);
  const min = Math.min(...nums);
  const gap = Math.max(1, Math.trunc((max - min) / (length - 1)));
  const buckets: Bucket[] = [...Array(Math.trunc((max - min) / gap + 1))].map(
    () => new Bucket()
  );

  for (const num of nums) {
    const idx = Math.trunc((num - min) / gap);
    buckets[idx].min = Math.min(buckets[idx].min, num);
    buckets[idx].max = Math.max(buckets[idx].max, num);
  }

  let result = 0;
  let prev = min;
  for (const bucket of buckets) {
    if (bucket.min !== Infinity) {
      result = Math.max(result, bucket.min - prev);
      prev = bucket.max;
    }
  }
  result = Math.max(result, max - prev);
  return result;
}

// tests

const testInputListCollection = [[[3, 6, 9, 1]]];

const expectedResultList = [3];

runTestCaseList(testInputListCollection, expectedResultList, maximumGap);
