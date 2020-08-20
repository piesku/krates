import {Game} from "../game.js";
import {App1} from "../ui/App1.js";
import {App2} from "../ui/App2.js";

let prev1: string;
let prev2: string;

export function sys_ui(game: Game, delta: number) {
    let next1 = App1(game);
    if (next1 !== prev1) {
        game.Ui1.innerHTML = prev1 = next1;
    }

    let next2 = App2(game);
    if (next2 !== prev2) {
        game.Ui2.innerHTML = prev2 = next2;
    }
}
