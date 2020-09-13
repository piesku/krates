import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {TexturedDiffuseLayout} from "./layout_textured_diffuse.js";

let vertex = `
    uniform mat4 K,L,M;
    uniform vec4 N;

    attribute vec3 P,R;
    attribute vec2 Q;
    varying vec2 a;
    varying vec3 b;

    void main(){
        vec3 n=normalize((vec4(R, 1.0)*M).xyz);
        gl_Position=K*L*vec4(P,1.);

        a=Q;

        // Ambient light.
        b=N.rgb*.3;

        {
            // Main light.
            float f=dot(n,normalize(vec3(1.,1.,-1.)));
            if(f>0.)b+=N.rgb*f*.8;
        }

        {
            // Secondary light.
            float f=dot(n,normalize(vec3(1.,1.,1.)));
            if(f > 0.0)b += N.rgb*f*.5;
        }
    }
`;

let fragment = `
    precision mediump float;

    uniform sampler2D O;
    uniform float S,T;
    varying vec2 a;
    varying vec3 b;

    void main() {
        vec4 c;
        if (T==0.) {
            c=texture2D(O,a*S);
        } else {
            c=texture2D(O,a*S+vec2(T,0.));
        }

        if(c==vec4(1.,0.,1.,1.))discard;

        gl_FragColor=vec4(b,1.)*c;
    }
`;

export function mat1_textured_diffuse(gl: WebGLRenderingContext): Material<TexturedDiffuseLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "K")!,
            World: gl.getUniformLocation(program, "L")!,
            Self: gl.getUniformLocation(program, "M")!,
            Color: gl.getUniformLocation(program, "N")!,
            Sampler: gl.getUniformLocation(program, "O")!,
            VertexPosition: gl.getAttribLocation(program, "P")!,
            VertexTexCoord: gl.getAttribLocation(program, "Q")!,
            VertexNormal: gl.getAttribLocation(program, "R")!,
            TexScale: gl.getUniformLocation(program, "S")!,
            TexOffset: gl.getUniformLocation(program, "T")!,
        },
    };
}
