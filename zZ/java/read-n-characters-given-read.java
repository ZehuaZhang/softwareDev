/**
 * Read N Characters Given Read4
 * 
 * The API: int read4(char *buf) reads 4 characters at a time from a file.
 * The return value is the actual number of characters read. For example, it returns 3 if there is only 3 characters left in the file.
 * By using the read4 API, implement the function int read(char *buf, int n) that reads n characters from the file.
 * 
 * Note:
 * The read function will only be called once for each test case.
 */

public class Solution extends Reader4 {
    public int read(char[] buf, int n) {
        int bytes = 0;
        boolean eof = false;
        while (!eof && readBytes < n) {
            char[] buf4 = new char[4];
            int currBytes = read4(buf4);

            if (currBytes < 4) {
                eof = true;
            }

            if (bytes + currBytes > n) {
                currBytes = n - bytes;
            }

            System.arraycopy(buf4, 0, buf, bytes, currBytes);
            bytes += currBytes;
        }
        return bytes;
    }
}
