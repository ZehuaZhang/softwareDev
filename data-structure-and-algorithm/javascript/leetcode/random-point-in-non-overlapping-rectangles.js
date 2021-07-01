/*
Given a list of non-overlapping axis-aligned rectangles rects, write a function pick which randomly and uniformily picks an integer point in the space covered by the rectangles.

Note:

An integer point is a point that has integer coordinates. 
A point on the perimeter of a rectangle is included in the space covered by the rectangles. 
ith rectangle = rects[i] = [x1,y1,x2,y2], where [x1, y1] are the integer coordinates of the bottom-left corner, and [x2, y2] are the integer coordinates of the top-right corner.
length and width of each rectangle does not exceed 2000.
1 <= rects.length <= 100
pick return a point as an array of integer coordinates [p_x, p_y]
pick is called at most 10000 times.
Example 1:

Input: 
["Solution","pick","pick","pick"]
[[[[1,1,5,5]]],[],[],[]]
Output: 
[null,[4,1],[4,1],[3,3]]
Example 2:

Input: 
["Solution","pick","pick","pick","pick","pick"]
[[[[-2,-2,-1,-1],[1,0,3,0]]],[],[],[],[],[]]
Output: 
[null,[-1,-2],[2,0],[-2,-1],[3,0],[-2,-2]]
Explanation of Input Syntax:

The input is two lists: the subroutines called and their arguments. Solution's constructor has one argument, the array of rectangles rects. pick has no arguments. Arguments are always wrapped with a list, even if there aren't any.
*/

class Solution {
    constructor(rects) {
        this.rects = [...rects];
        this.sum = [];
        let sum = 0;
        for (const r of rects) {
            sum += area(r);
            this.sum.push(sum);
        }

        function area(rect) {
            const [x0, y0, x1, y1] = rect;
            return (x1 - x0 + 1) * (y1 - y0 + 1);
        }
    }

    pick() {
        const index = upperBound(this.sum, Math.trunc(Math.random() * this.sum[this.sum.length - 1]));
        const [x0, y0, x1, y1] = this.rects[index];
        const x = Math.trunc(Math.random() * (x1 - x0 + 1)) + x0;
        const y = Math.trunc(Math.random() * (y1 - y0 + 1)) + y0;
        return [x, y]

        function upperBound(nums, target) {
            let left = 0, right = nums.length - 1;
            for (; left <= right;) {
                const mid = left + Math.trunc((right - left) / 2);
                if (nums[mid] > target) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
            return left;
        }
    }
}