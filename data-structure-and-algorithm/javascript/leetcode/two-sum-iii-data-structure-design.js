/**
 * Two Sum III - Data structure design
 * 
 * Design and implement a TwoSum class. It should support the following operations:add and find.
 * 
 * add - Add the number to an internal data structure.
 * find - Find if there exists any pair of numbers which sum is equal to the value.
 * 
 * For example,
 * add(1); add(3); add(5);
 * find(4) -> true
 * find(7) -> false
 */

class TwoSum {
    constructor() {
        this.numberCount = {}
    }

    add (number) {
        this.numberCount[number] = (this.numberCount[number] || 0) + 1
    }

    find (value) {
        for (const number of Object.keys(this.numberCount)) {
            const anotherNumber = value - number;
            if (numberCount.hasOwnProperty(anotherNumber) && 
                (anotherNumber !== number || numberCount[number] > 1)) {
                return true
            }
        }

        return false
    }
}