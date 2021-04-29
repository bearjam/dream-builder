#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;
uniform sampler2D u_image;
uniform vec4 u_inset;
uniform vec4 u_edge_color;
uniform vec4 u_vertex_color;
uniform bool u_edges;
uniform bool u_vertices;
uniform bool u_central_cross;

void main() {
  vec4 texture = texture2D(u_image, vUv);

  float xMask = step(vUv.x, 1.0 - u_inset.y) * step(u_inset.w, vUv.x);
  float yMask = step(vUv.y, 1.0 - u_inset.x) * step(u_inset.z, vUv.y);

  bool edges = u_edge_color.w > 0.0;
  bool vertices = u_vertex_color.w > 0.0;

  float gap = 0.2;
  float thickness = 0.05;

  vec2 scale =
      vec2(1.0 - (u_inset.w + u_inset.y), 1.0 - (u_inset.z + u_inset.x));

  // bool gapTop = vUv.y > 1.0 - u_inset.x - gap;
  // bool gapRight = vUv.x < 1.0 - u_inset.y - gap;
  // bool gapBottom = vUv.y > u_inset.z + gap;
  // bool gapLeft = vUv.x > u_inset.w + gap;

  bool edgeLeft = vUv.x < thickness + u_inset.w;
  bool edgeRight = vUv.x > 1.0 - thickness - u_inset.y;
  bool edgeBottom = vUv.y < thickness + u_inset.z;
  bool edgeTop = vUv.y > 1.0 - thickness - u_inset.x;

  // bool edge = edges && (edgeLeft || edgeRight || edgeTop || edgeBottom);
  bool edge = false;
  // !gapTop; // && gapTop && gapBottom;
  bool vertex = false;

  if (edge || vertex) {
    gl_FragColor = u_edge_color;
  } else {
    gl_FragColor = vec4(xMask * yMask) * texture;
  }
}
