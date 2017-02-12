// 204. Count Primes
// Difficulty: Easy

// Description:
// Count the number of prime numbers less than a non-negative number, n.

// Hint:
// Lets start with a isPrime function. To determine if a number is prime, we need to check if it is not divisible by any number less than n. 
// The runtime complexity of isPrime function would be O(n) and hence counting the total prime numbers up to n would be O(n^2). Could we do better?

// As we know the number must not be divisible by any number > n / 2, we can immediately cut the total iterations half by dividing only up to n / 2.
// Could we still do better?

// Let's write down all of 12's factors:

// 2 × 6 = 12
// 3 × 4 = 12
// 4 × 3 = 12
// 6 × 2 = 12
// As you can see, calculations of 4 × 3 and 6 × 2 are not necessary. 
// Therefore, we only need to consider factors up to √n because, if n is divisible by some number p, 
// then n = p × q and since p ≤ q, we could derive that p ≤ √n.

// Our total runtime has now improved to O(n1.5), which is slightly better. Is there a faster approach?

// public int countPrimes(int n) {
//    int count = 0;
//    for (int i = 1; i < n; i++) {
//       if (isPrime(i)) count++;
//    }
//    return count;
// }

// private boolean isPrime(int num) {
//    if (num <= 1) return false;
//    // Loop's ending condition is i * i <= num instead of i <= sqrt(num)
//    // to avoid repeatedly calling an expensive function sqrt().
//    for (int i = 2; i * i <= num; i++) {
//       if (num % i == 0) return false;
//    }
//    return true;
// }
// The Sieve of Eratosthenes approach
// We start off with a table of n numbers. Lets look at the first number, 2. We know all multiples of 2 must not be primes, 
// so we mark them off as non-primes. Then we look at the next number, 3. Similarly, all multiples of 3 such as 3 × 2 = 6, 3 × 3 = 9, ... 
// must not be primes, so we mark them off as well. Now we look at the next number, 4, which was already marked off. What does this tell you? 
// Should you mark off all multiples of 4 as well?

// 4 is not a prime because it is divisible by 2, which means all multiples of 4 must also be divisible by 2 and were already marked off. 
// So we can skip 4 immediately and go to the next number, 5. Now, all multiples of 5 such as 5 × 2 = 10, 5 × 3 = 15, 5 × 4 = 20, 5 × 5 = 25, ... 
// can be marked off. There is a slight optimization here, we do not need to start from 5 × 2 = 10. Where should we start marking off?

// In fact, we can mark off multiples of 5 starting at 5 × 5 = 25, because 5 × 2 = 10 was already marked off by multiple of 2, 
// similarly 5 × 3 = 15 was already marked off by multiple of 3. Therefore, if the current number is p, 
// we can always mark off multiples of p starting at p2, then in increments of p: p2 + p, p2 + 2p, ... 
// Now what should be the terminating loop condition?

// It is easy to say that the terminating loop condition is p < n, which is certainly correct but not efficient.
// Yes, the terminating loop condition can be p < √n, as all non-primes ≥ √n must have already been marked off. 
// When the loop terminates, all the numbers in the table that are non-marked are prime.

// The Sieve of Eratosthenes uses an extra O(n) memory and its runtime complexity is O(n log log n).
// For the more mathematically inclined readers, you can read more about its algorithm complexity on Wikipedia.

// Time:  O(n)
// Space: O(n)

class Solution {
public:
    int countPrimes(int n) {
        if (n <= 2) {
            return 0;
        }

        auto num = n / 2;   // cut-off even except 2, n / 2 - 1 + 1 <=> n / 2
        vector<int> isPrime(n, true);

        // check ONLY odd
        for (int i = 3; i * i < n; i += 2) {
            if (!isPrime[i]) {
                continue;
            }

            for (int j = i * i; j < n; j += 2 * i) {    // mark not prime on its perfect square and up by factor of 2 * i, (j += 1 * i -> even)
                if (!isPrime[j]) {
                    continue;
                }

                --num;
                isPrime[j] = false;
            }
        }

        return num;
    }
};
