// 157. Read N Characters Given Read4
// Difficulty: Easy

// The API: int read4(char *buf) reads 4 characters at a time from a file.
// The return value is the actual number of characters read. For example, it returns 3 if there is only 3 characters left in the file.
// By using the read4 API, implement the function int read(char *buf, int n) that reads n characters from the file.

// Note:
// The read function will only be called once for each test case.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

int read4(char* buf);

int readN(char* buf, int n) {
  int readBytes = 0;
  for (int i = 0; i <= n / 4; ++i) {
    int size = read4(buf + readBytes);
    if (size) {
      readBytes += size;
    } else {
      break;
    }
  }
  return MIN(readBytes, n);
}