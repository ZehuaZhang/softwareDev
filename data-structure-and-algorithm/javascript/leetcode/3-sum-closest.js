/**
 * 
 * @param { number[] } nums
 * @param { number } target
 * @return { number } 
 */

function threeSumClosest(nums, target) {
    let result = NaN;
    const diff = Number.MIN_VALUE;

    nums.sort((a, b) => a - b);

    for (const i = 0; i < nums.length - 2; ++i) {
        for (const left = i + 1, right = nums.length - 1; left < right;) {
            const sum = nums[i] + nums[left] + nums[right];
            const currDiff = Math.abs(sum - target);
            if (currDiff < diff) {
                diff = currDiff;
                result = sum;
            }
            if (sum < target) {
                ++left;
            } else if (sum > target) {
                --right;
            } else {
                return result;
            }
        }
    }

    return result;
}