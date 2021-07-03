function lowerBoundExclusive(nums, target) {
    let left = 0, right = nums.length - 1;
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

function lowerBoundInclusive(nums, target) {
    let left = 0, right = nums.length - 1;
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

function upperBoundExclusive(nums, target) {
    let left = 0, right = nums.length - 1;
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

function upperBoundInclusive(nums, target) {
    let left = 0, right = nums.length - 1;
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

findKth(nums, k, compare) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const randomIndex = left + Math.trunc(Math.random() * (right - left + 1))
        const partitionIndex = partition(nums, left, right, randomIndex)
        if (partitionIndex === k - 1) {
            return nums[k - 1]
        } else if (partitionIndex > k - 1) {
            right = partitionIndex - 1
        } else {
            left = partitionIndex + 1
        }
    }
    return nums[left]

    function partition(items, left, right, pivotIndex) {
        swap(items, right, pivotIndex)

        let nextPivotIndex = left
        for (let index = left; index < right; ++index) {
            if (compare(nums[index], nums[right])) {
                swap(items, nextPivotIndex++, index)
            }
        }

        swap(items, nextPivotIndex, right)
        return nextPivotIndex
    }

    function swap(items, i, j) {
        const temp = items[i]
        items[i] = items[j]
        items[j] = temp
    }
}