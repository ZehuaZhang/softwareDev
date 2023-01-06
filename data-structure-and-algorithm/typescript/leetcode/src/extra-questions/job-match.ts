/*
Maximum Job Match - max bipartite matching

M Applicant for N Jobs, Find maximum matching

e.x.
[M][N] =  0, 1, 1, 0, 0, 0
          1, 0, 0, 1, 0, 0
          0, 0, 1, 0, 0, 0
          0, 0, 1, 1, 0, 0
          0, 0, 0, 0, 0, 0
          0, 0, 0, 0, 0, 1
*/

// Returns maximum number of matching from M to N
function maxJobMatch(applications: number[][]) {
  const [applicants, jobs] = [applications.length, applications[0].length];
  const filled = Array(jobs).fill(-1);

  let result = 0;
  for (let i = 0; i < applicants; ++i) {
    const visited = Array(jobs).fill(false);
    if (maxJobMatchDfs(i, visited)) {
      ++result;
    }
  }
  return result;

  function maxJobMatchDfs(i: number, visited: boolean[]): boolean {
    for (let j = 0; j < jobs; ++j) {
      if (applications[i][j] && !visited[j]) {
        visited[j] = true;
        if (filled[j] < 0 || maxJobMatchDfs(filled[j], visited)) {
          filled[j] = i;
          return true;
        }
      }
    }
    return false;
  }
}
