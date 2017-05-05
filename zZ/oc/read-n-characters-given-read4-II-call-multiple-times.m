// 158. Read N Characters Given Read4 II - Call multiple times
// Difficulty: Hard 

// The API: int read4(char *buf) reads 4 characters at a time from a file.

// The return value is the actual number of characters read. For example, it returns 3 if there is only 3 characters left in the file.

// By using the read4 API, implement the function int read(char *buf, int n) that reads n characters from the file.

// Note:
// The read function may be called multiple times.

// Time:  O(n)
// Space: O(1)

// Forward declaration of the read4 API.
int read4(char *buf);

class Solution {
public:
    int read(char *buf, int n) {
        int i = 0;
        while (i < n) {
            if (_i4 < _n4) {  // Any characters in buf4.
                buf[i++] = _buf4[_i4++];
            } else if (_n4 = read4(_buf4)) {  // Read more characters.
                _i4 = 0;
            } else {  // Buffer has been empty.
                break;
            }
        }
        return i;
    }

private:
    char _buf4[4];
    int _i4 = 0, _n4 = 0;
};
