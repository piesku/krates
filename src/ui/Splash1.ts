import {html} from "../../common/html.js";

export function Splash1() {
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
                    top: 150px;
                    font-size: 64px;
                    animation: 3s ease-in-out both slide-from-left;
                "
            >
                Krates
            </div>
        </div>
    `;
}
