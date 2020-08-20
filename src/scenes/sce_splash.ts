import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_splash(game: Game) {
    game.CurrentScene = scene_splash;
    game.World = new World();
    game.Cameras = [];
}
