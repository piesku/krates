import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {TexturedDiffuseLayout} from "./layout_textured_diffuse.js";

let vertex = `
    const int MAX_LIGHTS = 8;

    uniform mat4 pv;
    uniform mat4 world;
    uniform mat4 self;
    uniform vec4 light_positions[MAX_LIGHTS];
    uniform vec4 light_details[MAX_LIGHTS];

    attribute vec3 position;
    attribute vec2 texcoord;
    attribute vec3 normal;
    varying vec2 vert_texcoord;
    varying vec3 rgb;

    void main() {
        vec4 vert_pos = world * vec4(position, 1.0);
        vec3 vert_normal = normalize((vec4(normal, 1.0) * self).xyz);
        gl_Position = pv * vert_pos;
        vert_texcoord = texcoord;
        rgb = vec3(0.3);

        for (int i = 0; i < MAX_LIGHTS; i++) {
            if (light_positions[i].w == 0.0) {
                break;
            }

            vec3 light_color = light_details[i].rgb;
            float light_intensity = light_details[i].a;

            vec3 light_normal = light_positions[i].xyz;

            float diffuse_factor = dot(vert_normal, light_normal);
            if (diffuse_factor > 0.0) {
                // Diffuse color.
                rgb += diffuse_factor * light_color * light_intensity;
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
    varying vec3 rgb;

    const vec4 transparent = vec4(1.0, 0.0, 1.0, 1.0);

    void main() {
        vec4 color;
        if (texoffset == 0.0) {
            color = texture2D(sampler, vert_texcoord * texscale);
        } else {
            color = texture2D(sampler, vert_texcoord * texscale + vec2(texoffset, 0.0));
        }

        if (color == transparent) {
            discard;
        }

        gl_FragColor = vec4(rgb, 1.0) * color;
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
            LightPositions: gl.getUniformLocation(program, "light_positions")!,
            LightDetails: gl.getUniformLocation(program, "light_details")!,
        },
    };
}
