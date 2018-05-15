export class GlHelper {

    static createShader(context: WebGLRenderingContext, type, source): WebGLShader {
        const shader = context.createShader(type);
        context.shaderSource(shader, source);
        context.compileShader(shader);

        const status = context.getShaderParameter(shader, context.COMPILE_STATUS);
        if (!status) {
            throw context.getShaderInfoLog(shader);
        }

        return shader;
    }

    static createProgram (gl: WebGLRenderingContext, ...shaders) : WebGLProgram {
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
}