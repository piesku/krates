import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {TexturedDiffuseLayout} from "./layout_textured_diffuse.js";

let vertex = `
    uniform mat4 pv;
    uniform mat4 world;
    uniform mat4 self;

    attribute vec3 position;
    attribute vec2 texcoord;
    attribute vec3 normal;
    varying vec2 vert_texcoord;
    varying vec3 vert_color;

    void main() {
        vec4 vert_pos = world * vec4(position, 1.0);
        vec3 vert_normal = normalize((vec4(normal, 1.0) * self).xyz);
        gl_Position = pv * vert_pos;

        vert_texcoord = texcoord;
        vert_color = vec3(0.3);

        {
            // Main light.
            vec3 light_normal = normalize(vec3(1.0, 1.0, -1.0));
            float light_intensity = 0.8;

            float diffuse_factor = dot(vert_normal, light_normal);
            if (diffuse_factor > 0.0) {
                vert_color += diffuse_factor * light_intensity;
            }
        }

        {
            // Secondary light.
            vec3 light_normal = normalize(vec3(1.0, 1.0, 1.0));
            float light_intensity = 0.5;

            float diffuse_factor = dot(vert_normal, light_normal);
            if (diffuse_factor > 0.0) {
                vert_color += diffuse_factor * light_intensity;
            }
        }
    }
`;

let fragment = `
    precision mediump float;
    uniform sampler2D sampler;
    uniform float texscale;
    uniform float texoffset;
    varying vec2 vert_texcoord;
    varying vec3 vert_color;

    void main() {
        if (texoffset == 0.0) {
            gl_FragColor = vec4(vert_color, 1.0) * texture2D(sampler, vert_texcoord * texscale);
        } else {
            gl_FragColor = vec4(vert_color, 1.0) * texture2D(sampler, vert_texcoord * texscale + vec2(texoffset, 0.0));
        }

    }
`;

export function mat1_textured_diffuse(gl: WebGLRenderingContext): Material<TexturedDiffuseLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "pv")!,
            World: gl.getUniformLocation(program, "world")!,
            Self: gl.getUniformLocation(program, "self")!,
            Sampler: gl.getUniformLocation(program, "sampler")!,
            VertexPosition: gl.getAttribLocation(program, "position")!,
            VertexTexCoord: gl.getAttribLocation(program, "texcoord")!,
            VertexNormal: gl.getAttribLocation(program, "normal")!,
            TexScale: gl.getUniformLocation(program, "texscale")!,
            TexOffset: gl.getUniformLocation(program, "texoffset")!,
        },
    };
}
