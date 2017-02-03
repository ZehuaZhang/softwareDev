299. Bulls and Cows
Difficulty: Easy

You are playing the following Bulls and Cows game with your friend: You write down a number and ask your friend to guess what the number is. 
Each time your friend makes a guess, you provide a hint that indicates how many digits in said guess match your secret number exactly 
in both digit and position (called "bulls") and how many digits match the secret number but locate in the wrong position (called "cows").
Your friend will use successive guesses and hints to eventually derive the secret number.

For example:

Secret number:  "1807"
Friend guess: "7810"
Hint: 1 bull and 3 cows. (The bull is 8, the cows are 0, 1 and 7.)
Write a function to return a hint according to the secret number and friend guess, use A to indicate the bulls and B to indicate the cows. 
In the above example, your function should return "1A3B".

Please note that both secret number and friend guess may contain duplicate digits, for example:

Secret number:  "1123"
Friend guess: "0111"
In this case, the 1st 1 in friend guess is a bull, the 2nd or 3rd 1 is a cow, and your function should return "1A1B".
You may assume that the secret number and your friend guess only contain digits, and their lengths are always equal.

// Time:  O(n)
// Space: O(10) = O(1)

// One pass solution.
class Solution {
public:
    string getHint(string secret, string guess) {
        int missedCows[256] = {0}, bulls = 0, cows = 0;
        for (int i = 0; i < secret.size(); ++i) {
            if (secret[i] == guess[i]) {
                ++bulls;
            } else {
                if (missedCows[secret[i]]++ < 0) {
                    ++cows;
                }
                if (missedCows[guess[i]]-- > 0) {
                    ++cows;
                }
            }
        }
        return to_string(bulls) + "A" + to_string(cows) + "B";
    }
};