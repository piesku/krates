import {Game} from "../game.js";
import {Splash1} from "./Splash1.js";

export function App1(game: Game) {
    switch (game.CurrentScene) {
        case undefined:
            return Splash1();
        default:
            return "";
    }
}
