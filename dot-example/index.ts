let gl: WebGLRenderingContext = null;

const vertexSource = `
    void main(void) {
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 10.0;
}
`;

const fragmentSource = `
    void main(void) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

const createShader = (context: WebGLRenderingContext, type, source) => {
    const shader = context.createShader(type);
    context.shaderSource(shader, source);
    context.compileShader(shader);

    const status = context.getShaderParameter(shader, context.COMPILE_STATUS);
    if (!status) {
        throw context.getShaderInfoLog(shader);
    }

    return shader;
}

const createProgram = (gl: WebGLRenderingContext, ...shaders) => {
    const program = gl.createProgram();

    shaders.forEach(shader => {
        gl.attachShader(program, shader);
    });

    gl.linkProgram(program);

    const status = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!status) {
        throw gl.getProgramInfoLog(program);
    }
    return program;
}

window.addEventListener('load', () => {

    const canvas: any = document.querySelector('#webgl-context');
    gl = canvas.getContext('webgl');

    if (!gl) {
        throw "Webgl does not support";
    }

    const red = 0.0;
    const green = 0.0;
    const blue = 0.0;
    const alpha = 1.0;

    gl.clearColor(red, green, blue, alpha);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    const xOffset = 0;
    const yOffset = 0;
    gl.viewport(xOffset, yOffset, canvas.width, canvas.height);

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    const count = 1;
    const startIndex = 0;
    gl.drawArrays(gl.POINTS, startIndex, count);
});