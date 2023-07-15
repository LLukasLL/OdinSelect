import { mergeSortRecursive } from './mergeSort.js';

const start = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14, 100, 1001, 77];
const test = [-1,0,1]

const tree = (inArr) => {

    // Initialize Stuff:

    const node = (inValue) => {
        let value = inValue;
        let left = null;
        let right = null;
        return { value, left, right };
    }

    let root;

    const buildTree = (arr) => {
        if (!Array.isArray(arr)) { return 'input not an array' };
        if (arr.length <= 1 ) { return node(arr[0]); };
        const sortedArr = mergeSortRecursive(arr);
        const getSplitIndex = (indexArr) => {
            let splitIndex;
            if (indexArr.length%2 === 0) {
                splitIndex = (indexArr.length / 2);
            } else {
                splitIndex = (indexArr.length - 1) / 2;
            }
            return splitIndex;
        }
        const branch = (inNode, leftArr, rightArr) => {
            if (leftArr.length === 0) { 
                return; 
            } else if (leftArr.length === 1) {
                inNode.left = node(leftArr[0]);
            } else {
                const leftSplitIndex = getSplitIndex(leftArr);
                inNode.left = node(leftArr[leftSplitIndex]);
                const leftLeftArr = leftArr.slice(0, leftSplitIndex);
                const leftRightArr = leftArr.slice(leftSplitIndex + 1);
                branch(inNode.left, leftLeftArr, leftRightArr);
            }
            if (rightArr.length === 0) { 
                return; 
            } else if (rightArr.length === 1) {
                inNode.right = node(rightArr[0])
            } else {
                const rightSplitIndex = getSplitIndex(rightArr);
                inNode.right = node(rightArr[rightSplitIndex]);
                const rightleftArr = rightArr.slice(0, rightSplitIndex);
                const rightRightArr = rightArr.slice(rightSplitIndex + 1);
                branch(inNode.right, rightleftArr, rightRightArr);
            }
        }
        const splitIndex = getSplitIndex(sortedArr);
        const rootNode = node(sortedArr[splitIndex]);
        const leftArr = sortedArr.slice(0, splitIndex);
        const rightArr = sortedArr.slice(splitIndex + 1);
        branch(rootNode, leftArr, rightArr);

        root = rootNode;
    }
    buildTree(inArr);

    // functions: 

    const printy = () => {
        const prettyPrint = (node, prefix = '', isLeft = true) => {
            if (node === null) {
               return;
            }
            if (node.right !== null) {
              prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
            }
            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
            if (node.left !== null) {
              prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
            }
        }
        prettyPrint(root);
    }

    const insert = (value) => {
        const insertRec = (myNode, value) => {
            if (myNode.value > value) { 
                if (myNode.left === null) {
                    myNode.left = node(value)
                } else {
                    insertRec(myNode.left, value);
                }
            }
            if (myNode.value < value) { 
                if (myNode.right === null) {
                    myNode.right = node(value)
                } else {
                    insertRec(myNode.right, value);
                }
            }
        }
        insertRec(root, value);
    }

    const deleteValue = (value) => {
        const minValue = (myNode) => {
            let minV;
            while (myNode.right !== null) {
                minV = myNode.right.value;
                myNode = myNode.right;
            }
            return minV;
        }

        const deleteValueRec = (myNode, value) => {
            if (myNode === null) {
                return myNode;
            } else if (myNode.value > value) {
                myNode.left = deleteValueRec(myNode.left, value);
            } else if (myNode.value < value) {
                myNode.right = deleteValueRec(myNode.right, value);
            } else {
                if (myNode.right === null) {
                    return myNode.left;
                } else if (myNode.left === null) {
                    return myNode.right;
                }
                myNode.value = minValue(myNode.left);
                myNode.left = deleteValueRec(myNode.left, myNode.value);
            }
            return myNode;

        }
        root = deleteValueRec(root, value);
    }

    const find = (value) => {
        const findRec = (myNode, value) => {
            if (myNode === null) { return; }
            else if (myNode.value === value) { return myNode; }
            else if (myNode.value < value) { return findRec(myNode.right, value); }
            else if (myNode.value > value) { return findRec(myNode.left, value); }
        }
        return findRec(root, value);
    }

    const levelOrder = (myFunc) => {
        let output = [];
        const readFIFO = (FIFO) => {
            const myNode = FIFO.shift();
            if (!myNode) {
                if (myFunc instanceof Function) { return; } else { return output; }
            } else {
                if (myFunc instanceof Function) { myFunc(myNode); } else { output.push(myNode.value); }
                if (myNode.left !== null) { FIFO.push(myNode.left); }
                if (myNode.right !== null) { FIFO.push(myNode.right); }
                return readFIFO(FIFO);
            }
        }
        return readFIFO([root], []);
    }

    const inorder = (myFunc) => {
        let output = [];
        const inorderRec = (myNode) => {
            if (!myNode) {
                if (!(myFunc instanceof Function)) { return output; }
            } else {
                if (myNode.left) { inorderRec(myNode.left); }
                if (myFunc instanceof Function) { myFunc(myNode); } else { output.push(myNode.value); }
                if (myNode.right) { inorderRec(myNode.right); }
            }
        }
        inorderRec(root);
        if (!(myFunc instanceof Function)) { return output; }
    }

    const preorder = (myFunc) => {
        let output = [];
        const preorderRec = (myNode) => {
            if (!myNode) {
                if (!myFunc instanceof Function) { return output; }
            } else {
                if (myFunc instanceof Function) { myFunc(myNode); } else { output.push(myNode.value); }
                if (myNode.left) { preorderRec(myNode.left); }
                if (myNode.right) { preorderRec(myNode.right); }
            }
        }
        preorderRec(root);
        if (!myFunc instanceof Function) { return output; }
    }


    const postorder = (myFunc) => {
        let output = [];
        const postorderRec = (myNode) => {
            if (!myNode) {
                if (!myFunc instanceof Function) { return output; }
            } else {
                if (myNode.left) { postorderRec(myNode.left); }
                if (myNode.right) { postorderRec(myNode.right); }
                if (myFunc instanceof Function) { myFunc(myNode); } else { output.push(myNode.value); }
            }
        }
        postorderRec(root);
        if (!myFunc instanceof Function) { return output; }
    }

    const height = (myNode) => {
        let max = 0;
        const heightRec = (myNode, counter) => {
            if (myNode.left) { heightRec(myNode.left, counter + 1); }
            if (myNode.right) { heightRec(myNode.right, counter + 1); }
            if (max < counter) { max = counter; }
        }
        heightRec(myNode, 0);
        return max;
    }

    const depth = (searchNode) => {
        const getToDepthRec = (myNode, counter) => {
            if (!searchNode) { return 'Node not found'; }
            if (myNode.value === searchNode.value) { return counter; }
            else if (myNode.left && searchNode.value < myNode.value) {
                return getToDepthRec(myNode.left, counter + 1);
            } else if (myNode.right && searchNode.value > myNode.value) {
                return getToDepthRec(myNode.right, counter + 1);
            } else {
                return 'Node not found';
            }
        }
        return getToDepthRec(root, 0);
    }

    const isBalanced = () => {
        const isBalancedRec = (myNode) => {
            let counter;
            let left, right;
            if (myNode) {
                if (myNode.left == null) { left = 0; } else { left = isBalancedRec(myNode.left); }
                if (myNode.right == null) { right = 0; } else { right = isBalancedRec(myNode.right); }
                if (Math.abs(left - right) <= 1) {
                    counter = 1 + left + right;
                } else {
                    counter = false;
                }
            } else {
                counter = false;
            }
            return counter;
        }
        if (isBalancedRec(root)) { return true; } else { return false; }
    }
    //
    return { root, buildTree, printy, insert, deleteValue, find, levelOrder, inorder, preorder, postorder, height, depth, isBalanced };
}

const testFunc = (myNode) => {
    console.log(myNode.value);
}


const newTree = tree(start);

// console.log(newTree.postorder(testFunc));
// console.log(newTree.height(newTree.root));
// console.log(newTree.depth(newTree.root.left.left));
// console.log(newTree.isBalanced());


newTree.deleteValue(5);
newTree.deleteValue(6);
newTree.deleteValue(7);
newTree.deleteValue(8);
console.log(newTree.printy());
console.log(newTree.isBalanced())
newTree.buildTree(newTree.inorder())


console.log(newTree.printy());

let testy = 0;