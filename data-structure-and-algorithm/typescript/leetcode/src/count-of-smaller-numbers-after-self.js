/*
You are given an integer array nums and you have to return a new counts array. The counts array has the property where counts[i] is the number of smaller elements to the right of nums[i].

 

Example 1:

Input: nums = [5,2,6,1]
Output: [2,1,1,0]
Explanation:
To the right of 5 there are 2 smaller elements (2 and 1).
To the right of 2 there is only 1 smaller element (1).
To the right of 6 there is 1 smaller element (1).
To the right of 1 there is 0 smaller element.
Example 2:

Input: nums = [-1]
Output: [0]
Example 3:

Input: nums = [-1,-1]
Output: [0,0]
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
*/

function countSmaller(nums) {
    const pair = [];
    for (let i = 0; i < nums.length; ++i) {
        pair.push([nums[i], i]);
    }
    const result = Array(nums.length).fill(0);
    mergeSort(pair, 0, pair.length - 1)
    return result;

    function mergeSort(array, left, right) {
        if (left >= right) {
            return;
        }
        const mid = (left + right) >> 1;
        mergeSort(array, left, mid)
        mergeSort(array, mid + 1, right);
        const temp = [];
        for (let i = left, j = mid + 1; i <= mid; ++i) {
            for (; j <= right && array[j][0] < array[i][0]; ++j) {
                temp.push(array[j])
            }
            temp.push(array[i])
            result[array[i][1]] += j - (mid + 1);
        }
        array.splice(left, temp.length, ...temp)
    }
}

function countSmaller2BIT(nums) {
    const sorted = [...nums].sort((a, b) => a - b)
    const ranks = new Map();
    for (let i = 0, rank = 0; i < sorted.length; ++i) {
        if (!i || sorted[i] !== sorted[i - 1]) {
            ranks.set(sorted[i], rank++);
        }
    }

    const node = new FenwickTree(ranks.size + 1);
    const result = Array(nums.length)
    for (let i = nums.length - 1; i >= 0; --i) {
        const rank = ranks.get(nums[i]);
        result[i] = node.sumRange(0, rank - 1);
        node.update(rank, 1);
    }
    return result;
}

class FenwickTree {
    constructor(size) {
        this.bits = Array(size).fill(0);
    }

    update(i, diff) {
        for (let j = i + 1; j < this.bits.length; j += this.leastBit(j)) {
            this.bits[j] += diff;
        }
    }

    sumRange(i, j) {
        return this.getSum(j + 1) - this.getSum(i);
    }

    getSum(i) {
        let result = 0;
        for (let j = i; j > 0; j -= this.leastBit(j)) {
            result += this.bits[j];
        }
        return result;
    }

    leastBit(j) {
        return j & (-j);
    }
};

function countSmallerBST(nums) {
    if (!nums.length) {
        return [];
    }
    const node = new BSTNode(nums[nums.length - 1]);
    const result = Array(nums.length).fill(0);
    result[result.length - 1] = 0;
    for (let i = nums.length - 2; i >= 0; --i) {
        result[i] = node.insert(nums[i]);
    }
    return result;
}

class BSTNode {
    constructor(value) {
        this.value = value;
        this.count = 1;
        this.leftCount = 0;
        this.left = null;
        this.right = null;
    }

    get lessEqual() {
        return this.count + this.leftCount;
    }

    insert(value) {
        if (this.value === value) {
            ++this.count;
            return this.leftCount;
        }
        if (value < this.value) {
            ++this.leftCount;
            if (!this.left) {
                this.left = new BSTNode(value);
                return 0;
            }
            return this.left.insert(value);
        }
        if (!this.right) {
            this.right = new BSTNode(value);
            return this.lessEqual;
        }
        return this.lessEqual + this.right.insert(value);
    }
};
