const start = [38, 27, 43, 3, 9, 82, 10, 777, 40, 41, 9, 1, 0, 55, 33, 22, 11];


function mergeSortRecursive(arr) {
    function merge(left, right) {
        const end = [];
        while (left.length >= 1) {
            if (left[0] <= right[0] || right.length < 1) {
                end.push(left[0]);
                left = left.slice(1);
            } else {
                end.push(right[0]);
                right = right.slice(1);
            }
        }
        while (right.length > 0) {
            end.push(right[0]);
            right = right.slice(1);
        }
        return end;
    }
    let left, right;
    if (arr.length < 2) {
        return arr;
    } else {
        let splitIndex;
        if (arr.length%2 === 0) {
            splitIndex = arr.length / 2;
        } else {
            splitIndex = (arr.length - 1) / 2;
        }
        left = mergeSortRecursive(arr.slice(0, splitIndex));
        right = mergeSortRecursive(arr.slice(splitIndex));
    }
    if (!Array.isArray(left)){left = [left]}
    if (!Array.isArray(right)){right = [right]}
    return merge(left, right);
}
export { mergeSortRecursive };

// console.log(merge([0,5,10], [3,7]));

// console.log(mergeSortRecursive(start));