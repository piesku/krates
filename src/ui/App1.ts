import {Game} from "../game.js";
import {scene_title} from "../scenes/sce_title.js";
import {Splash1} from "./Splash1.js";
import {Title} from "./Title.js";

export function App1(game: Game) {
    switch (game.CurrentScene) {
        case undefined:
            return Splash1();
        case scene_title:
            return Title();
        default:
            return "";
    }
}
