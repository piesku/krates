import {html} from "../../common/html.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";
import {maps} from "../maps.js";

export function Stage(game: Game) {
    return html`
        <div class="screen"></div>
        <div class="screen">
            <div class="view" style="border: 10px solid #c60;">
                <div
                    style="
                    width: 256px;
                    height: 192px;
                    margin: 96px 0 0;
                    border: 10px solid #c60;
                "
                ></div>
            </div>
            ${game.StageFailed && Failed(game.CurrentStage)}
            ${game.StageCleared &&
            (game.CurrentStage < maps.length - 1 ? Continue(game.CurrentStage + 1) : Victory())}
        </div>
    `;
}

function Failed(this_stage: number) {
    return html`
        <div class="view toast">
            <div class="alert fill">
                <p>You drowned!</p>
                <div class="button" onclick="$(${Action.GoToStage}, ${this_stage})">
                    Try again
                </div>
            </div>
        </div>
    `;
}

function Continue(next_stage: number) {
    return html`
        <div class="view toast">
            <div class="alert fill">
                <p>You found a missing texture!</p>
                <div class="button" onclick="$(${Action.GoToStage}, ${next_stage})">
                    Continue
                </div>
            </div>
        </div>
    `;
}

function Victory() {
    return html`
        <div class="view toast">
            <div class="alert fill">
                You Won!
                <div class="button" onclick="$(${Action.GoToTitle})">
                    Play Again
                </div>
            </div>
        </div>
    `;
}
