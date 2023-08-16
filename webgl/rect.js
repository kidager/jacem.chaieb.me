export default class Rect {
  constructor(gl) {
    // eslint-disable-next-line compat/compat
    this.verts = new Float32Array([
      -1,
      -1,
       1,
      -1,
      -1,
       1,
       1,
       1,
    ]);

    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(gl.ARRAY_BUFFER, this.verts, gl.STATIC_DRAW);
  }

  render(gl) {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
};
