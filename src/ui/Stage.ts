import {html} from "../../common/html.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";
import {maps} from "../maps.js";

export function Stage(game: Game) {
    return html`
        <div class="screen"></div>
        <div class="screen">
            ${game.StageCleared &&
            (game.CurrentStage < maps.length - 1 ? Continue(game.CurrentStage + 1) : Victory())}
        </div>
    `;
}

function Continue(next_stage: number) {
    return html`
        <div class="toast" style="animation: 1s ease-in-out both slide-from-bottom;">
            <p>You found a missing texture!</p>
            <div class="button" onclick="$(${Action.GoToStage}, ${next_stage})">
                Continue
            </div>
        </div>
    `;
}

function Victory() {
    return html`
        <div class="toast" style="animation: 1s ease-in-out both slide-from-bottom;">
            You Won!
            <div class="button" onclick="$(${Action.GoToTitle})">
                Play Again
            </div>
        </div>
    `;
}
