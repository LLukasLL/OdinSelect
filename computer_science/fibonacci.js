const start = [0,1];

function fibonacci(a, l) {
  if (a.length == l) {
    return a;
  }
  else {
    return fibonacci([...a,a[a.length - 1] + a[a.length - 2]], l);
  }
}
console.log(fibonacci(start, 8));