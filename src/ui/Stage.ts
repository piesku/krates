import {html} from "../../common/html.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";
import {maps} from "../maps.js";

export function Stage(game: Game) {
    return html`
        <div class="screen"></div>
        <div class="screen">
            ${game.StageCleared &&
            (game.CurrentStage < maps.length - 1
                ? `
                    <div
                        class="button"
                        style="
                            animation: 1s ease-in-out both slide-from-bottom;
                        "
                        onclick="$(${Action.GoToStage}, ${game.CurrentStage + 1})"
                    >
                        Advance to the Next Stage
                    </div>
                `
                : `
                    <div
                        class="button"
                        style="
                            animation: 1s ease-in-out both slide-from-bottom;
                        "
                        onclick="$(${Action.GoToTitle})"
                    >
                        You Won!
                    </div>
                `)}
        </div>
    `;
}
