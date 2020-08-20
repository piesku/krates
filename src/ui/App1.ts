import {Game} from "../game.js";
import {scene_splash} from "../scenes/sce_splash.js";
import {Splash1} from "./Splash1.js";

export function App1(game: Game) {
    switch (game.CurrentScene) {
        case scene_splash:
            return Splash1();
        default:
            return "";
    }
}
