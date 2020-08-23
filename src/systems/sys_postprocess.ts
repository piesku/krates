import {
    GL_ARRAY_BUFFER,
    GL_COLOR_BUFFER_BIT,
    GL_DEPTH_BUFFER_BIT,
    GL_ELEMENT_ARRAY_BUFFER,
    GL_FLOAT,
    GL_FRAMEBUFFER,
    GL_TEXTURE0,
    GL_TEXTURE_2D,
    GL_UNSIGNED_SHORT,
} from "../../common/webgl.js";
import {Game} from "../game.js";

export function sys_postprocess(game: Game, delta: number) {
    game.Gl.bindFramebuffer(GL_FRAMEBUFFER, null);
    game.Gl.clearColor(0, 0, 0, 1);
    game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    let material = game.MaterialPostprocess;
    let mesh = game.MeshQuad;

    game.Gl.useProgram(material.Program);

    game.Gl.activeTexture(GL_TEXTURE0);
    game.Gl.uniform1i(material.Locations.Sampler, 0);

    game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.VertexBuffer);
    game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
    game.Gl.vertexAttribPointer(material.Locations.VertexPosition, 3, GL_FLOAT, false, 0, 0);

    game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.TexCoordBuffer);
    game.Gl.enableVertexAttribArray(material.Locations.VertexTexCoord);
    game.Gl.vertexAttribPointer(material.Locations.VertexTexCoord, 2, GL_FLOAT, false, 0, 0);

    game.Gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, mesh.IndexBuffer);

    // Top screen.
    game.Gl.bindTexture(GL_TEXTURE_2D, game.Textures.Postprocess);
    game.Gl.viewport(0, 404, 512, 384);
    game.Gl.drawElements(material.Mode, mesh.IndexCount, GL_UNSIGNED_SHORT, 0);

    // Bottom screen.
    game.Gl.bindTexture(GL_TEXTURE_2D, game.Textures.Minimap);
    game.Gl.viewport(0, 0, 512, 384);
    game.Gl.drawElements(material.Mode, mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
}
