/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let ans = [];
    let remains = -1;
    // loop through array
    for (let i = 0; i <= nums.length - 1; i++) {
        const firstNum = nums[i];
        remains = target - firstNum;
        for (let j = i + 1; j <= nums.length - 1; j++) {
            const secondNum = nums[j];
            if (remains === secondNum) {
                return [i, j];
            }
        }
    }
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSumTwoLoops = function (nums, target) {
    // create a hashmap
    const hashmap = {};
    // loop through all the numbers
    for (let i = 0; i < nums.length; i++) {
        // store the index in the hashmap
        hashmap[nums[i]] = i;
    }

    // loop through the numbers again
    for (let i = 0; i < nums.length - 1; i++) {
        const remains = target - nums[i];

        const secondNum = hashmap[remains];
        // return if secondNum is existed and the index isn't the same
        if (secondNum && secondNum !== i) {
            return [i, secondNum];
        }
    }
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSumOneLoop = function (nums, target) {
    // create a hashmap
    const hashmap = {};
    // loop through all the numbers
    for (let i = 0; i < nums.length; i++) {
        const remains = target - nums[i];
        const secondNum = hashmap[remains];
        if (secondNum || secondNum === 0) {
            return [i, secondNum];
        }
        // store the index in the hashmap
        hashmap[nums[i]] = i;
    }
};
