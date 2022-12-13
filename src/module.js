const analyze = require('./walk/analyze');
const Scope = require('./walk/scope');
const acorn = require('acorn');
const { default: MagicString } = require('magic-string');

class Module {
  constructor({
    code = "",
    path = '', 
    bundle = null
  } = {}) {
    this.imports = {};
    this.exports = {};
    this.definitions = {};
    this.code = new MagicString(code);
    this.ast = acorn.parse(code, {
      locations: true,
      ranges: true,
      sourceType: 'module',
      ecmaVersion: 7
    });
    this.path = path;
    this.bundle = bundle;
    this.analyze(code);
  }

  analyze() {
    analyze(this.ast, this.code, this)
  }

  setImportParams(key, value) {
    this.imports[key] = value;
  }

  setExportParams(key, value) {
    this.exports[key] = value;
  }

  setDefinitions(key, value) {
    this.definitions[key] = value;
  }

  /**
   * expand: declare & executor
   * @param {*} statement 
   * @returns 
   */
  expandStatement(statement) {
    const res = [];
    const {_dependsOn} = statement;
    for(const key in _dependsOn) {
      if (Object.hasOwnProperty.call(_dependsOn, key)) {
        // const element = _dependsOn[key];
        console.log('statement', key)
        const v = this.define(key);
        res.push(v);
      }
    }
    res.push(statement)
    return res;
  }
  /**
   * find VariableDeclaration by name
   * @param {string} name 
   */
  define(name) {
    if (false) {
      // import define
    } else {
      console.log('name', name)
      return this.definitions[name];
    }
  }

  expandAllStatements() {
    const allStatements = [];
    this.ast.body.forEach((node) => {
      if (['VariableDeclaration', 'ImportDeclaration'].includes(node.type)) {
        return;
      }
      const statement = this.expandStatement(node);
      allStatements.push(...statement);
    })
    return allStatements;
  }

}




// const __main__ = () => {
//   const code =
//     `const a = () =>  1;
//       const b = () => 2;
//       a();
//       a();`
//   const module = new Module({ code })
//   const statements = module.expandAllStatements()
//   console.log(statements)
// }

// __main__();

module.exports = Module;