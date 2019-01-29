/**
 * Read N Characters Given Read4 II
 * 
 * The API: int read4(char *buf) reads 4 characters at a time from a file.
 * 
 * The return value is the actual number of characters read. For example, it returns 3 if there is only 3 characters left in the file.
 * 
 * By using the read4 API, implement the function int read(char *buf, int n) that reads n characters from the file.
 * 
 * Note:
 * The read function may be called multiple times.
 */

public class Solution extends Reader4 {
    public int read(char[] buf, int n) {
        int i = 0;
        while (i < n) {
            if (indexOfBuf4 < totalBytes) {
                buf[i++] = buf4[indexOfBuf4++];
            } else {
                int totalBytes = read4(buf4);
                if (totalBytes != 0) {
                    indexOfBuf4 = 0;
                } else {
                    break;
                }
            }
        }
        return i;
    }

    private char[] buf4 = new char[4];
    private int indexOfBuf4 = 0;
    private int totalBytes = 0;
}
