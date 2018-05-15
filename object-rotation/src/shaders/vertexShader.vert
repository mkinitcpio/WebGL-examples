attribute lowp vec4 a_Position;
uniform mat4 u_RotationMatrix;
varying vec4 v_Color;

void main(void) {
    v_Color = u_RotationMatrix * a_Position;

    gl_Position =  u_RotationMatrix * a_Position;
}