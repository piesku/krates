import {create_texture_from} from "../common/texture.js";
import {dispatch} from "./actions.js";
import {loop_start} from "./core.js";
import {Game} from "./game.js";

let game = new Game();

// @ts-ignore
window.$ = (...args) => dispatch(game, ...args);

// @ts-ignore
for (let texture of document.querySelectorAll("img")) {
    game.Textures[texture.id] = create_texture_from(game.Gl, texture);
}

loop_start(game);
