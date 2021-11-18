function sum(nums) {
  return nums.reduce((sum, next) => sum + next, 0);
}

console.log(sum([1, 2]));
console.log(sum([1, 2, 3]));
let sum2 = sum([1, 2, 3, 4]);
console.log(sum2);
