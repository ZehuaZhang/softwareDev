// 11. Container With Most Water

// Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

// Note: You may not slant the container and n is at least 2.

// The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

// Example:

// Input: [1,8,6,2,5,4,8,3,7]
// Output: 49

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    if (!isArray(height) || height.length < 2) {
        throw "invalid input array"
    }
    
    let leftIndex = 0
    let rightIndex = height.length - 1
    let maxArea = Math.min(height[leftIndex], height[rightIndex]) * 
        (rightIndex - leftIndex)
    while (leftIndex < rightIndex) {
        if (height[leftIndex] >= height[rightIndex]) {
            --rightIndex
        } else {
            ++leftIndex
        }
        
        maxArea = Math.max(
            maxArea,
            Math.min(height[leftIndex], height[rightIndex]) *
                (rightIndex - leftIndex))
    }
    
    return maxArea
};

function isArray(item) {
    return Array.isArray(item)
}