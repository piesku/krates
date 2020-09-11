import {Game} from "../src/game.js";
import {
    GL_DATA_UNSIGNED_BYTE,
    GL_LINEAR,
    GL_NEAREST,
    GL_PIXEL_UNSIGNED_BYTE,
    GL_RGBA,
    GL_TEXTURE_2D,
    GL_TEXTURE_MAG_FILTER,
    GL_TEXTURE_MIN_FILTER,
} from "./webgl.js";

export function fetch_image(path: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        let image = new Image();
        image.src = path;
        image.onload = () => resolve(image);
    });
}

export function create_texture_from(gl: WebGLRenderingContext, image: HTMLImageElement) {
    let texture = gl.createTexture()!;
    gl.bindTexture(GL_TEXTURE_2D, texture);
    gl.texImage2D(GL_TEXTURE_2D, 0, GL_RGBA, GL_RGBA, GL_PIXEL_UNSIGNED_BYTE, image);

    // WebGL1 can only mipmap images which are a power of 2 in both dimensions.
    // All our textures meet this criterion.
    gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
    gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);

    // These are the defaults.
    // gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
    // gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);

    return texture;
}

export function create_texture_rgba(gl: WebGLRenderingContext, width: number, height: number) {
    let texture = gl.createTexture()!;
    gl.bindTexture(GL_TEXTURE_2D, texture);
    gl.texImage2D(
        GL_TEXTURE_2D,
        0,
        GL_RGBA,
        width,
        height,
        0,
        GL_RGBA,
        GL_DATA_UNSIGNED_BYTE,
        null
    );

    // The default value of GL_NEAREST_MIPMAP_LINEAR is only valid when a mipmap has been generated.
    gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);

    return texture;
}

export function create_render_buffer(gl: WebGLRenderingContext, width: number, height: number) {
    let buffer = gl.createRenderbuffer()!;
    gl.bindRenderbuffer(gl.RENDERBUFFER, buffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
    return buffer;
}

export function generate_texture(
    game: Game,
    color: [number, number, number]
): Promise<WebGLTexture> {
    return new Promise((resolve) => {
        let size = 16;
        let canvas_size = size;
        let canvas = document.createElement("canvas");
        canvas.width = canvas.height = canvas_size;

        let ctx = canvas.getContext("2d");
        let imageData = ctx!.getImageData(0, 0, size, size);
        for (let i = 0; i < imageData.data.length; i += 4) {
            let percent = Math.random();
            // console.log(temp_color);
            imageData.data[i] = color[0] * percent;
            imageData.data[i + 1] = color[1] * percent;
            imageData.data[i + 2] = color[2] * percent;
            imageData.data[i + 3] = 255;
        }

        ctx!.putImageData(imageData, 0, 0);

        let img = new Image();
        img.onload = () => {
            resolve(create_texture_from(game.Gl, img));
        };
        img.width = img.height = canvas_size;
        img.src = canvas.toDataURL();
    });
}
