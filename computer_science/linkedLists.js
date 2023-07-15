const node = (inputValue, prevNode) => {
  //
  let next = null;
  let prev = prevNode;
  let value = inputValue;
  /*
  // const getValue = () => { return value; }
  const setValue = (newValue) => { value = newValue; };
  // const getNext = () => { return next; }
  const setNext = (newNext) => { next = newNext };
  const appendNode = (nextValue) => { next = node(nextValue); };
  */
  return { next, prev, value };
}

const linkedList = (arr) => {
  // initialize stuff:
  let firstNode = node(arr[0], null);
  const restArr = arr.slice(1);
  const fillFirstArray = (inArr, inNode) => {
    if (inArr.length == 0) { return; }
    inNode.next = node(inArr[0], inNode);
    const nextArr = inArr.slice(1);
    fillFirstArray(nextArr, inNode.next)
    return;
  }
  fillFirstArray(restArr, firstNode);
  // functions:
  const tail = () => {
    let returnNode;
    const getToTail = (node) => {
      if (node.next === null) { returnNode = node; } else { getToTail(node.next); };
      return returnNode;
    }
    return getToTail(firstNode);
  }
  const head = () => { return firstNode; }
  const append = (value) => {
    const tailNode = tail();
    tailNode.next = node(value, tailNode);
  }
  const prepend = (value) => {
    const prependNode = node(value, null);
    firstNode.prev = prependNode;
    prependNode.next = firstNode;
    firstNode = prependNode;
  }
  const size = () => {
    let counter = 0;
    const countToTail = (node) => {
      if (node.next === null) {return ++counter} else { counter++; countToTail(node.next); };
    }
    countToTail(firstNode);
    return counter;
  }
  const at = (index) => {
    let counter = 0;
    let returnValue;
    const traverse = (node) => {
      if (index == counter) {
        returnValue = node;
      } else if (index < counter) {
        returnValue = 'list shorter than index';
      } else {
        counter++;
        traverse(node.next);
      }
      return returnValue;
    }
    return traverse(firstNode);
  }
  const pop = () => { tail().prev.next = null; }
  const contains = (value) => {
    let returnValue;
    const traverse = (node) => {
      if (node === null) { 
        returnValue = false;
      } else if (node.value === value) { 
        returnValue = true;
      } else {
        traverse(node.next);
      }
      return returnValue;
    }
    return traverse(firstNode);
  }
  const find = (value) => {
    let counter = 0;
    let returnValue;
    const traverse = (node) => {
      if (node === null) {
        returnValue = false;
      } else if (node.value === value) {
        returnValue = counter;
      } else {
        counter++;
        traverse(node.next);
      }
      return returnValue;
    }
    return traverse(firstNode);
  }
  const toString = () => {
    let returnString;
    const traverse = (node) => {
      if (node === null) {
        return;
      } else if (node.prev === null) {
        returnString = `( ${node.value} )`;
        traverse(node.next);
      } else {
        returnString += ` -> ( ${node.value} )`;
        traverse(node.next);
      }
      return returnString;
    }
    return traverse(firstNode);
  }
  const insertAt = (value, index) => {
    const newNextNode = at(index);
    const newPrevNode = newNextNode.prev;
    const insertNode = node(value, newPrevNode);
    newPrevNode.next = insertNode;
    insertNode.next = newNextNode;
    newNextNode.prev = insertNode;
  }
  const removeAt = (index) => {
    const newNextNode = at(index).next;
    const newPrevNode = newNextNode.prev.prev;
    newPrevNode.next = newNextNode;
    newNextNode.prev = newPrevNode;
  }
  return { 
    tail,
    head,
    append,
    prepend,
    size,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt
  };
}

const myLinkedList = linkedList([0,1,2,3,4,5,6,7,8,9])
// myLinkedList.removeAt(5);
console.log(myLinkedList.toString());
