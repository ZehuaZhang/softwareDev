31. Next Permutation
Difficulty: Medium
Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).

The replacement must be in-place, do not allocate extra memory.

Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.
1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    void nextPermutation(vector<int> &num) {
        nextPermutation(num.begin(), num.end());
    }
    
private:
    template<typename It>
    bool nextPermutation(It begin, It end) {
        const auto rfirst = reverse_iterator<It>(end);
        const auto rlast = reverse_iterator<It>(begin);
        
        // Find the first element (pivot) which is less than its successor.
        auto pivot = next(rfirst);
        while (pivot != rlast && *pivot >= *prev(pivot)) {
            ++pivot;
        }

        bool isGreater = true;
        if (pivot != rlast) {
            // Find the number which is first greater than pivot from reverse start, and swap it with pivot
            auto change = find_if(rfirst, pivot, bind1st(less<int>(), *pivot));
            swap(*change, *pivot);
        } else {
            isGreater = false;
        }
        
        // Make the sequence after pivot non-descending
        reverse(rfirst, pivot);
        
        return isGreater;
    }
};