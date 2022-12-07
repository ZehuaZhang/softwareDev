function findUserSetsWithEmail(n, userEmailList) {
  const set = Array(n).map((_, i) => i);
  let count = n;
  const emailUser = {};
  for (const user = 0; user < n; ++user) {
    for (const email of userEmailList[user]) {
      if (!emailUser.hasOwnProperty(email)) {
        emailUser[email] = user;
      } else {
        const x = find(user, set);
        const y = find(emailUser[email], set);
        if (x !== y) {
          union(x, y, set);
          --count;
        }
      }
    }
  }

  return {set, count};
}

function find(x, set) {
  while (x != set[x]) {
    x = set[x];
  }
  return x;
}

function union(x, y, set) {
  const root1 = find(x, set);
  const root2 = find(y, set);
  set[root1] = root2;
}
