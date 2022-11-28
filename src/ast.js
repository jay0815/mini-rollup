const acorn = require('acorn');
const MagicString = require('magic-string');

const fs = require('fs');
const path = require('path')

const main = (file) => {
  const ast = acorn.parse(file, {
    locations: true,
    ranges: true,
    sourceType: 'module',
    ecmaVersion: 7
  });

  const code = new MagicString(file);

  const declaration = {};
  const expression = {};
  const names = new Set();
  console.log(ast.body)
  ast.body.forEach((node) => {
    if (node.type === 'VariableDeclaration') {
      const name = node.declarations[0].id.name;
      declaration[name] = node;
      names.add(name)
    } else if (node.type === "ExpressionStatement") {
      const name = node.expression.callee.name;
      expression[name] = node;
      names.add(name)
    }
  });

  const statement = [];
  names.forEach((name) => {
    if (declaration[name] && expression[name]) {
      const words = [declaration, expression].reduce((p,i) => {
        const node = i[name];
        p += code.snip(node.start, node.start).toString() + '\n';
        return p;
      }, '')
      statement.push(words)
    }
  })
  console.log(names, statement)
  return statement
}

const file = fs.readFileSync(path.join(__dirname,'../src/example.js'), 'utf-8')

main(file.toString())

module.exports = main;

// console.log(a)

// const c = 1;

// function f1() {
//   const d = 2;
//   function f2() {
//     const f = 3;
//   }
// }
