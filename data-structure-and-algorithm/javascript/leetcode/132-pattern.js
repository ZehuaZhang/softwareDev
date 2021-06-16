/**
 * 
 * @param { number[] } nums 
 * @returns 
 */
function find132pattern(nums) {
    if (nums.length < 3) {
        return false;
    }
    const ak = Number.MIN_VALUE;
    const stack = new Stack();
    for (const i = nums.length - 1; i >= 0; --i) {
        if (nums[i] < ak) {
            return true;
        } else {
            while (!stack.isEmpty() && nums[i] > stack.top()) {
                ak = stack.pop();
            }
        }
        stack.push(nums[i]);
    }
    return false;
}