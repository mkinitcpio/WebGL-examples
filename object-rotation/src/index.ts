let gl: WebGLRenderingContext = null;

import * as vertexSource from './shaders/vertexShader.vert';
import * as fragmentSource from './shaders/fragmentShader.frag';

import { Matrix } from './matrix';
import { GlHelper } from './gl-helper';

window.addEventListener('load', () => {

    const canvas: any = document.querySelector('#webgl-context');
    gl = canvas.getContext('webgl');

    if (!gl) {
        throw "Webgl does not support";
    }

    const xOffset = 0;
    const yOffset = 0;
    gl.viewport(xOffset, yOffset, canvas.width, canvas.height);

    const vertexShader = GlHelper.createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = GlHelper.createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    const program = GlHelper.createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    const attrPosition = gl.getAttribLocation(program, 'a_Position');

    const vertexData = [
        -0.3, -0.3, 0.3, 1.0,
        0.3, -0.3, 0.3, 1.0,
        0.3, 0.3, 0.3, 1.0,
        -0.3, 0.3, 0.3, 1.0,
    
        -0.3, -0.3, -0.3, 1.0,
        -0.3, 0.3, -0.3, 1.0,
        0.3, 0.3, -0.3, 1.0,
        0.3, -0.3, -0.3, 1.0,
    
        -0.3, 0.3, -0.3, 1.0,
        -0.3, 0.3, 0.3, 1.0,
        0.3, 0.3, 0.3, 1.0,
        0.3, 0.3, -0.3, 1.0,
    
        -0.3, -0.3, -0.3, 1.0,
        0.3, -0.3, -0.3, 1.0,
        0.3, -0.3, 0.3, 1.0,
        -0.3, -0.3, 0.3, 1.0,
    
        0.3, -0.3, -0.3, 1.0,
        0.3, 0.3, -0.3, 1.0,
        0.3, 0.3, 0.3, 1.0,
        0.3, -0.3, 0.3, 1.0,
    
        -0.3, -0.3, -0.3, 1.0,
        -0.3, -0.3, 0.3, 1.0,
        -0.3, 0.3, 0.3, 1.0,
        -0.3, 0.3, -0.3, 1.0
    ];
    const stride = 0;
    const offset = 0;

    const vertexObject = {
        data: new Float32Array(vertexData),
        dataPortionLength: 4,
        attrPosition,
        offset,
        stride
    };

    draw({
        vertexObject,
        program
    });
});

const draw = ({ vertexObject, program }) => {

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        vertexObject.data,
        gl.STATIC_DRAW
    );

    const attrRotation = gl.getUniformLocation(program, 'u_RotationMatrix');

    gl.vertexAttribPointer(
        vertexObject.attrPosition,
        vertexObject.dataPortionLength,
        gl.FLOAT,
        false,
        vertexObject.stride,
        vertexObject.offset
    );
    gl.enableVertexAttribArray(vertexObject.attrPosition);

    const render = now => {
        now *= 0.001;

        const rXmatrix = Matrix.rotateXAxis(now);
        const rYmatrix = Matrix.rotateYAxis(now);
        const resultRotationMatrix = Matrix.multiplyArrayMatrices(rXmatrix, rYmatrix);

        const transpose = false;

        gl.uniformMatrix4fv(
            attrRotation,
            transpose,
            new Float32Array(resultRotationMatrix)
        );

        const red = 0.0;
        const green = 0.0;
        const blue = 0.0;
        const alpha = 1.0;

        gl.clearColor(red, green, blue, alpha);
        gl.clear(gl.COLOR_BUFFER_BIT);

        const count = 24;
        const startIndex = 0;

        gl.drawArrays(gl.LINE_LOOP, startIndex, count);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}