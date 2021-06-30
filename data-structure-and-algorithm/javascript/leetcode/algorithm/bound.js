function lowerBound(nums, target) {
    let leftIndex = 0, rightIndex = nums.length - 1;
    while (leftIndex <= rightIndex) {
        const middleIndex = leftIndex + (rightIndex - leftIndex) / 2;
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

function findKthLargest(nums, k, compare) {
    let leftIndex = 0, rightIndex = nums.length - 1
    while (leftIndex <= rightIndex) {
        const randomIndex = leftIndex + Math.trunc(Math.random() * (rightIndex - leftIndex + 1))
        const partitionIndex = partition(nums, leftIndex, rightIndex, randomIndex)

        if (partitionIndex === k - 1) {
            return nums[k - 1]
        } else if (partitionIndex > k - 1) {
            rightIndex = partitionIndex - 1
        } else {
            leftIndex = partitionIndex + 1
        }
    }

    return nums[leftIndex]

    function partition(items, leftIndex, rightIndex, pivotIndex) {
        swap(items, rightIndex, pivotIndex)
        // right is the pivot

        let nextPivotIndex = leftIndex
        for (let index = leftIndex; index < rightIndex; ++index) {
            if (compare(items, right, index) < 0) {
                swap(items, nextPivotIndex++, index)
            }
        }

        swap(items, nextPivotIndex, rightIndex)        
        return nextPivotIndex
    }

    function swap(items, i, j) {
        const temp = items[i]
        items[i] = items[j]
        items[j] = temp
    }
}

