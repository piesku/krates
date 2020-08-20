import {html} from "../../common/html.js";
import {Action} from "../actions.js";

export function Menu() {
    return html`
        <div
            style="
                display: grid;
                place-items: center;
                width: 100%;
                height: 100%;
                background-color: #000;
            "
        >
            <div
                style="
                    font-size: 36px;
                "
                onclick="$(${Action.GoToStage}, 0)"
            >
                Start a New Game
            </div>
        </div>
    `;
}
