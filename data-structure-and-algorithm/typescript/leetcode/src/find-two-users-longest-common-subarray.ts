function getLongestCommonSubarray(userUrlList, user1, user2) {
  if (
    !userUrlList.hasOwnProperty(user1) ||
    !userUrlList.hasOwnProperty(user2)
  ) {
    return [];
  }

  const urlList1 = userUrlList[user1];
  const urlList2 = userUrlList[user2];
  const dp = Array(urlList1.length + 1)
    .fill(0)
    .map(() => Array(urlList2.length + 1).fill(0));
  let max = 0;
  let end = 0;

  for (const i = 0; i <= urlList1.length; ++i) {
    for (const j = 0; j <= urlList2.length; ++j) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
      } else if (urlList1[i - 1] === urlList2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (max > dp[i][j]) {
          end = i;
          max = dp[i][j];
        }
      } else {
        dp[i][j] = 0;
      }
    }
  }

  return urlList1.slice(end - max, end);
}
