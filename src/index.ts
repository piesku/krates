import {create_texture_from, fetch_image} from "../common/texture.js";
import {loop_start} from "./core.js";
import {Game} from "./game.js";
import {scene_stage} from "./scenes/sce_stage.js";

let game = new Game();

// @ts-ignore
window.game = game;

Promise.all([load_texture(game, "checker1.png"), load_texture(game, "grass.png")]).then(() => {
    scene_stage(game);
    loop_start(game);
});

async function load_texture(game: Game, name: string) {
    let image = await fetch_image("../textures/" + name);
    game.Textures[name] = create_texture_from(game.Gl, image);
}