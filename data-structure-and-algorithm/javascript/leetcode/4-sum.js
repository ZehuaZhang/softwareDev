/**
 * 
 * @param { number[] } nums
 * @param { number } target
 * @return { number[][] }
 */
function fourSum(nums) {
    const result = [];
    const target = 0;
    nums.sort((a, b) => a - b);
    for (const i = 0; i < nums.length - 3; ++i) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        for (const j = i + 1; j < nums.length - 2; ++j) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }

            for (const left = j + 1, right = nums.length - 1; left < right;) {
                if (left > j + 1 && nums[left] === nums[left - 1]) {
                    ++left;
                    continue;
                }
                if (right < nums.length - 1 && nums[right] === nums[right + 1]) {
                    --right;
                    continue;
                }
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                    ++left;
                    --right;
                } else if (sum < target) {
                    ++left;
                } else {
                    --right;
                }
            }
        }
    }
    return result;
}