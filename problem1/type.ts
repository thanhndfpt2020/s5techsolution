//solution 1
var sum_to_n = function(n) {
    if (!Number.isInteger(n) || n < 0) throw new Error("Invalid input: n must be a non-negative integer");
    return (n * (n + 1)) / 2;
};

//solution 2

var sum_to_n_a = function(n) {
    if (!Number.isInteger(n) || n < 0) throw new Error("Invalid input: n must be a non-negative integer");
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};
//solution 3
const sum = (arr) => arr.reduce((acc, val) => acc + val, 0);
var sum_to_n_b = function(n) {
    if (!Number.isInteger(n) || n < 0) throw new Error("Invalid input: n must be a non-negative integer");
    const nums = Array.from({ length: n }, (_, i) => i + 1);
    return sum(nums);
};