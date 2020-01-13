// 4. Median of Two Sorted Arrays

// There are two sorted arrays nums1 and nums2 of size m and n respectively.

// Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

// You may assume nums1 and nums2 cannot be both empty.

// Example 1:

// nums1 = [1, 3]
// nums2 = [2]

// The median is 2.0
// Example 2:

// nums1 = [1, 2]
// nums2 = [3, 4]

// The median is (2 + 3)/2 = 2.5

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    if (!isArray(nums1) || !isArray(nums2)) {
        throw "invalid input arrays"
    }
    
    const length1 = nums1.length
    const length2 = nums2.length
    
    const medianLeft = Math.trunc((length1 + length2 + 1) / 2)
    const medianRight = Math.trunc((length1 + length2 + 2) / 2)
    
    return (
        (
            findKthElementInTwoSortedArrays(nums1, nums2, medianLeft) +
            findKthElementInTwoSortedArrays(nums1, nums2, medianRight)
        ) / 2
    )
};

function findKthElementInTwoSortedArrays(nums1, nums2, k) {
    const length1 = nums1.length
    const length2 = nums2.length
    
    if (length1 === 0) {
        return nums2[k - 1]
    }
    
    if (length2 === 0) {
        return nums1[k - 1]
    }
    
    if (k === 1) {
        return Math.min(nums1[0], nums2[0])
    }
    
    const k1 = Math.min(length1, Math.trunc(k / 2))
    const k2 = Math.min(length2, Math.trunc(k / 2))
    if (nums1[k1 - 1] > nums2[k2 - 1]) {
        return findKthElementInTwoSortedArrays(nums1, nums2.slice(k2), k - k2)
    } else {
        return findKthElementInTwoSortedArrays(nums1.slice(k1), nums2, k - k1)
    }
}

function isArray(item) {
    return Array.isArray(item)
}