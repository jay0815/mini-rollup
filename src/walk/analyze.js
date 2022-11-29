const visiter = require('./index');
const Scope = require('./scope');

const analyze = (ast, magicString) => {
  const root = new Scope();
  ast._scope = root
  visiter(ast, root)
}


module.exports = analyze