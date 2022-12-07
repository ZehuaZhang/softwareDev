class FenwickTree {
    constructor(nums) {
        this.nums = Array(nums.length + 1).fill(0);
        this.bits = Array(nums.length + 1).fill(0);
        for (let i = 0; i < nums.length; ++i) {
            this.update(i, nums[i]);
        }
    }
    
    update(i, value) {
        const diff = value - this.nums[i + 1];
        for (let j = i + 1; j < this.bits.length; j += this.leastBit(j)) {
            this.bits[j] += diff;
        }
        this.nums[i + 1] = value;
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