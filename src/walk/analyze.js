const visiter = require('./index');
const Scope = require('./scope');

const analyze = (ast, magicString, module) => {
  const global = new Scope();
  ast._scope = global
  ast._module = module
  ast._mg = magicString
  visiter(ast, null)
  ast._mg = undefined
}

// const __main__ = () => {
//       const fs = require('fs');
//     const path = require('path')
//     const acorn = require('acorn');
//     const MagicString = require('magic-string');

//     const getCode = (code) => {
//       return [
//         acorn.parse(code, {
//           locations: true,
//           ranges: true,
//           sourceType: 'module',
//           ecmaVersion: 7
//         }),
//         new MagicString(code)
//       ]
//     }

//     const file = fs.readFileSync(path.join(__dirname,'../example.js'), 'utf-8')
//     analyze(...getCode(file.toString()))
// }

// __main__();

module.exports = analyze