const fs = require('fs');
const path = require('path')
const acorn = require('acorn');
// const MagicString = require('magic-string');

function visiter (node, parent, enter, leave) {
  enter(node)

  leave(node)
  return 'a';
}

const __main__ = () => {
  const file = fs.readFileSync(path.join(__dirname,'../example.js'), 'utf-8').toString();
  const ast = acorn.parse(file, {
    locations: true,
    ranges: true,
    sourceType: 'module',
    ecmaVersion: 7
  })
  const scope = visiter(ast.body, null, (node) => {
    console.log('start Line', node.loc.start.line)
  }, (node) => {
    console.log('end Line', node.loc.start.line)
  })
}


__main__();

module.exports = visiter;