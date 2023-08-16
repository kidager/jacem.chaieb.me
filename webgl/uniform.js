export default class Uniform {
  constructor(name, suffix, program, gl) {
    this.name = name;
    this.suffix = suffix;
    this.gl = gl;
    this.program = program;
    this.location = gl.getUniformLocation(
      program,
      name
    );
  }

  set(...values) {
    const method = `uniform${this.suffix}`;
    const args = [this.location].concat(values);

    this.gl[method].apply(this.gl, args);
  }
}
