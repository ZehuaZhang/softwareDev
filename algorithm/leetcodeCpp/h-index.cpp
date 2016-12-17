274. H-Index
Difficulty: Medium

Given an array of citations (each citation is a non-negative integer) of a researcher, 
write a function to compute the researcher h-index.

According to the definition of h-index on Wikipedia: 
"A scientist has index h if h of his/her N papers have at least h citations each, 
and the other N − h papers have no more than h citations each."

For example, given citations = [3, 0, 6, 1, 5], which means the researcher has 5 papers in total and 
each of them had received 3, 0, 6, 1, 5 citations respectively. 
Since the researcher has 3 papers with at least 3 citations each and 
the remaining two with no more than 3 citations each, his h-index is 3.

Note: If there are several possible values for h, the maximum one is taken as the h-index.

Hint:
An easy approach is to sort the array first.
What are the possible values of h-index?
A faster approach is to use extra space.

// Time:  O(n)
// Space: O(n)

// Counting sort.
class Solution {
public:
    int hIndex(vector<int>& citations) {
        const auto n = citations.size();
        vector<int> count(n + 1, 0);
        for (auto citation : citations) {
            // Put all x >= n in the same bucket.
            if (citation >= n) {
                ++count[n];
            } else {
                ++count[citation];
            }
        }

        int h = 0;
        for (int i = n; i >= 0; --i) {
            h += count[i];
            if (h >= i) {
                return i;
            }
        }
        return h;
    }
};