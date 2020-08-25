import {html} from "../../common/html.js";
import {Action} from "../actions.js";

export function Splash() {
    return html`
        <div
            class="screen"
            style="
                background-color: #eee;
                color: #222;
                font: 36px Arial;
                font-weight: bold;
                font-style: italic;
            "
        >
            <div
                style="
                    width: 300px;
                    animation: 3s ease-in-out both slide-from-left;
                "
            >
                Piesku presents
            </div>
        </div>
        <div
            class="screen"
            style="
                background-color: #eee;
                color: #222;
                font: 36px Arial;
                font-weight: bold;
                font-style: italic;
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
