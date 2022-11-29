const fs = require('fs');
const path = require('path')
const acorn = require('acorn');
const visitors = require('../visitors/index');
const Scope = require('./scope');

const enter = (parent, cb) => {
  if (typeof cb === 'function') {
    cb()
  }
  const current = new Scope({
    parent
  })
  return current;
}

const leave = (current, value, cb) => {
  if (current) {
    current.add(value);
  }
  if (typeof cb === 'function') {
    cb()
  }
}

const executor = {
  enter,
  leave,
  visiter
}

function visiter (node, parent, walk = executor, indent = 0) {
  if (node.type) {
    const nextVisitors = visitors[node.type];
    if (nextVisitors) {
      nextVisitors(node, parent, walk, indent)
    }
  }
}

// const __main__ = () => {
//   const file = fs.readFileSync(path.join(__dirname,'../example.js'), 'utf-8').toString();
//   const ast = acorn.parse(file, {
//     locations: true,
//     ranges: true,
//     sourceType: 'module',
//     ecmaVersion: 7
//   })
//   visiter(ast, null)
// }


// __main__();

module.exports = visiter;