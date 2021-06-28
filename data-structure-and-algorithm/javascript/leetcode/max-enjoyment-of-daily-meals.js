/*
There are k restaurants in town. You eat at one of them each day and each serves a different meal daily. 
You need to find the most enjoyment you can get over n days eating at these restaurants.
You cannot eat at the same restaurant two days in a row.

The restaurant meals are a n by k array of arrays of numbers, where meals[i][j] represennts the enjoyment
you get on day i eating at restaurant j

Write a function that takes in a 2D array of integers and returns the maximum amount of enjoyment you can
get as an integer

Example input
[
    [1, 2, 3],
    [5, 1, 2],
    [9, 8, 6]
]

Example output
16

Explanation
On day 0, you eat a restaurant 2. Enjoyment: 3
On day 1, you eat a restaurant 0. Enjoyment: 5
On day 2, you eat a restaurant 1. Enjoyment: 8

You cannnot eat at restaurant 0 on day 2 because you cannot eat at a restaurant twice in a row and the enjoyment
difference is greater by eating at restaurant 0 on day 1 than day 2
*/

function maxEnjoyment(meals) {
    const dp = [...meals];
    for (let i = 1; i < dp.length; ++i) {
        for (let j = 0; j < dp[0].length; ++j) {
            dp[i][j] += Math.max(...dp[i - 1].filter((_, k) => j !== k));
        }
    }

    return Math.max(...dp[dp.length - 1]);
}

console.log(maxEnjoyment([
    [1, 2, 3],
    [5, 1, 2],
    [9, 8, 6]
]))