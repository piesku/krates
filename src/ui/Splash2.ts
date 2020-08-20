import {html} from "../../common/html.js";
import {Action} from "../actions.js";

export function Splash2() {
    return html`
        <div
            style="
                display: grid;
                place-items: center;
                height: 100%;
                background-color: #000;
                overflow: hidden;
            "
        >
            <div
                style="
                    width: 400px;
                    animation: 3s ease-in-out both slide-from-right;
                "
                onanimationend="$(${Action.GoToTitle})"
            >
                A js13kGames game
            </div>
        </div>
    `;
}
