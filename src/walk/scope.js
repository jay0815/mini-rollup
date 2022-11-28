class Scope {
  constructor(options) {
    this.name = options.name;
    if (options.children) {
      this.children = [];
      options.children.forEach(child => {
        this.children.push(new Scope(child))
      })
    }
  }

  print(indent) {
    console.log()
  }
}