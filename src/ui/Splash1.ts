import {html} from "../../common/html.js";

export function Splash1() {
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
                    width: 300px;
                    animation: 3s ease-in-out both slide-from-left;
                "
            >
                Piesku presents
            </div>
        </div>
    `;
}
