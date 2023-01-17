// Solution in Bluebird
const Bluebird = require("bluebird");

const size = 20;
const concurrency = 4;
const arr = Array.apply(null, Array(size)).map((_, i) => i);

Bluebird.map(
  arr,
  (val) =>
    new Bluebird.delay(1000).then(function () {
      console.log(val);
    }),
  { concurrency }
);
