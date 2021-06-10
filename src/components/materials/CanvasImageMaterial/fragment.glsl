// clang-format off
#pragma glslify: toLinear = require('glsl-gamma/in')
#pragma glslify: toGamma = require('glsl-gamma/out')
// clang-format on

#ifdef GL_ES
precision mediump float;
#endif

#define DEFAULT_MODE 0
#define SELECT_MODE 1
#define SCALE_MODE 2
#define CROP_MODE 3

varying vec2 vUv;
uniform int u_mode;
uniform sampler2D u_texture;
uniform vec3 u_border_color;
uniform vec2 u_border_thickness;
uniform vec4 u_inset;
uniform float u_handle_size;
uniform float u_scale;

float full_border(vec2 st, vec2 th) {
  vec2 mask = step(th, st) * step(st, 1.0 - th);
  return 1.0 - min(mask.x, mask.y);
}

float circle(vec2 st) {
  vec2 center = vec2(0.5, 0.5);
  float size = 0.6;
  return 1.0 - step(size, distance(center, st));
}

float rect(vec2 xy, vec2 wh, vec2 st) {
  vec2 mask = step(xy, st);
  mask *= 1.0 - step(xy + wh, st);
  return mask.x * mask.y;
}

mat2 scale(vec2 _scale) { return mat2(_scale.x, 0.0, 0.0, _scale.y); }

float top(vec2 st, vec2 th) {
  vec2 xy = vec2(0.0, 1.0 - th.y);
  vec2 wh = vec2(1.0, th.y);
  vec2 uv = st;
  wh *= scale(vec2(u_handle_size, 1.0)) *
        scale(vec2(1.0 - (u_inset.y + u_inset.w), 1.0));
  xy += vec2((wh.x / 2.0) + u_inset.w, -u_inset.x);
  return rect(xy, wh, uv);
}

float right(vec2 st, vec2 th) {
  vec2 xy = vec2(1.0 - th.x, 0.0);
  vec2 wh = vec2(th.x, 1.0);
  vec2 uv = st;
  wh *= scale(vec2(1.0, u_handle_size)) *
        scale(vec2(1.0, 1.0 - (u_inset.x + u_inset.z)));
  xy += vec2(-u_inset.y, (wh.y / 2.0) + u_inset.z);
  return rect(xy, wh, uv);
}

float bottom(vec2 st, vec2 th) {
  vec2 xy = vec2(0.0, 0.0);
  vec2 wh = vec2(1.0, th.y);
  vec2 uv = st;
  wh *= scale(vec2(u_handle_size, 1.0)) *
        scale(vec2(1.0 - (u_inset.y + u_inset.w), 1.0));
  xy += vec2((wh.x / 2.0) + u_inset.w, u_inset.z);
  return rect(xy, wh, uv);
}

float left(vec2 st, vec2 th) {
  vec2 xy = vec2(0.0, 0.0);
  vec2 wh = vec2(th.x, 1.0);
  vec2 uv = st;
  wh *= scale(vec2(1.0, u_handle_size)) *
        scale(vec2(1.0, 1.0 - (u_inset.x + u_inset.z)));
  xy += vec2(u_inset.w, (wh.y / 2.0) + u_inset.z);
  return rect(xy, wh, uv);
}

void main() {
  vec4 texture = toLinear(texture2D(u_texture, vUv));
  vec4 border_color = vec4(u_border_color, 1.0);
  vec2 st = vUv;
  float alpha = 1.0;
  vec2 th = u_border_thickness * vec2(1.0 / u_scale);

  switch (u_mode) {
  case SCALE_MODE: {
    float border_mask = full_border(vUv, th);
    vec4 color = mix(texture, border_color, border_mask);
    color = mix(color, texture, min(border_mask, circle(vUv)));
    gl_FragColor = toGamma(color);
    break;
  }
  case CROP_MODE: {
    float handle_mask =
        max(max(top(st, th), bottom(st, th)), max(left(st, th), right(st, th)));
    float dim_mask_x = step(st.x, 1.0 - u_inset.y) * step(u_inset.w, st.x);
    float dim_mask_y = step(st.y, 1.0 - u_inset.x) * step(u_inset.z, st.y);
    float dim_mask = min(dim_mask_x, dim_mask_y);

    vec4 black = vec4(vec3(0.0), 1.0);
    vec4 gray = vec4(vec3(0.3), 1.0);

    vec4 color = mix(mix(black, gray, texture), texture, dim_mask);

    color = mix(color, border_color, handle_mask);
    gl_FragColor = toGamma(color);
    break;
  }
  case SELECT_MODE: {
    float border_mask = full_border(vUv, th);
    gl_FragColor = toGamma(mix(texture, border_color, border_mask));
    break;
  }
  case DEFAULT_MODE:
  default:
    gl_FragColor = toGamma(texture);
    break;
  }
}