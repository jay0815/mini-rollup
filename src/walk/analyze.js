const visiter = require('./index');
const Scope = require('./scope');

const analyze = (ast, magicString) => {
  const global = new Scope();
  ast._scope = global
  visiter(ast, null)
}

const __main__ = () => {
      const fs = require('fs');
    const path = require('path')
    const acorn = require('acorn');
    const MagicString = require('magic-string');

    const getCode = (code) => {
      return [
        acorn.parse(code, {
          locations: true,
          ranges: true,
          sourceType: 'module',
          ecmaVersion: 7
        }),
        new MagicString(code)
      ]
    }

    const file = fs.readFileSync(path.join(__dirname,'../example.js'), 'utf-8')
    analyze(...getCode(file.toString()))
}

__main__();

module.exports = analyze