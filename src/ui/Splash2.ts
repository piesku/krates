import {html} from "../../common/html.js";
import {Action} from "../actions.js";

export function Splash2() {
    return html`
        <div
            style="
                position: relative;
                width: 100%;
                height: 100%;
                background-color: #000;
                overflow: hidden;
            "
        >
            <div
                style="
                    position: absolute;
                    top: 170px;
                    width: 100%;
                    font-size: 48px;
                    animation: 3s ease-in-out both slide-from-right;
                "
                onanimationend="$(${Action.GoToTitle})"
            >
                2020 Piesku
            </div>
        </div>
    `;
}
