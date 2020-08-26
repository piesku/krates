import {html} from "../../common/html.js";
import {Action} from "../actions.js";

export function Title() {
    return html`
        <div class="screen">
            <div
                class="view"
                style="
                    grid-template-columns: repeat(5, 1fr);
                    grid-template-rows: repeat(6, 1fr);
                    font-style: italic;
                "
            >
                <div
                    style="grid-area: 1/1/3/3; font-size: 3em; animation: 0.3s ease-in both title;"
                >
                    Oh
                </div>
                <div
                    style="grid-area: 1/3/3/5; font-size: 4em; animation: 0.3s ease-in 0.5s both title;"
                >
                    No!
                </div>
                <div style="grid-area: 3/1/4/2; animation: 0.2s ease-in 1s both title;">All</div>
                <div style="grid-area: 4/1/5/2; animation: 0.2s ease-in 1.2s both title;">The</div>
                <div
                    style="font-size: 2em; grid-area: 3/2/5/5; animation: 0.3s ease-in 1.4s both title;"
                >
                    Textures
                </div>
                <div style="grid-area: 5/2/6/3; animation: 0.2s ease-in 1.9s both title;">Are</div>
                <div
                    style="font-size: 4em; grid-area: 5/3/7/6; animation: 1s ease-in 2s both gone;"
                    onanimationend="$(${Action.TexturesAreGone})"
                >
                    404!
                </div>
            </div>
        </div>
        <div class="screen">
            <div class="view" style="background: #fc6; border: 10px solid #c60;"></div>
            <div class="view" style="animation: 1s ease-in-out 3s both slide-from-bottom;">
                <div class="button" onclick="$(${Action.GoToStage}, 1)">
                    Start a New Game
                </div>
            </div>
        </div>
    `;
}
