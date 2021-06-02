/**
 * Count Primes
 * 
 * Count the number of prime numbers less than a non-negative number, n.
 * 
 * Example:
 * 
 * Input: 10
 * Output: 4
 * Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
 * References:
 * How Many Primes Are There?
 * 
 * Sieve of Eratosthenes
 */

public class Solution {
    public int countPrimes(int n) {
        boolean[] isPrime = new boolean[n];
        Arrays.fill(isPrime, true);

        int result = 0;
        for (int i = 2; i < n; ++i) {
            if (isPrime[i]) {
                ++result;
                for (int j = 2; i * j < n; ++j) {
                    isPrime[i * j] = false;
                }
            }
        }

        return result;
    }
}
