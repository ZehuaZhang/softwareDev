/**
 * @param { number[] } nums 
 * @param { number} target
 * @return { number } 
 */
function threeSumSmaller (nums, target) {
    nums.sort((a, b) => a - b);

    let result = 0;

    for (const i = 0; i < nums.length - 2; ++i) {
        for (const left = i + 1, right = nums.length - 1; left < right;) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum < target) {
                result += right - left;
                ++left;
            } else {
                --right;
            }
        }
    }

    return result;
}