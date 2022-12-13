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
  expandStatement(statement, dependsOn) {
    const res = [];
    const {_dependsOn} = statement;
    let hasDeclare = true;
    for(const key in _dependsOn) {
      if (Object.hasOwnProperty.call(_dependsOn, key)) {
        const v = this.define(key);
        if (v) {
          if (!dependsOn.has(key)) {
            dependsOn.set(key, v)
          }
        } else {
          hasDeclare = false;
        }
      }
    }
    if (hasDeclare) {
      res.push(statement)
    }
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
      // console.log('name', name)
      return this.definitions[name];
    }
  }

  expandAllStatements() {
    const allStatements = [];
    const dependsOn = new Map(); 
    this.ast.body.forEach((node) => {
      if (['VariableDeclaration', 'ImportDeclaration'].includes(node.type)) {
        return;
      }
      const statement = this.expandStatement(node, dependsOn);
      allStatements.push(...statement);
    })
    const dependsOnStateMent = [];
    dependsOn.forEach((node) => {
      dependsOnStateMent.push(node);
    })
    return [...dependsOnStateMent, ...allStatements];
  }

}

// const __main__ = () => {
//   const code =
//     `const a = () =>  1;
//       const b = () => 2;
//       a();
//       a();
//       console.log(1);
//       c()`
//   const module = new Module({ code })
//   const statements = module.expandAllStatements()
// }

// __main__();

module.exports = Module;