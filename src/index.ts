import {create_texture_from} from "../common/texture.js";
import {dispatch} from "./actions.js";
import {loop_start} from "./core.js";
import {Game} from "./game.js";
import {scene_title} from "./scenes/sce_title.js";

let game = new Game();

// @ts-ignore
window.$ = (...args) => dispatch(game, ...args);

// @ts-ignore
for (let texture of document.querySelectorAll("img")) {
    game.Textures[texture.id] = create_texture_from(game.Gl, texture);
}

// Skip splash for faster dev feedback.
// scene_stage(game, 1);
scene_title(game);

loop_start(game);
