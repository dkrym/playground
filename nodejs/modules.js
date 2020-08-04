const xyz = require('./people');

// without exports
// console.log(xyz); // empty

// after exports
console.log(__filename, xyz); // = people from people.js

// extract  from object
const { people, ages } = require('./people');
console.log(__filename, people); // = people from people.js
console.log(__filename, ages); // = people from people.js


const os = require('os');
// console.log(os);
console.log(os.platform());
