const visiter = require('./walk/index');
const Scope = require('./walk/scope');
const acorn = require('acorn');
const { default: MagicString } = require('magic-string');

class Module {
  constructor({
    code = "",
    path = '', 
    bundle = null
  } = {}) {
    this.code = new MagicString(code);
    this.path = path;
    this.bundle = bundle;
    this.ast = acorn.parse(code, {
      locations: true,
      ranges: true,
      sourceType: 'module',
      ecmaVersion: 7
    });
    const global = new Scope();
    this.ast._scope = global;
    this.ast._module = this;
    this.imports = {};
    this.exports = {};
    this.definitions = {};
    visiter(this.ast, null);
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

module.exports = Module;