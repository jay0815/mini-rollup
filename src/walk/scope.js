class Scope {
  constructor(options = {}) {
    this.parent = options.parent || null;
    this.scope = {};
  }

  add (variable) {
    this.scope[variable] = true;
  }

  contains(variable) {
    return !!this.findDefiningScope(variable);
  }

  findDefiningScope(variable) {
    if (this.scope[variable]) {
      return this
    }
    if (this.parent) {
      return this.parent.findDefiningScope(variable)
    }
    return null;
  }

}


module.exports = Scope;