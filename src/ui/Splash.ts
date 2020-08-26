import {html} from "../../common/html.js";
import {Action} from "../actions.js";

export function Splash() {
    return html`
        <div
            class="screen"
            style="
                background-color: #eee;
                color: #222;
                text-shadow: none;
                font-style: italic;
            "
        >
            <div
                class="view"
                style="
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
                text-shadow: none;
                font-style: italic;
            "
        >
            <div
                class="view"
                style="
                    animation: 3s ease-in-out both slide-from-right;
                "
                onanimationend="$(${Action.GoToTitle})"
            >
                A js13kGames game
            </div>
        </div>
    `;
}
