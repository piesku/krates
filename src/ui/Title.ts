import {html} from "../../common/html.js";

export function Title() {
    return html`
        <div
            style="
                display: grid;
                place-items: center;
                height: 100%;
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
    `;
}
