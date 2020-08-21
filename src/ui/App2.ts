import {Game} from "../game.js";
import {scene_title} from "../scenes/sce_title.js";
import {Menu} from "./Menu.js";
import {Splash2} from "./Splash2.js";
import {Stage2} from "./Stage2.js";

export function App2(game: Game) {
    switch (game.CurrentScene) {
        case undefined:
            return Splash2();
        case scene_title:
            return Menu();
        default:
            return Stage2(game);
    }
}
