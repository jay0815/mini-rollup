const fs = require('fs');
const path = require('path')
const acorn = require('acorn');
const visitors = require('../visitors/index');

const enter = (parent, type, cb) => {
  if (typeof cb === 'function') {
    cb()
  }
  if (!parent) {
    parent = {
      type: 'global',
      children: []
    }
  }
  if (type) {
    // init
    const current = {
      type: type,
      value: undefined,
      children: []
    }
    parent.children.push(current);
    return current;
  }
}

const leave = (current, value, cb) => {
  if (current) {
    current.value = value;
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

function visiter (node, parent, walk = executor, indent = '') {
  if (node.type) {
    const nextVisitors = visitors[node.type];
    if (nextVisitors) {
      nextVisitors(node, parent, walk, indent)
    }
  }
}

const __main__ = () => {
  const file = fs.readFileSync(path.join(__dirname,'../example.js'), 'utf-8').toString();
  const ast = acorn.parse(file, {
    locations: true,
    ranges: true,
    sourceType: 'module',
    ecmaVersion: 7
  })
  visiter(ast, null)
}


__main__();

module.exports = visiter;