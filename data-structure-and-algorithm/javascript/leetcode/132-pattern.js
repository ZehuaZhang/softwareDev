function find132pattern(nums) {
    if (nums.length < 3) {
        return false;
    }
    const aj = Number.MIN_VALUE;
    const stack = new Stack();
    for (const i = nums.length - 1; i >= 0; --i) {
        if (nums[i] < aj) {
            return true;
        } else {
            while (!stack.isEmpty() && nums[i] > stack.top()) {
                aj = stack.pop();
            }
        }
        stack.push(nums[i]);
    }
    return false;
}