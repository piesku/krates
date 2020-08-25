import {Game} from "../game.js";
import {scene_title} from "../scenes/sce_title.js";
import {Splash} from "./Splash.js";
import {Stage} from "./Stage.js";
import {Title} from "./Title.js";

export function App(game: Game) {
    switch (game.CurrentScene) {
        case undefined:
            return Splash();
        case scene_title:
            return Title();
        default:
            return Stage(game);
    }
}
