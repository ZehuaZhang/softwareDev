function lowerBound(nums, target) {
    let leftIndex = 0, rightIndex = nums.length - 1;
    while (leftIndex <= rightIndex) {
        const middleIndex = leftIndex + (rightIndex - left) / 2;
        if (nums[middleIndex] >= target) {
            rightIndex = middleIndex - 1;
        } else {
            leftIndex = middleIndex + 1;
        }
    }
    return leftIndex;
}

function upperBound(nums, target) {
    let leftIndex = 0, rightIndex = nums.length - 1;
    while (leftIndex <= rightIndex) {
        const middleIndex = leftIndex + (rightIndex - leftIndex) / 2;
        if (nums[middleIndex] > target) {
            rightIndex = middleIndex - 1;
        } else {
            leftIndex = middleIndex + 1;
        }
    }
    return leftIndex;
}