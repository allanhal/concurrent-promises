// ChatGPT solution to the problem of having to process on concurrency batches.
// Does not work, does the list twice. Was not able to find a solution until now.

const promise1 = Promise.resolve("Promise 1");
const promise2 = Promise.resolve("Promise 2");
const promise3 = Promise.resolve("Promise 3");
const promise4 = Promise.resolve("Promise 4");

const promises = [promise1, promise2, promise3, promise4];
const results = [];
let concurrency = 2;
let running = 0;

function runPromise(promise) {
  if (running < concurrency) {
    running++;
    promise.then((result) => {
      results.push(result);
      running--;
      if (promises.length > 0) {
        runPromise(promises.shift());
      }
    });
  } else {
    setTimeout(() => {
      runPromise(promise);
    }, 0);
  }
}

promises.forEach((promise) => {
  runPromise(promise);
});

setTimeout(() => console.log(results), 5000);
