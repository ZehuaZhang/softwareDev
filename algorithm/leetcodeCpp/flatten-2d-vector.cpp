// 251. Flatten 2D Vector
// Difficulty: Medium

// Implement an iterator to flatten a 2d vector.

// For example,
// Given 2d vector =

// [
//   [1,2],
//   [3],
//   [4,5,6]
// ]
 

// By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,2,3,4,5,6].

// Hint:

// 1. How many variables do you need to keep track?
// 2. Two variables is all you need. Try with x and y.
// 3. Beware of empty rows. It could be the first few rows.
// 4. To write correct code, think about the invariant to maintain. What is it?
//     The invariant is x and y must always point to a valid point in the 2d vector.
// 5. Should you maintain your invariant ahead of time or right when you need it?
// 6. Not sure? Think about how you would implement hasNext(). Which is more complex?
// 7. Common logic in two different places should be refactored into a common method.

// Follow up:
// As an added challenge, try to code it using only iterators in C++ or iterators in Java.

// Time:  O(1)
// Space: O(1)

class Vector2D {
public:
    Vector2D(vector<vector<int>>& vec2d) : vec(vec2d) {
        x = vec.begin();
        y = x->begin();
        adjustNextIter();
    }

    int next() {
        const auto ret = *y;
        ++y;
        adjustNextIter();
        return ret;
    }

    bool hasNext() {
        return x != vec.end() || y != x->end();
    }
    
    void adjustNextIter() {
        while (x != vec.end() && y == x->end()) { 
            if (++x != vec.end()) {
                y = x->begin();
            }
        }
    }

private:
    vector<vector<int>>& vec;
    vector<vector<int>>::iterator x;
    vector<int>::iterator y;
};
