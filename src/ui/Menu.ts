import {html} from "../../common/html.js";
import {Action} from "../actions.js";

export function Menu() {
    return html`
        <div
            style="
                display: grid;
                place-items: center;
                height: 100%;
                background-color: #000;
            "
        >
            <div onclick="$(${Action.GoToStage}, 5)">
                Start a New Game
            </div>
        </div>
    `;
}
