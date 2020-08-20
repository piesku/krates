import {Game} from "../game.js";
import {scene_splash} from "../scenes/sce_splash.js";
import {scene_title} from "../scenes/sce_title.js";
import {Menu} from "./Menu.js";
import {Splash2} from "./Splash2.js";

export function App2(game: Game) {
    switch (game.CurrentScene) {
        case scene_splash:
            return Splash2();
        case scene_title:
            return Menu();
        default:
            return "";
    }
}
