import {html} from "../../common/html.js";
import {Action} from "../actions.js";

export function Title() {
    return html`
        <div
            class="screen"
            style="
                display: grid;
                place-items: center;
            "
        >
            <div
                style="
                    font-size: 64px;
                "
            >
                Krates
            </div>
        </div>
        <div
            class="screen"
            style="
                display: grid;
                place-items: center;
                background-color: #000;
            "
        >
            <div onclick="$(${Action.GoToStage}, 1)">
                Start a New Game
            </div>
        </div>
    `;
}
