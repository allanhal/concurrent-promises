// My solution to the problem of having to process on concurrency batches
const Bluebird = require("bluebird");

const size = 20;
const concurrency = 2;
let results = [];
let current = 0;

let processes = Array.apply(null, Array(size)).map((_, i) => ({
  processed: false,
  index: i, // used for debugging
  promise: new Bluebird.delay(Math.random() * size * 100).then(() => i),
}));

async function processPromises() {
  const processesNotProccessed = processes.filter(
    (process) => !process.processed
  );
  if (processesNotProccessed.length > 0) {
    processesNotProccessed.forEach((process) => callPromise(process));
  }
}

function callPromise(process) {
  if (current < concurrency) {
    if (!process.processed) {
      current++;
      process.promise.then((res) => {
        if (!process.processed) {
          results.push(res);
        }
        process.processed = true;
        current--;
        processPromises();
      });
    }
  } else {
    setTimeout(() => callPromise(process), 0);
  }
}

processPromises();

setTimeout(() => console.log("results", results), 5000);
