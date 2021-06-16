/**
 * 
 * @param { number[] } A 
 * @param { number[] } B 
 * @param { number[] } C 
 * @param { number[] } D 
 * @return { number }
 */
function fourSumCount(A, B, C, D) {
    const sum = {};
    A.forEach(a => {
        B.forEach(b => {
            const curr = a +b;
            if (!sum.hasOwnProperty(curr)) {
                sum[curr] = 0;
            }
            ++sum[curr];
        });
    });
    let result = 0, target = 0;
    C.forEach(c => {
        D.forEach(d => {
            const curr = c + d;
            const diff = target - curr;
            if (sum.hasOwnProperty(diff)) {
                result += sum[diff];
            }
        });
    });
    return result;
}