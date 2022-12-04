class Scope {
  constructor(options = {}) {
    this.parent = options.parent || null;
    this.scope = {};
  }

  add (variable, scope) {
    this.scope[variable] = scope;
  }

  contains(variable) {
    const part = this.findDefiningScope(variable);
    return typeof part !== 'undefined';
  }

  findDefiningScope(variable) {
    if (typeof this.scope[variable] !== 'undefined') {
      return  this;
    }
    if (this.parent) {
      return this.parent.findDefiningScope(variable)
    }
    return undefined;
  }

  findDefining(variable) {
    if (typeof this.scope[variable] !== 'undefined') {
      return  this.scope[variable];
    }
    if (this.parent) {
      return this.parent.findDefining(variable)
    }
    return undefined;
  }

}


module.exports = Scope;